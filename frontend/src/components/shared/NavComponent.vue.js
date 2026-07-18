import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";
import Avatar from "@components/user/Avatar.vue";
import MenuDrawerComponent from "@components/shared/MenuDrawerComponent.vue";
const props = defineProps();
const openMenu = ref(false);
const userStore = useUserStore();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = MenuDrawerComponent;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.openMenu),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.openMenu),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.vAppBar | typeof __VLS_components.VAppBar | typeof __VLS_components['v-app-bar'] | typeof __VLS_components.vAppBar | typeof __VLS_components.VAppBar | typeof __VLS_components['v-app-bar']} */
vAppBar;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    height: "100",
    ...{ class: "text-secondary px-2 py-0" },
    elevation: "0",
    align: "start",
}));
const __VLS_7 = __VLS_6({
    height: "100",
    ...{ class: "text-secondary px-2 py-0" },
    elevation: "0",
    align: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0']} */ ;
const { default: __VLS_10 } = __VLS_8.slots;
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.vAppBarNavIcon | typeof __VLS_components.VAppBarNavIcon | typeof __VLS_components['v-app-bar-nav-icon']} */
vAppBarNavIcon;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    ...{ 'onClick': {} },
    ...{ class: "text-h5" },
}));
const __VLS_13 = __VLS_12({
    ...{ 'onClick': {} },
    ...{ class: "text-h5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_16;
const __VLS_17 = {
    /** @type {typeof __VLS_16.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.openMenu = !__VLS_ctx.openMenu);
        // @ts-ignore
        [openMenu, openMenu, openMenu,];
    },
};
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
var __VLS_14;
var __VLS_15;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.vAppBarTitle | typeof __VLS_components.VAppBarTitle | typeof __VLS_components['v-app-bar-title'] | typeof __VLS_components.vAppBarTitle | typeof __VLS_components.VAppBarTitle | typeof __VLS_components['v-app-bar-title']} */
vAppBarTitle;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ class: "text-title-medium text-md-title font-weight-bold text-black text-center flex-grow-1" },
    ...{ style: {} },
}));
const __VLS_20 = __VLS_19({
    ...{ class: "text-title-medium text-md-title font-weight-bold text-black text-center flex-grow-1" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['text-title-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-md-title']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-black']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
const { default: __VLS_23 } = __VLS_21.slots;
(props.title);
// @ts-ignore
[];
var __VLS_21;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
if (__VLS_ctx.userStore.isAuthenticated) {
    const __VLS_24 = Avatar;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
}
else {
    let __VLS_29;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        icon: "mdi-logout",
        variant: "plain",
        color: "accent",
        ...{ class: "text-h6" },
    }));
    const __VLS_31 = __VLS_30({
        icon: "mdi-logout",
        variant: "plain",
        color: "accent",
        ...{ class: "text-h6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    /** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
}
// @ts-ignore
[userStore,];
var __VLS_8;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
