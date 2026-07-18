import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";
const open = defineModel({ required: true });
const emit = defineEmits();
const userStore = useUserStore();
const currentPassword = ref("");
const newPassword = ref("");
const showCurrent = ref(false);
const showNew = ref(false);
const showAlert = ref(false);
const alertState = ref(false);
const message = ref("");
function reset() {
    currentPassword.value = "";
    newPassword.value = "";
    showAlert.value = false;
}
function openForgotPassword() {
    reset();
    open.value = false;
    emit("forgotPassword");
}
async function handleSubmit() {
    showAlert.value = false;
    if (!currentPassword.value || !newPassword.value) {
        message.value = "Please fill in all fields.";
        alertState.value = false;
        showAlert.value = true;
        return;
    }
    if (newPassword.value === currentPassword.value) {
        message.value = "New password must be different from your current password.";
        alertState.value = false;
        showAlert.value = true;
        return;
    }
    try {
        await userStore.changePassword(currentPassword.value, newPassword.value);
        message.value = "Password changed successfully.";
        alertState.value = true;
        showAlert.value = true;
        setTimeout(() => {
            reset();
            open.value = false;
        }, 1500);
    }
    catch (error) {
        message.value = error.message || "Failed to change password. Please try again.";
        alertState.value = false;
        showAlert.value = true;
        setTimeout(() => {
            showAlert.value = false;
        }, 3000);
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
    ...{ class: "w-75 w-md-50" },
    scrim: "true",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.open),
    ...{ class: "w-75 w-md-50" },
    scrim: "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['w-75']} */ ;
/** @type {__VLS_StyleScopedClasses['w-md-50']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ class: "px-5 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-4" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "px-5 pb-5 pt-1 bg-light rounded-lg d-flex flex-column gap-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex flex-column align-center justify-end gap-1 pb-6 pt-n4" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-n4']} */ ;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ 'onClick': {} },
    icon: true,
    size: "x-small",
    variant: "text",
    ...{ class: "align-self-end" },
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    icon: true,
    size: "x-small",
    variant: "text",
    ...{ class: "align-self-end" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_18;
const __VLS_19 = {
    /** @type {typeof __VLS_18.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.open = false);
        // @ts-ignore
        [open, open,];
    },
};
/** @type {__VLS_StyleScopedClasses['align-self-end']} */ ;
const { default: __VLS_20 } = __VLS_16.slots;
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
// @ts-ignore
[];
var __VLS_24;
// @ts-ignore
[];
var __VLS_16;
var __VLS_17;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-label font-weight-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-label']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form'] | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form']} */
vForm;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    ...{ 'onSubmit': {} },
    ...{ class: "d-flex flex-column gap-2" },
}));
const __VLS_29 = __VLS_28({
    ...{ 'onSubmit': {} },
    ...{ class: "d-flex flex-column gap-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_32;
const __VLS_33 = {
    /** @type {typeof __VLS_32.submit} */
    onSubmit: (__VLS_ctx.handleSubmit),
};
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
const { default: __VLS_34 } = __VLS_30.slots;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    ...{ 'onClick:appendInner': {} },
    modelValue: (__VLS_ctx.currentPassword),
    label: "Old Password",
    type: (__VLS_ctx.showCurrent ? 'text' : 'password'),
    color: "secondary",
    baseColor: "secondary",
    variant: "outlined",
    density: "comfortable",
    appendInnerIcon: (__VLS_ctx.showCurrent ? 'mdi-eye-off' : 'mdi-eye'),
}));
const __VLS_37 = __VLS_36({
    ...{ 'onClick:appendInner': {} },
    modelValue: (__VLS_ctx.currentPassword),
    label: "Old Password",
    type: (__VLS_ctx.showCurrent ? 'text' : 'password'),
    color: "secondary",
    baseColor: "secondary",
    variant: "outlined",
    density: "comfortable",
    appendInnerIcon: (__VLS_ctx.showCurrent ? 'mdi-eye-off' : 'mdi-eye'),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_40;
const __VLS_41 = {
    /** @type {typeof __VLS_40.'click:appendInner'} */
    'onClick:appendInner': (...[$event]) => {
        return (__VLS_ctx.showCurrent = !__VLS_ctx.showCurrent);
        // @ts-ignore
        [handleSubmit, currentPassword, showCurrent, showCurrent, showCurrent, showCurrent,];
    },
};
var __VLS_38;
var __VLS_39;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ 'onClick:appendInner': {} },
    modelValue: (__VLS_ctx.newPassword),
    label: "New Password",
    type: (__VLS_ctx.showNew ? 'text' : 'password'),
    color: "secondary",
    baseColor: "secondary",
    variant: "outlined",
    density: "comfortable",
    appendInnerIcon: (__VLS_ctx.showNew ? 'mdi-eye-off' : 'mdi-eye'),
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick:appendInner': {} },
    modelValue: (__VLS_ctx.newPassword),
    label: "New Password",
    type: (__VLS_ctx.showNew ? 'text' : 'password'),
    color: "secondary",
    baseColor: "secondary",
    variant: "outlined",
    density: "comfortable",
    appendInnerIcon: (__VLS_ctx.showNew ? 'mdi-eye-off' : 'mdi-eye'),
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
const __VLS_48 = {
    /** @type {typeof __VLS_47.'click:appendInner'} */
    'onClick:appendInner': (...[$event]) => {
        return (__VLS_ctx.showNew = !__VLS_ctx.showNew);
        // @ts-ignore
        [newPassword, showNew, showNew, showNew, showNew,];
    },
};
var __VLS_45;
var __VLS_46;
if (__VLS_ctx.showAlert) {
    let __VLS_49;
    /** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
    vAlert;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
        type: (__VLS_ctx.alertState ? 'success' : 'error'),
        ...{ class: "mb-2" },
        density: "compact",
    }));
    const __VLS_51 = __VLS_50({
        type: (__VLS_ctx.alertState ? 'success' : 'error'),
        ...{ class: "mb-2" },
        density: "compact",
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    const { default: __VLS_54 } = __VLS_52.slots;
    (__VLS_ctx.message);
    // @ts-ignore
    [showAlert, alertState, message,];
    var __VLS_52;
}
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    type: "submit",
    color: "primary",
    variant: "flat",
    rounded: "xl",
    height: "40",
    ...{ class: "font-weight-bold text-button text-none mt-2" },
    loading: (__VLS_ctx.userStore.isLoading),
}));
const __VLS_57 = __VLS_56({
    type: "submit",
    color: "primary",
    variant: "flat",
    rounded: "xl",
    height: "40",
    ...{ class: "font-weight-bold text-button text-none mt-2" },
    loading: (__VLS_ctx.userStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-button']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
const { default: __VLS_60 } = __VLS_58.slots;
// @ts-ignore
[userStore,];
var __VLS_58;
// @ts-ignore
[];
var __VLS_30;
var __VLS_31;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-center mt-1" },
});
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
let __VLS_61;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
    ...{ 'onClick': {} },
    variant: "text",
    color: "secondary",
    size: "small",
}));
const __VLS_63 = __VLS_62({
    ...{ 'onClick': {} },
    variant: "text",
    color: "secondary",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
let __VLS_66;
const __VLS_67 = {
    /** @type {typeof __VLS_66.click} */
    onClick: (__VLS_ctx.openForgotPassword),
};
const { default: __VLS_68 } = __VLS_64.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ style: {} },
});
// @ts-ignore
[openForgotPassword,];
var __VLS_64;
var __VLS_65;
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
