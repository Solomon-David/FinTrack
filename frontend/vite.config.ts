/// <reference types="vitest/config" />
import {fileURLToPath, URL} from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VitePWA({ registerType: "autoUpdate",
      manifest: {
        name: "FinTrack",
        short_name: "FinTrack",
        description: "A personal finance management application.",
        theme_color: "#4CAF50",
        icons: [
          {
            src: "assets/logo_light_small.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "assets/logo_light_large.png",
            sizes: "512x512",
            type: "image/png"
     }]
    },
      
      }
    )
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@comps": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views/", import.meta.url)),
    }
  },
  test: {
    environment: 'jsdom',
  }
})
