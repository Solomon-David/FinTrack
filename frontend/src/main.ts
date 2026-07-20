import { createApp } from 'vue';
import { createPinia } from "pinia";
import './style.css';
import App from './App.vue'
import router from "./router";
import { registerSW } from 'virtual:pwa-register';
import {testConnection} from "./utils/axios";

import vuetify from "./plugins/vuetify";

testConnection();

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    updateSW(true);
  },
  onOfflineReady() {
    console.log('FinTrack is ready to work offline.');
  },
  onRegisteredSW(_swUrl, registration) {
    if (!registration) return;
    setInterval(() => {
      registration.update();
    }, 30 * 60 * 1000);
  },
});

const app = createApp(App);

// TEMPORARY — global error handler to pinpoint the mobile-only crash.
// Logs the component name/file and its current props/data at the moment
// of the error, which is often more diagnostic than the error's own stack
// trace. Remove once the bug is found and fixed.
app.config.errorHandler = (err, instance, info) => {
  console.error('=== Vue Error Handler ===');
  console.error('Error:', err);
  console.error('Component:', instance?.$options?.name || instance?.$options?.__file || instance);
  console.error('Props:', instance?.$props);
  console.error('Info:', info);
  console.error('=========================');
};

app.use(createPinia()).use(router).use(vuetify).mount('#app');