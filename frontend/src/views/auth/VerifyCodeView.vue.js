import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";
import { useRoute, useRouter } from "vue-router";
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const email = route.query.email || "";
const code = ref("");
const error = ref("");
const clipboardText = ref("");
const showClipboardSuggestion = ref(false);
async function suggestCodeFromClipboard() {
    try {
        clipboardText.value = await navigator.clipboard.readText();
        console.log("Clipboard text:", clipboardText.value);
        if (/^\d{6}$/.test(clipboardText.value.trim())) {
            showClipboardSuggestion.value = true;
        }
        else {
            showClipboardSuggestion.value = false;
        }
    }
    catch (error) {
        showClipboardSuggestion.value = false;
        console.error("Failed to read from clipboard:", error);
    }
}
function pasteCodeFromClipboard() {
    code.value = clipboardText.value.trim();
    showClipboardSuggestion.value = false;
}
async function handleVerify() {
    userStore.isLoading = true;
    try {
        await userStore.verifyAccount(email, code.value);
        router.push("/dashboard");
    }
    catch (err) {
        error.value = userStore.error || "Failed to verify code. Please try again.";
    }
    finally {
        userStore.isLoading = false;
    }
}
async function handleResend() {
    userStore.isLoading = true;
    try {
        await userStore.resendVerificationCode(email);
    }
    catch (err) {
        error.value = userStore.error || "Failed to resend code. Please try again.";
    }
    finally {
        userStore.isLoading = false;
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['spaced-input']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "text-center text-white mt-5 text-h5" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "text-center text-white mt-5 text-h5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
var __VLS_3;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.vCardSubtitle | typeof __VLS_components.VCardSubtitle | typeof __VLS_components['v-card-subtitle'] | typeof __VLS_components.vCardSubtitle | typeof __VLS_components.VCardSubtitle | typeof __VLS_components['v-card-subtitle']} */
vCardSubtitle;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ class: "text-center mb-6 text-light" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "text-center mb-6 text-light" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
var __VLS_9;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form'] | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form']} */
vForm;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    ...{ 'onSubmit': {} },
    ...{ class: "d-flex flex-column gap-3 px-5" },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onSubmit': {} },
    ...{ class: "d-flex flex-column gap-3 px-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_17;
const __VLS_18 = {
    /** @type {typeof __VLS_17.submit} */
    onSubmit: (__VLS_ctx.handleVerify),
};
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
const { default: __VLS_19 } = __VLS_15.slots;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.code),
    baseColor: "light",
    color: "light",
    label: "Verification Code",
    placeholder: "Enter 6-digit code",
    maxlength: "6",
    required: true,
    variant: "underlined",
    ...{ class: "mb-4 text-light spaced-input text-bold" },
}));
const __VLS_22 = __VLS_21({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.code),
    baseColor: "light",
    color: "light",
    label: "Verification Code",
    placeholder: "Enter 6-digit code",
    maxlength: "6",
    required: true,
    variant: "underlined",
    ...{ class: "mb-4 text-light spaced-input text-bold" },
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_25;
const __VLS_26 = {
    /** @type {typeof __VLS_25.focus} */
    onFocus: (__VLS_ctx.suggestCodeFromClipboard),
};
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
/** @type {__VLS_StyleScopedClasses['spaced-input']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
const { default: __VLS_27 } = __VLS_23.slots;
if (__VLS_ctx.showClipboardSuggestion) {
    {
        const { details: __VLS_28 } = __VLS_23.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (__VLS_ctx.pasteCodeFromClipboard) },
        });
        // @ts-ignore
        [handleVerify, code, suggestCodeFromClipboard, showClipboardSuggestion, pasteCodeFromClipboard,];
    }
}
// @ts-ignore
[];
var __VLS_23;
var __VLS_24;
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    type: "submit",
    color: "primary",
    block: true,
    variant: "flat",
    rounded: true,
    loading: (__VLS_ctx.userStore.isLoading),
    ...{ class: "text-bold text-button text-none bg-primary text-accent py-5 mt-5" },
}));
const __VLS_31 = __VLS_30({
    type: "submit",
    color: "primary",
    block: true,
    variant: "flat",
    rounded: true,
    loading: (__VLS_ctx.userStore.isLoading),
    ...{ class: "text-bold text-button text-none bg-primary text-accent py-5 mt-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-button']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
const { default: __VLS_34 } = __VLS_32.slots;
(__VLS_ctx.userStore.isLoading ? "Verifying..." : "Verify Email");
// @ts-ignore
[userStore, userStore,];
var __VLS_32;
// @ts-ignore
[];
var __VLS_15;
var __VLS_16;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
vCardActions;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    ...{ class: "flex-column" },
}));
const __VLS_37 = __VLS_36({
    ...{ class: "flex-column" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
const { default: __VLS_40 } = __VLS_38.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-center mb-2" },
});
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-body-2 text-white" },
});
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    ...{ 'onClick': {} },
    variant: "text",
    color: "primary",
    disabled: (__VLS_ctx.userStore.isLoading),
    ...{ class: "ml-1 text-none" },
}));
const __VLS_43 = __VLS_42({
    ...{ 'onClick': {} },
    variant: "text",
    color: "primary",
    disabled: (__VLS_ctx.userStore.isLoading),
    ...{ class: "ml-1 text-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
let __VLS_46;
const __VLS_47 = {
    /** @type {typeof __VLS_46.click} */
    onClick: (__VLS_ctx.handleResend),
};
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_48 } = __VLS_44.slots;
// @ts-ignore
[userStore, handleResend,];
var __VLS_44;
var __VLS_45;
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({
    variant: "text",
    ...{ class: "text-none" },
    color: "grey-darken-1",
    to: "/login",
    block: true,
}));
const __VLS_51 = __VLS_50({
    variant: "text",
    ...{ class: "text-none" },
    color: "grey-darken-1",
    to: "/login",
    block: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
const { default: __VLS_54 } = __VLS_52.slots;
// @ts-ignore
[];
var __VLS_52;
// @ts-ignore
[];
var __VLS_38;
if (__VLS_ctx.error) {
    let __VLS_55;
    /** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
    vAlert;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
        type: "error",
        variant: "elevated",
        ...{ class: "mt-4" },
    }));
    const __VLS_57 = __VLS_56({
        type: "error",
        variant: "elevated",
        ...{ class: "mt-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    const { default: __VLS_60 } = __VLS_58.slots;
    (__VLS_ctx.error);
    // @ts-ignore
    [error, error,];
    var __VLS_58;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
