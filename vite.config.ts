import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ mode }) => {
  const shouldAnalyze = mode === "analyze";

  return {
    plugins: [
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
