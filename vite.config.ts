/** @type {import('vite').UserConfig} */
import path from "path";
import {processAssetFileNames, entryFileNames, chunkFileNames, assetDir} from "./config/assets";

export default {
  build: {
    outDir: 'docs/',
    minify: true,
    assetsDir: assetDir,
    emptyOutDir: true,
    rollupOptions: {
        output: {
            entryFileNames: entryFileNames,
            assetFileNames: processAssetFileNames,
            chunkFileNames: chunkFileNames
        }
    }
  },
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
