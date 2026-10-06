type ApiRequest = {
  method?: string;
  query?: { url?: string | string[] };
};

type ApiResponse = {
  status: (statusCode: number) => {
    json: (body: unknown) => void;
  };
};

export const maxDuration = 60;

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: { message: "Method not allowed" } });
  }

  const rawUrl = Array.isArray(req.query?.url) ? req.query.url[0] : req.query?.url;

  if (!rawUrl) {
    return res.status(400).json({ error: { message: "Website URL is required" } });
  }

  let target: URL;

  try {
    target = new URL(rawUrl);
    if (!['http:', 'https:'].includes(target.protocol)) throw new Error();
  } catch {
    return res.status(400).json({
      error: { message: "Please enter a valid public website address." },
    });
  }

  const endpoint = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  );
  endpoint.searchParams.set("url", target.toString());
  endpoint.searchParams.set("strategy", "mobile");
  ["performance", "accessibility", "best-practices", "seo"].forEach(
    (category) => endpoint.searchParams.append("category", category),
  );

  if (process.env.PAGESPEED_API_KEY) {
    endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  }

  try {
    const response = await fetch(endpoint);
    const data = (await response.json()) as unknown;
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("[pagespeed] request failed", error);
    return res.status(502).json({
      error: { message: "PageSpeed could not analyze this website right now." },
    });
  }
}
