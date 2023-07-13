/** @type {import('vite').UserConfig} */
import path from "path";

export default {
  build: {
    outDir: 'docs/',
  },
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
