import { ref, reactive, watch } from "vue";
import { useIncomeStore } from "@/stores/income.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
const open = defineModel({ required: true });
const props = defineProps();
const emit = defineEmits();
const incomeStore = useIncomeStore();
const formRef = ref();
const form = reactive({
    date: "",
    amount: null,
    sender: "",
    purpose: "",
    currency: "NGN",
});
const snackbar = reactive({ show: false, message: "", color: "success" });
const required = (v) => !!v || "This field is required";
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
watch(() => props.income, (income) => {
    if (!income)
        return;
    form.date = income.date ? new Date(income.date).toISOString().split("T")[0] : "";
    form.amount = income.amount;
    form.sender = income.sender;
    form.purpose = income.purpose ?? "";
    form.currency = income.currency ?? "NGN";
}, { immediate: true });
watch(open, (isOpen) => {
    if (!isOpen) {
        form.date = "";
        form.amount = null;
        form.sender = "";
        form.purpose = "";
        form.currency = "NGN";
        snackbar.show = false;
    }
});
async function submit() {
    const { valid } = await formRef.value.validate();
    if (!valid || !props.income)
        return;
    try {
        await incomeStore.updateIncome(props.income._id, {
            date: form.date || null,
            amount: form.amount,
            sender: form.sender,
            purpose: form.purpose,
            currency: form.currency,
        });
        showSnackbar("Income updated successfully!", "success");
        emit("updated");
        setTimeout(() => {
            open.value = false;
        }, 1000);
    }
    catch (err) {
        showSnackbar(err.message || "Failed to update income.", "error");
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
    title: "Edit Income",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_14 = __VLS_13({
    title: "Edit Income",
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
    modelValue: (__VLS_ctx.form.sender),
    variant: "outlined",
    label: "Sender",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}));
const __VLS_47 = __VLS_46({
    modelValue: (__VLS_ctx.form.sender),
    variant: "outlined",
    label: "Sender",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    modelValue: (__VLS_ctx.form.purpose),
    variant: "outlined",
    label: "Purpose (optional)",
    density: "comfortable",
    color: "secondary",
}));
const __VLS_52 = __VLS_51({
    modelValue: (__VLS_ctx.form.purpose),
    variant: "outlined",
    label: "Purpose (optional)",
    density: "comfortable",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
// @ts-ignore
[form, form, required,];
var __VLS_20;
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    dense: true,
}));
const __VLS_57 = __VLS_56({
    dense: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_60 } = __VLS_58.slots;
let __VLS_61;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
    cols: "6",
}));
const __VLS_63 = __VLS_62({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
const { default: __VLS_66 } = __VLS_64.slots;
let __VLS_67;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}));
const __VLS_69 = __VLS_68({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
let __VLS_72;
const __VLS_73 = {
    /** @type {typeof __VLS_72.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.open = false);
        // @ts-ignore
        [open,];
    },
};
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_74 } = __VLS_70.slots;
// @ts-ignore
[];
var __VLS_70;
var __VLS_71;
// @ts-ignore
[];
var __VLS_64;
let __VLS_75;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
    cols: "6",
}));
const __VLS_77 = __VLS_76({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
const { default: __VLS_80 } = __VLS_78.slots;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.incomeStore.isLoading),
}));
const __VLS_83 = __VLS_82({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.incomeStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
let __VLS_86;
const __VLS_87 = {
    /** @type {typeof __VLS_86.click} */
    onClick: (__VLS_ctx.submit),
};
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_88 } = __VLS_84.slots;
// @ts-ignore
[incomeStore, submit,];
var __VLS_84;
var __VLS_85;
// @ts-ignore
[];
var __VLS_78;
// @ts-ignore
[];
var __VLS_58;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}));
const __VLS_91 = __VLS_90({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
const { default: __VLS_94 } = __VLS_92.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_92;
// @ts-ignore
var __VLS_23 = __VLS_22;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
