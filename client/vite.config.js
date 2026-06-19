import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr({ exportAsDefault: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "three-examples": path.resolve(__dirname, "node_modules/three/examples/jsm"),
    },
  },
  server: {
    host: true,
    port: 5173,
    open: false,
    watch: {
      ignored: ["**/meshoptimizer/**", "**/node_modules/**"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/briefing": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
