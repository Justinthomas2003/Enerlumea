import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.jsx",
      formats: ["es"],
      fileName: "index",
      cssFileName: "style",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
