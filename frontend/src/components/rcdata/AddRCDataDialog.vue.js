import { ref, reactive, watch } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useRCDataStore } from "@/stores/rcdata.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
const props = defineProps();
const open = defineModel({ required: true });
const userStore = useUserStore();
const rcDataStore = useRCDataStore();
const loading = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });
const networks = ["MTN", "Airtel", "Glo", "9mobile"];
function createEntry() {
    return {
        date: props.initialEntry?.date ?? new Date().toISOString().split("T")[0],
        currency: props.initialEntry?.currency ?? userStore.user?.preferredCurrency ?? "NGN",
        sender: props.initialEntry?.sender ?? { name: "", phone: "" },
        amount: props.initialEntry?.amount ?? { amount: null, currency: "NGN", size: "GB" },
        type: props.initialEntry?.type ?? "airtime",
        network: props.initialEntry?.network ?? "MTN",
        remark: props.initialEntry?.remark ?? "",
    };
}
const entries = ref([createEntry()]);
watch(() => [open.value, props.initialEntry], ([isOpen]) => {
    if (isOpen)
        entries.value = [createEntry()];
    else {
        entries.value = [createEntry()];
        snackbar.show = false;
    }
});
function addEntry() {
    entries.value.push(createEntry());
}
function removeEntry(index) {
    if (entries.value.length > 1)
        entries.value.splice(index, 1);
}
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
async function submit() {
    loading.value = true;
    try {
        await rcDataStore.addRCData(entries.value);
        showSnackbar(entries.value.length > 1
            ? `${entries.value.length} RC-Data records added successfully!`
            : "RC-Data added successfully!", "success");
        setTimeout(() => {
            entries.value = [createEntry()];
            open.value = false;
        }, 1500);
    }
    catch (err) {
        showSnackbar(err.message || "Failed to add RC-Data.", "error");
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
    title: "Record RC-Data",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_15 = __VLS_14({
    title: "Record RC-Data",
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
    /** @ts-ignore @type { | typeof __VLS_components.vBtnToggle | typeof __VLS_components.VBtnToggle | typeof __VLS_components['v-btn-toggle'] | typeof __VLS_components.vBtnToggle | typeof __VLS_components.VBtnToggle | typeof __VLS_components['v-btn-toggle']} */
    vBtnToggle;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        modelValue: (entry.type),
        mandatory: true,
        color: "secondary",
        rounded: "lg",
        density: "comfortable",
        ...{ class: "mb-4 w-100" },
    }));
    const __VLS_36 = __VLS_35({
        modelValue: (entry.type),
        mandatory: true,
        color: "secondary",
        rounded: "lg",
        density: "comfortable",
        ...{ class: "mb-4 w-100" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-100']} */ ;
    const { default: __VLS_39 } = __VLS_37.slots;
    let __VLS_40;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
        value: "airtime",
        ...{ class: "flex-grow-1" },
    }));
    const __VLS_42 = __VLS_41({
        value: "airtime",
        ...{ class: "flex-grow-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    /** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
    const { default: __VLS_45 } = __VLS_43.slots;
    // @ts-ignore
    [open, open, entries, entries,];
    var __VLS_43;
    let __VLS_46;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        value: "data",
        ...{ class: "flex-grow-1" },
    }));
    const __VLS_48 = __VLS_47({
        value: "data",
        ...{ class: "flex-grow-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    /** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
    const { default: __VLS_51 } = __VLS_49.slots;
    // @ts-ignore
    [];
    var __VLS_49;
    // @ts-ignore
    [];
    var __VLS_37;
    let __VLS_52;
    /** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
    vSelect;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
        modelValue: (entry.network),
        items: (__VLS_ctx.networks),
        label: "Network",
        variant: "outlined",
        density: "comfortable",
    }));
    const __VLS_54 = __VLS_53({
        modelValue: (entry.network),
        items: (__VLS_ctx.networks),
        label: "Network",
        variant: "outlined",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_57;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
        modelValue: (entry.sender.name),
        variant: "outlined",
        label: "Sender Name",
        density: "comfortable",
    }));
    const __VLS_59 = __VLS_58({
        modelValue: (entry.sender.name),
        variant: "outlined",
        label: "Sender Name",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    let __VLS_62;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
        modelValue: (entry.sender.phone),
        variant: "outlined",
        label: "Sender Phone (optional)",
        density: "comfortable",
    }));
    const __VLS_64 = __VLS_63({
        modelValue: (entry.sender.phone),
        variant: "outlined",
        label: "Sender Phone (optional)",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    if (entry.type === 'airtime') {
        let __VLS_67;
        /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
        vTextField;
        // @ts-ignore
        const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
            modelValue: (entry.amount.amount),
            variant: "outlined",
            label: "Amount (₦)",
            type: "number",
            step: "100",
            density: "comfortable",
        }));
        const __VLS_69 = __VLS_68({
            modelValue: (entry.amount.amount),
            variant: "outlined",
            label: "Amount (₦)",
            type: "number",
            step: "100",
            density: "comfortable",
        }, ...__VLS_functionalComponentArgsRest(__VLS_68));
        const { default: __VLS_72 } = __VLS_70.slots;
        {
            const { 'append-inner': __VLS_73 } = __VLS_70.slots;
            let __VLS_74;
            /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
            vBtn;
            // @ts-ignore
            const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
                ...{ 'onClick': {} },
                size: "x-small",
                variant: "tonal",
                color: "secondary",
                rounded: "lg",
                ...{ class: "text-caption font-weight-bold" },
            }));
            const __VLS_76 = __VLS_75({
                ...{ 'onClick': {} },
                size: "x-small",
                variant: "tonal",
                color: "secondary",
                rounded: "lg",
                ...{ class: "text-caption font-weight-bold" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_75));
            let __VLS_79;
            const __VLS_80 = {
                /** @type {typeof __VLS_79.click} */
                onClick: (...[$event]) => {
                    if (!(entry.type === 'airtime'))
                        throw 0;
                    return (entry.amount.amount = entry.amount.amount
                        ? Number(entry.amount.amount) * 1000
                        : 1000);
                    // @ts-ignore
                    [networks,];
                },
            };
            /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
            /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
            const { default: __VLS_81 } = __VLS_77.slots;
            // @ts-ignore
            [];
            var __VLS_77;
            var __VLS_78;
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_70;
    }
    else {
        let __VLS_82;
        /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
        vTextField;
        // @ts-ignore
        const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({
            modelValue: (entry.amount.amount),
            variant: "outlined",
            label: "Data Amount",
            type: "number",
            step: "1",
            density: "comfortable",
        }));
        const __VLS_84 = __VLS_83({
            modelValue: (entry.amount.amount),
            variant: "outlined",
            label: "Data Amount",
            type: "number",
            step: "1",
            density: "comfortable",
        }, ...__VLS_functionalComponentArgsRest(__VLS_83));
        let __VLS_87;
        /** @ts-ignore @type { | typeof __VLS_components.vBtnToggle | typeof __VLS_components.VBtnToggle | typeof __VLS_components['v-btn-toggle'] | typeof __VLS_components.vBtnToggle | typeof __VLS_components.VBtnToggle | typeof __VLS_components['v-btn-toggle']} */
        vBtnToggle;
        // @ts-ignore
        const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
            modelValue: (entry.amount.size),
            mandatory: true,
            color: "secondary",
            rounded: "lg",
            density: "comfortable",
            ...{ class: "mb-4 w-100" },
        }));
        const __VLS_89 = __VLS_88({
            modelValue: (entry.amount.size),
            mandatory: true,
            color: "secondary",
            rounded: "lg",
            density: "comfortable",
            ...{ class: "mb-4 w-100" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_88));
        /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-100']} */ ;
        const { default: __VLS_92 } = __VLS_90.slots;
        let __VLS_93;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
            value: "MB",
            ...{ class: "flex-grow-1" },
        }));
        const __VLS_95 = __VLS_94({
            value: "MB",
            ...{ class: "flex-grow-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_94));
        /** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
        const { default: __VLS_98 } = __VLS_96.slots;
        // @ts-ignore
        [];
        var __VLS_96;
        let __VLS_99;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
            value: "GB",
            ...{ class: "flex-grow-1" },
        }));
        const __VLS_101 = __VLS_100({
            value: "GB",
            ...{ class: "flex-grow-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_100));
        /** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
        const { default: __VLS_104 } = __VLS_102.slots;
        // @ts-ignore
        [];
        var __VLS_102;
        // @ts-ignore
        [];
        var __VLS_90;
    }
    let __VLS_105;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
        modelValue: (entry.remark),
        variant: "outlined",
        label: "Remark (optional)",
        density: "comfortable",
    }));
    const __VLS_107 = __VLS_106({
        modelValue: (entry.remark),
        variant: "outlined",
        label: "Remark (optional)",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    if (__VLS_ctx.entries.length > 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex justify-center mb-2" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
        let __VLS_110;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
            ...{ 'onClick': {} },
            icon: "mdi-minus",
            variant: "outlined",
            color: "error",
            size: "small",
            rounded: "lg",
        }));
        const __VLS_112 = __VLS_111({
            ...{ 'onClick': {} },
            icon: "mdi-minus",
            variant: "outlined",
            color: "error",
            size: "small",
            rounded: "lg",
        }, ...__VLS_functionalComponentArgsRest(__VLS_111));
        let __VLS_115;
        const __VLS_116 = {
            /** @type {typeof __VLS_115.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.entries.length > 1))
                    throw 0;
                return (__VLS_ctx.removeEntry(index));
                // @ts-ignore
                [entries, removeEntry,];
            },
        };
        var __VLS_113;
        var __VLS_114;
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
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    variant: "outlined",
    color: "secondary",
    size: "small",
    rounded: "lg",
}));
const __VLS_119 = __VLS_118({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    variant: "outlined",
    color: "secondary",
    size: "small",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
let __VLS_122;
const __VLS_123 = {
    /** @type {typeof __VLS_122.click} */
    onClick: (__VLS_ctx.addEntry),
};
var __VLS_120;
var __VLS_121;
let __VLS_124;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none mt-2" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_126 = __VLS_125({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none mt-2" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_125));
let __VLS_129;
const __VLS_130 = {
    /** @type {typeof __VLS_129.click} */
    onClick: (__VLS_ctx.submit),
};
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
const { default: __VLS_131 } = __VLS_127.slots;
(__VLS_ctx.entries.length > 1 ? `Submit (${__VLS_ctx.entries.length})` : `Submit`);
// @ts-ignore
[entries, entries, addEntry, loading, submit,];
var __VLS_127;
var __VLS_128;
let __VLS_132;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}));
const __VLS_134 = __VLS_133({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}, ...__VLS_functionalComponentArgsRest(__VLS_133));
const { default: __VLS_137 } = __VLS_135.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_135;
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
