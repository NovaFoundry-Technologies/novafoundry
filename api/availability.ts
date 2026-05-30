import { google } from "googleapis";

type ApiRequest = {
  method?: string;
  query?: {
    date?: string | string[];
  };
};

type ApiResponse = {
  status: (statusCode: number) => {
    json: (body: unknown) => void;
  };
  json: (body: unknown) => void;
};

type ExternalApiError = Error & {
  code?: number;
  status?: number;
  response?: {
    status?: number;
    data?: unknown;
  };
};

const logAvailabilityStep = (
  step: string,
  details?: Record<string, unknown>,
) => {
  console.log("[availability]", step, details ?? {});
};

const getExternalStatus = (error: unknown) => {
  const apiError = error as Partial<ExternalApiError>;

  return apiError.response?.status ?? apiError.status ?? apiError.code;
};

const getClientErrorMessage = (error: unknown) => {
  const status = getExternalStatus(error);

  if (status === 404) {
    return "Google Calendar was not found or is not shared with the service account";
  }

  if (status === 401 || status === 403) {
    return "Google Calendar authentication failed. Check service account permissions";
  }

  return error instanceof Error ? error.message : "Failed to load availability";
};

const requiredEnv = [
  "GOOGLE_CLIENT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_CALENDAR_ID",
] as const;

const getMissingEnv = () => requiredEnv.filter((key) => !process.env[key]);

function getCalendar() {
  const missingEnv = getMissingEnv();

  logAvailabilityStep("creating Google Calendar client", {
    hasClientEmail: Boolean(process.env.GOOGLE_CLIENT_EMAIL),
    hasPrivateKey: Boolean(process.env.GOOGLE_PRIVATE_KEY),
    hasCalendarId: Boolean(process.env.GOOGLE_CALENDAR_ID),
    missingEnv,
  });

  if (missingEnv.length > 0) {
    throw new Error(`Missing Google Calendar env vars: ${missingEnv.join(", ")}`);
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL!,
    key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

const getQueryValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const isValidDateParam = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

export default async function handler(req: ApiRequest, res: ApiResponse) {
  logAvailabilityStep("request received", {
    method: req.method,
    date: getQueryValue(req.query?.date),
  });

  if (req.method && req.method !== "GET") {
    logAvailabilityStep("request rejected: invalid method", {
      method: req.method,
    });

    return res.status(405).json({ error: "GET only" });
  }

  try {
    const date = getQueryValue(req.query?.date);

    if (!date || !isValidDateParam(date)) {
      logAvailabilityStep("request rejected: invalid date", {
        date,
      });

      return res.status(400).json({
        error: "A valid date query is required",
      });
    }

    const calendar = getCalendar();

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59.999`);

    logAvailabilityStep("checking calendar availability", {
      calendarIdPresent: Boolean(process.env.GOOGLE_CALENDAR_ID),
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
    });

    const events = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const busySlots =
      events.data.items
        ?.map((event) => ({
          start: event.start?.dateTime ?? event.start?.date,
          end: event.end?.dateTime ?? event.end?.date,
        }))
        .filter(
          (slot): slot is { start: string; end: string } =>
            Boolean(slot.start) && Boolean(slot.end),
        ) ?? [];

    logAvailabilityStep("availability loaded", {
      busySlotCount: busySlots.length,
    });

    return res.json({ busySlots });
  } catch (err) {
    console.error("[availability] failed", {
      message: err instanceof Error ? err.message : "Unknown error",
      status: getExternalStatus(err),
      responseData: (err as Partial<ExternalApiError>).response?.data,
      stack: err instanceof Error ? err.stack : undefined,
    });

    return res.status(500).json({
      error: getClientErrorMessage(err),
    });
  }
}
