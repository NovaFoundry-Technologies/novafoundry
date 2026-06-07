import type { Metric } from "web-vitals";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals/attribution";

const endpoint = import.meta.env.VITE_WEB_VITALS_ENDPOINT as string | undefined;

const sendMetric = (metric: Metric) => {
  const payload = JSON.stringify({
    id: metric.id,
    name: metric.name,
    rating: metric.rating,
    value: metric.value,
    delta: metric.delta,
    navigationType: metric.navigationType,
    attribution: "attribution" in metric ? metric.attribution : undefined,
  });

  if (endpoint) {
    const body = new Blob([payload], { type: "application/json" });

    if (navigator.sendBeacon?.(endpoint, body)) return;

    void fetch(endpoint, {
      body: payload,
      keepalive: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return;
  }

  if (import.meta.env.DEV) {
    console.info("[web-vitals]", JSON.parse(payload));
  }
};

export const reportWebVitals = () => {
  onCLS(sendMetric);
  onFCP(sendMetric);
  onINP(sendMetric);
  onLCP(sendMetric);
  onTTFB(sendMetric);
};
