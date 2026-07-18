import { computed } from "vue";
const props = defineProps();
const emit = defineEmits();
const formattedAmountPaid = computed(() => Number(props.bill.amountPaid).toLocaleString("en-NG"));
const formattedTotal = computed(() => Number(props.bill.total).toLocaleString("en-NG"));
const formattedDueDate = computed(() => props.bill.dueDate
    ? new Date(props.bill.dueDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
    : "—");
const progressPercent = computed(() => props.bill.total > 0
    ? Math.min((props.bill.amountPaid / props.bill.total) * 100, 100)
    : 0);
const statusColor = computed(() => {
    const colors = {
        Paid: "green",
        Part: "orange",
        Unpaid: "red",
        Overdue: "red",
    };
    return colors[props.bill.status] ?? "secondary";
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
    ...{ class: "px-3 py-1 mb-2" },
}));
const __VLS_2 = __VLS_1({
    variant: "outlined",
    rounded: "lg",
    ...{ class: "px-3 py-1 mb-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item'] | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ class: "px-0 py-2 d-sm-none" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "px-0 py-2 d-sm-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['px-0']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-sm-none']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
{
    const { prepend: __VLS_13 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex flex-column justify-center mr-3" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (__VLS_ctx.bill.recurrence);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-1 d-flex ga-2" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    let __VLS_14;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        size: "x-small",
        textColor: "white",
    }));
    const __VLS_16 = __VLS_15({
        size: "x-small",
        textColor: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const { default: __VLS_19 } = __VLS_17.slots;
    (Number(__VLS_ctx.bill.amountPaid).toLocaleString("en-NG"));
    (Number(__VLS_ctx.bill.total).toLocaleString("en-NG"));
    // @ts-ignore
    [bill, bill, bill,];
    var __VLS_17;
    let __VLS_20;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
        size: "x-small",
        color: (__VLS_ctx.statusColor),
        textColor: "white",
    }));
    const __VLS_22 = __VLS_21({
        size: "x-small",
        color: (__VLS_ctx.statusColor),
        textColor: "white",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const { default: __VLS_25 } = __VLS_23.slots;
    (__VLS_ctx.bill.status);
    // @ts-ignore
    [bill, statusColor,];
    var __VLS_23;
    // @ts-ignore
    [];
}
{
    const { append: __VLS_26 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex flex-column align-end" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-end']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-body-2 font-weight-bold" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    (__VLS_ctx.bill.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (__VLS_ctx.bill.type);
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
    vMenu;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({}));
    const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
    const { default: __VLS_32 } = __VLS_30.slots;
    {
        const { activator: __VLS_33 } = __VLS_30.slots;
        const [{ props: menuProps }] = __VLS_vSlot(__VLS_33);
        let __VLS_34;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
            icon: "mdi-dots-vertical",
            size: "x-small",
            variant: "text",
            ...(menuProps),
        }));
        const __VLS_36 = __VLS_35({
            icon: "mdi-dots-vertical",
            size: "x-small",
            variant: "text",
            ...(menuProps),
        }, ...__VLS_functionalComponentArgsRest(__VLS_35));
        // @ts-ignore
        [bill, bill,];
    }
    let __VLS_39;
    /** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
    vList;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        density: "compact",
        rounded: "lg",
        minWidth: "140",
    }));
    const __VLS_41 = __VLS_40({
        density: "compact",
        rounded: "lg",
        minWidth: "140",
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    const { default: __VLS_44 } = __VLS_42.slots;
    let __VLS_45;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
        ...{ 'onClick': {} },
        prependIcon: "mdi-pencil-outline",
        title: "Edit",
    }));
    const __VLS_47 = __VLS_46({
        ...{ 'onClick': {} },
        prependIcon: "mdi-pencil-outline",
        title: "Edit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    let __VLS_50;
    const __VLS_51 = {
        /** @type {typeof __VLS_50.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('edit', __VLS_ctx.bill));
            // @ts-ignore
            [bill, emit,];
        },
    };
    var __VLS_48;
    var __VLS_49;
    let __VLS_52;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
        ...{ 'onClick': {} },
        prependIcon: "mdi-content-copy",
        title: "Duplicate",
    }));
    const __VLS_54 = __VLS_53({
        ...{ 'onClick': {} },
        prependIcon: "mdi-content-copy",
        title: "Duplicate",
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_57;
    const __VLS_58 = {
        /** @type {typeof __VLS_57.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('duplicate', __VLS_ctx.bill));
            // @ts-ignore
            [bill, emit,];
        },
    };
    var __VLS_55;
    var __VLS_56;
    let __VLS_59;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({
        ...{ 'onClick': {} },
        prependIcon: "mdi-delete-outline",
        title: "Delete",
        baseColor: "error",
    }));
    const __VLS_61 = __VLS_60({
        ...{ 'onClick': {} },
        prependIcon: "mdi-delete-outline",
        title: "Delete",
        baseColor: "error",
    }, ...__VLS_functionalComponentArgsRest(__VLS_60));
    let __VLS_64;
    const __VLS_65 = {
        /** @type {typeof __VLS_64.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('delete', __VLS_ctx.bill));
            // @ts-ignore
            [bill, emit,];
        },
    };
    var __VLS_62;
    var __VLS_63;
    // @ts-ignore
    [];
    var __VLS_42;
    // @ts-ignore
    [];
    var __VLS_30;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_10;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    align: "center",
    ...{ class: "d-none d-sm-flex px-2 py-2" },
}));
const __VLS_68 = __VLS_67({
    align: "center",
    ...{ class: "d-none d-sm-flex px-2 py-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
/** @type {__VLS_StyleScopedClasses['d-none']} */ ;
/** @type {__VLS_StyleScopedClasses['d-sm-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
const { default: __VLS_71 } = __VLS_69.slots;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    cols: "2",
}));
const __VLS_74 = __VLS_73({
    cols: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-body-2 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
(__VLS_ctx.bill.name);
// @ts-ignore
[bill,];
var __VLS_75;
let __VLS_78;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    cols: "2",
}));
const __VLS_80 = __VLS_79({
    cols: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
const { default: __VLS_83 } = __VLS_81.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
(__VLS_ctx.bill.type);
// @ts-ignore
[bill,];
var __VLS_81;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    cols: "2",
    ...{ class: "d-flex align-center" },
}));
const __VLS_86 = __VLS_85({
    cols: "2",
    ...{ class: "d-flex align-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
const { default: __VLS_89 } = __VLS_87.slots;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
vChip;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    size: "small",
    textColor: "white",
}));
const __VLS_92 = __VLS_91({
    size: "small",
    textColor: "white",
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
const { default: __VLS_95 } = __VLS_93.slots;
(__VLS_ctx.formattedAmountPaid);
(__VLS_ctx.formattedTotal);
// @ts-ignore
[formattedAmountPaid, formattedTotal,];
var __VLS_93;
// @ts-ignore
[];
var __VLS_87;
let __VLS_96;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
    cols: "1",
}));
const __VLS_98 = __VLS_97({
    cols: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
const { default: __VLS_101 } = __VLS_99.slots;
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
vChip;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    size: "small",
    color: (__VLS_ctx.statusColor),
    textColor: "white",
}));
const __VLS_104 = __VLS_103({
    size: "small",
    color: (__VLS_ctx.statusColor),
    textColor: "white",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const { default: __VLS_107 } = __VLS_105.slots;
(__VLS_ctx.bill.status);
// @ts-ignore
[bill, statusColor,];
var __VLS_105;
// @ts-ignore
[];
var __VLS_99;
let __VLS_108;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
    cols: "2",
}));
const __VLS_110 = __VLS_109({
    cols: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
const { default: __VLS_113 } = __VLS_111.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
(__VLS_ctx.bill.recurrence);
// @ts-ignore
[bill,];
var __VLS_111;
let __VLS_114;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({
    cols: "1",
}));
const __VLS_116 = __VLS_115({
    cols: "1",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
const { default: __VLS_119 } = __VLS_117.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
(__VLS_ctx.formattedDueDate);
// @ts-ignore
[formattedDueDate,];
var __VLS_117;
let __VLS_120;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({
    cols: "1",
    ...{ class: "d-flex justify-end" },
}));
const __VLS_122 = __VLS_121({
    cols: "1",
    ...{ class: "d-flex justify-end" },
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
const { default: __VLS_125 } = __VLS_123.slots;
let __VLS_126;
/** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
vMenu;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({}));
const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
const { default: __VLS_131 } = __VLS_129.slots;
{
    const { activator: __VLS_132 } = __VLS_129.slots;
    const [{ props: menuProps }] = __VLS_vSlot(__VLS_132);
    let __VLS_133;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_134 = __VLS_asFunctionalComponent1(__VLS_133, new __VLS_133({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }));
    const __VLS_135 = __VLS_134({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }, ...__VLS_functionalComponentArgsRest(__VLS_134));
    // @ts-ignore
    [];
}
let __VLS_138;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}));
const __VLS_140 = __VLS_139({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_139));
const { default: __VLS_143 } = __VLS_141.slots;
let __VLS_144;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_145 = __VLS_asFunctionalComponent1(__VLS_144, new __VLS_144({
    ...{ 'onClick': {} },
    prependIcon: "mdi-pencil-outline",
    title: "Edit",
}));
const __VLS_146 = __VLS_145({
    ...{ 'onClick': {} },
    prependIcon: "mdi-pencil-outline",
    title: "Edit",
}, ...__VLS_functionalComponentArgsRest(__VLS_145));
let __VLS_149;
const __VLS_150 = {
    /** @type {typeof __VLS_149.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('edit', __VLS_ctx.bill));
        // @ts-ignore
        [bill, emit,];
    },
};
var __VLS_147;
var __VLS_148;
let __VLS_151;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent1(__VLS_151, new __VLS_151({
    ...{ 'onClick': {} },
    prependIcon: "mdi-content-copy",
    title: "Duplicate",
}));
const __VLS_153 = __VLS_152({
    ...{ 'onClick': {} },
    prependIcon: "mdi-content-copy",
    title: "Duplicate",
}, ...__VLS_functionalComponentArgsRest(__VLS_152));
let __VLS_156;
const __VLS_157 = {
    /** @type {typeof __VLS_156.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('duplicate', __VLS_ctx.bill));
        // @ts-ignore
        [bill, emit,];
    },
};
var __VLS_154;
var __VLS_155;
let __VLS_158;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent1(__VLS_158, new __VLS_158({
    ...{ 'onClick': {} },
    prependIcon: "mdi-delete-outline",
    title: "Delete",
    baseColor: "error",
}));
const __VLS_160 = __VLS_159({
    ...{ 'onClick': {} },
    prependIcon: "mdi-delete-outline",
    title: "Delete",
    baseColor: "error",
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
let __VLS_163;
const __VLS_164 = {
    /** @type {typeof __VLS_163.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('delete', __VLS_ctx.bill));
        // @ts-ignore
        [bill, emit,];
    },
};
var __VLS_161;
var __VLS_162;
// @ts-ignore
[];
var __VLS_141;
// @ts-ignore
[];
var __VLS_129;
// @ts-ignore
[];
var __VLS_123;
// @ts-ignore
[];
var __VLS_69;
let __VLS_165;
/** @ts-ignore @type { | typeof __VLS_components.vProgressLinear | typeof __VLS_components.VProgressLinear | typeof __VLS_components['v-progress-linear']} */
vProgressLinear;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
    modelValue: (__VLS_ctx.progressPercent),
    color: (__VLS_ctx.statusColor),
    height: "3",
    rounded: true,
    ...{ class: "mx-2 mb-1" },
}));
const __VLS_167 = __VLS_166({
    modelValue: (__VLS_ctx.progressPercent),
    color: (__VLS_ctx.statusColor),
    height: "3",
    rounded: true,
    ...{ class: "mx-2 mb-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_166));
/** @type {__VLS_StyleScopedClasses['mx-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
// @ts-ignore
[statusColor, progressPercent,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
