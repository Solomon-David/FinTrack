// For setting up Vuetify
import "vuetify/styles/main.css";
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

//material icons
import "@mdi/font/css/materialdesignicons.css";

const mainTheme: ThemeDefinition = {
    dark: false,
    colors: {
        primary: "#EAB000",
        "primary-light": "#EDC458",
        accent: "#141671",
        secondary: "#0e2270",
        "secondary-translucent": "#3E5CD4AA",
        "secondary-light": "#47A2F5",
        light: "#FAFAF0",
        "grey-blue": "#d8d9db",
        dark: "#1E1E2A",
    }
}

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        primary: "#EAB000",
        "primary-light": "#EDC458",
        accent: "#47A2F5",
        secondary: "#3E5CD4",
        "secondary-translucent": "#3E5CD4AA",
        "secondary-light": "#47A2F5",
        light: "#1E1E2A",
        background: "#121218",
        surface: "#1A1A24",
        "grey-blue": "#3A3D45",
        dark: "#FAFAF0",
    }
}

// Read any previously saved theme choice before the app renders, so the
// correct theme applies immediately on load instead of flashing light
// then switching to dark. The definitive source of truth once logged in
// is the user's `preferredTheme` field (synced in UserLayout.vue), this
// is just the best guess available pre-login / pre-hydration.
const savedTheme =
    typeof localStorage !== "undefined" ? localStorage.getItem("fintrack-theme") : null;
const initialTheme = savedTheme === "darkTheme" ? "darkTheme" : "mainTheme";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: initialTheme,
        themes: {
            mainTheme,
            darkTheme,
        }
    },
    display: {
        mobileBreakpoint: "sm"
    }
});

export default vuetify;