import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/users.stores";
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import NavComponent from "@components/shared/NavComponent.vue";
import ScreenLoader from "@components/shared/ScreenLoader.vue";
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const routeTitle = ref(route.meta.title);
const isLoading = ref(false);
const titleTxt = computed(() => `${routeTitle?.value.charAt(0).toLocaleUpperCase()}${routeTitle?.value.substring(1)}`);
watch(() => route.meta.title, (title) => {
    let titleStr = typeof title === "string" ? title : null;
    document.title = titleStr
        ? `${titleStr.charAt(0).toUpperCase() + titleStr.slice(1)} | FinTrack`
        : "FinTrack";
    routeTitle.value = title;
}, { immediate: true });
let removeBeforeGuard;
let removeAfterHook;
let removeErrorHook;
onMounted(() => {
    if (!userStore.isAuthenticated) {
        window.location.href = "/login";
    }
    document.title = ` FinTrack | ${titleTxt.value}`;
    removeBeforeGuard = router.beforeEach((to, from, next) => {
        if (to.fullPath !== from.fullPath) {
            isLoading.value = true;
        }
        next();
    });
    removeAfterHook = router.afterEach(() => {
        isLoading.value = false;
    });
    removeErrorHook = router.onError(() => {
        isLoading.value = false;
    });
});
onUnmounted(() => {
    removeBeforeGuard?.();
    removeAfterHook?.();
    removeErrorHook?.();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vApp | typeof __VLS_components.VApp | typeof __VLS_components['v-app'] | typeof __VLS_components.vApp | typeof __VLS_components.VApp | typeof __VLS_components['v-app']} */
vApp;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "w-100" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "w-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.isLoading) {
    const __VLS_7 = ScreenLoader;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
}
const __VLS_12 = NavComponent;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    title: (__VLS_ctx.titleTxt),
}));
const __VLS_14 = __VLS_13({
    title: (__VLS_ctx.titleTxt),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.vMain | typeof __VLS_components.VMain | typeof __VLS_components['v-main'] | typeof __VLS_components.vMain | typeof __VLS_components.VMain | typeof __VLS_components['v-main']} */
vMain;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const { default: __VLS_22 } = __VLS_20.slots;
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const { default: __VLS_28 } = __VLS_26.slots;
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.routerView | typeof __VLS_components.RouterView | typeof __VLS_components['router-view']} */
routerView;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
// @ts-ignore
[isLoading, titleTxt,];
var __VLS_26;
// @ts-ignore
[];
var __VLS_20;
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.vFooter | typeof __VLS_components.VFooter | typeof __VLS_components['v-footer'] | typeof __VLS_components.vFooter | typeof __VLS_components.VFooter | typeof __VLS_components['v-footer']} */
vFooter;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    app: true,
    height: "60",
    ...{ class: "d-flex justify-center align-center border-t-thin border-accent" },
}));
const __VLS_36 = __VLS_35({
    app: true,
    height: "60",
    ...{ class: "d-flex justify-center align-center border-t-thin border-accent" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-thin']} */ ;
/** @type {__VLS_StyleScopedClasses['border-accent']} */ ;
const { default: __VLS_39 } = __VLS_37.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
(new Date().getFullYear());
// @ts-ignore
[];
var __VLS_37;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
