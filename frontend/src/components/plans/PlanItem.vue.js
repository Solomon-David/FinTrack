import { computed } from "vue";
const props = defineProps();
const emit = defineEmits();
const formattedDueDate = computed(() => props.plan.dueDate
    ? new Date(props.plan.dueDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
    : "No due date");
const progressLabel = computed(() => {
    const progress = Number(props.plan.progress).toLocaleString("en-NG");
    if (props.plan.targetAmount === "Unknown") {
        return `₦${progress} saved`;
    }
    const target = Number(props.plan.targetAmount).toLocaleString("en-NG");
    return `₦${progress} / ₦${target}`;
});
const progressPercent = computed(() => {
    if (props.plan.targetAmount === "Unknown" || !props.plan.targetAmount)
        return null;
    const pct = (props.plan.progress / Number(props.plan.targetAmount)) * 100;
    return Math.min(100, Math.max(0, pct));
});
const statusColor = computed(() => {
    const colors = {
        Completed: "success",
        "In Progress": "secondary",
        Overdue: "error",
    };
    return colors[props.plan.status] ?? "secondary";
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
    ...{ class: "px-3 py-2 mb-2" },
}));
const __VLS_2 = __VLS_1({
    variant: "outlined",
    rounded: "lg",
    ...{ class: "px-3 py-2 mb-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item'] | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ class: "px-0 py-1 d-sm-none" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "px-0 py-1 d-sm-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['px-0']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
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
        ...{ class: "font-weight-bold text-body-2" },
    });
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
    (__VLS_ctx.plan.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (__VLS_ctx.formattedDueDate);
    // @ts-ignore
    [plan, formattedDueDate,];
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
    (__VLS_ctx.progressLabel);
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
    vChip;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        size: "x-small",
        color: (__VLS_ctx.statusColor),
        label: true,
    }));
    const __VLS_17 = __VLS_16({
        size: "x-small",
        color: (__VLS_ctx.statusColor),
        label: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_20 } = __VLS_18.slots;
    (__VLS_ctx.plan.status);
    // @ts-ignore
    [plan, progressLabel, statusColor,];
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
        prependIcon: "mdi-cash-plus",
        title: "Update",
    }));
    const __VLS_41 = __VLS_40({
        ...{ 'onClick': {} },
        prependIcon: "mdi-cash-plus",
        title: "Update",
    }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    let __VLS_44;
    const __VLS_45 = {
        /** @type {typeof __VLS_44.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('update', __VLS_ctx.plan));
            // @ts-ignore
            [plan, emit,];
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
        prependIcon: "mdi-pencil-outline",
        title: "Edit",
    }));
    const __VLS_48 = __VLS_47({
        ...{ 'onClick': {} },
        prependIcon: "mdi-pencil-outline",
        title: "Edit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    let __VLS_51;
    const __VLS_52 = {
        /** @type {typeof __VLS_51.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('edit', __VLS_ctx.plan));
            // @ts-ignore
            [plan, emit,];
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
        prependIcon: "mdi-content-copy",
        title: "Duplicate",
    }));
    const __VLS_55 = __VLS_54({
        ...{ 'onClick': {} },
        prependIcon: "mdi-content-copy",
        title: "Duplicate",
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    let __VLS_58;
    const __VLS_59 = {
        /** @type {typeof __VLS_58.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('duplicate', __VLS_ctx.plan));
            // @ts-ignore
            [plan, emit,];
        },
    };
    var __VLS_56;
    var __VLS_57;
    let __VLS_60;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
        ...{ 'onClick': {} },
        prependIcon: "mdi-delete-outline",
        title: "Delete",
        baseColor: "error",
    }));
    const __VLS_62 = __VLS_61({
        ...{ 'onClick': {} },
        prependIcon: "mdi-delete-outline",
        title: "Delete",
        baseColor: "error",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    let __VLS_65;
    const __VLS_66 = {
        /** @type {typeof __VLS_65.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('delete', __VLS_ctx.plan));
            // @ts-ignore
            [plan, emit,];
        },
    };
    var __VLS_63;
    var __VLS_64;
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
if (__VLS_ctx.progressPercent !== null) {
    let __VLS_67;
    /** @ts-ignore @type { | typeof __VLS_components.vProgressLinear | typeof __VLS_components.VProgressLinear | typeof __VLS_components['v-progress-linear']} */
    vProgressLinear;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent1(__VLS_67, new __VLS_67({
        modelValue: (__VLS_ctx.progressPercent),
        color: "secondary",
        height: "6",
        rounded: true,
        ...{ class: "d-sm-none mt-1" },
    }));
    const __VLS_69 = __VLS_68({
        modelValue: (__VLS_ctx.progressPercent),
        color: "secondary",
        height: "6",
        rounded: true,
        ...{ class: "d-sm-none mt-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    /** @type {__VLS_StyleScopedClasses['d-sm-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
}
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    align: "center",
    ...{ class: "d-none d-sm-flex px-2 py-1" },
}));
const __VLS_74 = __VLS_73({
    align: "center",
    ...{ class: "d-none d-sm-flex px-2 py-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
/** @type {__VLS_StyleScopedClasses['d-none']} */ ;
/** @type {__VLS_StyleScopedClasses['d-sm-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
const { default: __VLS_77 } = __VLS_75.slots;
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
(__VLS_ctx.plan.name);
if (__VLS_ctx.plan.description) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (__VLS_ctx.plan.description);
}
// @ts-ignore
[plan, plan, plan, progressPercent, progressPercent,];
var __VLS_81;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    cols: "3",
}));
const __VLS_86 = __VLS_85({
    cols: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const { default: __VLS_89 } = __VLS_87.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-body-2" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
(__VLS_ctx.progressLabel);
if (__VLS_ctx.progressPercent !== null) {
    let __VLS_90;
    /** @ts-ignore @type { | typeof __VLS_components.vProgressLinear | typeof __VLS_components.VProgressLinear | typeof __VLS_components['v-progress-linear']} */
    vProgressLinear;
    // @ts-ignore
    const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
        modelValue: (__VLS_ctx.progressPercent),
        color: "secondary",
        height: "6",
        rounded: true,
        ...{ class: "mt-1" },
    }));
    const __VLS_92 = __VLS_91({
        modelValue: (__VLS_ctx.progressPercent),
        color: "secondary",
        height: "6",
        rounded: true,
        ...{ class: "mt-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_91));
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
}
// @ts-ignore
[progressLabel, progressPercent, progressPercent,];
var __VLS_87;
let __VLS_95;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent1(__VLS_95, new __VLS_95({
    cols: "2",
}));
const __VLS_97 = __VLS_96({
    cols: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
const { default: __VLS_100 } = __VLS_98.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
(__VLS_ctx.formattedDueDate);
// @ts-ignore
[formattedDueDate,];
var __VLS_98;
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
    cols: "2",
}));
const __VLS_103 = __VLS_102({
    cols: "2",
}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const { default: __VLS_106 } = __VLS_104.slots;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip'] | typeof __VLS_components.vChip | typeof __VLS_components.VChip | typeof __VLS_components['v-chip']} */
vChip;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    size: "x-small",
    color: (__VLS_ctx.statusColor),
    label: true,
}));
const __VLS_109 = __VLS_108({
    size: "x-small",
    color: (__VLS_ctx.statusColor),
    label: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
const { default: __VLS_112 } = __VLS_110.slots;
(__VLS_ctx.plan.status);
// @ts-ignore
[plan, statusColor,];
var __VLS_110;
// @ts-ignore
[];
var __VLS_104;
let __VLS_113;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({
    cols: "2",
    ...{ class: "d-flex justify-end" },
}));
const __VLS_115 = __VLS_114({
    cols: "2",
    ...{ class: "d-flex justify-end" },
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
const { default: __VLS_118 } = __VLS_116.slots;
let __VLS_119;
/** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
vMenu;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent1(__VLS_119, new __VLS_119({}));
const __VLS_121 = __VLS_120({}, ...__VLS_functionalComponentArgsRest(__VLS_120));
const { default: __VLS_124 } = __VLS_122.slots;
{
    const { activator: __VLS_125 } = __VLS_122.slots;
    const [{ props: menuProps }] = __VLS_vSlot(__VLS_125);
    let __VLS_126;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }));
    const __VLS_128 = __VLS_127({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    // @ts-ignore
    [];
}
let __VLS_131;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}));
const __VLS_133 = __VLS_132({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_132));
const { default: __VLS_136 } = __VLS_134.slots;
let __VLS_137;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({
    ...{ 'onClick': {} },
    prependIcon: "mdi-cash-plus",
    title: "Update",
}));
const __VLS_139 = __VLS_138({
    ...{ 'onClick': {} },
    prependIcon: "mdi-cash-plus",
    title: "Update",
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
let __VLS_142;
const __VLS_143 = {
    /** @type {typeof __VLS_142.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('update', __VLS_ctx.plan));
        // @ts-ignore
        [plan, emit,];
    },
};
var __VLS_140;
var __VLS_141;
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
        return (__VLS_ctx.emit('edit', __VLS_ctx.plan));
        // @ts-ignore
        [plan, emit,];
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
        return (__VLS_ctx.emit('duplicate', __VLS_ctx.plan));
        // @ts-ignore
        [plan, emit,];
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
        return (__VLS_ctx.emit('delete', __VLS_ctx.plan));
        // @ts-ignore
        [plan, emit,];
    },
};
var __VLS_161;
var __VLS_162;
// @ts-ignore
[];
var __VLS_134;
// @ts-ignore
[];
var __VLS_122;
// @ts-ignore
[];
var __VLS_116;
// @ts-ignore
[];
var __VLS_75;
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
