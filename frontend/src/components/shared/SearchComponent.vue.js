import { ref } from "vue";
const props = defineProps();
const filterMenu = ref(false);
const selectedFilter = ref(props.filters[0]);
const searchQuery = ref("");
function selectFilter(filter) {
    selectedFilter.value = filter;
    filterMenu.value = false;
    onSearch();
}
function onSearch() {
    props.onSearchFn(searchQuery.value, selectedFilter.value);
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex align-center ga-2 px-none py-none mx-auto bg-grey-blue rounded-xl w-xs-50 w-md-75" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-none']} */ ;
/** @type {__VLS_StyleScopedClasses['py-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-grey-blue']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['w-xs-50']} */ ;
/** @type {__VLS_StyleScopedClasses['w-md-75']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu'] | typeof __VLS_components.vMenu | typeof __VLS_components.VMenu | typeof __VLS_components['v-menu']} */
vMenu;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.filterMenu),
    closeOnContentClick: (false),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.filterMenu),
    closeOnContentClick: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { activator: __VLS_6 } = __VLS_3.slots;
    const [{ props: menuProps }] = __VLS_vSlot(__VLS_6);
    let __VLS_7;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
        color: "light",
        variant: "tonal",
        rounded: "xl",
        size: "large",
        appendIcon: "mdi-menu-down",
        ...{ class: "text-none bg-secondary my-none mx-none" },
        ...{ style: {} },
        ...(menuProps),
    }));
    const __VLS_9 = __VLS_8({
        color: "light",
        variant: "tonal",
        rounded: "xl",
        size: "large",
        appendIcon: "mdi-menu-down",
        ...{ class: "text-none bg-secondary my-none mx-none" },
        ...{ style: {} },
        ...(menuProps),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-secondary']} */ ;
    /** @type {__VLS_StyleScopedClasses['my-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-none']} */ ;
    const { default: __VLS_12 } = __VLS_10.slots;
    (__VLS_ctx.selectedFilter || __VLS_ctx.filters[0]);
    // @ts-ignore
    [filterMenu, selectedFilter, filters,];
    var __VLS_10;
    // @ts-ignore
    [];
}
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list'] | typeof __VLS_components.vList | typeof __VLS_components.VList | typeof __VLS_components['v-list']} */
vList;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}));
const __VLS_15 = __VLS_14({
    density: "compact",
    rounded: "lg",
    minWidth: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
for (const [filter] of __VLS_vFor((__VLS_ctx.filters))) {
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.vListItem | typeof __VLS_components.VListItem | typeof __VLS_components['v-list-item']} */
    vListItem;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        ...{ 'onClick': {} },
        key: (filter),
        title: (filter),
        active: (__VLS_ctx.selectedFilter === filter),
        color: "secondary",
        rounded: "lg",
    }));
    const __VLS_21 = __VLS_20({
        ...{ 'onClick': {} },
        key: (filter),
        title: (filter),
        active: (__VLS_ctx.selectedFilter === filter),
        color: "secondary",
        rounded: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    let __VLS_24;
    const __VLS_25 = {
        /** @type {typeof __VLS_24.click} */
        onClick: (...[$event]) => {
            return (__VLS_ctx.selectFilter(filter));
            // @ts-ignore
            [selectedFilter, filters, selectFilter,];
        },
    };
    var __VLS_22;
    var __VLS_23;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
var __VLS_3;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.searchQuery),
    placeholder: "Search",
    variant: "none",
    density: "comfortable",
    rounded: "xl",
    hideDetails: true,
    ...{ class: "flex-grow-1" },
    appendInnerIcon: "mdi-magnify",
}));
const __VLS_28 = __VLS_27({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.searchQuery),
    placeholder: "Search",
    variant: "none",
    density: "comfortable",
    rounded: "xl",
    hideDetails: true,
    ...{ class: "flex-grow-1" },
    appendInnerIcon: "mdi-magnify",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_31;
const __VLS_32 = {
    /** @type {typeof __VLS_31.'update:modelValue'} */
    'onUpdate:modelValue': (__VLS_ctx.onSearch),
};
/** @type {__VLS_StyleScopedClasses['flex-grow-1']} */ ;
var __VLS_29;
var __VLS_30;
// @ts-ignore
[searchQuery, onSearch,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
