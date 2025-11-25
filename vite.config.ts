import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/3.2.3_Kulikova_Olga/",
  build: {
    outDir: "docs",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
});
