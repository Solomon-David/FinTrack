import { createApp } from 'vue';
import { createPinia } from "pinia";
import './style.css';
import App from './App.vue'
import router from "./router";
import { registerSW } from 'virtual:pwa-register';
import {testConnection} from "./utils/axios";

import vuetify from "./plugins/vuetify";

testConnection();

registerSW({immediate: true});

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app');
