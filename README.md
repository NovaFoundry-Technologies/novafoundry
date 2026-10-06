# NovaFoundry Website

Production website for NovaFoundry, built with React, TypeScript, Vite, and Tailwind CSS. The app presents the agency landing page, portfolio sections, testimonials, contact flow, and a strategy-call booking experience backed by serverless API routes.

## Tech Stack

- React 19 with TypeScript
- Vite 8
- Tailwind CSS 4 through `@tailwindcss/vite`
- Framer Motion, Motion, GSAP, and Lenis for animation and scrolling
- `react-helmet-async` for SEO metadata
- Vercel-style serverless API routes in `api/`
- Google Calendar API for booking availability and event creation
- Google Sheets API for free audit lead capture
- Gmail SMTP through Nodemailer for booking confirmations
- Resend for contact form email delivery

## Features

- Responsive NovaFoundry marketing site
- SEO defaults with canonical URL, Open Graph, Twitter card, robots.txt, and sitemap.xml
- Lazy-loaded page sections for lighter initial rendering
- Smooth scrolling navigation
- Portfolio, services, vision, insights, testimonials, and contact sections
- Lighthouse-powered free audit form that records the lead, tests the public website, and displays a structured report
- Contact form API with server-side validation and HTML email escaping
- Booking widget with 30-minute slots, 14-day availability window, daily booking cap, Google Calendar conflict checks, Google Meet creation, and confirmation emails

## Project Structure

```text
api/
  availability.ts      Google Calendar availability endpoint
  audit.ts             Free audit lead capture, Sheets append, notification email
  book-call.ts         Booking endpoint, calendar event creation, email confirmation
  contact.ts           Contact form email endpoint

public/
  robots.txt
  sitemap.xml

google-apps-script/
  audit-intake.gs       Audit lead intake web app, pasted into Apps Script

src/
  assets/              Images, videos, and visual assets
  components/          Shared layout, UI, animation, booking, and form components
  data/                Content collections and the shared audit field spec
  lib/                 Shared browser helpers
  sections/            Landing page sections
  App.tsx              Page composition
  Seo.tsx              SEO metadata component
  main.tsx             React entry point
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Environment Variables

The frontend can run without API credentials, but contact and booking endpoints require server-side environment variables.

### Contact Form

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

- `RESEND_API_KEY` is required for `/api/contact`.
- `RESEND_FROM_EMAIL` defaults to `onboarding@resend.dev` if omitted.
- `CONTACT_TO_EMAIL` defaults to `contact@novafoundry.org` if omitted.

### Booking and Availability

```env
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
GMAIL_USER=
GMAIL_APP_PASSWORD=
```

- `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `GOOGLE_CALENDAR_ID` are required by `/api/availability` and `/api/book-call`.
- Share the target Google Calendar with the service account email.
- Give the service account permission to make changes to events if bookings should create calendar events.
- Store `GOOGLE_PRIVATE_KEY` with escaped newlines, for example `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`.
- `GMAIL_USER` and `GMAIL_APP_PASSWORD` are required by `/api/book-call` to send confirmation emails.

### Free Audit

```env
PAGESPEED_API_KEY=
AUDIT_INTAKE_ENDPOINT=
```

`PAGESPEED_API_KEY` is optional and remains server-side. Restrict it to the PageSpeed Insights API in Google Cloud Console. Do not add a `VITE_` prefix, because Vite exposes prefixed variables to browser JavaScript.

The browser posts lead details to `/api/audit`, which forwards them to the Google Apps Script web app. `/api/pagespeed` calls Google PageSpeed Insights server-side so its API key remains private. Setup for lead capture is documented at the top of `google-apps-script/audit-intake.gs`. `AUDIT_INTAKE_ENDPOINT` can override the default deployed `/exec` URL on the server without rebuilding the frontend.

The Apps Script rejects repeat submissions from the same email and phone within 30 minutes.

For a new Google account, leave `SPREADSHEET_ID` empty. On its first request, Apps Script creates a spreadsheet named **NovaFoundry Audit Requests** and stores its ID in the `AUDIT_SPREADSHEET_ID` Script Property. Deploy the project as a web app with **Execute as: Me** and **Who has access: Anyone**.

## API Routes

### `GET /api/availability?date=YYYY-MM-DD`

Returns busy slots for a calendar date:

```json
{
  "busySlots": [
    {
      "start": "2026-06-05T09:00:00.000Z",
      "end": "2026-06-05T09:30:00.000Z"
    }
  ]
}
```

### `POST /api/book-call`

Books a 30-minute strategy call.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "startTime": "2026-06-05T09:00:00.000Z"
}
```

Successful response:

```json
{
  "success": true,
  "meetLink": "https://meet.google.com/..."
}
```

### `POST /api/contact`

Sends a contact form message.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "companyType": "Startup",
  "service": "Web design",
  "message": "I want to build a product."
}
```

Successful response:

```json
{
  "success": true
}
```

### `POST /api/audit`

Forwards a browser submission to Apps Script and verifies the JSON result returned through Google's post-execution redirect.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "website": "janesstore.com",
  "industry": "E-commerce / retail",
  "timeline": "1-3 months",
  "goals": ["More customers", "Higher conversion rate"],
  "notes": "Checkout drops off on mobile."
}
```

- Name, email, and phone are required by Apps Script.
- The Apps Script writes the Sheet row and responds immediately; email notifications are currently disabled to keep submissions within the serverless timeout.

## Deployment

The project is configured for Vercel-style deployment:

1. Push changes to the deployment branch.
2. Configure all required environment variables in the hosting dashboard.
3. Deploy with the default build command:

```bash
npm run build
```

The production output is generated in `dist/`.

## Notes

- Booking slots are generated from 9:00 AM to 5:00 PM in 30-minute intervals.
- The booking UI checks the next 14 days.
- A date is treated as full after 5 calendar events for that day.
- The booking endpoint attempts to create a Google Meet link. If the calendar does not support Meet creation, it retries the calendar event without Meet and returns a warning.
- SEO URLs currently target `https://novafoundry.org`; update `SITE_URL`, `public/robots.txt`, and `public/sitemap.xml` together if the production domain changes.
