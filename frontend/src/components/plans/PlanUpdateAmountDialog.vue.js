import { ref, reactive, computed, watch } from "vue";
import { usePlanStore } from "@/stores/plan.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
const open = defineModel({ required: true });
const props = defineProps();
const emit = defineEmits();
const planStore = usePlanStore();
const formRef = ref();
const amountToAdd = ref(null);
const snackbar = reactive({ show: false, message: "", color: "success" });
const required = (v) => (v !== null && v !== "" && Number(v) > 0) || "Enter an amount greater than 0";
// Reset the input whenever a new plan is targeted or the dialog reopens
watch(() => [open.value, props.plan], ([isOpen]) => {
    if (isOpen)
        amountToAdd.value = null;
});
const newTotal = computed(() => {
    if (!props.plan || !amountToAdd.value)
        return null;
    return Number(props.plan.progress) + Number(amountToAdd.value);
});
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
async function submit() {
    const { valid } = await formRef.value.validate();
    if (!valid || !props.plan)
        return;
    try {
        const updatedProgress = Number(props.plan.progress) + Number(amountToAdd.value);
        await planStore.updatePlan(props.plan._id, {
            progress: updatedProgress,
            // status left undefined so the backend re-derives Completed / In
            // Progress / Overdue from the new progress vs target and due date.
        });
        showSnackbar("Plan updated successfully!", "success");
        emit("updated");
        setTimeout(() => {
            open.value = false;
        }, 1000);
    }
    catch (err) {
        showSnackbar(err.message || "Failed to update plan.", "error");
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
    title: "Update Plan",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_14 = __VLS_13({
    title: "Update Plan",
    modelValue: (__VLS_ctx.open),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
if (__VLS_ctx.plan) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "font-weight-bold text-body-1" },
    });
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
    (__VLS_ctx.plan.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (Number(__VLS_ctx.plan.progress).toLocaleString("en-NG"));
    if (__VLS_ctx.plan.targetAmount !== 'Unknown') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (Number(__VLS_ctx.plan.targetAmount).toLocaleString("en-NG"));
    }
}
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
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.amountToAdd),
    variant: "outlined",
    label: "Amount to Add (₦)",
    type: "number",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.amountToAdd),
    variant: "outlined",
    label: "Amount to Add (₦)",
    type: "number",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_30 } = __VLS_28.slots;
{
    const { 'append-inner': __VLS_31 } = __VLS_28.slots;
    let __VLS_32;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
        ...{ 'onClick': {} },
        size: "x-small",
        variant: "tonal",
        color: "secondary",
        rounded: "lg",
        ...{ class: "text-caption font-weight-bold" },
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onClick': {} },
        size: "x-small",
        variant: "tonal",
        color: "secondary",
        rounded: "lg",
        ...{ class: "text-caption font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_37;
    const __VLS_38 = {
        /** @type {typeof __VLS_37.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.amountToAdd = __VLS_ctx.amountToAdd ? Number(__VLS_ctx.amountToAdd) * 1000 : 1000);
            // @ts-ignore
            [open, open, plan, plan, plan, plan, plan, amountToAdd, amountToAdd, amountToAdd, amountToAdd, required,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    const { default: __VLS_39 } = __VLS_35.slots;
    // @ts-ignore
    [];
    var __VLS_35;
    var __VLS_36;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_28;
// @ts-ignore
[];
var __VLS_20;
if (__VLS_ctx.newTotal !== null) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (__VLS_ctx.newTotal.toLocaleString("en-NG"));
}
let __VLS_40;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
    dense: true,
}));
const __VLS_42 = __VLS_41({
    dense: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const { default: __VLS_45 } = __VLS_43.slots;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
    cols: "6",
}));
const __VLS_48 = __VLS_47({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const { default: __VLS_51 } = __VLS_49.slots;
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}));
const __VLS_54 = __VLS_53({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "text-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_57;
const __VLS_58 = {
    /** @type {typeof __VLS_57.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.open = false);
        // @ts-ignore
        [open, newTotal, newTotal,];
    },
};
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_59 } = __VLS_55.slots;
// @ts-ignore
[];
var __VLS_55;
var __VLS_56;
// @ts-ignore
[];
var __VLS_49;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    cols: "6",
}));
const __VLS_62 = __VLS_61({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_65 } = __VLS_63.slots;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.planStore.isLoading),
}));
const __VLS_68 = __VLS_67({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none" },
    loading: (__VLS_ctx.planStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
let __VLS_71;
const __VLS_72 = {
    /** @type {typeof __VLS_71.click} */
    onClick: (__VLS_ctx.submit),
};
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_73 } = __VLS_69.slots;
// @ts-ignore
[planStore, submit,];
var __VLS_69;
var __VLS_70;
// @ts-ignore
[];
var __VLS_63;
// @ts-ignore
[];
var __VLS_43;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_74;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}));
const __VLS_76 = __VLS_75({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
const { default: __VLS_79 } = __VLS_77.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_77;
// @ts-ignore
var __VLS_23 = __VLS_22;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
