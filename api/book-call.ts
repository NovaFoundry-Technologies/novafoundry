import { google } from "googleapis";
import nodemailer from "nodemailer";

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (statusCode: number) => {
    json: (body: unknown) => void;
  };
  json: (body: unknown) => void;
};

type BookingBody = {
  name?: unknown;
  email?: unknown;
  startTime?: unknown;
};

type ExternalApiError = Error & {
  code?: number;
  status?: number;
  responseCode?: number;
  response?: {
    status?: number;
    data?: unknown;
  };
};

const getString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const logBookingStep = (step: string, details?: Record<string, unknown>) => {
  console.log("[book-call]", step, details ?? {});
};

const getExternalStatus = (error: unknown) => {
  const apiError = error as Partial<ExternalApiError>;

  return (
    apiError.response?.status ??
    apiError.status ??
    apiError.responseCode ??
    apiError.code
  );
};

const isInvalidConferenceTypeError = (error: unknown) => {
  const message = error instanceof Error ? error.message : "";
  const responseData = (error as Partial<ExternalApiError>).response?.data;

  return `${message} ${JSON.stringify(responseData)}`
    .toLowerCase()
    .includes("invalid conference type");
};

const getClientErrorMessage = (error: unknown, stage: string) => {
  const status = getExternalStatus(error);

  if (status === 404) {
    return "Google Calendar was not found or is not shared with the service account";
  }

  if (stage === "create_calendar_event" && (status === 401 || status === 403)) {
    return "Google Calendar can be read, but event creation is blocked. Give the service account 'Make changes to events' permission on the calendar";
  }

  if (stage === "send_confirmation_email") {
    return "Booking was created, but the confirmation email failed. Check GMAIL_USER and GMAIL_APP_PASSWORD";
  }

  if (status === 401 || status === 403) {
    return "Google Calendar authentication failed during booking. Check service account permissions";
  }

  return error instanceof Error ? error.message : "Failed to book call";
};

const requiredEnv = [
  "GOOGLE_CLIENT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_CALENDAR_ID",
  "GMAIL_USER",
  "GMAIL_APP_PASSWORD",
] as const;

const getMissingEnv = () => requiredEnv.filter((key) => !process.env[key]);

function getCalendar() {
  const missingEnv = getMissingEnv().filter((key) =>
    key.startsWith("GOOGLE_"),
  );

  logBookingStep("creating Google Calendar client", {
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export default async function handler(req: ApiRequest, res: ApiResponse) {
  let stage = "start";

  logBookingStep("request received", {
    method: req.method,
  });

  if (req.method !== "POST") {
    logBookingStep("request rejected: invalid method", {
      method: req.method,
    });

    return res.status(405).json({ error: "POST only" });
  }

  try {
    stage = "validate_environment";
    const missingEnv = getMissingEnv();

    if (missingEnv.length > 0) {
      logBookingStep("request rejected: missing environment variables", {
        missingEnv,
      });

      return res.status(500).json({
        error: `Missing server configuration: ${missingEnv.join(", ")}`,
      });
    }

    stage = "parse_request_body";
    logBookingStep("parsing request body");

    const body = (req.body ?? {}) as BookingBody;
    const name = getString(body.name);
    const email = getString(body.email);
    const startTime = getString(body.startTime);

    logBookingStep("request body parsed", {
      hasName: Boolean(name),
      hasEmail: Boolean(email),
      hasStartTime: Boolean(startTime),
      emailDomain: email.includes("@") ? email.split("@").pop() : undefined,
      startTime,
    });

    if (!name || !email || !startTime) {
      logBookingStep("request rejected: missing required fields", {
        hasName: Boolean(name),
        hasEmail: Boolean(email),
        hasStartTime: Boolean(startTime),
      });

      return res.status(400).json({
        error: "Name, email, and start time are required",
      });
    }

    stage = "validate_start_time";
    const start = new Date(startTime);

    if (Number.isNaN(start.getTime())) {
      logBookingStep("request rejected: invalid start time", {
        startTime,
      });

      return res.status(400).json({
        error: "Start time must be a valid date",
      });
    }

    stage = "create_calendar_client";
    const calendar = getCalendar();
    const end = new Date(start.getTime() + 30 * 60000);

    stage = "check_calendar_conflicts";
    logBookingStep("checking calendar conflicts", {
      calendarIdPresent: Boolean(process.env.GOOGLE_CALENDAR_ID),
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
    });

    const existing = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
    });

    const conflictCount = existing.data.items?.length ?? 0;

    logBookingStep("calendar conflict check complete", {
      conflictCount,
    });

    if (conflictCount > 0) {
      logBookingStep("request rejected: slot already booked", {
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
      });

      return res.status(409).json({
        error: "This slot is already booked",
      });
    }

    stage = "create_calendar_event";
    logBookingStep("creating calendar event", {
      attendeeDomain: email.includes("@") ? email.split("@").pop() : undefined,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
    });

    const baseEvent = {
      summary: `Call with ${name}`,
      description: `Booked by ${name} (${email})`,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    };

    let meetWarning = "";
    let event;

    try {
      event = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID!,
        conferenceDataVersion: 1,
        requestBody: {
          ...baseEvent,
          conferenceData: {
            createRequest: {
              requestId: Date.now().toString(),
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
            },
          },
        },
      });
    } catch (err) {
      if (!isInvalidConferenceTypeError(err)) {
        throw err;
      }

      meetWarning =
        "Google Meet could not be created because this calendar does not support the requested conference type.";

      logBookingStep("Google Meet creation failed; retrying without Meet", {
        reason: err instanceof Error ? err.message : "Unknown error",
      });

      event = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID!,
        requestBody: baseEvent,
      });
    }

    const meetLink = event.data.hangoutLink;

    logBookingStep("calendar event created", {
      eventId: event.data.id,
      hasMeetLink: Boolean(meetLink),
    });

    stage = "send_confirmation_email";
    logBookingStep("sending confirmation email", {
      hasGmailUser: Boolean(process.env.GMAIL_USER),
      hasGmailAppPassword: Boolean(process.env.GMAIL_APP_PASSWORD),
      recipientDomain: email.includes("@") ? email.split("@").pop() : undefined,
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your call is confirmed",
      html: `
        <h2>Booking confirmed</h2>
        <p><b>Time:</b> ${start.toUTCString()}</p>
        ${
          meetLink
            ? `<p><b>Meet link:</b> ${meetLink}</p>`
            : "<p>We will send the meeting link separately.</p>"
        }
      `,
    });

    logBookingStep("confirmation email sent");

    stage = "complete";
    logBookingStep("booking completed", {
      eventId: event.data.id,
      hasMeetLink: Boolean(meetLink),
    });

    return res.json({
      success: true,
      meetLink,
      warning: meetWarning || undefined,
    });
  } catch (err) {
    console.error("[book-call] booking failed", {
      stage,
      message: err instanceof Error ? err.message : "Unknown error",
      status: getExternalStatus(err),
      code: (err as Partial<ExternalApiError>).code,
      responseCode: (err as Partial<ExternalApiError>).responseCode,
      responseData: (err as Partial<ExternalApiError>).response?.data,
      stack: err instanceof Error ? err.stack : undefined,
    });

    return res.status(500).json({
      error: getClientErrorMessage(err, stage),
      stage,
    });
  }
}
