import { computed } from "vue";
import { useUserStore } from "@/stores/users.stores";
const props = withDefaults(defineProps(), {
    size: "45",
    border: false,
});
const userStore = useUserStore();
// Scale the icon slightly smaller than the avatar so it fits with padding
const iconSize = computed(() => Number(props.size) * 0.75);
const __VLS_defaults = {
    size: "45",
    border: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
vAvatar;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    size: (__VLS_ctx.size),
    color: "secondary",
    ...{ class: "ma-0" },
    border: (!__VLS_ctx.borderless),
}));
const __VLS_2 = __VLS_1({
    size: (__VLS_ctx.size),
    color: "secondary",
    ...{ class: "ma-0" },
    border: (!__VLS_ctx.borderless),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['ma-0']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
if (__VLS_ctx.userStore.photoData) {
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.vImg | typeof __VLS_components.VImg | typeof __VLS_components['v-img']} */
    vImg;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        src: (__VLS_ctx.userStore.photoData),
    }));
    const __VLS_9 = __VLS_8({
        src: (__VLS_ctx.userStore.photoData),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
}
else {
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        size: (__VLS_ctx.iconSize),
        color: "white",
    }));
    const __VLS_14 = __VLS_13({
        size: (__VLS_ctx.iconSize),
        color: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const { default: __VLS_17 } = __VLS_15.slots;
    // @ts-ignore
    [size, borderless, userStore, userStore, iconSize,];
    var __VLS_15;
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
