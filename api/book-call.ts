import { google } from "googleapis";
import nodemailer from "nodemailer";
import fs from "node:fs";
import path from "node:path";

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

const logoPath = path.join(process.cwd(), "src", "assets", "novahero.png");

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
const maxBookingsPerDay = 5;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatDateParts = (start: Date, end: Date) => {
  const month = new Intl.DateTimeFormat("en", {
    month: "short",
    timeZone: "UTC",
  }).format(start);
  const day = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    timeZone: "UTC",
  }).format(start);
  const fullDate = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(start);
  const timeFormatter = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });

  return {
    month,
    day,
    fullDate,
    timeRange: `${timeFormatter.format(start)} - ${timeFormatter.format(end)}`,
  };
};

const getCalendarTemplateLink = ({
  name,
  start,
  end,
  meetLink,
}: {
  name: string;
  start: Date;
  end: Date;
  meetLink: string | undefined;
}) => {
  const formatGoogleDate = (value: Date) =>
    value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Nova Foundry Strategy Call",
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    details: meetLink
      ? `Strategy call with Nova Foundry. Join here: ${meetLink}`
      : `Strategy call with Nova Foundry for ${name}. Meeting link will be sent separately.`,
    location: meetLink ?? "Online",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const buildConfirmationEmail = ({
  name,
  start,
  end,
  meetLink,
}: {
  name: string;
  start: Date;
  end: Date;
  meetLink: string | undefined;
}) => {
  const safeName = escapeHtml(name);
  const safeMeetLink = meetLink ? escapeHtml(meetLink) : "";
  const { month, day, fullDate, timeRange } = formatDateParts(start, end);
  const calendarLink = getCalendarTemplateLink({ name, start, end, meetLink });
  const locationMarkup = meetLink
    ? `Google Meet <a href="${safeMeetLink}" style="color:#7C6DFF;text-decoration:none;font-weight:700;">(Join meeting)</a>`
    : "Online meeting link will be sent separately";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Booking is Confirmed</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, h1, p, a { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#F7F8FC;font-family:Inter,Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F7F8FC;padding:40px 18px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;background-color:#FFFFFF;border-radius:18px;overflow:hidden;border:1px solid #ECEEF5;box-shadow:0 18px 50px rgba(16,24,40,0.08);">
          <tr>
            <td style="background-color:#FFF8EF;background:linear-gradient(135deg,#FFF8EF 0%,#F6F7FF 54%,#EAF6FF 100%);padding:30px 28px 26px 28px;text-align:center;">
              <img src="cid:novafoundry-logo" width="138" alt="Nova Foundry" style="display:inline-block;border:0;outline:none;text-decoration:none;margin-bottom:22px;" />
              <h1 style="color:#171717;font-size:26px;line-height:34px;margin:0 0 8px 0;font-weight:700;">Your booking is confirmed</h1>
              <p style="color:#5F6677;font-size:15px;line-height:24px;margin:0;">Hi ${safeName}, you're all set for your free strategy call.</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #ECEEF5;border-radius:14px;margin-bottom:22px;">
                <tr>
                  <td style="padding:22px;" valign="middle">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="68" align="center" valign="middle" style="border:1px solid #EFE3C8;border-radius:12px;overflow:hidden;background-color:#FFFBF1;">
                          <div style="background-color:#F3CB7A;color:#171717;font-size:12px;font-weight:700;padding:7px 0;text-transform:uppercase;">${escapeHtml(month)}</div>
                          <div style="color:#171717;font-size:30px;font-weight:800;line-height:42px;padding:5px 0;">${escapeHtml(day)}</div>
                        </td>
                        <td style="padding-left:20px;" valign="middle">
                          <p style="margin:0 0 5px 0;color:#171717;font-weight:700;font-size:16px;line-height:22px;">${escapeHtml(fullDate)}</p>
                          <p style="margin:0 0 9px 0;color:#667085;font-size:14px;line-height:20px;">${escapeHtml(timeRange)}</p>
                          <p style="margin:0;color:#12B76A;font-size:14px;font-weight:700;">&#9679; Confirmed</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#F8F9FC;border-radius:14px;border:1px solid #EEF0F6;margin-bottom:26px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 12px 0;color:#374151;font-size:15px;line-height:22px;"><strong>Service:</strong> Free strategy call</p>
                    <p style="margin:0 0 12px 0;color:#374151;font-size:15px;line-height:22px;"><strong>Provider:</strong> Nova Foundry</p>
                    <p style="margin:0;color:#374151;font-size:15px;line-height:22px;"><strong>Location:</strong> ${locationMarkup}</p>
                  </td>
                </tr>
              </table>

              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:22px;">
                <tr>
                  <td align="center" style="background-color:#F3CB7A;border-radius:12px;box-shadow:0 10px 24px rgba(239,198,119,0.28);">
                    <a href="${escapeHtml(calendarLink)}" target="_blank" style="display:block;padding:15px 24px;color:#171717;text-decoration:none;font-weight:800;font-size:15px;">Add to Google Calendar</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;text-align:center;color:#667085;font-size:13px;line-height:21px;">Need to reschedule or cancel? Reply to this email and we'll help you adjust it.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

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

    if (start.getTime() <= Date.now()) {
      logBookingStep("request rejected: past start time", {
        startTime: start.toISOString(),
      });

      return res.status(400).json({
        error: "Past dates and times cannot be booked",
      });
    }

    stage = "create_calendar_client";
    const calendar = getCalendar();
    const end = new Date(start.getTime() + 30 * 60000);
    const startOfDay = new Date(start);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(start);
    endOfDay.setHours(23, 59, 59, 999);

    stage = "check_calendar_conflicts";
    logBookingStep("checking calendar conflicts", {
      calendarIdPresent: Boolean(process.env.GOOGLE_CALENDAR_ID),
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
    });

    const dayEvents = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
    });

    const dayBookingCount = dayEvents.data.items?.length ?? 0;

    logBookingStep("daily booking limit check complete", {
      dayBookingCount,
      maxBookingsPerDay,
    });

    if (dayBookingCount >= maxBookingsPerDay) {
      logBookingStep("request rejected: date fully booked", {
        date: startOfDay.toISOString(),
        dayBookingCount,
      });

      return res.status(409).json({
        error: "This date is fully booked",
      });
    }

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

    const meetLink = event.data.hangoutLink ?? undefined;

    logBookingStep("calendar event created", {
      eventId: event.data.id,
      hasMeetLink: Boolean(meetLink),
    });

    stage = "send_confirmation_email";
    const hasLogoAttachment = fs.existsSync(logoPath);

    logBookingStep("sending confirmation email", {
      hasGmailUser: Boolean(process.env.GMAIL_USER),
      hasGmailAppPassword: Boolean(process.env.GMAIL_APP_PASSWORD),
      hasLogoAttachment,
      recipientDomain: email.includes("@") ? email.split("@").pop() : undefined,
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your call is confirmed",
      html: buildConfirmationEmail({
        name,
        start,
        end,
        meetLink,
      }),
      attachments: hasLogoAttachment
        ? [
            {
              filename: "novahero.png",
              path: logoPath,
              cid: "novafoundry-logo",
            },
          ]
        : undefined,
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
