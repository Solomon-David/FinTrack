import { ref } from "vue";
import { useUserStore } from "../../stores/users.stores";
import { useRouter } from "vue-router";
import UserPhoto from "./UserPhoto.vue";
import axiosInstance from "@/utils/axios";
const userStore = useUserStore();
const router = useRouter();
const menu = ref(false);
async function handleLogout() {
    try {
        await axiosInstance.post("/users/logout");
    }
    catch (err) {
        console.error("Logout error:", err);
    }
    finally {
        // Always clear local state regardless of backend response
        userStore.logout();
        router.push({ name: "login" });
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex flex-column gap-3 justify-end" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.menu = !__VLS_ctx.menu);
            // @ts-ignore
            [menu, menu,];
        } },
    ...{ class: "d-flex align-center" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
const __VLS_0 = UserPhoto;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    color: "grey",
    ...{ class: "ml-n1" },
}));
const __VLS_7 = __VLS_6({
    color: "grey",
    ...{ class: "ml-n1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['ml-n1']} */ ;
const { default: __VLS_10 } = __VLS_8.slots;
// @ts-ignore
[];
var __VLS_8;
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer'] | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
vMenu;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16({
    modelValue: (__VLS_ctx.menu),
    location: "bottom start",
    closeOnContentClick: (true),
}));
const __VLS_18 = __VLS_17({
    modelValue: (__VLS_ctx.menu),
    location: "bottom start",
    closeOnContentClick: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_21 } = __VLS_19.slots;
{
    const { activator: __VLS_22 } = __VLS_19.slots;
    const [{ props: menuProps }] = __VLS_vSlot(__VLS_22);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...(menuProps),
        ...{ class: "text-caption font-weight-bold text-left" },
        ...{ style: {} },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.userStore.user?.nickname?.replaceAll(' ', '<br>')) }, null, null);
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-left']} */ ;
    // @ts-ignore
    [menu, userStore,];
}
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    rounded: "lg",
    elevation: "3",
    minWidth: "180",
    ...{ class: "pa-1" },
}));
const __VLS_25 = __VLS_24({
    rounded: "lg",
    elevation: "3",
    minWidth: "180",
    ...{ class: "pa-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
/** @type {__VLS_StyleScopedClasses['pa-1']} */ ;
const { default: __VLS_28 } = __VLS_26.slots;
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    prependIcon: "mdi-account-outline",
    title: "Edit Profile",
    rounded: "lg",
    color: "secondary",
    to: ({ name: 'profile' }),
}));
const __VLS_31 = __VLS_30({
    prependIcon: "mdi-account-outline",
    title: "Edit Profile",
    rounded: "lg",
    color: "secondary",
    to: ({ name: 'profile' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_34;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
    ...{ 'onClick': {} },
    prependIcon: "mdi-logout",
    title: "Logout",
    rounded: "lg",
    baseColor: "error",
}));
const __VLS_36 = __VLS_35({
    ...{ 'onClick': {} },
    prependIcon: "mdi-logout",
    title: "Logout",
    rounded: "lg",
    baseColor: "error",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_39;
const __VLS_40 = {
    /** @type {typeof __VLS_39.click} */
    onClick: (__VLS_ctx.handleLogout),
};
var __VLS_37;
var __VLS_38;
// @ts-ignore
[handleLogout,];
var __VLS_26;
// @ts-ignore
[];
var __VLS_19;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
