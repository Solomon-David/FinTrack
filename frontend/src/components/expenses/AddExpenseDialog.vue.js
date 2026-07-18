import { ref, reactive, watch, onMounted } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useExpenseStore } from "@/stores/expense.store";
import { useBillTypeStore } from "@/stores/billtype.store";
import DialogHeaderComponent from "@/components/shared/DialogHeaderComponent.vue";
const props = defineProps();
const open = defineModel({ required: true });
const userStore = useUserStore();
const expenseStore = useExpenseStore();
const billTypeStore = useBillTypeStore();
const loading = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });
onMounted(() => {
    if (billTypeStore.billTypes.length === 0)
        billTypeStore.getBillTypes();
});
function createEntry() {
    return {
        date: props.initialEntry?.date ?? new Date().toISOString().split("T")[0],
        amount: props.initialEntry?.amount ?? null,
        item: props.initialEntry?.item ?? "",
        vendor: props.initialEntry?.vendor ?? "",
        isBill: props.initialEntry?.isBill ?? false,
        currency: props.initialEntry?.currency ?? userStore.user?.preferredCurrency ?? "NGN",
        billTypeId: props.initialEntry?.billTypeId,
        billPaymentRemark: props.initialEntry?.billPaymentRemark ?? "",
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
function selectedBillType(entry) {
    return billTypeStore.billTypes.find((b) => b._id === entry.billTypeId) ?? null;
}
function onBillToggle(entry) {
    if (!entry.isBill) {
        entry.billTypeId = undefined;
        entry.billPaymentRemark = "";
    }
}
function onBillTypeSelected(entry) {
    const bt = selectedBillType(entry);
    if (bt) {
        entry.item = bt.name;
        entry.amount = bt.total - bt.amountPaid; // suggest remaining balance
    }
}
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
async function submit() {
    loading.value = true;
    try {
        await expenseStore.addExpense(entries.value);
        showSnackbar(entries.value.length > 1
            ? `${entries.value.length} expense records added successfully!`
            : "Expense added successfully!", "success");
        setTimeout(() => {
            entries.value = [createEntry()];
            open.value = false;
        }, 1500);
    }
    catch (err) {
        showSnackbar(err.message || "Failed to add expense.", "error");
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
    title: "Add Expense",
    modelValue: (__VLS_ctx.open),
}));
const __VLS_15 = __VLS_14({
    title: "Add Expense",
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
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
        modelValue: (entry.item),
        variant: "outlined",
        label: "Item",
        density: "comfortable",
        readonly: (entry.isBill && !!entry.billTypeId),
    }));
    const __VLS_36 = __VLS_35({
        modelValue: (entry.item),
        variant: "outlined",
        label: "Item",
        density: "comfortable",
        readonly: (entry.isBill && !!entry.billTypeId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    let __VLS_39;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        modelValue: (entry.amount),
        variant: "outlined",
        label: "Amount (₦)",
        type: "number",
        step: "1000",
        density: "comfortable",
    }));
    const __VLS_41 = __VLS_40({
        modelValue: (entry.amount),
        variant: "outlined",
        label: "Amount (₦)",
        type: "number",
        step: "1000",
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
                return (entry.amount =
                    (entry.amount || 0) * 1000 === 0 ? 1000 : Number(entry.amount) * 1000);
                // @ts-ignore
                [open, open, entries, entries,];
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
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        modelValue: (entry.vendor),
        variant: "outlined",
        label: "Vendor (optional)",
        density: "comfortable",
    }));
    const __VLS_56 = __VLS_55({
        modelValue: (entry.vendor),
        variant: "outlined",
        label: "Vendor (optional)",
        density: "comfortable",
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    let __VLS_59;
    /** @ts-ignore @type { | typeof __VLS_components.vCheckbox | typeof __VLS_components.VCheckbox | typeof __VLS_components['v-checkbox']} */
    vCheckbox;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (entry.isBill),
        label: "This is a bill payment",
        color: "secondary",
        density: "comfortable",
        hideDetails: true,
        ...{ class: "mb-2" },
    }));
    const __VLS_61 = __VLS_60({
        ...{ 'onUpdate:modelValue': {} },
        modelValue: (entry.isBill),
        label: "This is a bill payment",
        color: "secondary",
        density: "comfortable",
        hideDetails: true,
        ...{ class: "mb-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_60));
    let __VLS_64;
    const __VLS_65 = {
        /** @type {typeof __VLS_64.'update:modelValue'} */
        'onUpdate:modelValue': (...[$event]) => {
            return (__VLS_ctx.onBillToggle(entry));
            // @ts-ignore
            [onBillToggle,];
        },
    };
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    var __VLS_62;
    var __VLS_63;
    if (entry.isBill) {
        let __VLS_66;
        /** @ts-ignore @type { | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select'] | typeof __VLS_components.vSelect | typeof __VLS_components.VSelect | typeof __VLS_components['v-select']} */
        vSelect;
        // @ts-ignore
        const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (entry.billTypeId),
            items: (__VLS_ctx.billTypeStore.billTypes),
            itemTitle: "name",
            itemValue: "_id",
            label: "Bill",
            variant: "outlined",
            density: "comfortable",
        }));
        const __VLS_68 = __VLS_67({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (entry.billTypeId),
            items: (__VLS_ctx.billTypeStore.billTypes),
            itemTitle: "name",
            itemValue: "_id",
            label: "Bill",
            variant: "outlined",
            density: "comfortable",
        }, ...__VLS_functionalComponentArgsRest(__VLS_67));
        let __VLS_71;
        const __VLS_72 = {
            /** @type {typeof __VLS_71.'update:modelValue'} */
            'onUpdate:modelValue': (...[$event]) => {
                if (!(entry.isBill))
                    throw 0;
                return (__VLS_ctx.onBillTypeSelected(entry));
                // @ts-ignore
                [billTypeStore, onBillTypeSelected,];
            },
        };
        const { default: __VLS_73 } = __VLS_69.slots;
        {
            const { item: __VLS_74 } = __VLS_69.slots;
            const [{ props: itemProps, item }] = __VLS_vSlot(__VLS_74);
            let __VLS_75;
            /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
            vListItem;
            // @ts-ignore
            const __VLS_76 = __VLS_asFunctionalComponent1(__VLS_75, new __VLS_75({
                ...(itemProps),
                subtitle: (`Paid: ₦${Number(item.amountPaid || 0).toLocaleString('en-NG')} / ₦${Number(item.total || 0).toLocaleString('en-NG')} • ${item.status || ''}`),
            }));
            const __VLS_77 = __VLS_76({
                ...(itemProps),
                subtitle: (`Paid: ₦${Number(item.amountPaid || 0).toLocaleString('en-NG')} / ₦${Number(item.total || 0).toLocaleString('en-NG')} • ${item.status || ''}`),
            }, ...__VLS_functionalComponentArgsRest(__VLS_76));
            // @ts-ignore
            [];
        }
        // @ts-ignore
        [];
        var __VLS_69;
        var __VLS_70;
        if (__VLS_ctx.selectedBillType(entry)) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "text-caption text-medium-emphasis mb-3 ml-1" },
            });
            /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
            /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
            /** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
            /** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
            ((__VLS_ctx.selectedBillType(entry).total - __VLS_ctx.selectedBillType(entry).amountPaid).toLocaleString('en-NG'));
        }
        let __VLS_80;
        /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
        vTextField;
        // @ts-ignore
        const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
            modelValue: (entry.billPaymentRemark),
            variant: "outlined",
            label: "Payment Remark (optional)",
            density: "comfortable",
        }));
        const __VLS_82 = __VLS_81({
            modelValue: (entry.billPaymentRemark),
            variant: "outlined",
            label: "Payment Remark (optional)",
            density: "comfortable",
        }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    }
    if (__VLS_ctx.entries.length > 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex justify-center mb-2" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
        let __VLS_85;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_86 = __VLS_asFunctionalComponent1(__VLS_85, new __VLS_85({
            ...{ 'onClick': {} },
            icon: "mdi-minus",
            variant: "outlined",
            color: "error",
            size: "small",
            rounded: "lg",
        }));
        const __VLS_87 = __VLS_86({
            ...{ 'onClick': {} },
            icon: "mdi-minus",
            variant: "outlined",
            color: "error",
            size: "small",
            rounded: "lg",
        }, ...__VLS_functionalComponentArgsRest(__VLS_86));
        let __VLS_90;
        const __VLS_91 = {
            /** @type {typeof __VLS_90.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.entries.length > 1))
                    throw 0;
                return (__VLS_ctx.removeEntry(index));
                // @ts-ignore
                [entries, selectedBillType, selectedBillType, selectedBillType, removeEntry,];
            },
        };
        var __VLS_88;
        var __VLS_89;
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
let __VLS_92;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    variant: "outlined",
    color: "secondary",
    size: "small",
    rounded: "lg",
}));
const __VLS_94 = __VLS_93({
    ...{ 'onClick': {} },
    icon: "mdi-plus",
    variant: "outlined",
    color: "secondary",
    size: "small",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
let __VLS_97;
const __VLS_98 = {
    /** @type {typeof __VLS_97.click} */
    onClick: (__VLS_ctx.addEntry),
};
var __VLS_95;
var __VLS_96;
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none mt-2" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_101 = __VLS_100({
    ...{ 'onClick': {} },
    color: "secondary",
    variant: "flat",
    block: true,
    rounded: "lg",
    height: "44",
    ...{ class: "font-weight-bold text-none mt-2" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
let __VLS_104;
const __VLS_105 = {
    /** @type {typeof __VLS_104.click} */
    onClick: (__VLS_ctx.submit),
};
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
const { default: __VLS_106 } = __VLS_102.slots;
(__VLS_ctx.entries.length > 1 ? `Submit (${__VLS_ctx.entries.length})` : `Submit`);
// @ts-ignore
[entries, entries, addEntry, loading, submit,];
var __VLS_102;
var __VLS_103;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}));
const __VLS_109 = __VLS_108({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "2500",
    location: "bottom",
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
const { default: __VLS_112 } = __VLS_110.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_110;
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
