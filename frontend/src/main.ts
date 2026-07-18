import { createApp } from 'vue';
import { createPinia } from "pinia";
import './style.css';
import App from './App.vue'
import router from "./router";
import { registerSW } from 'virtual:pwa-register';
import {testConnection} from "./utils/axios";

import vuetify from "./plugins/vuetify";

testConnection();

// Registers the service worker and wires up update/offline handling.
// `onNeedRefresh` fires once a new build has been fetched and is sitting in
// the "waiting" state; confirming calls `updateSW(true)`, which tells that
// waiting worker to activate and automatically reloads the page for you.
// `onOfflineReady` fires the first time the app has been fully precached and
// can run without a network connection.
// `onRegisteredSW` gives us the registration so we can poll for updates —
// this matters because it's a single-page app: users may leave a tab open
// for a long time with no full navigations, and browsers only check for SW
// updates on navigation by default, so without this, they'd never see an
// update prompt until they happened to close and reopen the tab.
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    if (window.confirm('A new version of FinTrack is available. Reload now?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('FinTrack is ready to work offline.');
  },
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return;
    // Check for a new service worker every 30 minutes while the tab is open
    setInterval(() => {
      registration.update();
    }, 30 * 60 * 1000);
  },
});

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app');