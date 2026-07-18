import { ref, reactive, watch } from "vue";
import { useExpenseStore } from "@/stores/expense.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
const open = defineModel({ required: true });
const props = defineProps();
const emit = defineEmits();
const expenseStore = useExpenseStore();
const formRef = ref();
const form = reactive({
    date: "",
    amount: null,
    item: "",
    vendor: "",
    isBill: false,
    currency: "NGN",
});
const snackbar = reactive({ show: false, message: "", color: "success" });
const required = (v) => !!v || "This field is required";
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
watch(() => props.expense, (expense) => {
    if (!expense)
        return;
    form.date = expense.date ? new Date(expense.date).toISOString().split("T")[0] : "";
    form.amount = expense.amount;
    form.item = expense.item;
    form.vendor = expense.vendor?.name ?? "";
    form.isBill = expense.isBill;
    form.currency = expense.currency ?? "NGN";
}, { immediate: true });
watch(open, (isOpen) => {
    if (!isOpen) {
        form.date = "";
        form.amount = null;
        form.item = "";
        form.vendor = "";
        form.isBill = false;
        form.currency = "NGN";
        snackbar.show = false;
    }
});
async function submit() {
    const { valid } = await formRef.value.validate();
    if (!valid || !props.expense)
        return;
    try {
        await expenseStore.updateExpense(props.expense._id, {
            date: form.date || null,
            amount: form.amount,
            item: form.item,
            vendor: form.vendor,
            isBill: form.isBill,
            currency: form.currency,
        });
        showSnackbar("Expense updated successfully!", "success");
        emit("updated");
        setTimeout(() => { open.value = false; }, 1000);
    }
    catch (err) {
        showSnackbar(err.message || "Failed to update expense.", "error");
    }
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
/** @type {__VLS_StyleScopedClasses['w-xs-75']} */ ;
/** @type {__VLS_StyleScopedClasses['w-sm-66']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
const __VLS_12 = DialogHeaderComponent;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    title: "Edit Expense",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_14 = __VLS_13({
    title: "Edit Expense",
    modelValue: (__VLS_ctx.open),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form'] | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form']} */
vForm;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    ref: "formRef",
}));
const __VLS_19 = __VLS_18({
    ref: "formRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
var __VLS_22;
const { default: __VLS_24 } = __VLS_20.slots;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.form.date),
    variant: "outlined",
    label: "Date",
    type: "date",
    density: "comfortable",
    color: "secondary",
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.form.date),
    variant: "outlined",
    label: "Date",
    type: "date",
    density: "comfortable",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.form.amount),
    variant: "outlined",
    label: "Amount (₦)",
    type: "number",
    step: "1000",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.form.amount),
    variant: "outlined",
    label: "Amount (₦)",
    type: "number",
    step: "1000",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
{
    const { 'append-inner': __VLS_36 } = __VLS_33.slots;
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        ...{ 'onClick': {} },
        size: "x-small",
        variant: "tonal",
        color: "secondary",
        rounded: "lg",
        ...{ class: "text-caption font-weight-bold" },
    }));
    const __VLS_39 = __VLS_38({
        ...{ 'onClick': {} },
        size: "x-small",
        variant: "tonal",
        color: "secondary",
        rounded: "lg",
        ...{ class: "text-caption font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    let __VLS_42;
    const __VLS_43 = {
        /** @type {typeof __VLS_42.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.form.amount = __VLS_ctx.form.amount ? Number(__VLS_ctx.form.amount) * 1000 : 1000);
            // @ts-ignore
            [open, open, form, form, form, form, form, required,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    const { default: __VLS_44 } = __VLS_40.slots;
    // @ts-ignore
    [];
    var __VLS_40;
    var __VLS_41;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_33;
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    modelValue: (__VLS_ctx.form.item),
    variant: "outlined",
    label: "Item",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}));
const __VLS_47 = __VLS_46({
    modelValue: (__VLS_ctx.form.item),
    variant: "outlined",
    label: "Item",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    modelValue: (__VLS_ctx.form.vendor),
    variant: "outlined",
    label: "Vendor (optional)",
    density: "comfortable",
    color: "secondary",
}));
const __VLS_52 = __VLS_51({
    modelValue: (__VLS_ctx.form.vendor),
    variant: "outlined",
    label: "Vendor (optional)",
    density: "comfortable",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.vCheckbox | typeof __VLS_components.VCheckbox | typeof __VLS_components['v-checkbox']} */
vCheckbox;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    modelValue: (__VLS_ctx.form.isBill),
    label: "This is a bill",
    color: "secondary",
    density: "comfortable",
    hideDetails: true,
    ...{ class: "mb-2" },
}));
const __VLS_57 = __VLS_56({
    modelValue: (__VLS_ctx.form.isBill),
    label: "This is a bill",
    color: "secondary",
    density: "comfortable",
    hideDetails: true,
    ...{ class: "mb-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
// @ts-ignore
[form, form, form, required,];
var __VLS_20;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    dense: true,
}));
const __VLS_62 = __VLS_61({
    dense: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_65 } = __VLS_63.slots;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    cols: "6",
}));
const __VLS_68 = __VLS_67({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_71 } = __VLS_69.slots;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}));
const __VLS_74 = __VLS_73({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_77;
const __VLS_78 = {
    /** @type {typeof __VLS_77.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.open = false);
        // @ts-ignore
        [open,];
    },
};
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_79 } = __VLS_75.slots;
// @ts-ignore
[];
var __VLS_75;
var __VLS_76;
// @ts-ignore
[];
var __VLS_69;
let __VLS_80;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
    cols: "6",
}));
const __VLS_82 = __VLS_81({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
const { default: __VLS_85 } = __VLS_83.slots;
let __VLS_86;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.expenseStore.isLoading),
}));
const __VLS_88 = __VLS_87({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.expenseStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
let __VLS_91;
const __VLS_92 = {
    /** @type {typeof __VLS_91.click} */
    onClick: (__VLS_ctx.submit),
};
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_93 } = __VLS_89.slots;
// @ts-ignore
[expenseStore, submit,];
var __VLS_89;
var __VLS_90;
// @ts-ignore
[];
var __VLS_83;
// @ts-ignore
[];
var __VLS_63;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}));
const __VLS_96 = __VLS_95({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
const { default: __VLS_99 } = __VLS_97.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_97;
// @ts-ignore
var __VLS_23 = __VLS_22;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
