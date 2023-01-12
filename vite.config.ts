import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import vitePluginFaviconsInject from "vite-plugin-favicons-inject";
import { NgmiPolyfill } from "vite-plugin-ngmi-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    NgmiPolyfill(),
    vitePluginFaviconsInject("./src/assets/asteroid.svg"),
    react(),
  ],
  define: { global: "window" },
});
