type ApiRequest = { method?: string; body?: unknown };

type ApiResponse = {
  status: (statusCode: number) => { json: (body: unknown) => void };
};

type IntakeResponse = { ok?: boolean; error?: string };

export const maxDuration = 60;

const DEFAULT_INTAKE_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzHeIlFMoYspEVTqH8B2O-exH3bovOHyvkbDuq4M-TgxaLv1FD7km_2fNcnylDaAly9/exec";

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const endpoint = process.env.AUDIT_INTAKE_ENDPOINT ?? DEFAULT_INTAKE_ENDPOINT;

  if (!endpoint) {
    return res.status(503).json({
      success: false,
      message: "The Google Sheet deployment is not configured yet.",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);

  try {
    const initialResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(req.body ?? {}),
      redirect: "manual",
      signal: controller.signal,
    });

    if (initialResponse.status >= 300 && initialResponse.status < 400) {
      const location = initialResponse.headers.get("location");

      if (!location) {
        throw new Error("Apps Script redirect did not include a location");
      }

      const redirectUrl = new URL(location);

      if (
        redirectUrl.protocol !== "https:" ||
        redirectUrl.hostname !== "script.googleusercontent.com"
      ) {
        throw new Error("Apps Script returned an unexpected redirect target");
      }

      const redirectedResponse = await fetch(redirectUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        redirect: "error",
        signal: controller.signal,
      });
      const redirectedBody = await redirectedResponse.text();

      let redirectedResult: IntakeResponse;

      try {
        redirectedResult = JSON.parse(redirectedBody) as IntakeResponse;
      } catch {
        console.error("[audit] Apps Script redirect returned non-JSON", {
          status: redirectedResponse.status,
          contentType: redirectedResponse.headers.get("content-type"),
          bodyPreview: redirectedBody.slice(0, 200),
        });
        return res.status(502).json({
          success: false,
          message: "Google Sheets returned an invalid response. Please try again.",
        });
      }

      if (!redirectedResponse.ok || redirectedResult.ok !== true) {
        console.error("[audit] Apps Script rejected submission", {
          status: redirectedResponse.status,
          error: redirectedResult.error,
        });
        return res.status(502).json({
          success: false,
          message:
            redirectedResult.error ||
            "Google Sheets did not accept the request. Please try again.",
        });
      }

      return res.status(200).json({ success: true });
    }

    const responseBody = await initialResponse.text();
    let result: IntakeResponse;

    try {
      result = JSON.parse(responseBody) as IntakeResponse;
    } catch {
      console.error("[audit] Apps Script returned a non-JSON response", {
        status: initialResponse.status,
        contentType: initialResponse.headers.get("content-type"),
        bodyPreview: responseBody.slice(0, 200),
      });
      return res.status(502).json({
        success: false,
        message: "Google Sheets returned an invalid response. Please try again.",
      });
    }

    if (!initialResponse.ok || result.ok !== true) {
      console.error("[audit] Apps Script rejected submission", {
        status: initialResponse.status,
        error: result.error,
      });
      return res.status(502).json({
        success: false,
        message:
          result.error || "Google Sheets did not accept the request. Please try again.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[audit] Apps Script request failed", error);
    return res.status(502).json({
      success: false,
      message:
        error instanceof Error && error.name === "AbortError"
          ? "Google Sheets took too long to respond. Please try again."
          : "Could not connect to Google Sheets. Please try again.",
    });
  } finally {
    clearTimeout(timeout);
  }
}
