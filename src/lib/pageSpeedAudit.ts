import type { AuditReport } from "../components/forms/AuditReportModal";

type LighthouseAudit = {
  score?: number | null;
  scoreDisplayMode?: string;
  title?: string;
  description?: string;
  displayValue?: string;
  numericValue?: number;
  details?: {
    overallSavingsMs?: number;
    overallSavingsBytes?: number;
  };
};

type PageSpeedResponse = {
  id?: string;
  lighthouseResult?: {
    finalUrl?: string;
    runtimeError?: { message?: string };
    categories?: Record<string, { score?: number | null }>;
    audits?: Record<string, LighthouseAudit>;
  };
  error?: { message?: string };
};

const toScore = (value: number | null | undefined) =>
  Math.max(0, Math.min(100, Math.round((value ?? 0) * 100)));

const findingPriority = (audit: LighthouseAudit) => {
  const timeSavings = audit.details?.overallSavingsMs ?? 0;
  const byteSavings = (audit.details?.overallSavingsBytes ?? 0) / 1000;
  const failedScore = 1 - (audit.score ?? 1);
  return timeSavings + byteSavings + failedScore * 100;
};

const formatFindingTitle = (audit: LighthouseAudit) => {
  const detail = audit.displayValue ? ` — ${audit.displayValue}` : "";
  return `${audit.title ?? "Improve this audit"}${detail}`.slice(0, 140);
};

const formatFindingDescription = (audit: LighthouseAudit) =>
  (audit.description ?? "Addressing this issue will improve the visitor experience.")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 260);

export const generatePageSpeedAudit = async (website: string): Promise<AuditReport> => {
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(website)
    ? website
    : `https://${website}`;
  let target: URL;

  try {
    target = new URL(candidate);
    if (!["http:", "https:"].includes(target.protocol)) throw new Error();
  } catch {
    throw new Error("Please enter a valid public website address.");
  }

  const endpoint = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  );
  endpoint.searchParams.set("url", target.toString());
  endpoint.searchParams.set("strategy", "mobile");
  ["performance", "accessibility", "best-practices", "seo"].forEach(
    (category) => endpoint.searchParams.append("category", category),
  );

  const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY as string | undefined;
  if (apiKey) endpoint.searchParams.set("key", apiKey);

  const response = await fetch(endpoint);
  const data = (await response.json()) as PageSpeedResponse;

  if (!response.ok || data.error) {
    throw new Error(
      data.error?.message || "PageSpeed could not analyze this website right now.",
    );
  }

  const lighthouse = data.lighthouseResult;
  if (!lighthouse || lighthouse.runtimeError) {
    throw new Error(
      lighthouse?.runtimeError?.message || "Lighthouse could not load this website.",
    );
  }

  const categories = lighthouse.categories ?? {};
  const performance = toScore(categories.performance?.score);
  const accessibility = toScore(categories.accessibility?.score);
  const bestPractices = toScore(categories["best-practices"]?.score);
  const seo = toScore(categories.seo?.score);
  const speed = toScore(lighthouse.audits?.["speed-index"]?.score);
  const firstImpression = Math.round((accessibility + bestPractices + seo) / 3);
  const overallScore = Math.round(
    (performance + accessibility + bestPractices + seo) / 4,
  );

  const ignoredModes = new Set(["notApplicable", "manual", "informative"]);
  const findings = Object.values(lighthouse.audits ?? {})
    .filter(
      (audit) =>
        typeof audit.score === "number" &&
        audit.score < 0.9 &&
        !ignoredModes.has(audit.scoreDisplayMode ?? "") &&
        Boolean(audit.title),
    )
    .sort((a, b) => findingPriority(b) - findingPriority(a))
    .slice(0, 3)
    .map((audit) => ({
      title: formatFindingTitle(audit),
      description: formatFindingDescription(audit),
    }));

  while (findings.length < 3) {
    findings.push([
      {
        title: "Review the main call to action",
        description: "Make the primary next step clear and visible before visitors need to scroll.",
      },
      {
        title: "Check key pages on mobile screens",
        description: "Test navigation, text, forms, and tap targets across common mobile screen sizes.",
      },
      {
        title: "Keep monitoring performance",
        description: "Repeat the mobile Lighthouse test whenever significant content or code changes ship.",
      },
    ][findings.length]);
  }

  const finalUrl = lighthouse.finalUrl || data.id || target.toString();
  const siteName = new URL(finalUrl).hostname.replace(/^www\./, "");
  const verdict =
    overallScore >= 90
      ? "excellent"
      : overallScore >= 70
        ? "good"
        : overallScore >= 50
          ? "needs work"
          : "poor";

  return {
    siteName,
    overallScore,
    verdict,
    speed,
    mobile: performance,
    firstImpression,
    findings,
    summary:
      "This report uses a live mobile Lighthouse test covering performance, accessibility, best practices, and SEO.",
  };
};
