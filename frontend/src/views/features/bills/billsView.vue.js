import { ref, computed, onMounted, defineAsyncComponent, shallowRef, watch, nextTick, } from "vue";
import { useBillTypeStore } from "@/stores/billtype.store";
import BillItem from "@/components/bills/BillItems.vue";
import BillEditDialog from "@/components/bills/BillEditDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";
const billTypeStore = useBillTypeStore();
const listContainer = ref(null);
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const selectedBill = ref(null);
const duplicateEntry = ref(undefined);
const searchQuery = ref("");
const searchFilter = ref("Name");
const filters = ["Name", "Type", "Status"];
const CreateBillTypeDialog = shallowRef(null);
function openAddDialog() {
    if (!CreateBillTypeDialog.value) {
        CreateBillTypeDialog.value = defineAsyncComponent({
            loader: () => import("@/components/bills/CreateBillTypeDialog.vue"),
            loadingComponent: LoadingDialog,
            delay: 0,
        });
    }
    duplicateEntry.value = undefined;
    addDialog.value = true;
}
function openDuplicate(bill) {
    if (!CreateBillTypeDialog.value) {
        CreateBillTypeDialog.value = defineAsyncComponent({
            loader: () => import("@/components/bills/CreateBillTypeDialog.vue"),
            loadingComponent: LoadingDialog,
            delay: 0,
        });
    }
    duplicateEntry.value = {
        name: bill.name,
        type: bill.type,
        total: bill.total,
        currency: bill.currency,
        recurrence: bill.recurrence,
        dueEvery: bill.dueEvery,
        remark: bill.remark,
    };
    addDialog.value = true;
}
watch(addDialog, (isOpen) => {
    if (!isOpen)
        duplicateEntry.value = undefined;
});
async function load() {
    await billTypeStore.getBillTypes();
}
const filteredBills = computed(() => {
    const q = searchQuery.value.toLowerCase().trim();
    if (!q)
        return billTypeStore.billTypes;
    return billTypeStore.billTypes.filter((bill) => {
        if (searchFilter.value === "Name")
            return bill.name.toLowerCase().includes(q);
        if (searchFilter.value === "Type")
            return bill.type.toLowerCase().includes(q);
        if (searchFilter.value === "Status")
            return bill.status.toLowerCase().includes(q);
        return true;
    });
});
function handleSearch(query, filter) {
    searchQuery.value = query;
    searchFilter.value = filter;
}
function openEdit(bill) {
    selectedBill.value = bill;
    editDialog.value = true;
}
function confirmDelete(bill) {
    selectedBill.value = bill;
    deleteDialog.value = true;
}
async function handleDelete() {
    if (!selectedBill.value)
        return;
    await billTypeStore.deleteBillType(selectedBill.value._id);
    deleteDialog.value = false;
    selectedBill.value = null;
}
function scrollToEnd() {
    nextTick(() => {
        const el = listContainer.value;
        if (el)
            el.scrollTop = el.scrollHeight;
    });
}
// to automatically scroll to the end
watch(filteredBills, () => {
    scrollToEnd();
}, { deep: true });
onMounted(() => {
    load().then(scrollToEnd);
});
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
    ...{ class: "px-4 pt-2 d-flex flex-column" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
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
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
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
    loading: (__VLS_ctx.billTypeStore.isLoading),
}));
const __VLS_24 = __VLS_23({
    ...{ 'onClick': {} },
    icon: "mdi-refresh",
    variant: "text",
    size: "small",
    color: "secondary",
    loading: (__VLS_ctx.billTypeStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_27;
const __VLS_28 = {
    /** @type {typeof __VLS_27.click} */
    onClick: (__VLS_ctx.load),
};
var __VLS_25;
var __VLS_26;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "listContainer",
    ...{ class: "overflow-y-auto flex-grow-1" },
});
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
for (const [bill] of __VLS_vFor((__VLS_ctx.filteredBills))) {
    const __VLS_29 = BillItem;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        ...{ 'onEdit': {} },
        ...{ 'onDuplicate': {} },
        ...{ 'onDelete': {} },
        key: (bill._id),
        bill: (bill),
    }));
    const __VLS_31 = __VLS_30({
        ...{ 'onEdit': {} },
        ...{ 'onDuplicate': {} },
        ...{ 'onDelete': {} },
        key: (bill._id),
        bill: (bill),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    let __VLS_34;
    const __VLS_35 = {
        /** @type {typeof __VLS_34.edit} */
        onEdit: (__VLS_ctx.openEdit),
    };
    const __VLS_36 = {
        /** @type {typeof __VLS_34.duplicate} */
        onDuplicate: (__VLS_ctx.openDuplicate),
    };
    const __VLS_37 = {
        /** @type {typeof __VLS_34.delete} */
        onDelete: (__VLS_ctx.confirmDelete),
    };
    var __VLS_32;
    var __VLS_33;
    // @ts-ignore
    [filters, handleSearch, billTypeStore, load, filteredBills, openEdit, openDuplicate, confirmDelete,];
}
if (!__VLS_ctx.billTypeStore.isLoading && __VLS_ctx.filteredBills.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-10" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
    let __VLS_38;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
        size: "48",
        color: "grey-lighten-1",
    }));
    const __VLS_40 = __VLS_39({
        size: "48",
        color: "grey-lighten-1",
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    const { default: __VLS_43 } = __VLS_41.slots;
    // @ts-ignore
    [billTypeStore, filteredBills,];
    var __VLS_41;
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
let __VLS_44;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
    color: "secondary",
    variant: "flat",
    rounded: "xl",
    to: ({ name: 'summaries' }),
}));
const __VLS_46 = __VLS_45({
    color: "secondary",
    variant: "flat",
    rounded: "xl",
    to: ({ name: 'summaries' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
const { default: __VLS_49 } = __VLS_47.slots;
// @ts-ignore
[];
var __VLS_47;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    color: "primary",
    size: "large",
    elevation: "4",
    rounded: "lg",
    ...{ style: {} },
}));
const __VLS_52 = __VLS_51({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    color: "primary",
    size: "large",
    elevation: "4",
    rounded: "lg",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
let __VLS_55;
const __VLS_56 = {
    /** @type {typeof __VLS_55.click} */
    onClick: (__VLS_ctx.openAddDialog),
};
var __VLS_53;
var __VLS_54;
if (__VLS_ctx.CreateBillTypeDialog) {
    const __VLS_57 = (__VLS_ctx.CreateBillTypeDialog);
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
        modelValue: (__VLS_ctx.addDialog),
        initialEntry: (__VLS_ctx.duplicateEntry),
    }));
    const __VLS_59 = __VLS_58({
        modelValue: (__VLS_ctx.addDialog),
        initialEntry: (__VLS_ctx.duplicateEntry),
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
}
const __VLS_62 = BillEditDialog;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    ...{ 'onUpdated': {} },
    modelValue: (__VLS_ctx.editDialog),
    bill: (__VLS_ctx.selectedBill),
}));
const __VLS_64 = __VLS_63({
    ...{ 'onUpdated': {} },
    modelValue: (__VLS_ctx.editDialog),
    bill: (__VLS_ctx.selectedBill),
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
let __VLS_67;
const __VLS_68 = {
    /** @type {typeof __VLS_67.updated} */
    onUpdated: (__VLS_ctx.load),
};
var __VLS_65;
var __VLS_66;
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog'] | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog']} */
vDialog;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "300",
}));
const __VLS_71 = __VLS_70({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "300",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    rounded: "lg",
    ...{ class: "pa-4" },
}));
const __VLS_77 = __VLS_76({
    rounded: "lg",
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
const { default: __VLS_80 } = __VLS_78.slots;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    ...{ class: "text-body-1 font-weight-bold" },
}));
const __VLS_83 = __VLS_82({
    ...{ class: "text-body-1 font-weight-bold" },
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
const { default: __VLS_86 } = __VLS_84.slots;
// @ts-ignore
[load, openAddDialog, CreateBillTypeDialog, CreateBillTypeDialog, addDialog, duplicateEntry, editDialog, selectedBill, deleteDialog,];
var __VLS_84;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
vCardText;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({}));
const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_92 } = __VLS_90.slots;
// @ts-ignore
[];
var __VLS_90;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
vCardActions;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    ...{ class: "justify-end ga-2" },
}));
const __VLS_95 = __VLS_94({
    ...{ class: "justify-end ga-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
const { default: __VLS_98 } = __VLS_96.slots;
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    ...{ 'onClick': {} },
    variant: "text",
}));
const __VLS_101 = __VLS_100({
    ...{ 'onClick': {} },
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
let __VLS_104;
const __VLS_105 = {
    /** @type {typeof __VLS_104.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.deleteDialog = false);
        // @ts-ignore
        [deleteDialog,];
    },
};
const { default: __VLS_106 } = __VLS_102.slots;
// @ts-ignore
[];
var __VLS_102;
var __VLS_103;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    ...{ 'onClick': {} },
    color: "error",
    variant: "flat",
    rounded: "lg",
    loading: (__VLS_ctx.billTypeStore.isLoading),
}));
const __VLS_109 = __VLS_108({
    ...{ 'onClick': {} },
    color: "error",
    variant: "flat",
    rounded: "lg",
    loading: (__VLS_ctx.billTypeStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
let __VLS_112;
const __VLS_113 = {
    /** @type {typeof __VLS_112.click} */
    onClick: (__VLS_ctx.handleDelete),
};
const { default: __VLS_114 } = __VLS_110.slots;
// @ts-ignore
[billTypeStore, handleDelete,];
var __VLS_110;
var __VLS_111;
// @ts-ignore
[];
var __VLS_96;
// @ts-ignore
[];
var __VLS_78;
// @ts-ignore
[];
var __VLS_72;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
