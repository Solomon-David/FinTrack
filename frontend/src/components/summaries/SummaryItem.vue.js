import { computed } from "vue";
const props = defineProps();
const emit = defineEmits();
function get(category) {
    return props.summary.data.find((d) => d.category === category)?.total ?? 0;
}
const periodLabel = computed(() => {
    const start = new Date(props.summary.period.start);
    const end = new Date(props.summary.period.end);
    const fmt = (d) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
    if (props.summary.timeframe === "Daily")
        return fmt(start);
    if (props.summary.timeframe === "Weekly")
        return `${fmt(start)} — ${fmt(end)}`;
    if (props.summary.timeframe === "Monthly") {
        return `${String(start.getMonth() + 1).padStart(2, "0")}/${start.getFullYear()}`;
    }
    return `${start.getFullYear()}`;
});
const formattedRCData = computed(() => {
    const airtime = get("Airtime");
    const dataMB = get("DataMB");
    const dataGB = (dataMB / 1024).toFixed(1);
    const parts = [];
    if (airtime > 0)
        parts.push(`₦${airtime.toLocaleString("en-NG")}`);
    if (dataMB > 0)
        parts.push(`${dataGB}GB`);
    return parts.join("/") || "—";
});
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
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    variant: "outlined",
    rounded: "lg",
    ...{ class: "pa-3 mb-3" },
}));
const __VLS_2 = __VLS_1({
    variant: "outlined",
    rounded: "lg",
    ...{ class: "pa-3 mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['pa-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center justify-space-between mb-2" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
(__VLS_ctx.periodLabel);
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
vMenu;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
{
    const { activator: __VLS_13 } = __VLS_10.slots;
    const [{ props: menuProps }] = __VLS_vSlot(__VLS_13);
    let __VLS_14;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }));
    const __VLS_16 = __VLS_15({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    // @ts-ignore
    [periodLabel,];
}
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}));
const __VLS_21 = __VLS_20({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    ...{ 'onClick': {} },
    prependIcon: "mdi-download-outline",
    title: "Export",
}));
const __VLS_27 = __VLS_26({
    ...{ 'onClick': {} },
    prependIcon: "mdi-download-outline",
    title: "Export",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
const __VLS_31 = {
    /** @type {typeof __VLS_30.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('export', __VLS_ctx.summary));
        // @ts-ignore
        [emit, summary,];
    },
};
var __VLS_28;
var __VLS_29;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    ...{ 'onClick': {} },
    prependIcon: "mdi-delete-outline",
    title: "Delete",
    baseColor: "error",
}));
const __VLS_34 = __VLS_33({
    ...{ 'onClick': {} },
    prependIcon: "mdi-delete-outline",
    title: "Delete",
    baseColor: "error",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_37;
const __VLS_38 = {
    /** @type {typeof __VLS_37.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('delete', __VLS_ctx.summary));
        // @ts-ignore
        [emit, summary,];
    },
};
var __VLS_35;
var __VLS_36;
// @ts-ignore
[];
var __VLS_22;
// @ts-ignore
[];
var __VLS_10;
if (props.type === 'Income' || props.type === undefined) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex justify-space-between py-1" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-body-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-body-2 font-weight-bold text-success" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-success']} */ ;
    (__VLS_ctx.get("Income").toLocaleString("en-NG"));
}
if (props.type === 'Expenses' || props.type === undefined) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex justify-space-between py-1" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-body-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-body-2 font-weight-bold text-error" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-error']} */ ;
    (__VLS_ctx.get("Expenses").toLocaleString("en-NG"));
}
if (__VLS_ctx.summary.timeframe !== 'Daily') {
    if (props.type === undefined) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex justify-space-between py-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-body-2" },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-body-2 font-weight-bold" },
            ...{ class: (__VLS_ctx.get('Difference') >= 0 ? 'text-success' : 'text-error') },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        (__VLS_ctx.get("Difference").toLocaleString("en-NG"));
    }
    if (props.type === 'RCData' || props.type === undefined) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex justify-space-between py-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-body-2" },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-body-2 font-weight-bold" },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        (__VLS_ctx.formattedRCData);
    }
    if (props.type === undefined) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex justify-space-between py-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-body-2" },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-body-2 font-weight-bold" },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        (__VLS_ctx.get("BillsPaid"));
        (__VLS_ctx.get("BillsTotal"));
        if (__VLS_ctx.get('BillsAmountDue') > 0) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-error" },
            });
            /** @type {__VLS_StyleScopedClasses['text-error']} */ ;
            (__VLS_ctx.get("BillsAmountDue").toLocaleString("en-NG"));
        }
    }
    if (__VLS_ctx.summary.timeframe === 'Yearly') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex justify-space-between py-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-1']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-body-2" },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-body-2 font-weight-bold" },
        });
        /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        (__VLS_ctx.get("PlansCompleted"));
        (__VLS_ctx.get("PlansTotal"));
    }
}
// @ts-ignore
[summary, summary, get, get, get, get, get, get, get, get, get, get, formattedRCData,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
