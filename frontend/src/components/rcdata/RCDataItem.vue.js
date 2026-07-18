import { computed } from "vue";
const props = defineProps();
const emit = defineEmits();
const formattedDate = computed(() => new Date(props.record.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
}));
const formattedAmount = computed(() => {
    const { amount, size } = props.record.amount;
    return props.record.type === "airtime"
        ? `₦${Number(amount).toLocaleString("en-NG")}`
        : `${amount}${size}`;
});
const networkColor = computed(() => {
    const colors = {
        MTN: "warning",
        Airtel: "error",
        Glo: "success",
        "9mobile": "teal",
    };
    return colors[props.record.network] ?? "secondary";
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
    (__VLS_ctx.formattedDate);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-weight-bold text-body-2" },
    });
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    (__VLS_ctx.formattedAmount);
    // @ts-ignore
    [formattedDate, formattedAmount,];
}
{
    const { append: __VLS_14 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex align-center ga-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex flex-column align-center" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-body-2 font-weight-bold" },
    });
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    (__VLS_ctx.record.sender.name);
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        size: "x-small",
        color: (__VLS_ctx.networkColor),
        label: true,
    }));
    const __VLS_17 = __VLS_16({
        size: "x-small",
        color: (__VLS_ctx.networkColor),
        label: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_20 } = __VLS_18.slots;
    (__VLS_ctx.record.network);
    // @ts-ignore
    [record, record, networkColor,];
    var __VLS_18;
    let __VLS_21;
    /** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
    vMenu;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({}));
    const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
    const { default: __VLS_26 } = __VLS_24.slots;
    {
        const { activator: __VLS_27 } = __VLS_24.slots;
        const [{ props: menuProps }] = __VLS_vSlot(__VLS_27);
        let __VLS_28;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
            icon: "mdi-dots-vertical",
            size: "x-small",
            variant: "text",
            ...(menuProps),
        }));
        const __VLS_30 = __VLS_29({
            icon: "mdi-dots-vertical",
            size: "x-small",
            variant: "text",
            ...(menuProps),
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        // @ts-ignore
        [];
    }
    let __VLS_33;
    /** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
    vList;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
        density: "compact",
        rounded: "lg",
        minWidth: "140",
    }));
    const __VLS_35 = __VLS_34({
        density: "compact",
        rounded: "lg",
        minWidth: "140",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    const { default: __VLS_38 } = __VLS_36.slots;
    let __VLS_39;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
        ...{ 'onClick': {} },
        prependIcon: "mdi-pencil-outline",
        title: "Edit",
    }));
    const __VLS_41 = __VLS_40({
        ...{ 'onClick': {} },
        prependIcon: "mdi-pencil-outline",
        title: "Edit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    let __VLS_44;
    const __VLS_45 = {
        /** @type {typeof __VLS_44.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('edit', __VLS_ctx.record));
            // @ts-ignore
            [record, emit,];
        },
    };
    var __VLS_42;
    var __VLS_43;
    let __VLS_46;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        ...{ 'onClick': {} },
        prependIcon: "mdi-content-copy",
        title: "Duplicate",
    }));
    const __VLS_48 = __VLS_47({
        ...{ 'onClick': {} },
        prependIcon: "mdi-content-copy",
        title: "Duplicate",
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    let __VLS_51;
    const __VLS_52 = {
        /** @type {typeof __VLS_51.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('duplicate', __VLS_ctx.record));
            // @ts-ignore
            [record, emit,];
        },
    };
    var __VLS_49;
    var __VLS_50;
    let __VLS_53;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
        ...{ 'onClick': {} },
        prependIcon: "mdi-delete-outline",
        title: "Delete",
        baseColor: "error",
    }));
    const __VLS_55 = __VLS_54({
        ...{ 'onClick': {} },
        prependIcon: "mdi-delete-outline",
        title: "Delete",
        baseColor: "error",
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    let __VLS_58;
    const __VLS_59 = {
        /** @type {typeof __VLS_58.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('delete', __VLS_ctx.record));
            // @ts-ignore
            [record, emit,];
        },
    };
    var __VLS_56;
    var __VLS_57;
    // @ts-ignore
    [];
    var __VLS_36;
    // @ts-ignore
    [];
    var __VLS_24;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_10;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    align: "center",
    ...{ class: "d-none d-sm-flex px-2 py-2" },
}));
const __VLS_62 = __VLS_61({
    align: "center",
    ...{ class: "d-none d-sm-flex px-2 py-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
/** @type {__VLS_StyleScopedClasses['d-none']} */ ;
/** @type {__VLS_StyleScopedClasses['d-sm-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
const { default: __VLS_65 } = __VLS_63.slots;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    cols: "2",
}));
const __VLS_68 = __VLS_67({
    cols: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_71 } = __VLS_69.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
(__VLS_ctx.formattedDate);
// @ts-ignore
[formattedDate,];
var __VLS_69;
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
    ...{ class: "font-weight-bold text-body-2" },
});
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
(__VLS_ctx.formattedAmount);
// @ts-ignore
[formattedAmount,];
var __VLS_75;
let __VLS_78;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    cols: "3",
}));
const __VLS_80 = __VLS_79({
    cols: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
const { default: __VLS_83 } = __VLS_81.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-body-2 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
(__VLS_ctx.record.sender.name);
// @ts-ignore
[record,];
var __VLS_81;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    cols: "2",
}));
const __VLS_86 = __VLS_85({
    cols: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const { default: __VLS_89 } = __VLS_87.slots;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
vChip;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    size: "x-small",
    color: (__VLS_ctx.networkColor),
    label: true,
}));
const __VLS_92 = __VLS_91({
    size: "x-small",
    color: (__VLS_ctx.networkColor),
    label: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
const { default: __VLS_95 } = __VLS_93.slots;
(__VLS_ctx.record.network);
// @ts-ignore
[record, networkColor,];
var __VLS_93;
// @ts-ignore
[];
var __VLS_87;
let __VLS_96;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({
    cols: "2",
}));
const __VLS_98 = __VLS_97({
    cols: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_97));
const { default: __VLS_101 } = __VLS_99.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
(__VLS_ctx.record.remark);
// @ts-ignore
[record,];
var __VLS_99;
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    cols: "1",
    ...{ class: "d-flex justify-end" },
}));
const __VLS_104 = __VLS_103({
    cols: "1",
    ...{ class: "d-flex justify-end" },
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
const { default: __VLS_107 } = __VLS_105.slots;
let __VLS_108;
/** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
vMenu;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({}));
const __VLS_110 = __VLS_109({}, ...__VLS_functionalComponentArgsRest(__VLS_109));
const { default: __VLS_113 } = __VLS_111.slots;
{
    const { activator: __VLS_114 } = __VLS_111.slots;
    const [{ props: menuProps }] = __VLS_vSlot(__VLS_114);
    let __VLS_115;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_116 = __VLS_asFunctionalComponent1(__VLS_115, new __VLS_115({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }));
    const __VLS_117 = __VLS_116({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }, ...__VLS_functionalComponentArgsRest(__VLS_116));
    // @ts-ignore
    [];
}
let __VLS_120;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}));
const __VLS_122 = __VLS_121({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_121));
const { default: __VLS_125 } = __VLS_123.slots;
let __VLS_126;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
    ...{ 'onClick': {} },
    prependIcon: "mdi-pencil-outline",
    title: "Edit",
}));
const __VLS_128 = __VLS_127({
    ...{ 'onClick': {} },
    prependIcon: "mdi-pencil-outline",
    title: "Edit",
}, ...__VLS_functionalComponentArgsRest(__VLS_127));
let __VLS_131;
const __VLS_132 = {
    /** @type {typeof __VLS_131.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('edit', __VLS_ctx.record));
        // @ts-ignore
        [record, emit,];
    },
};
var __VLS_129;
var __VLS_130;
let __VLS_133;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_134 = __VLS_asFunctionalComponent1(__VLS_133, new __VLS_133({
    ...{ 'onClick': {} },
    prependIcon: "mdi-content-copy",
    title: "Duplicate",
}));
const __VLS_135 = __VLS_134({
    ...{ 'onClick': {} },
    prependIcon: "mdi-content-copy",
    title: "Duplicate",
}, ...__VLS_functionalComponentArgsRest(__VLS_134));
let __VLS_138;
const __VLS_139 = {
    /** @type {typeof __VLS_138.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('duplicate', __VLS_ctx.record));
        // @ts-ignore
        [record, emit,];
    },
};
var __VLS_136;
var __VLS_137;
let __VLS_140;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_141 = __VLS_asFunctionalComponent1(__VLS_140, new __VLS_140({
    ...{ 'onClick': {} },
    prependIcon: "mdi-delete-outline",
    title: "Delete",
    baseColor: "error",
}));
const __VLS_142 = __VLS_141({
    ...{ 'onClick': {} },
    prependIcon: "mdi-delete-outline",
    title: "Delete",
    baseColor: "error",
}, ...__VLS_functionalComponentArgsRest(__VLS_141));
let __VLS_145;
const __VLS_146 = {
    /** @type {typeof __VLS_145.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('delete', __VLS_ctx.record));
        // @ts-ignore
        [record, emit,];
    },
};
var __VLS_143;
var __VLS_144;
// @ts-ignore
[];
var __VLS_123;
// @ts-ignore
[];
var __VLS_111;
// @ts-ignore
[];
var __VLS_105;
// @ts-ignore
[];
var __VLS_63;
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
