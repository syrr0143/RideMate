import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://localhost:3000",
  },
});
