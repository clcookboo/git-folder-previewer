// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { fileURLToPath } from "node:url";

const browserBufferPath = fileURLToPath(new URL("./node_modules/buffer/index.js", import.meta.url));

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      {
        name: "resolve-browser-buffer",
        enforce: "pre",
        resolveId(source) {
          if (source === "buffer" || source === "node:buffer") {
            return browserBufferPath;
          }
          return null;
        },
      },
    ],
    build: {
      // Rolldown can drop the Buffer export used by Solana's safe-buffer
      // compatibility module during production tree-shaking. The remaining
      // module then crashes at startup while evaluating `Buffer.from`.
      rollupOptions: { treeshake: false },
    },
  },
});
