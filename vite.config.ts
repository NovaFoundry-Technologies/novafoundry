import { defineConfig, loadEnv, type Plugin, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import auditHandler from "./api/audit";
import pageSpeedHandler from "./api/pagespeed";

const localAuditApi = (): Plugin => ({
  name: "local-audit-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/api/audit", (req, res) => {
      const chunks: Buffer[] = [];

      req.on("data", (chunk: Buffer) => chunks.push(chunk));
      req.on("end", async () => {
        let body: unknown;

        try {
          const rawBody = Buffer.concat(chunks).toString("utf8");
          body = rawBody ? JSON.parse(rawBody) : {};
        } catch {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, message: "Invalid JSON body" }));
          return;
        }

        await auditHandler(
          { method: req.method, body },
          {
            status(statusCode) {
              res.statusCode = statusCode;
              return {
                json(payload) {
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(payload));
                },
              };
            },
          },
        );
      });
    });
  },
});

const localPageSpeedApi = (): Plugin => ({
  name: "local-pagespeed-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/api/pagespeed", async (req, res) => {
      const requestUrl = new URL(req.url ?? "", "http://localhost");

      await pageSpeedHandler(
        {
          method: req.method,
          query: { url: requestUrl.searchParams.get("url") ?? undefined },
        },
        {
          status(statusCode) {
            res.statusCode = statusCode;
            return {
              json(payload) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(payload));
              },
            };
          },
        },
      );
    });
  },
});

export default defineConfig(({ mode }) => {
  const shouldAnalyze = mode === "analyze";
  const serverEnv = loadEnv(mode, process.cwd(), "");

  if (serverEnv.PAGESPEED_API_KEY) {
    process.env.PAGESPEED_API_KEY = serverEnv.PAGESPEED_API_KEY;
  }

  return {
    plugins: [
      localAuditApi(),
      localPageSpeedApi(),
      react(),
      tailwindcss(),
      ViteImageOptimizer({
        exclude: /icons\.svg$/i,
        includePublic: true,
        logStats: true,
        cache: false,
        png: {
          compressionLevel: 9,
          adaptiveFiltering: true,
        },
        jpeg: {
          quality: 82,
          mozjpeg: true,
        },
        jpg: {
          quality: 82,
          mozjpeg: true,
        },
        webp: {
          quality: 82,
        },
        avif: {
          quality: 68,
        },
        svg: {
          multipass: true,
          plugins: ["preset-default", "prefixIds"],
        },
      }),
      shouldAnalyze &&
        (visualizer({
          filename: "dist/bundle-stats.html",
          template: "treemap",
          gzipSize: true,
          brotliSize: true,
          open: false,
        }) as PluginOption),
    ],
  };
});
