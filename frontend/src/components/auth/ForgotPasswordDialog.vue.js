import { ref } from "vue";
import { useUserStore } from "@/stores/users.stores";
const open = defineModel({
    type: Boolean,
    required: true,
});
const email = ref("");
const code = ref("");
const newPassword = ref("");
const showAlert = ref(false);
const alertState = ref(false);
const showCode = ref(false);
const togglePasswordVisibility = () => {
    showPasswordVisibility.value = !showPasswordVisibility.value;
};
const showPasswordVisibility = ref(false);
const message = ref("");
const userStore = useUserStore();
async function handleSubmit() {
    showAlert.value = false;
    // Handle form submission logic here
    try {
        if (!email.value) {
            showAlert.value = true;
            message.value = "Please enter your email address.";
            return;
        }
        if (!showCode.value) {
            const forgotPass = await userStore.forgotPassword(email.value);
            if (forgotPass.status) {
                showAlert.value = true;
                setTimeout(() => {
                    showAlert.value = false;
                    showCode.value = true;
                }, 1500);
                message.value = forgotPass.message || "Reset code sent to your email.";
            }
            else {
                showAlert.value = true;
                message.value =
                    forgotPass.message || "Failed to send reset link. Please try again.";
            }
        }
        else if (showCode.value) {
            // Handle code verification logic here
            const verifyCode = await userStore.resetPassword(email.value, code.value, newPassword.value); // Pass empty string for new password during verification
            if (verifyCode.status) {
                showCode.value = false;
                newPassword.value = "";
                message.value = verifyCode.message || "Password reset successfully.";
                setTimeout(() => {
                    showAlert.value = true;
                    open.value = false;
                    console.log(open.value);
                }, 1500);
            }
            else {
                showAlert.value = true;
                message.value = verifyCode.message || "Invalid verification code.";
            }
        }
        alertState.value = true;
    }
    catch (error) {
        showAlert.value = true;
        message.value = "An error occurred while sending the reset code. Please try again.";
        alertState.value = false;
        console.error("Error occurred while sending resetting password:", error);
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
    ...{ class: "px-1 py-5 bg-light rounded-lg d-flex flex-column gap-3" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "px-1 py-5 bg-light rounded-lg d-flex flex-column gap-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-light']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ class: "bg-transparent" },
    flat: true,
    elevation: "0",
}));
const __VLS_15 = __VLS_14({
    ...{ class: "bg-transparent" },
    flat: true,
    elevation: "0",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    flat: true,
    ...{ class: "d-flex flex-row align-items-baseline" },
}));
const __VLS_21 = __VLS_20({
    flat: true,
    ...{ class: "d-flex flex-row align-items-baseline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-baseline']} */ ;
const { default: __VLS_24 } = __VLS_22.slots;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer'] | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-h5" },
});
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer'] | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    ...{ 'onClick': {} },
    icon: true,
    size: "small",
    ...{ class: "pb-10" },
    variant: "flat",
}));
const __VLS_37 = __VLS_36({
    ...{ 'onClick': {} },
    icon: true,
    size: "small",
    ...{ class: "pb-10" },
    variant: "flat",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_40;
const __VLS_41 = {
    /** @type {typeof __VLS_40.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.open = false);
        // @ts-ignore
        [open, open,];
    },
};
/** @type {__VLS_StyleScopedClasses['pb-10']} */ ;
const { default: __VLS_42 } = __VLS_38.slots;
let __VLS_43;
/** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
vIcon;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent1(__VLS_43, new __VLS_43({
    color: "dark",
}));
const __VLS_45 = __VLS_44({
    color: "dark",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
const { default: __VLS_48 } = __VLS_46.slots;
// @ts-ignore
[];
var __VLS_46;
// @ts-ignore
[];
var __VLS_38;
var __VLS_39;
// @ts-ignore
[];
var __VLS_22;
// @ts-ignore
[];
var __VLS_16;
let __VLS_49;
/** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
vCardText;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent1(__VLS_49, new __VLS_49({}));
const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
const { default: __VLS_54 } = __VLS_52.slots;
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form'] | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form']} */
vForm;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    ...{ 'onSubmit': {} },
    ...{ class: "d-flex flex-column gap-3 mx-5" },
}));
const __VLS_57 = __VLS_56({
    ...{ 'onSubmit': {} },
    ...{ class: "d-flex flex-column gap-3 mx-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
let __VLS_60;
const __VLS_61 = {
    /** @type {typeof __VLS_60.submit} */
    onSubmit: (__VLS_ctx.handleSubmit),
};
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-5']} */ ;
const { default: __VLS_62 } = __VLS_58.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    type: "email",
    color: "black",
    baseColor: "black",
    variant: "underlined",
}));
const __VLS_65 = __VLS_64({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    type: "email",
    color: "black",
    baseColor: "black",
    variant: "underlined",
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
if (__VLS_ctx.showCode) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    let __VLS_68;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
        modelValue: (__VLS_ctx.code),
        label: "Verification Code",
        trim: "true",
        type: "text",
        color: "black",
        baseColor: "black",
        variant: "underlined",
        ...{ class: "text-black" },
    }));
    const __VLS_70 = __VLS_69({
        modelValue: (__VLS_ctx.code),
        label: "Verification Code",
        trim: "true",
        type: "text",
        color: "black",
        baseColor: "black",
        variant: "underlined",
        ...{ class: "text-black" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    /** @type {__VLS_StyleScopedClasses['text-black']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    let __VLS_73;
    /** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
    vTextField;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
        ...{ 'onClick:appendInner': {} },
        modelValue: (__VLS_ctx.newPassword),
        label: "New Password",
        type: (__VLS_ctx.showPasswordVisibility ? 'text' : 'password'),
        color: "black",
        baseColor: "black",
        variant: "underlined",
        ...{ class: "text-black" },
        appendInnerIcon: (__VLS_ctx.showPasswordVisibility ? 'mdi-eye-off' : 'mdi-eye'),
    }));
    const __VLS_75 = __VLS_74({
        ...{ 'onClick:appendInner': {} },
        modelValue: (__VLS_ctx.newPassword),
        label: "New Password",
        type: (__VLS_ctx.showPasswordVisibility ? 'text' : 'password'),
        color: "black",
        baseColor: "black",
        variant: "underlined",
        ...{ class: "text-black" },
        appendInnerIcon: (__VLS_ctx.showPasswordVisibility ? 'mdi-eye-off' : 'mdi-eye'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_74));
    let __VLS_78;
    const __VLS_79 = {
        /** @type {typeof __VLS_78.'click:appendInner'} */
        'onClick:appendInner': (__VLS_ctx.togglePasswordVisibility),
    };
    /** @type {__VLS_StyleScopedClasses['text-black']} */ ;
    var __VLS_76;
    var __VLS_77;
}
if (__VLS_ctx.showAlert) {
    let __VLS_80;
    /** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
    vAlert;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
        type: (__VLS_ctx.alertState ? 'success' : 'error'),
        ...{ class: "mt-4" },
    }));
    const __VLS_82 = __VLS_81({
        type: (__VLS_ctx.alertState ? 'success' : 'error'),
        ...{ class: "mt-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_81));
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    const { default: __VLS_85 } = __VLS_83.slots;
    (__VLS_ctx.message);
    // @ts-ignore
    [handleSubmit, email, showCode, code, newPassword, showPasswordVisibility, showPasswordVisibility, togglePasswordVisibility, showAlert, alertState, message,];
    var __VLS_83;
}
if (!__VLS_ctx.showCode) {
    let __VLS_86;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
        ...{ class: "text-bold text-button text-none bg-primary text-light py-5 mt-5" },
        variant: "flat",
        rounded: true,
        block: true,
        type: "submit",
    }));
    const __VLS_88 = __VLS_87({
        ...{ class: "text-bold text-button text-none bg-primary text-light py-5 mt-5" },
        variant: "flat",
        rounded: true,
        block: true,
        type: "submit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_87));
    /** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-light']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
    const { default: __VLS_91 } = __VLS_89.slots;
    // @ts-ignore
    [showCode,];
    var __VLS_89;
}
else {
    let __VLS_92;
    /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
    vBtn;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent1(__VLS_92, new __VLS_92({
        ...{ class: "text-bold text-button text-none bg-primary text-light py-5 mt-5" },
        variant: "flat",
        rounded: true,
        block: true,
        type: "submit",
    }));
    const __VLS_94 = __VLS_93({
        ...{ class: "text-bold text-button text-none bg-primary text-light py-5 mt-5" },
        variant: "flat",
        rounded: true,
        block: true,
        type: "submit",
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    /** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-light']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
    const { default: __VLS_97 } = __VLS_95.slots;
    // @ts-ignore
    [];
    var __VLS_95;
}
// @ts-ignore
[];
var __VLS_58;
var __VLS_59;
// @ts-ignore
[];
var __VLS_52;
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
