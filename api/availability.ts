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

function getCalendar() {
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
  if (req.method && req.method !== "GET") {
    return res.status(405).json({ error: "GET only" });
  }

  try {
    const date = getQueryValue(req.query?.date);

    if (!date || !isValidDateParam(date)) {
      return res.status(400).json({
        error: "A valid date query is required",
      });
    }

    const calendar = getCalendar();

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59.999`);

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

    return res.json({ busySlots });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Failed to load availability",
    });
  }
}
