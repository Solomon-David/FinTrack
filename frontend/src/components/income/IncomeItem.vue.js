import { computed } from "vue";
const props = defineProps();
const emit = defineEmits();
const formattedDate = computed(() => new Date(props.income.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
}));
const formattedAmount = computed(() => Number(props.income.amount).toLocaleString("en-NG"));
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
    (__VLS_ctx.income.sender);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-caption text-medium-emphasis" },
    });
    /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
    (__VLS_ctx.income.purpose);
    let __VLS_15;
    /** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
    vMenu;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({}));
    const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
    const { default: __VLS_20 } = __VLS_18.slots;
    {
        const { activator: __VLS_21 } = __VLS_18.slots;
        const [{ props: menuProps }] = __VLS_vSlot(__VLS_21);
        let __VLS_22;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
            icon: "mdi-dots-vertical",
            size: "x-small",
            variant: "text",
            ...(menuProps),
        }));
        const __VLS_24 = __VLS_23({
            icon: "mdi-dots-vertical",
            size: "x-small",
            variant: "text",
            ...(menuProps),
        }, ...__VLS_functionalComponentArgsRest(__VLS_23));
        // @ts-ignore
        [income, income,];
    }
    let __VLS_27;
    /** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
    vList;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        density: "compact",
        rounded: "lg",
        minWidth: "140",
    }));
    const __VLS_29 = __VLS_28({
        density: "compact",
        rounded: "lg",
        minWidth: "140",
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    const { default: __VLS_32 } = __VLS_30.slots;
    let __VLS_33;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
        ...{ 'onClick': {} },
        prependIcon: "mdi-pencil-outline",
        title: "Edit",
    }));
    const __VLS_35 = __VLS_34({
        ...{ 'onClick': {} },
        prependIcon: "mdi-pencil-outline",
        title: "Edit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    let __VLS_38;
    const __VLS_39 = {
        /** @type {typeof __VLS_38.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('edit', __VLS_ctx.income));
            // @ts-ignore
            [income, emit,];
        },
    };
    var __VLS_36;
    var __VLS_37;
    let __VLS_40;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({
        ...{ 'onClick': {} },
        prependIcon: "mdi-content-copy",
        title: "Duplicate",
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onClick': {} },
        prependIcon: "mdi-content-copy",
        title: "Duplicate",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_45;
    const __VLS_46 = {
        /** @type {typeof __VLS_45.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('duplicate', __VLS_ctx.income));
            // @ts-ignore
            [income, emit,];
        },
    };
    var __VLS_43;
    var __VLS_44;
    let __VLS_47;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
        ...{ 'onClick': {} },
        prependIcon: "mdi-delete-outline",
        title: "Delete",
        baseColor: "error",
    }));
    const __VLS_49 = __VLS_48({
        ...{ 'onClick': {} },
        prependIcon: "mdi-delete-outline",
        title: "Delete",
        baseColor: "error",
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    let __VLS_52;
    const __VLS_53 = {
        /** @type {typeof __VLS_52.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.emit('delete', __VLS_ctx.income));
            // @ts-ignore
            [income, emit,];
        },
    };
    var __VLS_50;
    var __VLS_51;
    // @ts-ignore
    [];
    var __VLS_30;
    // @ts-ignore
    [];
    var __VLS_18;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_10;
let __VLS_54;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
    align: "center",
    ...{ class: "d-none d-sm-flex px-2 py-2" },
}));
const __VLS_56 = __VLS_55({
    align: "center",
    ...{ class: "d-none d-sm-flex px-2 py-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
/** @type {__VLS_StyleScopedClasses['d-none']} */ ;
/** @type {__VLS_StyleScopedClasses['d-sm-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
const { default: __VLS_59 } = __VLS_57.slots;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    cols: "3",
}));
const __VLS_62 = __VLS_61({
    cols: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_65 } = __VLS_63.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
(__VLS_ctx.formattedDate);
// @ts-ignore
[formattedDate,];
var __VLS_63;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    cols: "3",
}));
const __VLS_68 = __VLS_67({
    cols: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_71 } = __VLS_69.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-weight-bold text-body-2" },
});
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
(__VLS_ctx.formattedAmount);
// @ts-ignore
[formattedAmount,];
var __VLS_69;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({
    cols: "3",
}));
const __VLS_74 = __VLS_73({
    cols: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-body-2 font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
(__VLS_ctx.income.sender);
// @ts-ignore
[income,];
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
(__VLS_ctx.income.purpose);
// @ts-ignore
[income,];
var __VLS_81;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
    cols: "1",
    ...{ class: "d-flex justify-end" },
}));
const __VLS_86 = __VLS_85({
    cols: "1",
    ...{ class: "d-flex justify-end" },
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
const { default: __VLS_89 } = __VLS_87.slots;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
vMenu;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({}));
const __VLS_92 = __VLS_91({}, ...__VLS_functionalComponentArgsRest(__VLS_91));
const { default: __VLS_95 } = __VLS_93.slots;
{
    const { activator: __VLS_96 } = __VLS_93.slots;
    const [{ props: menuProps }] = __VLS_vSlot(__VLS_96);
    let __VLS_97;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent1(__VLS_97, new __VLS_97({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }));
    const __VLS_99 = __VLS_98({
        icon: "mdi-dots-vertical",
        size: "x-small",
        variant: "text",
        ...(menuProps),
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    // @ts-ignore
    [];
}
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}));
const __VLS_104 = __VLS_103({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const { default: __VLS_107 } = __VLS_105.slots;
let __VLS_108;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({
    ...{ 'onClick': {} },
    prependIcon: "mdi-pencil-outline",
    title: "Edit",
}));
const __VLS_110 = __VLS_109({
    ...{ 'onClick': {} },
    prependIcon: "mdi-pencil-outline",
    title: "Edit",
}, ...__VLS_functionalComponentArgsRest(__VLS_109));
let __VLS_113;
const __VLS_114 = {
    /** @type {typeof __VLS_113.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('edit', __VLS_ctx.income));
        // @ts-ignore
        [income, emit,];
    },
};
var __VLS_111;
var __VLS_112;
let __VLS_115;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent1(__VLS_115, new __VLS_115({
    ...{ 'onClick': {} },
    prependIcon: "mdi-content-copy",
    title: "Duplicate",
}));
const __VLS_117 = __VLS_116({
    ...{ 'onClick': {} },
    prependIcon: "mdi-content-copy",
    title: "Duplicate",
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
let __VLS_120;
const __VLS_121 = {
    /** @type {typeof __VLS_120.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('duplicate', __VLS_ctx.income));
        // @ts-ignore
        [income, emit,];
    },
};
var __VLS_118;
var __VLS_119;
let __VLS_122;
/** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
vListItem;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent1(__VLS_122, new __VLS_122({
    ...{ 'onClick': {} },
    prependIcon: "mdi-delete-outline",
    title: "Delete",
    baseColor: "error",
}));
const __VLS_124 = __VLS_123({
    ...{ 'onClick': {} },
    prependIcon: "mdi-delete-outline",
    title: "Delete",
    baseColor: "error",
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
let __VLS_127;
const __VLS_128 = {
    /** @type {typeof __VLS_127.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.emit('delete', __VLS_ctx.income));
        // @ts-ignore
        [income, emit,];
    },
};
var __VLS_125;
var __VLS_126;
// @ts-ignore
[];
var __VLS_105;
// @ts-ignore
[];
var __VLS_93;
// @ts-ignore
[];
var __VLS_87;
// @ts-ignore
[];
var __VLS_57;
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
