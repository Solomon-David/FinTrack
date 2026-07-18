import { ref, computed, onMounted, defineAsyncComponent, shallowRef, watch } from "vue";
import { usePlanStore } from "@/stores/plan.store";
import PlanItem from "@/components/plans/PlanItem.vue";
import PlanEditDialog from "@/components/plans/PlanEditDialog.vue";
import PlanUpdateAmountDialog from "@/components/plans/PlanUpdateAmountDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";
const planStore = usePlanStore();
const addDialog = ref(false);
const editDialog = ref(false);
const updateAmountDialog = ref(false);
const deleteDialog = ref(false);
const selectedPlan = ref(null);
const duplicateEntry = ref(undefined);
const searchQuery = ref("");
const searchFilter = ref("Name");
const filters = ["Name", "Status", "Due Date"];
const AddPlanDialog = shallowRef(null);
function openAddDialog() {
    if (!AddPlanDialog.value) {
        AddPlanDialog.value = defineAsyncComponent({
            loader: () => import("@/components/plans/AddPlanDialog.vue"),
            loadingComponent: LoadingDialog,
            delay: 0,
        });
    }
    duplicateEntry.value = undefined;
    addDialog.value = true;
}
function openDuplicate(plan) {
    if (!AddPlanDialog.value) {
        AddPlanDialog.value = defineAsyncComponent({
            loader: () => import("@/components/plans/AddPlanDialog.vue"),
            loadingComponent: LoadingDialog,
            delay: 0,
        });
    }
    duplicateEntry.value = {
        name: plan.name,
        description: plan.description,
        progress: plan.progress,
        targetAmount: plan.targetAmount,
        dueDate: plan.dueDate ? new Date(plan.dueDate).toISOString().split("T")[0] : "",
        currency: plan.currency,
    };
    addDialog.value = true;
}
watch(addDialog, (isOpen) => {
    if (!isOpen)
        duplicateEntry.value = undefined;
});
onMounted(() => load());
async function load() {
    await planStore.getPlans();
}
const filteredPlans = computed(() => {
    const q = searchQuery.value.toLowerCase().trim();
    if (!q)
        return planStore.plans;
    return planStore.plans.filter((plan) => {
        if (searchFilter.value === "Name")
            return plan.name.toLowerCase().includes(q);
        if (searchFilter.value === "Status")
            return plan.status.toLowerCase().includes(q);
        if (searchFilter.value === "Due Date") {
            if (!plan.dueDate)
                return false;
            const date = new Date(plan.dueDate);
            const full = date.toLocaleDateString("en-GB");
            const monthYear = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
            return full.includes(q) || monthYear.includes(q);
        }
        return true;
    });
});
// Group by status so "In Progress", "Completed", and "Overdue" plans are
// visually separated, similar to how bills/expenses group by date.
const groupedPlans = computed(() => {
    const order = ["In Progress", "Overdue", "Completed"];
    const groups = filteredPlans.value.reduce((acc, plan) => {
        if (!acc[plan.status])
            acc[plan.status] = [];
        acc[plan.status].push(plan);
        return acc;
    }, {});
    // Return groups in a stable, meaningful order
    const ordered = {};
    for (const status of order) {
        if (groups[status])
            ordered[status] = groups[status];
    }
    return ordered;
});
function handleSearch(query, filter) {
    searchQuery.value = query;
    searchFilter.value = filter;
}
function openUpdateAmount(plan) {
    selectedPlan.value = plan;
    updateAmountDialog.value = true;
}
function openEdit(plan) {
    selectedPlan.value = plan;
    editDialog.value = true;
}
function confirmDelete(plan) {
    selectedPlan.value = plan;
    deleteDialog.value = true;
}
async function handleDelete() {
    if (!selectedPlan.value)
        return;
    await planStore.deletePlan(selectedPlan.value._id);
    deleteDialog.value = false;
    selectedPlan.value = null;
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
    ...{ class: "pa-0" },
}));
const __VLS_2 = __VLS_1({
    fluid: true,
    ...{ class: "pa-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
const __VLS_7 = SearchComponent;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    filters: (__VLS_ctx.filters),
    onSearchFn: (__VLS_ctx.handleSearch),
}));
const __VLS_9 = __VLS_8({
    filters: (__VLS_ctx.filters),
    onSearchFn: (__VLS_ctx.handleSearch),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "px-4 d-flex flex-column" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center justify-space-between mb-2" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-h6 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer'] | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    ...{ 'onClick': {} },
    icon: "mdi-refresh",
    variant: "text",
    size: "small",
    color: "secondary",
    loading: (__VLS_ctx.planStore.isLoading),
}));
const __VLS_24 = __VLS_23({
    ...{ 'onClick': {} },
    icon: "mdi-refresh",
    variant: "text",
    size: "small",
    color: "secondary",
    loading: (__VLS_ctx.planStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_27;
const __VLS_28 = {
    /** @type {typeof __VLS_27.click} */
    onClick: (__VLS_ctx.load),
};
var __VLS_25;
var __VLS_26;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overflow-y-auto flex-grow-1" },
});
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
for (const [group, status] of __VLS_vFor((__VLS_ctx.groupedPlans))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (status),
        ...{ class: "mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-caption font-weight-bold text-medium-emphasis mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    (status);
    (group.length);
    for (const [plan] of __VLS_vFor((group))) {
        const __VLS_29 = PlanItem;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
            ...{ 'onUpdate': {} },
            ...{ 'onEdit': {} },
            ...{ 'onDuplicate': {} },
            ...{ 'onDelete': {} },
            key: (plan._id),
            plan: (plan),
        }));
        const __VLS_31 = __VLS_30({
            ...{ 'onUpdate': {} },
            ...{ 'onEdit': {} },
            ...{ 'onDuplicate': {} },
            ...{ 'onDelete': {} },
            key: (plan._id),
            plan: (plan),
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        let __VLS_34;
        const __VLS_35 = {
            /** @type {typeof __VLS_34.update} */
            onUpdate: (__VLS_ctx.openUpdateAmount),
        };
        const __VLS_36 = {
            /** @type {typeof __VLS_34.edit} */
            onEdit: (__VLS_ctx.openEdit),
        };
        const __VLS_37 = {
            /** @type {typeof __VLS_34.duplicate} */
            onDuplicate: (__VLS_ctx.openDuplicate),
        };
        const __VLS_38 = {
            /** @type {typeof __VLS_34.delete} */
            onDelete: (__VLS_ctx.confirmDelete),
        };
        var __VLS_32;
        var __VLS_33;
        // @ts-ignore
        [filters, handleSearch, planStore, load, groupedPlans, openUpdateAmount, openEdit, openDuplicate, confirmDelete,];
    }
    // @ts-ignore
    [];
}
if (!__VLS_ctx.planStore.isLoading && __VLS_ctx.filteredPlans.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-10" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
    let __VLS_39;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        size: "48",
        color: "grey-lighten-1",
    }));
    const __VLS_41 = __VLS_40({
        size: "48",
        color: "grey-lighten-1",
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const { default: __VLS_44 } = __VLS_42.slots;
    // @ts-ignore
    [planStore, filteredPlans,];
    var __VLS_42;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-medium-emphasis mt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex justify-center mt-4 mb-6" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    color: "secondary",
    variant: "flat",
    rounded: "xl",
    to: ({ name: 'summaries' }),
}));
const __VLS_47 = __VLS_46({
    color: "secondary",
    variant: "flat",
    rounded: "xl",
    to: ({ name: 'summaries' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_48.slots;
// @ts-ignore
[];
var __VLS_48;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    color: "primary",
    size: "large",
    elevation: "4",
    rounded: "lg",
    ...{ style: {} },
}));
const __VLS_53 = __VLS_52({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    color: "primary",
    size: "large",
    elevation: "4",
    rounded: "lg",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
let __VLS_56;
const __VLS_57 = {
    /** @type {typeof __VLS_56.click} */
    onClick: (__VLS_ctx.openAddDialog),
};
var __VLS_54;
var __VLS_55;
if (__VLS_ctx.AddPlanDialog) {
    const __VLS_58 = (__VLS_ctx.AddPlanDialog);
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
        modelValue: (__VLS_ctx.addDialog),
        initialEntry: (__VLS_ctx.duplicateEntry),
    }));
    const __VLS_60 = __VLS_59({
        modelValue: (__VLS_ctx.addDialog),
        initialEntry: (__VLS_ctx.duplicateEntry),
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
}
const __VLS_63 = PlanEditDialog;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    ...{ 'onUpdated': {} },
    modelValue: (__VLS_ctx.editDialog),
    plan: (__VLS_ctx.selectedPlan),
}));
const __VLS_65 = __VLS_64({
    ...{ 'onUpdated': {} },
    modelValue: (__VLS_ctx.editDialog),
    plan: (__VLS_ctx.selectedPlan),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
let __VLS_68;
const __VLS_69 = {
    /** @type {typeof __VLS_68.updated} */
    onUpdated: (__VLS_ctx.load),
};
var __VLS_66;
var __VLS_67;
const __VLS_70 = PlanUpdateAmountDialog;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    ...{ 'onUpdated': {} },
    modelValue: (__VLS_ctx.updateAmountDialog),
    plan: (__VLS_ctx.selectedPlan),
}));
const __VLS_72 = __VLS_71({
    ...{ 'onUpdated': {} },
    modelValue: (__VLS_ctx.updateAmountDialog),
    plan: (__VLS_ctx.selectedPlan),
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
let __VLS_75;
const __VLS_76 = {
    /** @type {typeof __VLS_75.updated} */
    onUpdated: (__VLS_ctx.load),
};
var __VLS_73;
var __VLS_74;
let __VLS_77;
/** @ts-ignore @type { | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog'] | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog']} */
vDialog;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "300",
}));
const __VLS_79 = __VLS_78({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "300",
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
const { default: __VLS_82 } = __VLS_80.slots;
let __VLS_83;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
    rounded: "lg",
    ...{ class: "pa-4" },
}));
const __VLS_85 = __VLS_84({
    rounded: "lg",
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
const { default: __VLS_88 } = __VLS_86.slots;
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    ...{ class: "text-body-1 font-weight-bold" },
}));
const __VLS_91 = __VLS_90({
    ...{ class: "text-body-1 font-weight-bold" },
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
const { default: __VLS_94 } = __VLS_92.slots;
// @ts-ignore
[load, load, openAddDialog, AddPlanDialog, AddPlanDialog, addDialog, duplicateEntry, editDialog, selectedPlan, selectedPlan, updateAmountDialog, deleteDialog,];
var __VLS_92;
let __VLS_95;
/** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
vCardText;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({}));
const __VLS_97 = __VLS_96({}, ...__VLS_functionalComponentArgsRest(__VLS_96));
const { default: __VLS_100 } = __VLS_98.slots;
// @ts-ignore
[];
var __VLS_98;
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
vCardActions;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
    ...{ class: "justify-end ga-2" },
}));
const __VLS_103 = __VLS_102({
    ...{ class: "justify-end ga-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
const { default: __VLS_106 } = __VLS_104.slots;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    ...{ 'onClick': {} },
    variant: "text",
}));
const __VLS_109 = __VLS_108({
    ...{ 'onClick': {} },
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
let __VLS_112;
const __VLS_113 = {
    /** @type {typeof __VLS_112.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.deleteDialog = false);
        // @ts-ignore
        [deleteDialog,];
    },
};
const { default: __VLS_114 } = __VLS_110.slots;
// @ts-ignore
[];
var __VLS_110;
var __VLS_111;
let __VLS_115;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent1(__VLS_115, new __VLS_115({
    ...{ 'onClick': {} },
    color: "error",
    variant: "flat",
    rounded: "lg",
    loading: (__VLS_ctx.planStore.isLoading),
}));
const __VLS_117 = __VLS_116({
    ...{ 'onClick': {} },
    color: "error",
    variant: "flat",
    rounded: "lg",
    loading: (__VLS_ctx.planStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
let __VLS_120;
const __VLS_121 = {
    /** @type {typeof __VLS_120.click} */
    onClick: (__VLS_ctx.handleDelete),
};
const { default: __VLS_122 } = __VLS_118.slots;
// @ts-ignore
[planStore, handleDelete,];
var __VLS_118;
var __VLS_119;
// @ts-ignore
[];
var __VLS_104;
// @ts-ignore
[];
var __VLS_86;
// @ts-ignore
[];
var __VLS_80;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
