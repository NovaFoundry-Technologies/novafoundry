import { Resend } from "resend";

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (statusCode: number) => {
    json: (body: unknown) => void;
  };
};

type ContactBody = {
  name?: unknown;
  email?: unknown;
  companyType?: unknown;
  service?: unknown;
  message?: unknown;
};

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      success: false,
      message: "Email service is not configured",
    });
  }

  const body = (req.body ?? {}) as ContactBody;
  const name = getString(body.name);
  const email = getString(body.email);
  const companyType = getString(body.companyType);
  const service = getString(body.service);
  const message = getString(body.message);

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required",
    });
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
    const toEmail = process.env.CONTACT_TO_EMAIL ?? "contact@novafoundry.org";

    await resend.emails.send({
      from: `NovaFoundry Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #111827;">
          <h2>New Contact Form Message</h2>
          <hr />
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${
            companyType
              ? `<p><strong>Company Type:</strong> ${escapeHtml(companyType)}</p>`
              : ""
          }
          ${service ? `<p><strong>Service:</strong> ${escapeHtml(service)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
}
