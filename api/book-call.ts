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

const getString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

function getCalendar() {
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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const body = (req.body ?? {}) as BookingBody;
    const name = getString(body.name);
    const email = getString(body.email);
    const startTime = getString(body.startTime);

    if (!name || !email || !startTime) {
      return res.status(400).json({
        error: "Name, email, and start time are required",
      });
    }

    const start = new Date(startTime);

    if (Number.isNaN(start.getTime())) {
      return res.status(400).json({
        error: "Start time must be a valid date",
      });
    }

    const calendar = getCalendar();
    const end = new Date(start.getTime() + 30 * 60000);

    const existing = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
    });

    if ((existing.data.items?.length ?? 0) > 0) {
      return res.status(409).json({
        error: "This slot is already booked",
      });
    }

    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Call with ${name}`,
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
        attendees: [{ email }],
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

    const meetLink = event.data.hangoutLink;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your call is confirmed",
      html: `
        <h2>Booking confirmed</h2>
        <p><b>Time:</b> ${start.toUTCString()}</p>
        <p><b>Meet link:</b> ${meetLink}</p>
      `,
    });

    return res.json({
      success: true,
      meetLink,
    });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Failed to book call",
    });
  }
}
