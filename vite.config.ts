/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
    css: true,
    testTimeout: 5000,
    reporters: ['verbose']
  },
});
