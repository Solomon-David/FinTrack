import { ref, computed, reactive, onMounted, watch } from "vue";
import { useSummaryStore } from "@/stores/summary.store";
import SummaryItem from "@/components/summaries/SummaryItem.vue";
import GenerateSummaryDialog from "@/components/summaries/GenerateSummaryDialog.vue";
import SearchComponent from "@/components/shared/SearchComponent.vue";
const summaryStore = useSummaryStore();
const deleteDialog = ref(false);
const instantDialog = ref(false);
const generateDialog = ref(false);
const selectedSummary = ref(null);
const selectedType = ref(null);
// Holds the raw value from whichever input is showing:
// "YYYY-MM-DD" for Daily/Weekly, "YYYY-MM" for Monthly, "YYYY" for Yearly
const selectedDate = ref("");
// Holds the summary just returned from the generate call so it can be
// previewed inside the dialog. This is never persisted to the database —
// it exists purely for on-screen display.
const generatedPreview = ref(null);
const searchQuery = ref("");
const searchCategory = ref(null);
const snackbar = reactive({ show: false, message: "", color: "success" });
const summaryTypes = ["Daily", "Weekly", "Monthly", "Yearly"];
const summaryCategories = ["Daily", "Weekly", "Monthly", "Yearly"];
onMounted(() => load());
async function load() {
    await summaryStore.getSummaries();
}
const filteredSummaries = computed(() => {
    let results = summaryStore.summaries;
    // Category filter — filter by timeframe
    if (searchCategory.value) {
        results = results.filter((s) => s.timeframe === searchCategory.value);
    }
    // Search filter — match against period dates
    const q = searchQuery.value.trim();
    if (!q)
        return results;
    return results.filter((summary) => {
        const start = new Date(summary.period.start);
        const full = start.toLocaleDateString("en-GB");
        const monthYear = `${String(start.getMonth() + 1).padStart(2, "0")}/${start.getFullYear()}`;
        const year = `${start.getFullYear()}`;
        return full.includes(q) || monthYear.includes(q) || year.includes(q);
    });
});
function handleSearch(query, _filter, category) {
    searchQuery.value = query;
    searchCategory.value = category;
}
// Reset the picked period whenever the timeframe changes so a stale value
// (e.g. a month string left over from "Monthly") isn't sent for "Yearly"
watch(selectedType, () => {
    selectedDate.value = "";
});
// Clear selections whenever the dialog is closed
watch(generateDialog, (isOpen) => {
    if (!isOpen) {
        selectedType.value = null;
        selectedDate.value = "";
        generatedPreview.value = null;
    }
});
// Converts whatever the active input produced into the ISO date string
// the backend expects, based on the granularity of the chosen timeframe.
function buildDateParam(type, value) {
    if (type === "Monthly") {
        // <input type="month"> gives "YYYY-MM"
        return `${value}-01`;
    }
    if (type === "Yearly") {
        // <input type="number"> gives "YYYY"
        return `${value}-01-01`;
    }
    // Daily / Weekly — <input type="date"> already gives "YYYY-MM-DD"
    return value;
}
async function handleGenerate() {
    if (!selectedType.value || !selectedDate.value)
        return;
    try {
        const dateParam = buildDateParam(selectedType.value, selectedDate.value);
        const summary = await summaryStore.generateSummary(selectedType.value, dateParam);
        generatedPreview.value = summary;
        snackbar.message = `${selectedType.value} summary generated!`;
        snackbar.color = "success";
    }
    catch {
        snackbar.message = "Failed to generate summary.";
        snackbar.color = "error";
    }
    finally {
        snackbar.show = true;
    }
}
function handleExport(summary) {
    console.log("Export:", summary);
}
function confirmDelete(summary) {
    selectedSummary.value = summary;
    deleteDialog.value = true;
}
async function handleDelete() {
    if (!selectedSummary.value)
        return;
    // No delete endpoint currently exists on the backend/store for summaries.
    // Just close the dialog and clear selection for now so the UI doesn't hang.
    deleteDialog.value = false;
    selectedSummary.value = null;
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
    filters: (__VLS_ctx.summaryCategories),
    onSearchFn: (__VLS_ctx.handleSearch),
}));
const __VLS_9 = __VLS_8({
    filters: (__VLS_ctx.summaryCategories),
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
    ...{ class: "d-flex align-center justify-center mb-2" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
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
    loading: (__VLS_ctx.summaryStore.isLoading),
    ...{ class: "position-absolute" },
    ...{ style: {} },
}));
const __VLS_24 = __VLS_23({
    ...{ 'onClick': {} },
    icon: "mdi-refresh",
    variant: "text",
    size: "small",
    color: "secondary",
    loading: (__VLS_ctx.summaryStore.isLoading),
    ...{ class: "position-absolute" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
let __VLS_27;
const __VLS_28 = {
    /** @type {typeof __VLS_27.click} */
    onClick: (__VLS_ctx.load),
};
/** @type {__VLS_StyleScopedClasses['position-absolute']} */ ;
var __VLS_25;
var __VLS_26;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "overflow-y-auto flex-grow-1" },
});
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
for (const [summary] of __VLS_vFor((__VLS_ctx.filteredSummaries))) {
    const __VLS_29 = SummaryItem;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        ...{ 'onExport': {} },
        ...{ 'onDelete': {} },
        key: (summary._id),
        summary: (summary),
    }));
    const __VLS_31 = __VLS_30({
        ...{ 'onExport': {} },
        ...{ 'onDelete': {} },
        key: (summary._id),
        summary: (summary),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    let __VLS_34;
    const __VLS_35 = {
        /** @type {typeof __VLS_34.export} */
        onExport: (__VLS_ctx.handleExport),
    };
    const __VLS_36 = {
        /** @type {typeof __VLS_34.delete} */
        onDelete: (__VLS_ctx.confirmDelete),
    };
    var __VLS_32;
    var __VLS_33;
    // @ts-ignore
    [summaryCategories, handleSearch, summaryStore, load, filteredSummaries, handleExport, confirmDelete,];
}
if (!__VLS_ctx.summaryStore.isLoading && __VLS_ctx.filteredSummaries.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center py-10" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        size: "48",
        color: "grey-lighten-1",
    }));
    const __VLS_39 = __VLS_38({
        size: "48",
        color: "grey-lighten-1",
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    const { default: __VLS_42 } = __VLS_40.slots;
    // @ts-ignore
    [summaryStore, filteredSummaries,];
    var __VLS_40;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-medium-emphasis mt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex justify-center ga-3 mt-4 mb-6" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    ...{ 'onClick': {} },
    color: "secondary",
    ...{ class: "text-caption text-uppercase" },
    variant: "tonal",
    rounded: "xl",
}));
const __VLS_45 = __VLS_44({
    ...{ 'onClick': {} },
    color: "secondary",
    ...{ class: "text-caption text-uppercase" },
    variant: "tonal",
    rounded: "xl",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
let __VLS_48;
const __VLS_49 = {
    /** @type {typeof __VLS_48.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.instantDialog = true);
        // @ts-ignore
        [instantDialog,];
    },
};
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-uppercase']} */ ;
const { default: __VLS_50 } = __VLS_46.slots;
// @ts-ignore
[];
var __VLS_46;
var __VLS_47;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    ...{ 'onClick': {} },
    color: "secondary",
    ...{ class: "text-caption text-uppercase" },
    variant: "flat",
    rounded: "xl",
    loading: (__VLS_ctx.summaryStore.isGenerating),
}));
const __VLS_53 = __VLS_52({
    ...{ 'onClick': {} },
    color: "secondary",
    ...{ class: "text-caption text-uppercase" },
    variant: "flat",
    rounded: "xl",
    loading: (__VLS_ctx.summaryStore.isGenerating),
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
let __VLS_56;
const __VLS_57 = {
    /** @type {typeof __VLS_56.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.generateDialog = true);
        // @ts-ignore
        [summaryStore, generateDialog,];
    },
};
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-uppercase']} */ ;
const { default: __VLS_58 } = __VLS_54.slots;
// @ts-ignore
[];
var __VLS_54;
var __VLS_55;
const __VLS_59 = GenerateSummaryDialog;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
    modelValue: (__VLS_ctx.instantDialog),
}));
const __VLS_61 = __VLS_60({
    modelValue: (__VLS_ctx.instantDialog),
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
let __VLS_64;
/** @ts-ignore @type { | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog'] | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog']} */
vDialog;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    modelValue: (__VLS_ctx.generateDialog),
    ...{ class: "w-xs-75 w-sm-66" },
}));
const __VLS_66 = __VLS_65({
    modelValue: (__VLS_ctx.generateDialog),
    ...{ class: "w-xs-75 w-sm-66" },
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
/** @type {__VLS_StyleScopedClasses['w-xs-75']} */ ;
/** @type {__VLS_StyleScopedClasses['w-sm-66']} */ ;
const { default: __VLS_69 } = __VLS_67.slots;
let __VLS_70;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
    rounded: "lg",
    ...{ class: "pa-4" },
}));
const __VLS_72 = __VLS_71({
    rounded: "lg",
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
const { default: __VLS_75 } = __VLS_73.slots;
if (!__VLS_ctx.generatedPreview) {
    let __VLS_76;
    /** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
    vCardTitle;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
        ...{ class: "font-weight-bold text-body-1 pa-0 mb-4" },
    }));
    const __VLS_78 = __VLS_77({
        ...{ class: "font-weight-bold text-body-1 pa-0 mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    const { default: __VLS_81 } = __VLS_79.slots;
    // @ts-ignore
    [instantDialog, generateDialog, generatedPreview,];
    var __VLS_79;
    let __VLS_82;
    /** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
    vCardText;
    // @ts-ignore
    const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
        ...{ class: "pa-0 text-body-2 text-medium-emphasis mb-4" },
    }));
    const __VLS_84 = __VLS_83({
        ...{ class: "pa-0 text-body-2 text-medium-emphasis mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_83));
    /** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    const { default: __VLS_87 } = __VLS_85.slots;
    // @ts-ignore
    [];
    var __VLS_85;
    let __VLS_88;
    /** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
    vRow;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({
        dense: true,
    }));
    const __VLS_90 = __VLS_89({
        dense: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    const { default: __VLS_93 } = __VLS_91.slots;
    for (const [type] of __VLS_vFor((__VLS_ctx.summaryTypes))) {
        let __VLS_94;
        /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
        vCol;
        // @ts-ignore
        const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
            key: (type),
            cols: "6",
        }));
        const __VLS_96 = __VLS_95({
            key: (type),
            cols: "6",
        }, ...__VLS_functionalComponentArgsRest(__VLS_95));
        const { default: __VLS_99 } = __VLS_97.slots;
        let __VLS_100;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({
            ...{ 'onClick': {} },
            color: (__VLS_ctx.selectedType === type ? 'secondary' : 'default'),
            variant: (__VLS_ctx.selectedType === type ? 'flat' : 'outlined'),
            block: true,
            rounded: "lg",
            ...{ class: "text-none" },
        }));
        const __VLS_102 = __VLS_101({
            ...{ 'onClick': {} },
            color: (__VLS_ctx.selectedType === type ? 'secondary' : 'default'),
            variant: (__VLS_ctx.selectedType === type ? 'flat' : 'outlined'),
            block: true,
            rounded: "lg",
            ...{ class: "text-none" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_101));
        let __VLS_105;
        const __VLS_106 = {
            /** @type {typeof __VLS_105.click} */
            onClick: (...[$event]) => {
                if (!(!__VLS_ctx.generatedPreview))
                    throw 0;
                return (__VLS_ctx.selectedType = type);
                // @ts-ignore
                [summaryTypes, selectedType, selectedType, selectedType,];
            },
        };
        /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
        const { default: __VLS_107 } = __VLS_103.slots;
        (type);
        // @ts-ignore
        [];
        var __VLS_103;
        var __VLS_104;
        // @ts-ignore
        [];
        var __VLS_97;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_91;
    if (__VLS_ctx.selectedType) {
        let __VLS_108;
        /** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
        vRow;
        // @ts-ignore
        const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
            dense: true,
            ...{ class: "mt-2" },
        }));
        const __VLS_110 = __VLS_109({
            dense: true,
            ...{ class: "mt-2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_109));
        /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
        const { default: __VLS_113 } = __VLS_111.slots;
        let __VLS_114;
        /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
        vCol;
        // @ts-ignore
        const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
            cols: "12",
        }));
        const __VLS_116 = __VLS_115({
            cols: "12",
        }, ...__VLS_functionalComponentArgsRest(__VLS_115));
        const { default: __VLS_119 } = __VLS_117.slots;
        if (__VLS_ctx.selectedType === 'Daily' || __VLS_ctx.selectedType === 'Weekly') {
            let __VLS_120;
            /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
            vTextField;
            // @ts-ignore
            const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({
                modelValue: (__VLS_ctx.selectedDate),
                variant: "outlined",
                label: (__VLS_ctx.selectedType === 'Daily' ? 'Date' : 'Any date within the week'),
                type: "date",
                density: "comfortable",
                color: "secondary",
                hint: "Pick the day you want to summarize",
                persistentHint: true,
            }));
            const __VLS_122 = __VLS_121({
                modelValue: (__VLS_ctx.selectedDate),
                variant: "outlined",
                label: (__VLS_ctx.selectedType === 'Daily' ? 'Date' : 'Any date within the week'),
                type: "date",
                density: "comfortable",
                color: "secondary",
                hint: "Pick the day you want to summarize",
                persistentHint: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_121));
        }
        else if (__VLS_ctx.selectedType === 'Monthly') {
            let __VLS_125;
            /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
            vTextField;
            // @ts-ignore
            const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({
                modelValue: (__VLS_ctx.selectedDate),
                variant: "outlined",
                label: "Month",
                type: "month",
                density: "comfortable",
                color: "secondary",
                hint: "Pick the month you want to summarize",
                persistentHint: true,
            }));
            const __VLS_127 = __VLS_126({
                modelValue: (__VLS_ctx.selectedDate),
                variant: "outlined",
                label: "Month",
                type: "month",
                density: "comfortable",
                color: "secondary",
                hint: "Pick the month you want to summarize",
                persistentHint: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_126));
        }
        else if (__VLS_ctx.selectedType === 'Yearly') {
            let __VLS_130;
            /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
            vTextField;
            // @ts-ignore
            const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
                modelValue: (__VLS_ctx.selectedDate),
                variant: "outlined",
                label: "Year",
                type: "number",
                density: "comfortable",
                color: "secondary",
                min: (1970),
                max: (2100),
                hint: "Pick the year you want to summarize",
                persistentHint: true,
            }));
            const __VLS_132 = __VLS_131({
                modelValue: (__VLS_ctx.selectedDate),
                variant: "outlined",
                label: "Year",
                type: "number",
                density: "comfortable",
                color: "secondary",
                min: (1970),
                max: (2100),
                hint: "Pick the year you want to summarize",
                persistentHint: true,
            }, ...__VLS_functionalComponentArgsRest(__VLS_131));
        }
        // @ts-ignore
        [selectedType, selectedType, selectedType, selectedType, selectedType, selectedType, selectedDate, selectedDate, selectedDate,];
        var __VLS_117;
        // @ts-ignore
        [];
        var __VLS_111;
    }
    let __VLS_135;
    /** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
    vCardActions;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent1(__VLS_135, new __VLS_135({
        ...{ class: "justify-end ga-2 pa-0 mt-4" },
    }));
    const __VLS_137 = __VLS_136({
        ...{ class: "justify-end ga-2 pa-0 mt-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    const { default: __VLS_140 } = __VLS_138.slots;
    let __VLS_141;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_142 = __VLS_asFunctionalComponent1(__VLS_141, new __VLS_141({
        ...{ 'onClick': {} },
        variant: "text",
    }));
    const __VLS_143 = __VLS_142({
        ...{ 'onClick': {} },
        variant: "text",
    }, ...__VLS_functionalComponentArgsRest(__VLS_142));
    let __VLS_146;
    const __VLS_147 = {
        /** @type {typeof __VLS_146.click} */
        onClick: (...[$event]) => {
            if (!(!__VLS_ctx.generatedPreview))
                throw 0;
            return (__VLS_ctx.generateDialog = false);
            // @ts-ignore
            [generateDialog,];
        },
    };
    const { default: __VLS_148 } = __VLS_144.slots;
    // @ts-ignore
    [];
    var __VLS_144;
    var __VLS_145;
    let __VLS_149;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({
        ...{ 'onClick': {} },
        color: "secondary",
        variant: "flat",
        rounded: "lg",
        disabled: (!__VLS_ctx.selectedType || !__VLS_ctx.selectedDate),
        loading: (__VLS_ctx.summaryStore.isGenerating),
    }));
    const __VLS_151 = __VLS_150({
        ...{ 'onClick': {} },
        color: "secondary",
        variant: "flat",
        rounded: "lg",
        disabled: (!__VLS_ctx.selectedType || !__VLS_ctx.selectedDate),
        loading: (__VLS_ctx.summaryStore.isGenerating),
    }, ...__VLS_functionalComponentArgsRest(__VLS_150));
    let __VLS_154;
    const __VLS_155 = {
        /** @type {typeof __VLS_154.click} */
        onClick: (__VLS_ctx.handleGenerate),
    };
    const { default: __VLS_156 } = __VLS_152.slots;
    // @ts-ignore
    [summaryStore, selectedType, selectedDate, handleGenerate,];
    var __VLS_152;
    var __VLS_153;
    // @ts-ignore
    [];
    var __VLS_138;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-2 mb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
    let __VLS_157;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_158 = __VLS_asFunctionalComponent1(__VLS_157, new __VLS_157({
        ...{ 'onClick': {} },
        icon: "mdi-arrow-left",
        size: "x-small",
        variant: "text",
        color: "secondary",
    }));
    const __VLS_159 = __VLS_158({
        ...{ 'onClick': {} },
        icon: "mdi-arrow-left",
        size: "x-small",
        variant: "text",
        color: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_158));
    let __VLS_162;
    const __VLS_163 = {
        /** @type {typeof __VLS_162.click} */
        onClick: (...[$event]) => {
            if (!!(!__VLS_ctx.generatedPreview))
                throw 0;
            return (__VLS_ctx.generatedPreview = null);
            // @ts-ignore
            [generatedPreview,];
        },
    };
    var __VLS_160;
    var __VLS_161;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-body-2 font-weight-medium text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    const __VLS_164 = SummaryItem;
    // @ts-ignore
    const __VLS_165 = __VLS_asFunctionalComponent1(__VLS_164, new __VLS_164({
        ...{ 'onExport': {} },
        ...{ 'onDelete': {} },
        summary: (__VLS_ctx.generatedPreview),
    }));
    const __VLS_166 = __VLS_165({
        ...{ 'onExport': {} },
        ...{ 'onDelete': {} },
        summary: (__VLS_ctx.generatedPreview),
    }, ...__VLS_functionalComponentArgsRest(__VLS_165));
    let __VLS_169;
    const __VLS_170 = {
        /** @type {typeof __VLS_169.export} */
        onExport: (__VLS_ctx.handleExport),
    };
    const __VLS_171 = {
        /** @type {typeof __VLS_169.delete} */
        onDelete: (() => { }),
    };
    var __VLS_167;
    var __VLS_168;
    let __VLS_172;
    /** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
    vCardActions;
    // @ts-ignore
    const __VLS_173 = __VLS_asFunctionalComponent1(__VLS_172, new __VLS_172({
        ...{ class: "justify-end pa-0 mt-2" },
    }));
    const __VLS_174 = __VLS_173({
        ...{ class: "justify-end pa-0 mt-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_173));
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    const { default: __VLS_177 } = __VLS_175.slots;
    let __VLS_178;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_179 = __VLS_asFunctionalComponent1(__VLS_178, new __VLS_178({
        ...{ 'onClick': {} },
        color: "secondary",
        variant: "flat",
        rounded: "lg",
    }));
    const __VLS_180 = __VLS_179({
        ...{ 'onClick': {} },
        color: "secondary",
        variant: "flat",
        rounded: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_179));
    let __VLS_183;
    const __VLS_184 = {
        /** @type {typeof __VLS_183.click} */
        onClick: (...[$event]) => {
            if (!!(!__VLS_ctx.generatedPreview))
                throw 0;
            return (__VLS_ctx.generateDialog = false);
            // @ts-ignore
            [handleExport, generateDialog, generatedPreview,];
        },
    };
    const { default: __VLS_185 } = __VLS_181.slots;
    // @ts-ignore
    [];
    var __VLS_181;
    var __VLS_182;
    // @ts-ignore
    [];
    var __VLS_175;
}
// @ts-ignore
[];
var __VLS_73;
// @ts-ignore
[];
var __VLS_67;
let __VLS_186;
/** @ts-ignore @type { | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog'] | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog']} */
vDialog;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "300",
}));
const __VLS_188 = __VLS_187({
    modelValue: (__VLS_ctx.deleteDialog),
    maxWidth: "300",
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
const { default: __VLS_191 } = __VLS_189.slots;
let __VLS_192;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({
    rounded: "lg",
    ...{ class: "pa-4" },
}));
const __VLS_194 = __VLS_193({
    rounded: "lg",
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_193));
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
const { default: __VLS_197 } = __VLS_195.slots;
let __VLS_198;
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent1(__VLS_198, new __VLS_198({
    ...{ class: "text-body-1 font-weight-bold" },
}));
const __VLS_200 = __VLS_199({
    ...{ class: "text-body-1 font-weight-bold" },
}, ...__VLS_functionalComponentArgsRest(__VLS_199));
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
const { default: __VLS_203 } = __VLS_201.slots;
// @ts-ignore
[deleteDialog,];
var __VLS_201;
let __VLS_204;
/** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
vCardText;
// @ts-ignore
const __VLS_205 = __VLS_asFunctionalComponent1(__VLS_204, new __VLS_204({}));
const __VLS_206 = __VLS_205({}, ...__VLS_functionalComponentArgsRest(__VLS_205));
const { default: __VLS_209 } = __VLS_207.slots;
// @ts-ignore
[];
var __VLS_207;
let __VLS_210;
/** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
vCardActions;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent1(__VLS_210, new __VLS_210({
    ...{ class: "justify-end ga-2" },
}));
const __VLS_212 = __VLS_211({
    ...{ class: "justify-end ga-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_211));
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
const { default: __VLS_215 } = __VLS_213.slots;
let __VLS_216;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent1(__VLS_216, new __VLS_216({
    ...{ 'onClick': {} },
    variant: "text",
}));
const __VLS_218 = __VLS_217({
    ...{ 'onClick': {} },
    variant: "text",
}, ...__VLS_functionalComponentArgsRest(__VLS_217));
let __VLS_221;
const __VLS_222 = {
    /** @type {typeof __VLS_221.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.deleteDialog = false);
        // @ts-ignore
        [deleteDialog,];
    },
};
const { default: __VLS_223 } = __VLS_219.slots;
// @ts-ignore
[];
var __VLS_219;
var __VLS_220;
let __VLS_224;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_225 = __VLS_asFunctionalComponent1(__VLS_224, new __VLS_224({
    ...{ 'onClick': {} },
    color: "error",
    variant: "flat",
    rounded: "lg",
}));
const __VLS_226 = __VLS_225({
    ...{ 'onClick': {} },
    color: "error",
    variant: "flat",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_225));
let __VLS_229;
const __VLS_230 = {
    /** @type {typeof __VLS_229.click} */
    onClick: (__VLS_ctx.handleDelete),
};
const { default: __VLS_231 } = __VLS_227.slots;
// @ts-ignore
[handleDelete,];
var __VLS_227;
var __VLS_228;
// @ts-ignore
[];
var __VLS_213;
// @ts-ignore
[];
var __VLS_195;
// @ts-ignore
[];
var __VLS_189;
let __VLS_232;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_233 = __VLS_asFunctionalComponent1(__VLS_232, new __VLS_232({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}));
const __VLS_234 = __VLS_233({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}, ...__VLS_functionalComponentArgsRest(__VLS_233));
const { default: __VLS_237 } = __VLS_235.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_235;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
