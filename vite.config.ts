import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".", // Корень проекта
  publicDir: "./public",
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "src/ts/main.ts"), // Явный путь к входному файлу
    },
  },
  server: {
    host: "0.0.0.0",
    port: 2222,
    open: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/ts"), // Алиас для удобных импортов
    },
  },
});
