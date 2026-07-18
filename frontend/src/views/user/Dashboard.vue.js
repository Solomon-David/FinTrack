import { ref, shallowRef, defineAsyncComponent, onMounted, onActivated } from "vue";
import { useUserStore } from "@/stores/users.stores";
import UserPhoto from "@/components/user/UserPhoto.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";
import { useDisplay } from "vuetify";
const userStore = useUserStore();
const display = useDisplay();
const refreshDashboardUserDetails = async () => {
    if (navigator.onLine) {
        try {
            await userStore.getUserDetails();
        }
        catch (error) {
            console.warn("Dashboard refresh failed:", error);
        }
    }
};
onMounted(refreshDashboardUserDetails);
onActivated(refreshDashboardUserDetails);
const quickActions = [
    {
        label: "Record Expense",
        icon: "mdi-arrow-up",
        color: "#1B5E20",
        component: () => import("@/components/expenses/AddExpenseDialog.vue"),
    },
    {
        label: "Record Income",
        icon: "mdi-arrow-down",
        color: "#880E4F",
        component: () => import("@/components/income/AddIncomeDialog.vue"),
    },
    {
        label: "Create A Plan",
        icon: "mdi-check",
        color: "#1565C0",
        component: () => import("@/components/plans/AddPlanDialog.vue"),
    },
    {
        label: "Record RC-Data",
        icon: "mdi-phone-outline",
        color: "#6A1B9A",
        component: () => import("@/components/rcdata/AddRCDataDialog.vue"),
    },
    {
        label: "Get Summary",
        icon: "mdi-trending-up",
        color: "#B71C1C",
        component: () => import("@/components/summaries/GenerateSummaryDialog.vue"),
    },
    {
        label: "Search Records",
        icon: "mdi-magnify",
        color: "#4A148C",
        component: () => import("@/components/income/AddIncomeDialog.vue"),
    },
];
const dialog = ref(false);
const dialogComponent = shallowRef(null);
function openDialog(label) {
    const action = quickActions.find((a) => a.label === label);
    if (!action)
        return;
    dialogComponent.value = defineAsyncComponent({
        loader: action.component,
        loadingComponent: LoadingDialog,
        delay: 0,
    });
    dialog.value = true;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    fluid: true,
}));
const __VLS_2 = __VLS_1({
    fluid: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    align: "center",
    justify: "space-between",
    ...{ class: "mb-6 border-b-sm" },
}));
const __VLS_9 = __VLS_8({
    align: "center",
    justify: "space-between",
    ...{ class: "mb-6 border-b-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b-sm']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ class: "d-flex align-center align-xs-start ga-3 ga-xs-1" },
}));
const __VLS_15 = __VLS_14({
    ...{ class: "d-flex align-center align-xs-start ga-3 ga-xs-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['align-xs-start']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-xs-1']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
const __VLS_19 = UserPhoto;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    size: (__VLS_ctx.display.xs ? '60' : '75'),
}));
const __VLS_21 = __VLS_20({
    size: (__VLS_ctx.display.xs ? '60' : '75'),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex flex-column" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-body-1 w-100 w-xs-50 text-xs-caption text-no-wrap" },
});
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['w-xs-50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-no-wrap']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-weight-bold text-body-1 text-xs-caption" },
});
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs-caption']} */ ;
(__VLS_ctx.userStore.user?.firstName);
(__VLS_ctx.userStore.user?.lastName);
// @ts-ignore
[display, userStore, userStore,];
var __VLS_16;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    cols: "auto",
    ...{ class: "d-flex flex-column align-center ga-2" },
}));
const __VLS_31 = __VLS_30({
    cols: "auto",
    ...{ class: "d-flex flex-column align-center ga-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
const { default: __VLS_34 } = __VLS_32.slots;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    icon: "mdi-pencil-outline",
    variant: "outlined",
    rounded: "lg",
    color: "secondary",
    size: "small",
    to: ({ name: 'profile' }),
}));
const __VLS_37 = __VLS_36({
    icon: "mdi-pencil-outline",
    variant: "outlined",
    rounded: "lg",
    color: "secondary",
    size: "small",
    to: ({ name: 'profile' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_40;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({}));
const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    icon: "mdi-cog-outline",
    variant: "outlined",
    rounded: "lg",
    color: "secondary",
    size: "small",
    to: ({ name: 'preferences' }),
}));
const __VLS_47 = __VLS_46({
    icon: "mdi-cog-outline",
    variant: "outlined",
    rounded: "lg",
    color: "secondary",
    size: "small",
    to: ({ name: 'preferences' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
// @ts-ignore
[];
var __VLS_32;
// @ts-ignore
[];
var __VLS_10;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    justify: "center",
    ...{ class: "mb-2" },
}));
const __VLS_52 = __VLS_51({
    justify: "center",
    ...{ class: "mb-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
const { default: __VLS_55 } = __VLS_53.slots;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    cols: "12",
    ...{ class: "text-center pb-0" },
}));
const __VLS_58 = __VLS_57({
    cols: "12",
    ...{ class: "text-center pb-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-0']} */ ;
const { default: __VLS_61 } = __VLS_59.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "font-weight-bold text-h6" },
});
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
// @ts-ignore
[];
var __VLS_59;
// @ts-ignore
[];
var __VLS_53;
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    justify: "space-around",
    ...{ class: "mb-6 border-b-sm" },
}));
const __VLS_64 = __VLS_63({
    justify: "space-around",
    ...{ class: "mb-6 border-b-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b-sm']} */ ;
const { default: __VLS_67 } = __VLS_65.slots;
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    cols: "auto",
    ...{ class: "text-center" },
}));
const __VLS_70 = __VLS_69({
    cols: "auto",
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_73 } = __VLS_71.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-h6" },
});
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-weight-bold" },
    ...{ class: (__VLS_ctx.userStore.billsSummary?.paid === __VLS_ctx.userStore.billsSummary?.total &&
            __VLS_ctx.userStore.billsSummary?.total > 0
            ? 'text-success'
            : 'text-error') },
});
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
(__VLS_ctx.userStore.billsSummary?.paid ?? 0);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
(__VLS_ctx.userStore.billsSummary?.total ?? 0);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
// @ts-ignore
[userStore, userStore, userStore, userStore, userStore,];
var __VLS_71;
let __VLS_74;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
    cols: "auto",
    ...{ class: "text-center" },
}));
const __VLS_76 = __VLS_75({
    cols: "auto",
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_79 } = __VLS_77.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-h6 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
(__VLS_ctx.userStore.plansSummary?.total ?? 0);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
// @ts-ignore
[userStore,];
var __VLS_77;
// @ts-ignore
[];
var __VLS_65;
let __VLS_80;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
    justify: "center",
    ...{ class: "mb-2" },
}));
const __VLS_82 = __VLS_81({
    justify: "center",
    ...{ class: "mb-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
const { default: __VLS_85 } = __VLS_83.slots;
let __VLS_86;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
    cols: "12",
    ...{ class: "text-center pb-0" },
}));
const __VLS_88 = __VLS_87({
    cols: "12",
    ...{ class: "text-center pb-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-0']} */ ;
const { default: __VLS_91 } = __VLS_89.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "font-weight-bold text-h6" },
});
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
// @ts-ignore
[];
var __VLS_89;
// @ts-ignore
[];
var __VLS_83;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({}));
const __VLS_94 = __VLS_93({}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const { default: __VLS_97 } = __VLS_95.slots;
for (const [action] of __VLS_vFor((__VLS_ctx.quickActions))) {
    let __VLS_98;
    /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
    vCol;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
        key: (action.label),
        cols: "6",
        align: "center",
        ...{ class: "mb-4" },
    }));
    const __VLS_100 = __VLS_99({
        key: (action.label),
        cols: "6",
        align: "center",
        ...{ class: "mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    const { default: __VLS_103 } = __VLS_101.slots;
    let __VLS_104;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
        ...{ 'onClick': {} },
        color: (action.color),
        prependIcon: (action.icon),
        ...{ class: "w-100 text-white font-weight-light px-2 text-capitalize" },
        height: "44",
        rounded: "lg",
        ...{ style: {} },
    }));
    const __VLS_106 = __VLS_105({
        ...{ 'onClick': {} },
        color: (action.color),
        prependIcon: (action.icon),
        ...{ class: "w-100 text-white font-weight-light px-2 text-capitalize" },
        height: "44",
        rounded: "lg",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_105));
    let __VLS_109;
    const __VLS_110 = {
        /** @type {typeof __VLS_109.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.openDialog(action.label));
            // @ts-ignore
            [quickActions, openDialog,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['w-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-light']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-capitalize']} */ ;
    const { default: __VLS_111 } = __VLS_107.slots;
    (action.label);
    // @ts-ignore
    [];
    var __VLS_107;
    var __VLS_108;
    // @ts-ignore
    [];
    var __VLS_101;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_95;
if (__VLS_ctx.dialogComponent) {
    const __VLS_112 = (__VLS_ctx.dialogComponent);
    // @ts-ignore
    const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
        modelValue: (__VLS_ctx.dialog),
    }));
    const __VLS_114 = __VLS_113({
        modelValue: (__VLS_ctx.dialog),
    }, ...__VLS_functionalComponentArgsRest(__VLS_113));
}
// @ts-ignore
[dialogComponent, dialogComponent, dialog,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
