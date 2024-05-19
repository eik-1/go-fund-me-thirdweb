import { defineConfig } from "vite";
import polyfillNode from "rollup-plugin-polyfill-node";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), polyfillNode()],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
    },
  },
  define: {
    global: "globalThis", // Define global as globalThis
  },
});
