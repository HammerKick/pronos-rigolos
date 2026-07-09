import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    proxy: {
      "/api/football": {
        target: "https://api.football-data.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/football/, "/v4"),
      },
    },
  },
});