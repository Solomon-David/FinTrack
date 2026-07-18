/// <reference types="vitest/config" />
import {fileURLToPath, URL} from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      // main.ts registers the service worker manually via `virtual:pwa-register`,
      // so injectRegister is turned off to avoid double-registering it.
      injectRegister: false,
      // Keep the SW OFF during plain `npm run dev` so local changes always
      // show immediately without any caching in the loop. Flip this to true
      // only when you specifically need to test install/offline behavior
      // locally — otherwise every reload risks serving a stale cached build.
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        // Falls back to the app shell for any unmatched navigation request,
        // so deep links (e.g. /bills, /plans) still load while offline.
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        // IMPORTANT: skipWaiting/clientsClaim are intentionally left at their
        // default (false) here. Turning them on makes a new service worker
        // activate immediately and silently — which skips the "waiting"
        // state that onNeedRefresh (in main.ts) depends on to prompt the
        // user to reload. With them off, updates are detected properly and
        // updateSW(true) (called after the user confirms) is what tells the
        // waiting worker to skip waiting and take over.
        runtimeCaching: [
          {
            // Network-first for API calls — always try for fresh data first,
            // but fall back to the last successful response when offline.
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: {
              cacheName: "fintrack-api-cache",
              networkTimeoutSeconds: 8,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache-first for uploaded/profile photos served from Cloudinary,
            // since they rarely change once created.
            urlPattern: ({ url }) => url.hostname.includes("res.cloudinary.com"),
            handler: "CacheFirst",
            options: {
              cacheName: "fintrack-image-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      manifest: {
        name: "FinTrack",
        short_name: "FinTrack",
        description: "A personal finance management application.",
        theme_color: "#EAB000",
        background_color: "#141671",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "assets/logo_light_small.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "assets/logo_light_large.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "assets/logo_light_large.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views/", import.meta.url)),
      "@stores": fileURLToPath(new URL("./src/stores/", import.meta.url)),
    }
  },
  test: {
    environment: 'jsdom',
  }
})