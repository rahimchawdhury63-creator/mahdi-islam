import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Two build passes, one source of truth:
 *
 *   vite build             → browser bundle + index.html shell (mode: production)
 *   vite build --mode ssr  → Node bundles of the SSR renderer and the
 *                            machine-readable asset generator (mode: ssr)
 *
 * The pre-render step then calls both Node bundles to write static HTML plus
 * sitemap.xml, robots.txt, llms.txt, llms-full.txt, ai-profile.json, cv.json
 * and humans.txt.
 */
export default defineConfig(({ mode }) => {
  const isSsr = mode === "ssr";

  return {
    plugins: [react()],
    // The SSR pass only needs the source modules; avoid copying public/ twice.
    publicDir: isSsr ? false : "public",
    build: {
      target: isSsr ? "node20" : "es2020",
      outDir: isSsr ? "dist-server" : "dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      assetsInlineLimit: 2048,
      reportCompressedSize: false,
      minify: isSsr ? false : "esbuild",
      rollupOptions: {
        ...(isSsr
          ? {
              input: {
                "entry-server": fileURLToPath(new URL("./src/entry-server.tsx", import.meta.url)),
                "entry-data": fileURLToPath(new URL("./src/entry-data.ts", import.meta.url)),
              },
              external: ["react", "react-dom", "react/jsx-runtime", "react-dom/server"],
              // Both entries are consumed as libraries by the pre-render step:
              // without this, Rollup tree-shakes their exports away.
              preserveEntrySignatures: "strict",
              output: {
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name]-[hash].js",
                format: "esm",
              },
            }
          : {
              output: {
                entryFileNames: "assets/[name].[hash].js",
                chunkFileNames: "assets/[name].[hash].js",
                assetFileNames: "assets/[name].[hash][extname]",
              },
            }),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      strictPort: false,
      // Allow sandbox preview hosts (https://<port>-<id>.e2b.app) and Cloudflare previews.
      allowedHosts: true,
      cors: true,
    },
    preview: {
      host: "0.0.0.0",
      port: 4173,
      strictPort: false,
      allowedHosts: true,
    },
  };
});
