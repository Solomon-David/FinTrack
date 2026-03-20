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
    }
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "mainTheme",
        themes: {
            mainTheme
        }
    },
    display: {
        mobileBreakpoint: "sm"
    }
});

export default vuetify;