import { computed } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useRouter } from "vue-router";
import Logo from "@/assets/logo_dark.png";
import axiosInstance from "@/utils/axios";
import { useInstallPrompt } from "@/composables/useInstallPrompt";
const props = defineProps();
const emit = defineEmits();
const drawerModel = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});
const userStore = useUserStore();
const router = useRouter();
const { canInstall, install } = useInstallPrompt();
async function handleLogout() {
    try {
        await axiosInstance.post("/users/logout");
    }
    catch (err) {
        console.error("Logout error:", err);
    }
    finally {
        userStore.logout();
        router.push({ name: "login" });
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['v-list-item--active']} */ ;
/** @type {__VLS_StyleScopedClasses['v-list-item__prepend']} */ ;
/** @type {__VLS_StyleScopedClasses['v-icon']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vNavigationDrawer | typeof __VLS_components.VNavigationDrawer | typeof __VLS_components['v-navigation-drawer'] | typeof __VLS_components.vNavigationDrawer | typeof __VLS_components.VNavigationDrawer | typeof __VLS_components['v-navigation-drawer']} */
vNavigationDrawer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.drawerModel),
    width: "300",
    temporary: true,
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.drawerModel),
    width: "300",
    temporary: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center ga-3 px-4 py-10" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-10']} */ ;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
vAvatar;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    size: "60",
    rounded: "lg",
}));
const __VLS_9 = __VLS_8({
    size: "60",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.vImg | typeof __VLS_components.VImg | typeof __VLS_components['v-img']} */
vImg;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    src: (__VLS_ctx.Logo),
    alt: "FinTrack Logo",
}));
const __VLS_15 = __VLS_14({
    src: (__VLS_ctx.Logo),
    alt: "FinTrack Logo",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
// @ts-ignore
[drawerModel, Logo,];
var __VLS_10;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-weight-black text-h6 text-secondary" },
});
/** @type {__VLS_StyleScopedClasses['font-weight-black']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({}));
const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    ...{ 'onClick': {} },
    icon: "mdi-arrow-left",
    variant: "text",
    color: "secondary",
    baseColor: "white",
    size: "small",
}));
const __VLS_25 = __VLS_24({
    ...{ 'onClick': {} },
    icon: "mdi-arrow-left",
    variant: "text",
    color: "secondary",
    baseColor: "white",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
let __VLS_28;
const __VLS_29 = {
    /** @type {typeof __VLS_28.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.drawerModel = false);
        // @ts-ignore
        [drawerModel,];
    },
};
var __VLS_26;
var __VLS_27;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    nav: true,
    density: "compact",
    ...{ class: "px-2" },
    color: "secondary",
}));
const __VLS_32 = __VLS_31({
    nav: true,
    density: "compact",
    ...{ class: "px-2" },
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    prependIcon: "mdi-home-outline",
    title: "Home",
    rounded: "lg",
    to: ({ name: 'dashboard' }),
}));
const __VLS_38 = __VLS_37({
    prependIcon: "mdi-home-outline",
    title: "Home",
    rounded: "lg",
    to: ({ name: 'dashboard' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.vDivider | typeof __VLS_components.VDivider | typeof __VLS_components['v-divider']} */
vDivider;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    ...{ class: "my-2" },
}));
const __VLS_43 = __VLS_42({
    ...{ class: "my-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader'] | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader']} */
vListSubheader;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    ...{ class: "text-caption font-weight-medium mt-2" },
}));
const __VLS_48 = __VLS_47({
    ...{ class: "text-caption font-weight-medium mt-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
const { default: __VLS_51 } = __VLS_49.slots;
// @ts-ignore
[];
var __VLS_49;
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    prependIcon: "mdi-arrow-up",
    title: "Expenses",
    value: "expenses",
    rounded: "lg",
    to: ({ name: 'expenses' }),
}));
const __VLS_54 = __VLS_53({
    prependIcon: "mdi-arrow-up",
    title: "Expenses",
    value: "expenses",
    rounded: "lg",
    to: ({ name: 'expenses' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
    prependIcon: "mdi-arrow-down",
    title: "Income",
    rounded: "lg",
    to: ({ name: 'income' }),
}));
const __VLS_59 = __VLS_58({
    prependIcon: "mdi-arrow-down",
    title: "Income",
    rounded: "lg",
    to: ({ name: 'income' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    prependIcon: "mdi-cellphone",
    title: "RC-Data",
    value: "rc-data",
    rounded: "lg",
    to: ({ name: 'rc-data' }),
}));
const __VLS_64 = __VLS_63({
    prependIcon: "mdi-cellphone",
    title: "RC-Data",
    value: "rc-data",
    rounded: "lg",
    to: ({ name: 'rc-data' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
let __VLS_67;
/** @ts-ignore @type { | typeof __VLS_components.vDivider | typeof __VLS_components.VDivider | typeof __VLS_components['v-divider']} */
vDivider;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
    ...{ class: "my-2" },
}));
const __VLS_69 = __VLS_68({
    ...{ class: "my-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader'] | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader']} */
vListSubheader;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    ...{ class: "text-caption font-weight-medium" },
}));
const __VLS_74 = __VLS_73({
    ...{ class: "text-caption font-weight-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
const { default: __VLS_77 } = __VLS_75.slots;
// @ts-ignore
[];
var __VLS_75;
let __VLS_78;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    prependIcon: "mdi-trending-up",
    title: "Summaries",
    rounded: "lg",
    to: ({ name: 'summaries' }),
}));
const __VLS_80 = __VLS_79({
    prependIcon: "mdi-trending-up",
    title: "Summaries",
    rounded: "lg",
    to: ({ name: 'summaries' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
let __VLS_83;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    prependIcon: "mdi-calendar-month-outline",
    title: "Bills",
    value: "bills",
    rounded: "lg",
    to: ({ name: 'bills' }),
}));
const __VLS_85 = __VLS_84({
    prependIcon: "mdi-calendar-month-outline",
    title: "Bills",
    value: "bills",
    rounded: "lg",
    to: ({ name: 'bills' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
let __VLS_88;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
    prependIcon: "mdi-bag-checked",
    title: "Plans",
    rounded: "lg",
    to: ({ name: 'plans' }),
}));
const __VLS_90 = __VLS_89({
    prependIcon: "mdi-bag-checked",
    title: "Plans",
    rounded: "lg",
    to: ({ name: 'plans' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.vDivider | typeof __VLS_components.VDivider | typeof __VLS_components['v-divider']} */
vDivider;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    ...{ class: "my-2" },
}));
const __VLS_95 = __VLS_94({
    ...{ class: "my-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
let __VLS_98;
/** @ts-ignore @type { | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader'] | typeof __VLS_components.vListSubheader | typeof __VLS_components.VListSubheader | typeof __VLS_components['v-list-subheader']} */
vListSubheader;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
    ...{ class: "text-caption font-weight-medium" },
}));
const __VLS_100 = __VLS_99({
    ...{ class: "text-caption font-weight-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
const { default: __VLS_103 } = __VLS_101.slots;
// @ts-ignore
[];
var __VLS_101;
let __VLS_104;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
    prependIcon: "mdi-account-circle-outline",
    title: "Profile",
    rounded: "lg",
    to: ({ name: 'profile' }),
}));
const __VLS_106 = __VLS_105({
    prependIcon: "mdi-account-circle-outline",
    title: "Profile",
    rounded: "lg",
    to: ({ name: 'profile' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
let __VLS_109;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent1(__VLS_109, new __VLS_109({
    prependIcon: "mdi-cog-outline",
    title: "Preferences",
    rounded: "lg",
    to: ({ name: 'preferences' }),
}));
const __VLS_111 = __VLS_110({
    prependIcon: "mdi-cog-outline",
    title: "Preferences",
    rounded: "lg",
    to: ({ name: 'preferences' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_110));
if (__VLS_ctx.canInstall) {
    let __VLS_114;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
        ...{ 'onClick': {} },
        prependIcon: "mdi-download-outline",
        title: "Install App",
        rounded: "lg",
    }));
    const __VLS_116 = __VLS_115({
        ...{ 'onClick': {} },
        prependIcon: "mdi-download-outline",
        title: "Install App",
        rounded: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    let __VLS_119;
    const __VLS_120 = {
        /** @type {typeof __VLS_119.click} */
        onClick: (__VLS_ctx.install),
    };
    var __VLS_117;
    var __VLS_118;
}
let __VLS_121;
/** @ts-ignore @type { | typeof __VLS_components.vDivider | typeof __VLS_components.VDivider | typeof __VLS_components['v-divider']} */
vDivider;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent1(__VLS_121, new __VLS_121({
    ...{ class: "my-2" },
}));
const __VLS_123 = __VLS_122({
    ...{ class: "my-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_122));
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
let __VLS_126;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
    ...{ 'onClick': {} },
    prependIcon: "mdi-logout",
    title: "Logout",
    rounded: "lg",
}));
const __VLS_128 = __VLS_127({
    ...{ 'onClick': {} },
    prependIcon: "mdi-logout",
    title: "Logout",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
let __VLS_131;
const __VLS_132 = {
    /** @type {typeof __VLS_131.click} */
    onClick: (__VLS_ctx.handleLogout),
};
var __VLS_129;
var __VLS_130;
// @ts-ignore
[canInstall, install, handleLogout,];
var __VLS_33;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
