import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { fileURLToPath } from "url";
import svgr from "vite-plugin-svgr";

// Using import.meta.url to construct __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: { overrides: { removeViewBox: false } },
            },
            {
              name: "inlineStyles",
              params: {
                onlyMatchedOnce: false,
              },
            },
            {
              name: "prefixIds",
              params: {
                prefixIds: true,
              },
            },
          ],
        },
      },
    }),
    react(),
  ],
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      "@global": path.resolve(__dirname, "src/global"),
      "@common": path.resolve(__dirname, "src/_common"),
      "@public": path.resolve(__dirname, "public"),
      "@assets": path.resolve(__dirname, "src/assets"),
      // "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs", // Adjust to fix chunck problem with tabler icons https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
    },
  },
  build: {
    minify: true,
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB as base64
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router"],
          mantine: [
            "@mantine/core",
            "@mantine/hooks",
            "@mantine/notifications",
          ],
        },
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          // Group assets by type for better caching
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
});
