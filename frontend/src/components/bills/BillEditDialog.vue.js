import { ref, reactive, watch } from "vue";
import { useBillTypeStore } from "@/stores/billtype.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
const open = defineModel({ required: true });
const props = defineProps();
const emit = defineEmits();
const billTypeStore = useBillTypeStore();
const formRef = ref();
const types = ["Electricity", "Accommodation", "Subscription", "Insurance", "Other"];
const recurrences = ["One-time", "Daily", "Weekly", "Monthly", "Yearly"];
const weekDays = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
];
const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
];
const form = reactive({
    name: "",
    type: "Other",
    total: null,
    currency: "NGN",
    recurrence: "Monthly",
    dueEvery: undefined,
    remark: "",
    markOverdue: false,
});
const snackbar = reactive({ show: false, message: "", color: "success" });
const required = (v) => !!v || "This field is required";
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
watch(() => props.bill, (bill) => {
    if (!bill)
        return;
    form.name = bill.name;
    form.type = bill.type;
    form.total = bill.total;
    form.currency = bill.currency ?? "NGN";
    form.recurrence = bill.recurrence;
    form.dueEvery = bill.dueEvery;
    form.remark = bill.remark ?? "";
    form.markOverdue = bill.status === "Overdue";
}, { immediate: true });
watch(open, (isOpen) => {
    if (!isOpen) {
        form.name = "";
        form.type = "Other";
        form.total = null;
        form.currency = "NGN";
        form.recurrence = "Monthly";
        form.dueEvery = undefined;
        form.remark = "";
        form.markOverdue = false;
        snackbar.show = false;
    }
});
async function submit() {
    const { valid } = await formRef.value.validate();
    if (!valid || !props.bill)
        return;
    try {
        await billTypeStore.updateBillType(props.bill._id, {
            name: form.name,
            type: form.type,
            total: form.total,
            currency: form.currency,
            recurrence: form.recurrence,
            dueEvery: form.dueEvery,
            remark: form.remark,
            status: form.markOverdue ? "Overdue" : undefined,
        });
        showSnackbar("Bill type updated successfully!", "success");
        emit("updated");
        setTimeout(() => {
            open.value = false;
        }, 1000);
    }
    catch (err) {
        showSnackbar(err.message || "Failed to update bill type.", "error");
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
    ...{ class: "w-xs-75 w-sm-66 overflow-y" },
    scrim: "true",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.open),
    ...{ class: "w-xs-75 w-sm-66 overflow-y" },
    scrim: "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['w-xs-75']} */ ;
/** @type {__VLS_StyleScopedClasses['w-sm-66']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
const __VLS_12 = DialogHeaderComponent;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    title: "Edit Bill Type",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_14 = __VLS_13({
    title: "Edit Bill Type",
    modelValue: (__VLS_ctx.open),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex flex-column w-100 px-1 overflow-y-auto overflow-x-hidden" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-hidden']} */ ;
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
    modelValue: (__VLS_ctx.form.name),
    variant: "outlined",
    label: "Bill Name",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.form.name),
    variant: "outlined",
    label: "Bill Name",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
vSelect;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    modelValue: (__VLS_ctx.form.type),
    items: (__VLS_ctx.types),
    label: "Type",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
}));
const __VLS_32 = __VLS_31({
    modelValue: (__VLS_ctx.form.type),
    items: (__VLS_ctx.types),
    label: "Type",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    modelValue: (__VLS_ctx.form.total),
    variant: "outlined",
    label: "Total Owed Per Cycle (₦)",
    type: "number",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}));
const __VLS_37 = __VLS_36({
    modelValue: (__VLS_ctx.form.total),
    variant: "outlined",
    label: "Total Owed Per Cycle (₦)",
    type: "number",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_40 } = __VLS_38.slots;
{
    const { 'append-inner': __VLS_41 } = __VLS_38.slots;
    let __VLS_42;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
        ...{ 'onClick': {} },
        size: "x-small",
        variant: "tonal",
        color: "secondary",
        rounded: "lg",
        ...{ class: "text-caption font-weight-bold" },
    }));
    const __VLS_44 = __VLS_43({
        ...{ 'onClick': {} },
        size: "x-small",
        variant: "tonal",
        color: "secondary",
        rounded: "lg",
        ...{ class: "text-caption font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    let __VLS_47;
    const __VLS_48 = {
        /** @type {typeof __VLS_47.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.form.total = __VLS_ctx.form.total ? Number(__VLS_ctx.form.total) * 1000 : 1000);
            // @ts-ignore
            [open, open, form, form, form, form, form, form, required, required, types,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    const { default: __VLS_49 } = __VLS_45.slots;
    // @ts-ignore
    [];
    var __VLS_45;
    var __VLS_46;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_38;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
vSelect;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    modelValue: (__VLS_ctx.form.recurrence),
    items: (__VLS_ctx.recurrences),
    label: "Recurrence",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
}));
const __VLS_52 = __VLS_51({
    modelValue: (__VLS_ctx.form.recurrence),
    items: (__VLS_ctx.recurrences),
    label: "Recurrence",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
if (__VLS_ctx.form.recurrence !== 'One-time' && __VLS_ctx.form.recurrence !== 'Daily') {
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
        cols: "12",
    }));
    const __VLS_63 = __VLS_62({
        cols: "12",
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    const { default: __VLS_66 } = __VLS_64.slots;
    if (__VLS_ctx.form.recurrence === 'Weekly') {
        let __VLS_67;
        /** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
        vSelect;
        // @ts-ignore
        const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
            modelValue: (__VLS_ctx.form.dueEvery),
            items: (__VLS_ctx.weekDays),
            itemTitle: "label",
            itemValue: "value",
            label: "Due Every",
            variant: "outlined",
            density: "comfortable",
            color: "secondary",
        }));
        const __VLS_69 = __VLS_68({
            modelValue: (__VLS_ctx.form.dueEvery),
            items: (__VLS_ctx.weekDays),
            itemTitle: "label",
            itemValue: "value",
            label: "Due Every",
            variant: "outlined",
            density: "comfortable",
            color: "secondary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    }
    else if (__VLS_ctx.form.recurrence === 'Monthly') {
        let __VLS_72;
        /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
        vTextField;
        // @ts-ignore
        const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
            modelValue: (__VLS_ctx.form.dueEvery),
            modelModifiers: { number: true, },
            type: "number",
            min: "1",
            max: "31",
            label: "Due Every (Day of Month)",
            variant: "outlined",
            density: "comfortable",
            color: "secondary",
        }));
        const __VLS_74 = __VLS_73({
            modelValue: (__VLS_ctx.form.dueEvery),
            modelModifiers: { number: true, },
            type: "number",
            min: "1",
            max: "31",
            label: "Due Every (Day of Month)",
            variant: "outlined",
            density: "comfortable",
            color: "secondary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    }
    else if (__VLS_ctx.form.recurrence === 'Yearly') {
        let __VLS_77;
        /** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
        vSelect;
        // @ts-ignore
        const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
            modelValue: (__VLS_ctx.form.dueEvery),
            items: (__VLS_ctx.months),
            itemTitle: "label",
            itemValue: "value",
            label: "Due Every (Month)",
            variant: "outlined",
            density: "comfortable",
            color: "secondary",
        }));
        const __VLS_79 = __VLS_78({
            modelValue: (__VLS_ctx.form.dueEvery),
            items: (__VLS_ctx.months),
            itemTitle: "label",
            itemValue: "value",
            label: "Due Every (Month)",
            variant: "outlined",
            density: "comfortable",
            color: "secondary",
        }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    }
    // @ts-ignore
    [form, form, form, form, form, form, form, form, form, recurrences, weekDays, months,];
    var __VLS_64;
    // @ts-ignore
    [];
    var __VLS_58;
}
let __VLS_82;
/** @ts-ignore @type { | typeof __VLS_components.vCheckbox | typeof __VLS_components.VCheckbox | typeof __VLS_components['v-checkbox']} */
vCheckbox;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
    modelValue: (__VLS_ctx.form.markOverdue),
    label: "Manually mark as Overdue",
    color: "error",
    density: "comfortable",
    hideDetails: true,
    ...{ class: "mb-2" },
}));
const __VLS_84 = __VLS_83({
    modelValue: (__VLS_ctx.form.markOverdue),
    label: "Manually mark as Overdue",
    color: "error",
    density: "comfortable",
    hideDetails: true,
    ...{ class: "mb-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    modelValue: (__VLS_ctx.form.remark),
    variant: "outlined",
    label: "Remark (optional)",
    density: "comfortable",
    color: "secondary",
}));
const __VLS_89 = __VLS_88({
    modelValue: (__VLS_ctx.form.remark),
    variant: "outlined",
    label: "Remark (optional)",
    density: "comfortable",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
// @ts-ignore
[form, form,];
var __VLS_20;
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    dense: true,
}));
const __VLS_94 = __VLS_93({
    dense: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const { default: __VLS_97 } = __VLS_95.slots;
let __VLS_98;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
    cols: "6",
}));
const __VLS_100 = __VLS_99({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
const { default: __VLS_103 } = __VLS_101.slots;
let __VLS_104;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}));
const __VLS_106 = __VLS_105({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
let __VLS_109;
const __VLS_110 = {
    /** @type {typeof __VLS_109.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.open = false);
        // @ts-ignore
        [open,];
    },
};
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_111 } = __VLS_107.slots;
// @ts-ignore
[];
var __VLS_107;
var __VLS_108;
// @ts-ignore
[];
var __VLS_101;
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
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.billTypeStore.isLoading),
}));
const __VLS_120 = __VLS_119({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.billTypeStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
let __VLS_123;
const __VLS_124 = {
    /** @type {typeof __VLS_123.click} */
    onClick: (__VLS_ctx.submit),
};
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_125 } = __VLS_121.slots;
// @ts-ignore
[billTypeStore, submit,];
var __VLS_121;
var __VLS_122;
// @ts-ignore
[];
var __VLS_115;
// @ts-ignore
[];
var __VLS_95;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_126;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}));
const __VLS_128 = __VLS_127({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
const { default: __VLS_131 } = __VLS_129.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_129;
// @ts-ignore
var __VLS_23 = __VLS_22;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
