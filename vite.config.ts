import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/bylaws/",
  plugins: [react()],
  build: {
    outDir: "dist/bylaws",
    emptyOutDir: true,
    rollupOptions: { input: "bylaws/index.html" }
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts"
  }
});
