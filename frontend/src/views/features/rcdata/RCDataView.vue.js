import { ref, computed, onMounted, defineAsyncComponent, shallowRef, watch, nextTick, } from "vue";
import { useRCDataStore } from "@/stores/rcdata.store";
import RCDataItem from "@/components/rcdata/RCDataItem.vue";
import RCDataEditDialog from "@/components/rcdata/RCDataEditDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
import LoadingDialog from "@/components/shared/LoadingDialog.vue";
import GenerateSummaryDialog from "@/components/summaries/GenerateSummaryDialog.vue";
const rcDataStore = useRCDataStore();
const listContainer = ref(null);
const addDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const generateDialog = ref(false);
const selectedRecord = ref(null);
const duplicateEntry = ref(undefined);
const searchQuery = ref("");
const searchFilter = ref("Sender");
const filters = ["Sender", "Network", "Type", "Date"];
const AddRCDataDialog = shallowRef(null);
function openAddDialog() {
    if (!AddRCDataDialog.value) {
        AddRCDataDialog.value = defineAsyncComponent({
            loader: () => import("@/components/rcdata/AddRCDataDialog.vue"),
            loadingComponent: LoadingDialog,
            delay: 0,
        });
    }
    duplicateEntry.value = undefined;
    addDialog.value = true;
}
function openDuplicate(record) {
    if (!AddRCDataDialog.value) {
        AddRCDataDialog.value = defineAsyncComponent({
            loader: () => import("@/components/rcdata/AddRCDataDialog.vue"),
            loadingComponent: LoadingDialog,
            delay: 0,
        });
    }
    duplicateEntry.value = {
        date: new Date(record.date).toISOString().split("T")[0],
        currency: record.currency,
        sender: { name: record.sender.name, phone: record.sender.phone },
        amount: { ...record.amount },
        type: record.type,
        network: record.network,
        remark: record.remark,
    };
    addDialog.value = true;
}
watch(addDialog, (isOpen) => {
    if (!isOpen)
        duplicateEntry.value = undefined;
});
async function load() {
    await rcDataStore.getRCData();
}
const filteredRecords = computed(() => {
    const q = searchQuery.value.toLowerCase().trim();
    if (!q)
        return rcDataStore.records;
    return rcDataStore.records.filter((record) => {
        if (searchFilter.value === "Sender")
            return record.sender.name.toLowerCase().includes(q);
        if (searchFilter.value === "Network")
            return record.network.toLowerCase().includes(q);
        if (searchFilter.value === "Type")
            return record.type.toLowerCase().includes(q);
        if (searchFilter.value === "Date") {
            const date = new Date(record.date);
            const full = date.toLocaleDateString("en-GB");
            const monthYear = `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
            return full.includes(q) || monthYear.includes(q);
        }
        return true;
    });
});
const groupedRecords = computed(() => {
    return filteredRecords.value.reduce((groups, record) => {
        const date = new Date(record.date).toLocaleDateString("en-GB");
        if (!groups[date])
            groups[date] = [];
        groups[date].push(record);
        return groups;
    }, {});
});
function groupTotal(group) {
    const airtime = group
        .filter((r) => r.type === "airtime")
        .reduce((sum, r) => sum + r.amount.amount, 0);
    const dataMB = group
        .filter((r) => r.type === "data")
        .reduce((sum, r) => sum + (r.amount.size === "GB" ? r.amount.amount * 1024 : r.amount.amount), 0);
    const dataGB = (dataMB / 1024).toFixed(1);
    const parts = [];
    if (airtime > 0)
        parts.push(`₦${airtime.toLocaleString("en-NG")}`);
    if (dataMB > 0)
        parts.push(`${dataGB}GB`);
    return parts.length > 0 ? parts.join(", ") : "—";
}
function handleSearch(query, filter) {
    searchQuery.value = query;
    searchFilter.value = filter;
}
function openEdit(record) {
    selectedRecord.value = record;
    editDialog.value = true;
}
function confirmDelete(record) {
    selectedRecord.value = record;
    deleteDialog.value = true;
}
async function handleDelete() {
    if (!selectedRecord.value)
        return;
    await rcDataStore.deleteRCData(selectedRecord.value._id);
    deleteDialog.value = false;
    selectedRecord.value = null;
}
function scrollToEnd() {
    nextTick(() => {
        const el = listContainer.value;
        if (el)
            el.scrollTop = el.scrollHeight;
    });
}
// to automatically scroll to the end
watch(filteredRecords, () => {
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
    loading: (__VLS_ctx.rcDataStore.isLoading),
}));
const __VLS_24 = __VLS_23({
    ...{ 'onClick': {} },
    icon: "mdi-refresh",
    variant: "text",
    size: "small",
    color: "secondary",
    loading: (__VLS_ctx.rcDataStore.isLoading),
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
for (const [group, date] of __VLS_vFor((__VLS_ctx.groupedRecords))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (date),
        ...{ class: "mb-4" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    for (const [record] of __VLS_vFor((group))) {
        const __VLS_29 = RCDataItem;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
            ...{ 'onEdit': {} },
            ...{ 'onDuplicate': {} },
            ...{ 'onDelete': {} },
            key: (record._id),
            record: (record),
        }));
        const __VLS_31 = __VLS_30({
            ...{ 'onEdit': {} },
            ...{ 'onDuplicate': {} },
            ...{ 'onDelete': {} },
            key: (record._id),
            record: (record),
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
        [filters, handleSearch, rcDataStore, load, groupedRecords, openEdit, openDuplicate, confirmDelete,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center text-caption font-weight-bold py-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    (__VLS_ctx.groupTotal(group));
    // @ts-ignore
    [groupTotal,];
}
if (!__VLS_ctx.rcDataStore.isLoading && __VLS_ctx.filteredRecords.length === 0) {
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
    [rcDataStore, filteredRecords,];
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
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    rounded: "xl",
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    rounded: "xl",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_49;
const __VLS_50 = {
    /** @type {typeof __VLS_49.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.generateDialog = true);
        // @ts-ignore
        [generateDialog,];
    },
};
const { default: __VLS_51 } = __VLS_47.slots;
// @ts-ignore
[];
var __VLS_47;
var __VLS_48;
const __VLS_52 = GenerateSummaryDialog;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    modelValue: (__VLS_ctx.generateDialog),
    type: "RCData",
}));
const __VLS_54 = __VLS_53({
    modelValue: (__VLS_ctx.generateDialog),
    type: "RCData",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_57;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    color: "primary",
    size: "large",
    elevation: "4",
    rounded: "lg",
    ...{ style: {} },
}));
const __VLS_59 = __VLS_58({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    color: "primary",
    size: "large",
    elevation: "4",
    rounded: "lg",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_62;
const __VLS_63 = {
    /** @type {typeof __VLS_62.click} */
    onClick: (__VLS_ctx.openAddDialog),
};
var __VLS_60;
var __VLS_61;
if (__VLS_ctx.AddRCDataDialog) {
    const __VLS_64 = (__VLS_ctx.AddRCDataDialog);
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
        modelValue: (__VLS_ctx.addDialog),
        initialEntry: (__VLS_ctx.duplicateEntry),
    }));
    const __VLS_66 = __VLS_65({
        modelValue: (__VLS_ctx.addDialog),
        initialEntry: (__VLS_ctx.duplicateEntry),
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
}
const __VLS_69 = RCDataEditDialog;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    ...{ 'onUpdated': {} },
    modelValue: (__VLS_ctx.editDialog),
    record: (__VLS_ctx.selectedRecord),
}));
const __VLS_71 = __VLS_70({
    ...{ 'onUpdated': {} },
    modelValue: (__VLS_ctx.editDialog),
    record: (__VLS_ctx.selectedRecord),
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
let __VLS_74;
const __VLS_75 = {
    /** @type {typeof __VLS_74.updated} */
    onUpdated: (__VLS_ctx.load),
};
var __VLS_72;
var __VLS_73;
let __VLS_76;
/** @ts-ignore @type { | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog'] | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog']} */
vDialog;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "300",
}));
const __VLS_78 = __VLS_77({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "300",
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
const { default: __VLS_81 } = __VLS_79.slots;
let __VLS_82;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
    rounded: "lg",
    ...{ class: "pa-4" },
}));
const __VLS_84 = __VLS_83({
    rounded: "lg",
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
const { default: __VLS_87 } = __VLS_85.slots;
let __VLS_88;
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
    ...{ class: "text-body-1 font-weight-bold" },
}));
const __VLS_90 = __VLS_89({
    ...{ class: "text-body-1 font-weight-bold" },
}, ...__VLS_functionalComponentArgsRest(__VLS_89));
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
const { default: __VLS_93 } = __VLS_91.slots;
// @ts-ignore
[load, generateDialog, openAddDialog, AddRCDataDialog, AddRCDataDialog, addDialog, duplicateEntry, editDialog, selectedRecord, deleteDialog,];
var __VLS_91;
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
vCardText;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({}));
const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
const { default: __VLS_99 } = __VLS_97.slots;
// @ts-ignore
[];
var __VLS_97;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
vCardActions;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
    ...{ class: "justify-end ga-2" },
}));
const __VLS_102 = __VLS_101({
    ...{ class: "justify-end ga-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_101));
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
const { default: __VLS_105 } = __VLS_103.slots;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
    ...{ 'onClick': {} },
    variant: "text",
}));
const __VLS_108 = __VLS_107({
    ...{ 'onClick': {} },
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
let __VLS_111;
const __VLS_112 = {
    /** @type {typeof __VLS_111.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.deleteDialog = false);
        // @ts-ignore
        [deleteDialog,];
    },
};
const { default: __VLS_113 } = __VLS_109.slots;
// @ts-ignore
[];
var __VLS_109;
var __VLS_110;
let __VLS_114;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
    ...{ 'onClick': {} },
    color: "error",
    variant: "flat",
    rounded: "lg",
    loading: (__VLS_ctx.rcDataStore.isLoading),
}));
const __VLS_116 = __VLS_115({
    ...{ 'onClick': {} },
    color: "error",
    variant: "flat",
    rounded: "lg",
    loading: (__VLS_ctx.rcDataStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
let __VLS_119;
const __VLS_120 = {
    /** @type {typeof __VLS_119.click} */
    onClick: (__VLS_ctx.handleDelete),
};
const { default: __VLS_121 } = __VLS_117.slots;
// @ts-ignore
[rcDataStore, handleDelete,];
var __VLS_117;
var __VLS_118;
// @ts-ignore
[];
var __VLS_103;
// @ts-ignore
[];
var __VLS_85;
// @ts-ignore
[];
var __VLS_79;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
