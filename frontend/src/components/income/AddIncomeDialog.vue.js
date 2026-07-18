import { ref, reactive, watch } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useIncomeStore as IncomeStore } from "@/stores/income.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
const snackbar = reactive({ show: false, message: "", color: "success" });
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
const props = defineProps();
const open = defineModel({ required: true });
const userStore = useUserStore();
const incomeStore = IncomeStore();
const loading = ref(false);
function createEntry() {
    return {
        _id: "",
        userId: userStore.user?.id || "",
        date: props.initialEntry?.date ?? new Date().toISOString().split("T")[0],
        amount: props.initialEntry?.amount ?? null,
        sender: props.initialEntry?.sender ?? "",
        purpose: props.initialEntry?.purpose ?? "",
    };
}
const entries = ref([createEntry()]);
function resetEntries() {
    entries.value = [createEntry()];
}
watch(() => [open.value, props.initialEntry], ([isOpen]) => {
    if (isOpen) {
        resetEntries();
    }
    else {
        resetEntries();
        snackbar.show = false;
    }
});
function addEntry() {
    entries.value.push(createEntry());
}
function removeEntry(index) {
    if (entries.value.length > 1) {
        entries.value.splice(index, 1);
    }
}
async function submit() {
    loading.value = true;
    try {
        await incomeStore.addIncome(entries.value);
        showSnackbar(entries.value.length > 1
            ? `${entries.value.length} income records added successfully!`
            : "Income added successfully!", "success");
        setTimeout(() => {
            entries.value = [createEntry()];
            open.value = false;
        }, 1500);
    }
    catch (err) {
        showSnackbar(err.message || "Failed to add income.", "error");
    }
    finally {
        loading.value = false;
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
    ...{ class: "w-xs-75 w-sm-66 h-100" },
    scrim: "true",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.open),
    ...{ class: "w-xs-75 w-sm-66 h-100" },
    scrim: "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['w-xs-75']} */ ;
/** @type {__VLS_StyleScopedClasses['w-sm-66']} */ ;
/** @type {__VLS_StyleScopedClasses['h-100']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "px-6 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-3 overflow-y-auto" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
const __VLS_13 = DialogHeaderComponent;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    title: "Add Income",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_15 = __VLS_14({
    title: "Add Income",
    modelValue: (__VLS_ctx.open),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form'] | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form']} */
vForm;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({}));
const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
for (const [entry, index] of __VLS_vFor((__VLS_ctx.entries))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (index),
        ...{ class: "d-flex flex-column" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
    if (__VLS_ctx.entries.length > 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex align-center ga-2 mb-2" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
        let __VLS_24;
        /** @ts-ignore @type { | typeof __VLS_components.vDivider | typeof __VLS_components.VDivider | typeof __VLS_components['v-divider']} */
        vDivider;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
        const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    }
    let __VLS_29;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        modelValue: (entry.date),
        variant: "outlined",
        label: "Date",
        type: "date",
        density: "comfortable",
    }));
    const __VLS_31 = __VLS_30({
        modelValue: (entry.date),
        variant: "outlined",
        label: "Date",
        type: "date",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    let __VLS_34;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        modelValue: (entry.amount),
        variant: "outlined",
        label: "Amount (₦)",
        type: "number",
        step: "1000",
        density: "comfortable",
    }));
    const __VLS_36 = __VLS_35({
        modelValue: (entry.amount),
        variant: "outlined",
        label: "Amount (₦)",
        type: "number",
        step: "1000",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    const { default: __VLS_39 } = __VLS_37.slots;
    {
        const { 'append-inner': __VLS_40 } = __VLS_37.slots;
        let __VLS_41;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
            ...{ 'onClick': {} },
            size: "x-small",
            variant: "tonal",
            color: "secondary",
            rounded: "lg",
            ...{ class: "text-caption font-weight-bold" },
        }));
        const __VLS_43 = __VLS_42({
            ...{ 'onClick': {} },
            size: "x-small",
            variant: "tonal",
            color: "secondary",
            rounded: "lg",
            ...{ class: "text-caption font-weight-bold" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_42));
        let __VLS_46;
        const __VLS_47 = {
            /** @type {typeof __VLS_46.click} */
            onClick: (...[$event]) => {
                return (entry.amount =
                    (entry.amount || 0) * 1000 === 0 ? 1000 : Number(entry.amount) * 1000);
                // @ts-ignore
                [open, open, entries, entries,];
            },
        };
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        const { default: __VLS_48 } = __VLS_44.slots;
        // @ts-ignore
        [];
        var __VLS_44;
        var __VLS_45;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_37;
    let __VLS_49;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
        modelValue: (entry.sender),
        variant: "outlined",
        label: "Sender",
        density: "comfortable",
    }));
    const __VLS_51 = __VLS_50({
        modelValue: (entry.sender),
        variant: "outlined",
        label: "Sender",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    let __VLS_54;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        modelValue: (entry.purpose),
        variant: "outlined",
        label: "Purpose (optional)",
        density: "comfortable",
    }));
    const __VLS_56 = __VLS_55({
        modelValue: (entry.purpose),
        variant: "outlined",
        label: "Purpose (optional)",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    if (__VLS_ctx.entries.length > 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex justify-center mb-2" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
        let __VLS_59;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
            ...{ 'onClick': {} },
            icon: "mdi-minus",
            variant: "outlined",
            color: "error",
            size: "small",
            rounded: "lg",
        }));
        const __VLS_61 = __VLS_60({
            ...{ 'onClick': {} },
            icon: "mdi-minus",
            variant: "outlined",
            color: "error",
            size: "small",
            rounded: "lg",
        }, ...__VLS_functionalComponentArgsRest(__VLS_60));
        let __VLS_64;
        const __VLS_65 = {
            /** @type {typeof __VLS_64.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.entries.length > 1))
                    throw 0;
                return (__VLS_ctx.removeEntry(index));
                // @ts-ignore
                [entries, removeEntry,];
            },
        };
        var __VLS_62;
        var __VLS_63;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_21;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex justify-center" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    variant: "outlined",
    color: "secondary",
    size: "small",
    rounded: "lg",
}));
const __VLS_68 = __VLS_67({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    variant: "outlined",
    color: "secondary",
    size: "small",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
let __VLS_71;
const __VLS_72 = {
    /** @type {typeof __VLS_71.click} */
    onClick: (__VLS_ctx.addEntry),
};
var __VLS_69;
var __VLS_70;
let __VLS_73;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none mt-2" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_75 = __VLS_74({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none mt-2" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_78;
const __VLS_79 = {
    /** @type {typeof __VLS_78.click} */
    onClick: (__VLS_ctx.submit),
};
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
const { default: __VLS_80 } = __VLS_76.slots;
(__VLS_ctx.entries.length > 1 ? `Submit (${__VLS_ctx.entries.length})` : `Submit`);
// @ts-ignore
[entries, entries, addEntry, loading, submit,];
var __VLS_76;
var __VLS_77;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}));
const __VLS_83 = __VLS_82({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
const { default: __VLS_86 } = __VLS_84.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_84;
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
