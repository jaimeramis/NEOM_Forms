import { defineConfig } from "vite";
import deploycp from "./deploycp";

export default defineConfig({
  plugins: [deploycp()],
  build: {
    rollupOptions: {
      input: "null.js",
    },
    write: false,
  },
});
