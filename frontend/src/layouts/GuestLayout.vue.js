import { useRoute } from "vue-router";
import { watch } from "vue";
// get the title meta from the route and set it as the document title
const route = useRoute();
watch(() => route.meta.title, (title) => {
    let titleStr = typeof title === "string" ? title : null;
    document.title = titleStr
        ? `${titleStr.charAt(0).toUpperCase() + titleStr.slice(1)} | FinTrack`
        : "FinTrack";
}, { immediate: true });
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vApp | typeof __VLS_components.VApp | typeof __VLS_components['v-app'] | typeof __VLS_components.vApp | typeof __VLS_components.VApp | typeof __VLS_components['v-app']} */
vApp;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "guest py-5 w-100 bg-secondary" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "guest py-5 w-100 bg-secondary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['guest']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-secondary']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.routerView | typeof __VLS_components.RouterView | typeof __VLS_components['router-view']} */
routerView;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
var __VLS_3;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
