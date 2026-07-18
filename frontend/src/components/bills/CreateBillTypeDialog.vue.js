import { ref, reactive, watch } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useBillTypeStore } from "@/stores/billtype.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
const props = defineProps();
const open = defineModel({ required: true });
const userStore = useUserStore();
const billTypeStore = useBillTypeStore();
const loading = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });
const types = ["Electricity", "Accommodation", "Subscription", "Insurance", "Other"];
const recurrences = ["One-time", "Daily", "Weekly", "Monthly", "Yearly"];
const weekDays = [
    { label: "Sunday", value: 0 }, { label: "Monday", value: 1 }, { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 }, { label: "Thursday", value: 4 }, { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
];
const months = [
    { label: "January", value: 1 }, { label: "February", value: 2 }, { label: "March", value: 3 },
    { label: "April", value: 4 }, { label: "May", value: 5 }, { label: "June", value: 6 },
    { label: "July", value: 7 }, { label: "August", value: 8 }, { label: "September", value: 9 },
    { label: "October", value: 10 }, { label: "November", value: 11 }, { label: "December", value: 12 },
];
function createEntry() {
    return {
        name: props.initialEntry?.name ?? "",
        type: props.initialEntry?.type ?? "Other",
        total: props.initialEntry?.total ?? null,
        currency: props.initialEntry?.currency ?? userStore.user?.preferredCurrency ?? "NGN",
        recurrence: props.initialEntry?.recurrence ?? "Monthly",
        dueEvery: props.initialEntry?.dueEvery,
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
function addEntry() { entries.value.push(createEntry()); }
function removeEntry(index) { if (entries.value.length > 1)
    entries.value.splice(index, 1); }
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
async function submit() {
    loading.value = true;
    try {
        await billTypeStore.addBillType(entries.value);
        showSnackbar(entries.value.length > 1 ? `${entries.value.length} bill types created!` : "Bill type created!", "success");
        setTimeout(() => {
            entries.value = [createEntry()];
            open.value = false;
        }, 1500);
    }
    catch (err) {
        showSnackbar(err.message || "Failed to create bill type.", "error");
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
    title: "Create Bill Type",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_15 = __VLS_14({
    title: "Create Bill Type",
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
        modelValue: (entry.name),
        variant: "outlined",
        label: "Bill Name",
        density: "comfortable",
    }));
    const __VLS_31 = __VLS_30({
        modelValue: (entry.name),
        variant: "outlined",
        label: "Bill Name",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    let __VLS_34;
    /** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
    vSelect;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        modelValue: (entry.type),
        items: (__VLS_ctx.types),
        label: "Type",
        variant: "outlined",
        density: "comfortable",
    }));
    const __VLS_36 = __VLS_35({
        modelValue: (entry.type),
        items: (__VLS_ctx.types),
        label: "Type",
        variant: "outlined",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    let __VLS_39;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        modelValue: (entry.total),
        variant: "outlined",
        label: "Total Owed Per Cycle (₦)",
        type: "number",
        density: "comfortable",
    }));
    const __VLS_41 = __VLS_40({
        modelValue: (entry.total),
        variant: "outlined",
        label: "Total Owed Per Cycle (₦)",
        type: "number",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const { default: __VLS_44 } = __VLS_42.slots;
    {
        const { 'append-inner': __VLS_45 } = __VLS_42.slots;
        let __VLS_46;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
            ...{ 'onClick': {} },
            size: "x-small",
            variant: "tonal",
            color: "secondary",
            rounded: "lg",
            ...{ class: "text-caption font-weight-bold" },
        }));
        const __VLS_48 = __VLS_47({
            ...{ 'onClick': {} },
            size: "x-small",
            variant: "tonal",
            color: "secondary",
            rounded: "lg",
            ...{ class: "text-caption font-weight-bold" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_47));
        let __VLS_51;
        const __VLS_52 = {
            /** @type {typeof __VLS_51.click} */
            onClick: (...[$event]) => {
                return (entry.total = entry.total ? Number(entry.total) * 1000 : 1000);
                // @ts-ignore
                [open, open, entries, entries, types,];
            },
        };
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        const { default: __VLS_53 } = __VLS_49.slots;
        // @ts-ignore
        [];
        var __VLS_49;
        var __VLS_50;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_42;
    let __VLS_54;
    /** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
    vSelect;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        modelValue: (entry.recurrence),
        items: (__VLS_ctx.recurrences),
        label: "Recurrence",
        variant: "outlined",
        density: "comfortable",
    }));
    const __VLS_56 = __VLS_55({
        modelValue: (entry.recurrence),
        items: (__VLS_ctx.recurrences),
        label: "Recurrence",
        variant: "outlined",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    if (entry.recurrence !== 'One-time' && entry.recurrence !== 'Daily') {
        let __VLS_59;
        /** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
        vRow;
        // @ts-ignore
        const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
            dense: true,
        }));
        const __VLS_61 = __VLS_60({
            dense: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_60));
        const { default: __VLS_64 } = __VLS_62.slots;
        let __VLS_65;
        /** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
        vCol;
        // @ts-ignore
        const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
            cols: "12",
        }));
        const __VLS_67 = __VLS_66({
            cols: "12",
        }, ...__VLS_functionalComponentArgsRest(__VLS_66));
        const { default: __VLS_70 } = __VLS_68.slots;
        if (entry.recurrence === 'Weekly') {
            let __VLS_71;
            /** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
            vSelect;
            // @ts-ignore
            const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({
                modelValue: (entry.dueEvery),
                items: (__VLS_ctx.weekDays),
                itemTitle: "label",
                itemValue: "value",
                label: "Due Every",
                variant: "outlined",
                density: "comfortable",
            }));
            const __VLS_73 = __VLS_72({
                modelValue: (entry.dueEvery),
                items: (__VLS_ctx.weekDays),
                itemTitle: "label",
                itemValue: "value",
                label: "Due Every",
                variant: "outlined",
                density: "comfortable",
            }, ...__VLS_functionalComponentArgsRest(__VLS_72));
        }
        else if (entry.recurrence === 'Monthly') {
            let __VLS_76;
            /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
            vTextField;
            // @ts-ignore
            const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
                modelValue: (entry.dueEvery),
                modelModifiers: { number: true, },
                type: "number",
                min: "1",
                max: "31",
                label: "Due Every (Day of Month)",
                variant: "outlined",
                density: "comfortable",
            }));
            const __VLS_78 = __VLS_77({
                modelValue: (entry.dueEvery),
                modelModifiers: { number: true, },
                type: "number",
                min: "1",
                max: "31",
                label: "Due Every (Day of Month)",
                variant: "outlined",
                density: "comfortable",
            }, ...__VLS_functionalComponentArgsRest(__VLS_77));
        }
        else if (entry.recurrence === 'Yearly') {
            let __VLS_81;
            /** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
            vSelect;
            // @ts-ignore
            const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
                modelValue: (entry.dueEvery),
                items: (__VLS_ctx.months),
                itemTitle: "label",
                itemValue: "value",
                label: "Due Every (Month)",
                variant: "outlined",
                density: "comfortable",
            }));
            const __VLS_83 = __VLS_82({
                modelValue: (entry.dueEvery),
                items: (__VLS_ctx.months),
                itemTitle: "label",
                itemValue: "value",
                label: "Due Every (Month)",
                variant: "outlined",
                density: "comfortable",
            }, ...__VLS_functionalComponentArgsRest(__VLS_82));
        }
        // @ts-ignore
        [recurrences, weekDays, months,];
        var __VLS_68;
        // @ts-ignore
        [];
        var __VLS_62;
    }
    let __VLS_86;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
        modelValue: (entry.remark),
        variant: "outlined",
        label: "Remark (optional)",
        density: "comfortable",
    }));
    const __VLS_88 = __VLS_87({
        modelValue: (entry.remark),
        variant: "outlined",
        label: "Remark (optional)",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_87));
    if (__VLS_ctx.entries.length > 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex justify-center mb-2" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
        let __VLS_91;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_92 = __VLS_asFunctionalComponent1(__VLS_91, new __VLS_91({
            ...{ 'onClick': {} },
            icon: "mdi-minus",
            variant: "outlined",
            color: "error",
            size: "small",
            rounded: "lg",
        }));
        const __VLS_93 = __VLS_92({
            ...{ 'onClick': {} },
            icon: "mdi-minus",
            variant: "outlined",
            color: "error",
            size: "small",
            rounded: "lg",
        }, ...__VLS_functionalComponentArgsRest(__VLS_92));
        let __VLS_96;
        const __VLS_97 = {
            /** @type {typeof __VLS_96.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.entries.length > 1))
                    throw 0;
                return (__VLS_ctx.removeEntry(index));
                // @ts-ignore
                [entries, removeEntry,];
            },
        };
        var __VLS_94;
        var __VLS_95;
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
let __VLS_98;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent1(__VLS_98, new __VLS_98({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    variant: "outlined",
    color: "secondary",
    size: "small",
    rounded: "lg",
}));
const __VLS_100 = __VLS_99({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    variant: "outlined",
    color: "secondary",
    size: "small",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
let __VLS_103;
const __VLS_104 = {
    /** @type {typeof __VLS_103.click} */
    onClick: (__VLS_ctx.addEntry),
};
var __VLS_101;
var __VLS_102;
let __VLS_105;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent1(__VLS_105, new __VLS_105({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none mt-2" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_107 = __VLS_106({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none mt-2" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
let __VLS_110;
const __VLS_111 = {
    /** @type {typeof __VLS_110.click} */
    onClick: (__VLS_ctx.submit),
};
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
const { default: __VLS_112 } = __VLS_108.slots;
(__VLS_ctx.entries.length > 1 ? `Submit (${__VLS_ctx.entries.length})` : `Submit`);
// @ts-ignore
[entries, entries, addEntry, loading, submit,];
var __VLS_108;
var __VLS_109;
let __VLS_113;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}));
const __VLS_115 = __VLS_114({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
const { default: __VLS_118 } = __VLS_116.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_116;
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
