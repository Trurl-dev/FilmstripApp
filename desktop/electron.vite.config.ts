import { resolve } from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin({ exclude: ["@filmstrip/shared", "@filmstrip/core"] })],
    build: {
      rollupOptions: {
        input: resolve(__dirname, "electron/main.ts")
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin({ exclude: ["@filmstrip/shared", "@filmstrip/core"] })],
    build: {
      rollupOptions: {
        input: resolve(__dirname, "electron/preload.ts")
      }
    }
  },
  renderer: {
    root: ".",
    plugins: [react()],
    build: {
      rollupOptions: {
        input: resolve(__dirname, "index.html")
      }
    }
  }
});
