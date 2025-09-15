import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Disable ESLint during build
    eslint: {
      // or set to 'warning' if you want to see warnings but not fail the build
      failOnWarning: false,
      failOnError: false,
    },
  },
});
