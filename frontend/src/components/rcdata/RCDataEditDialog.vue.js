import { ref, reactive, watch } from "vue";
import { useRCDataStore } from "@/stores/rcdata.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
const open = defineModel({ required: true });
const props = defineProps();
const emit = defineEmits();
const rcDataStore = useRCDataStore();
const formRef = ref();
const networks = ["MTN", "Airtel", "Glo", "9mobile"];
const form = reactive({
    date: "",
    type: "airtime",
    network: "MTN",
    senderName: "",
    senderPhone: "",
    amountValue: null,
    size: "GB",
    currency: "NGN",
    remark: "",
});
const snackbar = reactive({ show: false, message: "", color: "success" });
const required = (v) => !!v || "This field is required";
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
watch(() => props.record, (record) => {
    if (!record)
        return;
    form.date = record.date ? new Date(record.date).toISOString().split("T")[0] : "";
    form.type = record.type;
    form.network = record.network;
    form.senderName = record.sender.name;
    form.senderPhone = record.sender.phone ?? "";
    form.amountValue = record.amount.amount;
    form.size = record.amount.size ?? "GB";
    form.currency = record.currency ?? "NGN";
    form.remark = record.remark ?? "";
}, { immediate: true });
watch(open, (isOpen) => {
    if (!isOpen) {
        form.date = "";
        form.type = "airtime";
        form.network = "MTN";
        form.senderName = "";
        form.senderPhone = "";
        form.amountValue = null;
        form.size = "GB";
        form.currency = "NGN";
        form.remark = "";
        snackbar.show = false;
    }
});
async function submit() {
    const { valid } = await formRef.value.validate();
    if (!valid || !props.record)
        return;
    try {
        await rcDataStore.updateRCData(props.record._id, {
            date: form.date || null,
            currency: form.currency,
            sender: { name: form.senderName, phone: form.senderPhone },
            amount: {
                amount: form.amountValue,
                currency: form.type === "airtime" ? form.currency : undefined,
                size: form.type === "data" ? form.size : undefined,
            },
            type: form.type,
            network: form.network,
            remark: form.remark,
        });
        showSnackbar("RC-Data updated successfully!", "success");
        emit("updated");
        setTimeout(() => {
            open.value = false;
        }, 1000);
    }
    catch (err) {
        showSnackbar(err.message || "Failed to update RC-Data.", "error");
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
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column overflow-y-auto gap-3" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column overflow-y-auto gap-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
const __VLS_12 = DialogHeaderComponent;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    title: "Edit RC-Data",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_14 = __VLS_13({
    title: "Edit RC-Data",
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
/** @ts-ignore @type { | typeof __VLS_components.vBtnToggle | typeof __VLS_components.VBtnToggle | typeof __VLS_components['v-btn-toggle'] | typeof __VLS_components.vBtnToggle | typeof __VLS_components.VBtnToggle | typeof __VLS_components['v-btn-toggle']} */
vBtnToggle;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.form.type),
    mandatory: true,
    color: "secondary",
    rounded: "lg",
    density: "comfortable",
    ...{ class: "mb-4 w-100" },
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.form.type),
    mandatory: true,
    color: "secondary",
    rounded: "lg",
    density: "comfortable",
    ...{ class: "mb-4 w-100" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    value: "airtime",
    ...{ class: "flex-grow-1" },
}));
const __VLS_38 = __VLS_37({
    value: "airtime",
    ...{ class: "flex-grow-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
const { default: __VLS_41 } = __VLS_39.slots;
// @ts-ignore
[open, open, form, form,];
var __VLS_39;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    value: "data",
    ...{ class: "flex-grow-1" },
}));
const __VLS_44 = __VLS_43({
    value: "data",
    ...{ class: "flex-grow-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
const { default: __VLS_47 } = __VLS_45.slots;
// @ts-ignore
[];
var __VLS_45;
// @ts-ignore
[];
var __VLS_33;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
vSelect;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    modelValue: (__VLS_ctx.form.network),
    items: (__VLS_ctx.networks),
    label: "Network",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
}));
const __VLS_50 = __VLS_49({
    modelValue: (__VLS_ctx.form.network),
    items: (__VLS_ctx.networks),
    label: "Network",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    modelValue: (__VLS_ctx.form.senderName),
    variant: "outlined",
    label: "Sender Name",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}));
const __VLS_55 = __VLS_54({
    modelValue: (__VLS_ctx.form.senderName),
    variant: "outlined",
    label: "Sender Name",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_58;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent1(__VLS_58, new __VLS_58({
    modelValue: (__VLS_ctx.form.senderPhone),
    variant: "outlined",
    label: "Sender Phone (optional)",
    density: "comfortable",
    color: "secondary",
}));
const __VLS_60 = __VLS_59({
    modelValue: (__VLS_ctx.form.senderPhone),
    variant: "outlined",
    label: "Sender Phone (optional)",
    density: "comfortable",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
if (__VLS_ctx.form.type === 'airtime') {
    let __VLS_63;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
        modelValue: (__VLS_ctx.form.amountValue),
        variant: "outlined",
        label: "Amount (₦)",
        type: "number",
        density: "comfortable",
        color: "secondary",
        rules: ([__VLS_ctx.required]),
    }));
    const __VLS_65 = __VLS_64({
        modelValue: (__VLS_ctx.form.amountValue),
        variant: "outlined",
        label: "Amount (₦)",
        type: "number",
        density: "comfortable",
        color: "secondary",
        rules: ([__VLS_ctx.required]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    const { default: __VLS_68 } = __VLS_66.slots;
    {
        const { 'append-inner': __VLS_69 } = __VLS_66.slots;
        let __VLS_70;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_71 = __VLS_asFunctionalComponent1(__VLS_70, new __VLS_70({
            ...{ 'onClick': {} },
            size: "x-small",
            variant: "tonal",
            color: "secondary",
            rounded: "lg",
            ...{ class: "text-caption font-weight-bold" },
        }));
        const __VLS_72 = __VLS_71({
            ...{ 'onClick': {} },
            size: "x-small",
            variant: "tonal",
            color: "secondary",
            rounded: "lg",
            ...{ class: "text-caption font-weight-bold" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_71));
        let __VLS_75;
        const __VLS_76 = {
            /** @type {typeof __VLS_75.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.form.type === 'airtime'))
                    throw 0;
                return (__VLS_ctx.form.amountValue = __VLS_ctx.form.amountValue
                    ? Number(__VLS_ctx.form.amountValue) * 1000
                    : 1000);
                // @ts-ignore
                [form, form, form, form, form, form, form, form, networks, required, required,];
            },
        };
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        const { default: __VLS_77 } = __VLS_73.slots;
        // @ts-ignore
        [];
        var __VLS_73;
        var __VLS_74;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_66;
}
else {
    let __VLS_78;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
        modelValue: (__VLS_ctx.form.amountValue),
        variant: "outlined",
        label: "Data Amount",
        type: "number",
        density: "comfortable",
        color: "secondary",
        rules: ([__VLS_ctx.required]),
    }));
    const __VLS_80 = __VLS_79({
        modelValue: (__VLS_ctx.form.amountValue),
        variant: "outlined",
        label: "Data Amount",
        type: "number",
        density: "comfortable",
        color: "secondary",
        rules: ([__VLS_ctx.required]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_79));
    let __VLS_83;
    /** @ts-ignore @type { | typeof __VLS_components.vBtnToggle | typeof __VLS_components.VBtnToggle | typeof __VLS_components['v-btn-toggle'] | typeof __VLS_components.vBtnToggle | typeof __VLS_components.VBtnToggle | typeof __VLS_components['v-btn-toggle']} */
    vBtnToggle;
    // @ts-ignore
    const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({
        modelValue: (__VLS_ctx.form.size),
        mandatory: true,
        color: "secondary",
        rounded: "lg",
        density: "comfortable",
        ...{ class: "mb-4 w-100" },
    }));
    const __VLS_85 = __VLS_84({
        modelValue: (__VLS_ctx.form.size),
        mandatory: true,
        color: "secondary",
        rounded: "lg",
        density: "comfortable",
        ...{ class: "mb-4 w-100" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_84));
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-100']} */ ;
    const { default: __VLS_88 } = __VLS_86.slots;
    let __VLS_89;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
        value: "MB",
        ...{ class: "flex-grow-1" },
    }));
    const __VLS_91 = __VLS_90({
        value: "MB",
        ...{ class: "flex-grow-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
    /** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
    const { default: __VLS_94 } = __VLS_92.slots;
    // @ts-ignore
    [form, form, required,];
    var __VLS_92;
    let __VLS_95;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
        value: "GB",
        ...{ class: "flex-grow-1" },
    }));
    const __VLS_97 = __VLS_96({
        value: "GB",
        ...{ class: "flex-grow-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_96));
    /** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
    const { default: __VLS_100 } = __VLS_98.slots;
    // @ts-ignore
    [];
    var __VLS_98;
    // @ts-ignore
    [];
    var __VLS_86;
}
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
    modelValue: (__VLS_ctx.form.remark),
    variant: "outlined",
    label: "Remark (optional)",
    density: "comfortable",
    color: "secondary",
}));
const __VLS_103 = __VLS_102({
    modelValue: (__VLS_ctx.form.remark),
    variant: "outlined",
    label: "Remark (optional)",
    density: "comfortable",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
// @ts-ignore
[form,];
var __VLS_20;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({
    dense: true,
}));
const __VLS_108 = __VLS_107({
    dense: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
const { default: __VLS_111 } = __VLS_109.slots;
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    cols: "6",
}));
const __VLS_114 = __VLS_113({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
const { default: __VLS_117 } = __VLS_115.slots;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}));
const __VLS_120 = __VLS_119({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
let __VLS_123;
const __VLS_124 = {
    /** @type {typeof __VLS_123.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.open = false);
        // @ts-ignore
        [open,];
    },
};
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_125 } = __VLS_121.slots;
// @ts-ignore
[];
var __VLS_121;
var __VLS_122;
// @ts-ignore
[];
var __VLS_115;
let __VLS_126;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
    cols: "6",
}));
const __VLS_128 = __VLS_127({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
const { default: __VLS_131 } = __VLS_129.slots;
let __VLS_132;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.rcDataStore.isLoading),
}));
const __VLS_134 = __VLS_133({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.rcDataStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_133));
let __VLS_137;
const __VLS_138 = {
    /** @type {typeof __VLS_137.click} */
    onClick: (__VLS_ctx.submit),
};
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_139 } = __VLS_135.slots;
// @ts-ignore
[rcDataStore, submit,];
var __VLS_135;
var __VLS_136;
// @ts-ignore
[];
var __VLS_129;
// @ts-ignore
[];
var __VLS_109;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_140;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_141 = __VLS_asFunctionalComponent1(__VLS_140, new __VLS_140({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}));
const __VLS_142 = __VLS_141({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}, ...__VLS_functionalComponentArgsRest(__VLS_141));
const { default: __VLS_145 } = __VLS_143.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_143;
// @ts-ignore
var __VLS_23 = __VLS_22;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
