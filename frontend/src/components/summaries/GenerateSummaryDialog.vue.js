import { ref, reactive, computed, watch } from "vue";
import { useIncomeStore } from "@/stores/income.store";
import { useExpenseStore } from "@/stores/expense.store";
import { useRCDataStore } from "@/stores/rcdata.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
import SummaryItem from "@/components/summaries/SummaryItem.vue";
const open = defineModel({ required: true });
const props = defineProps();
const incomeStore = useIncomeStore();
const expenseStore = useExpenseStore();
const rcDataStore = useRCDataStore();
const types = [
    {
        label: "Daily",
        icon: "mdi-calendar-today",
        description: "A day's work",
    },
    {
        label: "Weekly",
        icon: "mdi-calendar-week",
        description: "The past 7 days",
    },
    {
        label: "Monthly",
        icon: "mdi-calendar-month",
        description: "The month so far",
    },
];
const selected = ref(null);
const preview = ref(null);
const loading = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });
function resetDialog() {
    selected.value = null;
    preview.value = null;
    loading.value = false;
    snackbar.show = false;
}
watch(open, (isOpen) => {
    if (!isOpen) {
        resetDialog();
    }
});
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
// Compute date range based on selected type
function getDateRange(type) {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    const start = new Date(now);
    if (type === "Daily") {
        start.setHours(0, 0, 0, 0);
    }
    else if (type === "Weekly") {
        start.setDate(start.getDate() - 6);
        start.setHours(0, 0, 0, 0);
    }
    else if (type === "Monthly") {
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
    }
    return { start, end };
}
const periodRangeLabel = computed(() => {
    if (!selected.value)
        return "";
    const { start, end } = getDateRange(selected.value);
    const fmt = (d) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
    if (selected.value === "Daily")
        return fmt(start);
    return `${fmt(start)} — ${fmt(end)}`;
});
function inRange(dateStr, start, end) {
    const d = new Date(dateStr);
    return d >= start && d <= end;
}
async function generate() {
    if (!selected.value)
        return;
    loading.value = true;
    try {
        // Ensure stores are loaded
        await Promise.all([
            incomeStore.incomes.length === 0 ? incomeStore.getIncomes() : Promise.resolve(),
            expenseStore.expenses.length === 0 ? expenseStore.getExpenses() : Promise.resolve(),
            rcDataStore.records.length === 0 ? rcDataStore.getRCData() : Promise.resolve(),
        ]);
        const { start, end } = getDateRange(selected.value);
        // Filter records to the date range
        const incomes = incomeStore.incomes.filter((i) => inRange(i.date, start, end));
        const expenses = expenseStore.expenses.filter((e) => inRange(e.date, start, end));
        const rcdata = rcDataStore.records.filter((r) => inRange(r.date, start, end));
        // Compute totals
        const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
        const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
        const totalAirtime = rcdata
            .filter((r) => r.type === "airtime")
            .reduce((s, r) => s + r.amount.amount, 0);
        const totalDataMB = rcdata
            .filter((r) => r.type === "data")
            .reduce((s, r) => s + (r.amount.size === "GB" ? r.amount.amount * 1024 : r.amount.amount), 0);
        // Build a Summary-shaped object for SummaryItem
        preview.value = {
            _id: "instant",
            user: "",
            timeframe: selected.value,
            category: "Income",
            currency: "NGN",
            period: { start: start.toISOString(), end: end.toISOString() },
            data: [
                { category: "Income", total: totalIncome },
                { category: "Expenses", total: totalExpense },
                { category: "Difference", total: totalIncome - totalExpense },
                { category: "Airtime", total: totalAirtime },
                { category: "DataMB", total: totalDataMB },
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    }
    catch (err) {
        showSnackbar(err.message || "Failed to generate summary.", "error");
    }
    finally {
        loading.value = false;
    }
}
function handleExport(summary) {
    console.log("Export:", summary);
}
let __VLS_modelEmit;
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog'] | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog']} */
vDialog;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.open),
    ...{ class: "w-xs-75 w-sm-66" },
    scrim: "true",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.open),
    ...{ class: "w-xs-75 w-sm-66" },
    scrim: "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['w-xs-75']} */ ;
/** @type {__VLS_StyleScopedClasses['w-sm-66']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
const __VLS_13 = DialogHeaderComponent;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    title: "Instant Summary",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_15 = __VLS_14({
    title: "Instant Summary",
    modelValue: (__VLS_ctx.open),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
if (!__VLS_ctx.preview) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-body-2 text-medium-emphasis text-center" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
    vRow;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        dense: true,
    }));
    const __VLS_20 = __VLS_19({
        dense: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const { default: __VLS_23 } = __VLS_21.slots;
    for (const [type] of __VLS_vFor((__VLS_ctx.types))) {
        let __VLS_24;
        /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
        vCol;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
            key: (type.label),
            cols: "12",
        }));
        const __VLS_26 = __VLS_25({
            key: (type.label),
            cols: "12",
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        const { default: __VLS_29 } = __VLS_27.slots;
        let __VLS_30;
        /** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
        vCard;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
            ...{ 'onClick': {} },
            variant: "outlined",
            rounded: "lg",
            ...{ class: "pa-3 d-flex align-center ga-3 cursor-pointer" },
            ...{ class: ({ 'border-secondary': __VLS_ctx.selected === type.label }) },
        }));
        const __VLS_32 = __VLS_31({
            ...{ 'onClick': {} },
            variant: "outlined",
            rounded: "lg",
            ...{ class: "pa-3 d-flex align-center ga-3 cursor-pointer" },
            ...{ class: ({ 'border-secondary': __VLS_ctx.selected === type.label }) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        let __VLS_35;
        const __VLS_36 = {
            /** @type {typeof __VLS_35.click} */
            onClick: (...[$event]) => {
                if (!(!__VLS_ctx.preview))
                    throw 0;
                return (__VLS_ctx.selected = type.label);
                // @ts-ignore
                [open, open, preview, types, selected, selected,];
            },
        };
        /** @type {__VLS_StyleScopedClasses['pa-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-3']} */ ;
        /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-secondary']} */ ;
        const { default: __VLS_37 } = __VLS_33.slots;
        let __VLS_38;
        /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
        vIcon;
        // @ts-ignore
        const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
            color: (__VLS_ctx.selected === type.label ? 'secondary' : 'grey'),
            size: "28",
        }));
        const __VLS_40 = __VLS_39({
            color: (__VLS_ctx.selected === type.label ? 'secondary' : 'grey'),
            size: "28",
        }, ...__VLS_functionalComponentArgsRest(__VLS_39));
        const { default: __VLS_43 } = __VLS_41.slots;
        (type.icon);
        // @ts-ignore
        [selected,];
        var __VLS_41;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex flex-column" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-body-2 font-weight-bold" },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        (type.label);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-caption text-medium-emphasis" },
        });
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
        (type.description);
        let __VLS_44;
        /** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
        vSpacer;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({}));
        const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
        if (__VLS_ctx.selected === type.label) {
            let __VLS_49;
            /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
            vIcon;
            // @ts-ignore
            const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
                color: "secondary",
                size: "20",
            }));
            const __VLS_51 = __VLS_50({
                color: "secondary",
                size: "20",
            }, ...__VLS_functionalComponentArgsRest(__VLS_50));
            const { default: __VLS_54 } = __VLS_52.slots;
            // @ts-ignore
            [selected,];
            var __VLS_52;
        }
        // @ts-ignore
        [];
        var __VLS_33;
        var __VLS_34;
        // @ts-ignore
        [];
        var __VLS_27;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_21;
    let __VLS_55;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
        ...{ 'onClick': {} },
        color: "secondary",
        variant: "flat",
        block: true,
        rounded: "lg",
        height: "44",
        ...{ class: "font-weight-bold text-none mt-2" },
        loading: (__VLS_ctx.loading),
        disabled: (!__VLS_ctx.selected),
    }));
    const __VLS_57 = __VLS_56({
        ...{ 'onClick': {} },
        color: "secondary",
        variant: "flat",
        block: true,
        rounded: "lg",
        height: "44",
        ...{ class: "font-weight-bold text-none mt-2" },
        loading: (__VLS_ctx.loading),
        disabled: (!__VLS_ctx.selected),
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    let __VLS_60;
    const __VLS_61 = {
        /** @type {typeof __VLS_60.click} */
        onClick: (__VLS_ctx.generate),
    };
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    const { default: __VLS_62 } = __VLS_58.slots;
    // @ts-ignore
    [selected, loading, generate,];
    var __VLS_58;
    var __VLS_59;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-2 mb-1" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
    let __VLS_63;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
        ...{ 'onClick': {} },
        icon: "mdi-arrow-left",
        size: "x-small",
        variant: "text",
        color: "secondary",
    }));
    const __VLS_65 = __VLS_64({
        ...{ 'onClick': {} },
        icon: "mdi-arrow-left",
        size: "x-small",
        variant: "text",
        color: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    let __VLS_68;
    const __VLS_69 = {
        /** @type {typeof __VLS_68.click} */
        onClick: (...[$event]) => {
            if (!!(!__VLS_ctx.preview))
                throw 0;
            return (__VLS_ctx.preview = null);
            // @ts-ignore
            [preview,];
        },
    };
    var __VLS_66;
    var __VLS_67;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-body-2 font-weight-medium text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (__VLS_ctx.periodRangeLabel);
    const __VLS_70 = SummaryItem;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
        ...{ 'onExport': {} },
        ...{ 'onDelete': {} },
        summary: (__VLS_ctx.preview),
        type: (props.type),
    }));
    const __VLS_72 = __VLS_71({
        ...{ 'onExport': {} },
        ...{ 'onDelete': {} },
        summary: (__VLS_ctx.preview),
        type: (props.type),
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    let __VLS_75;
    const __VLS_76 = {
        /** @type {typeof __VLS_75.export} */
        onExport: (__VLS_ctx.handleExport),
    };
    const __VLS_77 = {
        /** @type {typeof __VLS_75.delete} */
        onDelete: (() => { }),
    };
    var __VLS_73;
    var __VLS_74;
}
let __VLS_78;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}));
const __VLS_80 = __VLS_79({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
const { default: __VLS_83 } = __VLS_81.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[preview, periodRangeLabel, handleExport, snackbar, snackbar, snackbar,];
var __VLS_81;
// @ts-ignore
[];
var __VLS_10;
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
