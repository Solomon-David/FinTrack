import { ref, reactive, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/users.stores";
import ChangePasswordDialog from "@/components/auth/ChangePasswordDialog.vue";
const changePasswordDialog = ref(false);
const userStore = useUserStore();
// Photo
const photoUrl = ref("");
const fileInput = ref(null);
const photoUploading = ref(false);
// Form
const formRef = ref();
const form = reactive({
    firstName: "",
    nickname: "",
    dob: "",
    email: "",
});
const originalForm = reactive({
    firstName: "",
    nickname: "",
    dob: "",
    email: "",
});
const activeField = ref(null);
const fullNameLabel = computed(() => activeField.value === "firstName"
    ? "First Name"
    : originalForm.firstName
        ? `${originalForm.firstName} ${userStore.user?.lastName ?? ""}`
        : "Name (first and last)");
// Email verification
const emailDialog = ref(false);
const verificationCode = ref("");
const verifying = ref(false);
const resending = ref(false);
const snackbar = reactive({ show: false, message: "", color: "success" });
const required = (v) => !!v || "This field is required";
onMounted(async () => {
    const user = userStore.user;
    if (!user)
        return;
    form.firstName = user.firstName ?? "";
    form.nickname = user.nickname ?? "";
    form.dob = user.dob ? new Date(user.dob).toISOString().split("T")[0] : "";
    form.email = user.email ?? "";
    Object.assign(originalForm, { ...form });
    photoUrl.value =
        userStore.photoData || (user.id ? await userStore.getUserPhoto(user.id) : "");
});
function activateField(field) {
    activeField.value = field;
}
async function saveField(field) {
    if (!form[field] && (field === "firstName" || field === "email")) {
        showSnackbar("This field is required.", "error");
        return;
    }
    if (form[field] === originalForm[field]) {
        activeField.value = null;
        return;
    }
    // Email change — open verification dialog instead of saving directly
    if (field === "email") {
        try {
            await userStore.resendVerificationCode(form.email);
            emailDialog.value = true;
        }
        catch {
            showSnackbar("Failed to send verification code.", "error");
        }
        return;
    }
    try {
        await userStore.updateProfile({
            firstName: form.firstName,
            lastName: userStore.user?.lastName ?? "",
            nickname: form.nickname,
            email: originalForm.email,
            dob: form.dob,
        });
        originalForm[field] = form[field];
        activeField.value = null;
        showSnackbar("Updated successfully!", "success");
    }
    catch {
        showSnackbar("Failed to update.", "error");
    }
}
function cancelField(field) {
    form[field] = originalForm[field];
    activeField.value = null;
}
// Email verification flow
async function confirmEmailChange() {
    if (!verificationCode.value || verificationCode.value.length < 6)
        return;
    verifying.value = true;
    try {
        await userStore.verifyAccount(form.email, verificationCode.value);
        await userStore.updateProfile({
            firstName: form.firstName,
            lastName: userStore.user?.lastName ?? "",
            nickname: form.nickname,
            email: form.email,
            dob: form.dob,
        });
        originalForm.email = form.email;
        activeField.value = null;
        emailDialog.value = false;
        verificationCode.value = "";
        showSnackbar("Email updated and verified!", "success");
    }
    catch {
        showSnackbar("Invalid or expired code.", "error");
    }
    finally {
        verifying.value = false;
    }
}
async function resendCode() {
    resending.value = true;
    try {
        await userStore.resendVerificationCode(form.email);
        showSnackbar("Code resent!", "success");
    }
    catch {
        showSnackbar("Failed to resend code.", "error");
    }
    finally {
        resending.value = false;
    }
}
function cancelEmailChange() {
    form.email = originalForm.email;
    verificationCode.value = "";
    activeField.value = null;
    emailDialog.value = false;
}
// Photo
function triggerFileInput() {
    fileInput.value?.click();
}
async function onPhotoSelected(event) {
    const file = event.target.files?.[0];
    if (!file)
        return;
    photoUrl.value = URL.createObjectURL(file);
    photoUploading.value = true;
    try {
        await userStore.uploadProfilePicture(file);
        photoUrl.value = userStore.photoData;
        showSnackbar("Profile photo updated!", "success");
    }
    catch {
        showSnackbar("Failed to upload photo.", "error");
        photoUrl.value = userStore.photoData;
    }
    finally {
        photoUploading.value = false;
    }
}
function showSnackbar(message, color) {
    snackbar.message = message;
    snackbar.color = color;
    snackbar.show = true;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container'] | typeof __VLS_components.vContainer | typeof __VLS_components.VContainer | typeof __VLS_components['v-container']} */
vContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    fluid: true,
    ...{ class: "pa-4" },
}));
const __VLS_2 = __VLS_1({
    fluid: true,
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    justify: "center",
    ...{ class: "mb-6" },
}));
const __VLS_9 = __VLS_8({
    justify: "center",
    ...{ class: "mb-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    cols: "auto",
    ...{ class: "text-center" },
}));
const __VLS_15 = __VLS_14({
    cols: "auto",
    ...{ class: "text-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const { default: __VLS_18 } = __VLS_16.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "position-relative d-inline-block" },
});
/** @type {__VLS_StyleScopedClasses['position-relative']} */ ;
/** @type {__VLS_StyleScopedClasses['d-inline-block']} */ ;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar'] | typeof __VLS_components.vAvatar | typeof __VLS_components.VAvatar | typeof __VLS_components['v-avatar']} */
vAvatar;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    size: "100",
    color: "secondary",
    ...{ class: "border border-md" },
}));
const __VLS_21 = __VLS_20({
    size: "100",
    color: "secondary",
    ...{ class: "border border-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-md']} */ ;
const { default: __VLS_24 } = __VLS_22.slots;
if (__VLS_ctx.photoUrl) {
    let __VLS_25;
    /** @ts-ignore @type { | typeof __VLS_components.vImg | typeof __VLS_components.VImg | typeof __VLS_components['v-img']} */
    vImg;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        src: (__VLS_ctx.photoUrl),
    }));
    const __VLS_27 = __VLS_26({
        src: (__VLS_ctx.photoUrl),
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
}
else {
    let __VLS_30;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
        size: "60",
        color: "secondary",
    }));
    const __VLS_32 = __VLS_31({
        size: "60",
        color: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const { default: __VLS_35 } = __VLS_33.slots;
    // @ts-ignore
    [photoUrl, photoUrl,];
    var __VLS_33;
}
if (__VLS_ctx.photoUploading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "position-absolute d-flex align-center justify-center" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['position-absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    let __VLS_36;
    /** @ts-ignore @type { | typeof __VLS_components.vProgressCircular | typeof __VLS_components.VProgressCircular | typeof __VLS_components['v-progress-circular']} */
    vProgressCircular;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
        indeterminate: true,
        color: "white",
        size: "32",
        width: "3",
    }));
    const __VLS_38 = __VLS_37({
        indeterminate: true,
        color: "white",
        size: "32",
        width: "3",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
}
// @ts-ignore
[photoUploading,];
var __VLS_22;
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    ...{ 'onClick': {} },
    icon: "mdi-camera-outline",
    color: "secondary",
    size: "x-small",
    rounded: "xl",
    elevation: "2",
    ...{ class: "position-absolute" },
    ...{ style: {} },
    disabled: (__VLS_ctx.photoUploading),
}));
const __VLS_43 = __VLS_42({
    ...{ 'onClick': {} },
    icon: "mdi-camera-outline",
    color: "secondary",
    size: "x-small",
    rounded: "xl",
    elevation: "2",
    ...{ class: "position-absolute" },
    ...{ style: {} },
    disabled: (__VLS_ctx.photoUploading),
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
let __VLS_46;
const __VLS_47 = {
    /** @type {typeof __VLS_46.click} */
    onClick: (__VLS_ctx.triggerFileInput),
};
/** @type {__VLS_StyleScopedClasses['position-absolute']} */ ;
var __VLS_44;
var __VLS_45;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.onPhotoSelected) },
    ref: "fileInput",
    type: "file",
    accept: "image/*",
    ...{ class: "d-none" },
});
/** @type {__VLS_StyleScopedClasses['d-none']} */ ;
// @ts-ignore
[photoUploading, triggerFileInput, onPhotoSelected,];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form'] | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form']} */
vForm;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    ref: "formRef",
}));
const __VLS_50 = __VLS_49({
    ref: "formRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
var __VLS_53;
const { default: __VLS_55 } = __VLS_51.slots;
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    dense: true,
}));
const __VLS_58 = __VLS_57({
    dense: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_59.slots;
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({
    cols: "12",
}));
const __VLS_64 = __VLS_63({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const { default: __VLS_67 } = __VLS_65.slots;
let __VLS_68;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.form.firstName),
    label: (__VLS_ctx.fullNameLabel),
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
    readonly: (__VLS_ctx.activeField !== 'firstName'),
}));
const __VLS_70 = __VLS_69({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.form.firstName),
    label: (__VLS_ctx.fullNameLabel),
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
    rules: ([__VLS_ctx.required]),
    readonly: (__VLS_ctx.activeField !== 'firstName'),
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
let __VLS_73;
const __VLS_74 = {
    /** @type {typeof __VLS_73.focus} */
    onFocus: (...[$event]) => {
        return (__VLS_ctx.activateField('firstName'));
        // @ts-ignore
        [form, fullNameLabel, required, activeField, activateField,];
    },
};
const { default: __VLS_75 } = __VLS_71.slots;
{
    const { 'prepend-inner': __VLS_76 } = __VLS_71.slots;
    let __VLS_77;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({
        color: "secondary",
        size: "20",
    }));
    const __VLS_79 = __VLS_78({
        color: "secondary",
        size: "20",
    }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    const { default: __VLS_82 } = __VLS_80.slots;
    // @ts-ignore
    [];
    var __VLS_80;
    // @ts-ignore
    [];
}
{
    const { 'append-inner': __VLS_83 } = __VLS_71.slots;
    let __VLS_84;
    /** @ts-ignore @type { | typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
    transition;
    // @ts-ignore
    const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({
        name: "slide-x",
    }));
    const __VLS_86 = __VLS_85({
        name: "slide-x",
    }, ...__VLS_functionalComponentArgsRest(__VLS_85));
    const { default: __VLS_89 } = __VLS_87.slots;
    if (__VLS_ctx.activeField === 'firstName') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex ga-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-1']} */ ;
        let __VLS_90;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
            ...{ 'onClick': {} },
            icon: "mdi-check",
            color: "success",
            size: "x-small",
            variant: "tonal",
        }));
        const __VLS_92 = __VLS_91({
            ...{ 'onClick': {} },
            icon: "mdi-check",
            color: "success",
            size: "x-small",
            variant: "tonal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_91));
        let __VLS_95;
        const __VLS_96 = {
            /** @type {typeof __VLS_95.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.activeField === 'firstName'))
                    throw 0;
                return (__VLS_ctx.saveField('firstName'));
                // @ts-ignore
                [activeField, saveField,];
            },
        };
        var __VLS_93;
        var __VLS_94;
        let __VLS_97;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_98 = __VLS_asFunctionalComponent1(__VLS_97, new __VLS_97({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            color: "error",
            size: "x-small",
            variant: "tonal",
        }));
        const __VLS_99 = __VLS_98({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            color: "error",
            size: "x-small",
            variant: "tonal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_98));
        let __VLS_102;
        const __VLS_103 = {
            /** @type {typeof __VLS_102.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.activeField === 'firstName'))
                    throw 0;
                return (__VLS_ctx.cancelField('firstName'));
                // @ts-ignore
                [cancelField,];
            },
        };
        var __VLS_100;
        var __VLS_101;
    }
    else {
        let __VLS_104;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_105 = __VLS_asFunctionalComponent1(__VLS_104, new __VLS_104({
            ...{ 'onClick': {} },
            icon: "mdi-pencil",
            color: "secondary",
            size: "x-small",
            variant: "text",
        }));
        const __VLS_106 = __VLS_105({
            ...{ 'onClick': {} },
            icon: "mdi-pencil",
            color: "secondary",
            size: "x-small",
            variant: "text",
        }, ...__VLS_functionalComponentArgsRest(__VLS_105));
        let __VLS_109;
        const __VLS_110 = {
            /** @type {typeof __VLS_109.click} */
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.activeField === 'firstName'))
                    throw 0;
                return (__VLS_ctx.activateField('firstName'));
                // @ts-ignore
                [activateField,];
            },
        };
        var __VLS_107;
        var __VLS_108;
    }
    // @ts-ignore
    [];
    var __VLS_87;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_71;
var __VLS_72;
// @ts-ignore
[];
var __VLS_65;
let __VLS_111;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent1(__VLS_111, new __VLS_111({
    cols: "12",
}));
const __VLS_113 = __VLS_112({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
const { default: __VLS_116 } = __VLS_114.slots;
let __VLS_117;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent1(__VLS_117, new __VLS_117({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.form.nickname),
    label: "Nickname",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
    readonly: (__VLS_ctx.activeField !== 'nickname'),
}));
const __VLS_119 = __VLS_118({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.form.nickname),
    label: "Nickname",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
    readonly: (__VLS_ctx.activeField !== 'nickname'),
}, ...__VLS_functionalComponentArgsRest(__VLS_118));
let __VLS_122;
const __VLS_123 = {
    /** @type {typeof __VLS_122.focus} */
    onFocus: (...[$event]) => {
        return (__VLS_ctx.activateField('nickname'));
        // @ts-ignore
        [form, activeField, activateField,];
    },
};
const { default: __VLS_124 } = __VLS_120.slots;
{
    const { 'prepend-inner': __VLS_125 } = __VLS_120.slots;
    let __VLS_126;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({
        color: "secondary",
        size: "20",
    }));
    const __VLS_128 = __VLS_127({
        color: "secondary",
        size: "20",
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    const { default: __VLS_131 } = __VLS_129.slots;
    // @ts-ignore
    [];
    var __VLS_129;
    // @ts-ignore
    [];
}
{
    const { 'append-inner': __VLS_132 } = __VLS_120.slots;
    let __VLS_133;
    /** @ts-ignore @type { | typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
    transition;
    // @ts-ignore
    const __VLS_134 = __VLS_asFunctionalComponent1(__VLS_133, new __VLS_133({
        name: "slide-x",
    }));
    const __VLS_135 = __VLS_134({
        name: "slide-x",
    }, ...__VLS_functionalComponentArgsRest(__VLS_134));
    const { default: __VLS_138 } = __VLS_136.slots;
    if (__VLS_ctx.activeField === 'nickname') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex ga-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-1']} */ ;
        let __VLS_139;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_140 = __VLS_asFunctionalComponent1(__VLS_139, new __VLS_139({
            ...{ 'onClick': {} },
            icon: "mdi-check",
            color: "success",
            size: "x-small",
            variant: "tonal",
        }));
        const __VLS_141 = __VLS_140({
            ...{ 'onClick': {} },
            icon: "mdi-check",
            color: "success",
            size: "x-small",
            variant: "tonal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_140));
        let __VLS_144;
        const __VLS_145 = {
            /** @type {typeof __VLS_144.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.activeField === 'nickname'))
                    throw 0;
                return (__VLS_ctx.saveField('nickname'));
                // @ts-ignore
                [activeField, saveField,];
            },
        };
        var __VLS_142;
        var __VLS_143;
        let __VLS_146;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_147 = __VLS_asFunctionalComponent1(__VLS_146, new __VLS_146({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            color: "error",
            size: "x-small",
            variant: "tonal",
        }));
        const __VLS_148 = __VLS_147({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            color: "error",
            size: "x-small",
            variant: "tonal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_147));
        let __VLS_151;
        const __VLS_152 = {
            /** @type {typeof __VLS_151.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.activeField === 'nickname'))
                    throw 0;
                return (__VLS_ctx.cancelField('nickname'));
                // @ts-ignore
                [cancelField,];
            },
        };
        var __VLS_149;
        var __VLS_150;
    }
    else {
        let __VLS_153;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_154 = __VLS_asFunctionalComponent1(__VLS_153, new __VLS_153({
            ...{ 'onClick': {} },
            icon: "mdi-pencil",
            color: "secondary",
            size: "x-small",
            variant: "text",
        }));
        const __VLS_155 = __VLS_154({
            ...{ 'onClick': {} },
            icon: "mdi-pencil",
            color: "secondary",
            size: "x-small",
            variant: "text",
        }, ...__VLS_functionalComponentArgsRest(__VLS_154));
        let __VLS_158;
        const __VLS_159 = {
            /** @type {typeof __VLS_158.click} */
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.activeField === 'nickname'))
                    throw 0;
                return (__VLS_ctx.activateField('nickname'));
                // @ts-ignore
                [activateField,];
            },
        };
        var __VLS_156;
        var __VLS_157;
    }
    // @ts-ignore
    [];
    var __VLS_136;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_120;
var __VLS_121;
// @ts-ignore
[];
var __VLS_114;
let __VLS_160;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_161 = __VLS_asFunctionalComponent1(__VLS_160, new __VLS_160({
    cols: "12",
}));
const __VLS_162 = __VLS_161({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_161));
const { default: __VLS_165 } = __VLS_163.slots;
let __VLS_166;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_167 = __VLS_asFunctionalComponent1(__VLS_166, new __VLS_166({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.form.dob),
    label: "Birth Date",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
    type: "date",
    readonly: (__VLS_ctx.activeField !== 'dob'),
}));
const __VLS_168 = __VLS_167({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.form.dob),
    label: "Birth Date",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
    type: "date",
    readonly: (__VLS_ctx.activeField !== 'dob'),
}, ...__VLS_functionalComponentArgsRest(__VLS_167));
let __VLS_171;
const __VLS_172 = {
    /** @type {typeof __VLS_171.focus} */
    onFocus: (...[$event]) => {
        return (__VLS_ctx.activateField('dob'));
        // @ts-ignore
        [form, activeField, activateField,];
    },
};
const { default: __VLS_173 } = __VLS_169.slots;
{
    const { 'prepend-inner': __VLS_174 } = __VLS_169.slots;
    let __VLS_175;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_176 = __VLS_asFunctionalComponent1(__VLS_175, new __VLS_175({
        color: "secondary",
        size: "20",
    }));
    const __VLS_177 = __VLS_176({
        color: "secondary",
        size: "20",
    }, ...__VLS_functionalComponentArgsRest(__VLS_176));
    const { default: __VLS_180 } = __VLS_178.slots;
    // @ts-ignore
    [];
    var __VLS_178;
    // @ts-ignore
    [];
}
{
    const { 'append-inner': __VLS_181 } = __VLS_169.slots;
    let __VLS_182;
    /** @ts-ignore @type { | typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
    transition;
    // @ts-ignore
    const __VLS_183 = __VLS_asFunctionalComponent1(__VLS_182, new __VLS_182({
        name: "slide-x",
    }));
    const __VLS_184 = __VLS_183({
        name: "slide-x",
    }, ...__VLS_functionalComponentArgsRest(__VLS_183));
    const { default: __VLS_187 } = __VLS_185.slots;
    if (__VLS_ctx.activeField === 'dob') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex ga-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-1']} */ ;
        let __VLS_188;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_189 = __VLS_asFunctionalComponent1(__VLS_188, new __VLS_188({
            ...{ 'onClick': {} },
            icon: "mdi-check",
            color: "success",
            size: "x-small",
            variant: "tonal",
        }));
        const __VLS_190 = __VLS_189({
            ...{ 'onClick': {} },
            icon: "mdi-check",
            color: "success",
            size: "x-small",
            variant: "tonal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_189));
        let __VLS_193;
        const __VLS_194 = {
            /** @type {typeof __VLS_193.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.activeField === 'dob'))
                    throw 0;
                return (__VLS_ctx.saveField('dob'));
                // @ts-ignore
                [activeField, saveField,];
            },
        };
        var __VLS_191;
        var __VLS_192;
        let __VLS_195;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_196 = __VLS_asFunctionalComponent1(__VLS_195, new __VLS_195({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            color: "error",
            size: "x-small",
            variant: "tonal",
        }));
        const __VLS_197 = __VLS_196({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            color: "error",
            size: "x-small",
            variant: "tonal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_196));
        let __VLS_200;
        const __VLS_201 = {
            /** @type {typeof __VLS_200.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.activeField === 'dob'))
                    throw 0;
                return (__VLS_ctx.cancelField('dob'));
                // @ts-ignore
                [cancelField,];
            },
        };
        var __VLS_198;
        var __VLS_199;
    }
    else {
        let __VLS_202;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_203 = __VLS_asFunctionalComponent1(__VLS_202, new __VLS_202({
            ...{ 'onClick': {} },
            icon: "mdi-pencil",
            color: "secondary",
            size: "x-small",
            variant: "text",
        }));
        const __VLS_204 = __VLS_203({
            ...{ 'onClick': {} },
            icon: "mdi-pencil",
            color: "secondary",
            size: "x-small",
            variant: "text",
        }, ...__VLS_functionalComponentArgsRest(__VLS_203));
        let __VLS_207;
        const __VLS_208 = {
            /** @type {typeof __VLS_207.click} */
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.activeField === 'dob'))
                    throw 0;
                return (__VLS_ctx.activateField('dob'));
                // @ts-ignore
                [activateField,];
            },
        };
        var __VLS_205;
        var __VLS_206;
    }
    // @ts-ignore
    [];
    var __VLS_185;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_169;
var __VLS_170;
// @ts-ignore
[];
var __VLS_163;
let __VLS_209;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_210 = __VLS_asFunctionalComponent1(__VLS_209, new __VLS_209({
    cols: "12",
}));
const __VLS_211 = __VLS_210({
    cols: "12",
}, ...__VLS_functionalComponentArgsRest(__VLS_210));
const { default: __VLS_214 } = __VLS_212.slots;
let __VLS_215;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_216 = __VLS_asFunctionalComponent1(__VLS_215, new __VLS_215({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.form.email),
    label: "Email",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
    type: "email",
    rules: ([__VLS_ctx.required]),
    readonly: (__VLS_ctx.activeField !== 'email'),
}));
const __VLS_217 = __VLS_216({
    ...{ 'onFocus': {} },
    modelValue: (__VLS_ctx.form.email),
    label: "Email",
    variant: "outlined",
    density: "comfortable",
    color: "secondary",
    type: "email",
    rules: ([__VLS_ctx.required]),
    readonly: (__VLS_ctx.activeField !== 'email'),
}, ...__VLS_functionalComponentArgsRest(__VLS_216));
let __VLS_220;
const __VLS_221 = {
    /** @type {typeof __VLS_220.focus} */
    onFocus: (...[$event]) => {
        return (__VLS_ctx.activateField('email'));
        // @ts-ignore
        [form, required, activeField, activateField,];
    },
};
const { default: __VLS_222 } = __VLS_218.slots;
{
    const { 'prepend-inner': __VLS_223 } = __VLS_218.slots;
    let __VLS_224;
    /** @ts-ignore @type { | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon'] | typeof __VLS_components.vIcon | typeof __VLS_components.VIcon | typeof __VLS_components['v-icon']} */
    vIcon;
    // @ts-ignore
    const __VLS_225 = __VLS_asFunctionalComponent1(__VLS_224, new __VLS_224({
        color: "secondary",
        size: "20",
    }));
    const __VLS_226 = __VLS_225({
        color: "secondary",
        size: "20",
    }, ...__VLS_functionalComponentArgsRest(__VLS_225));
    const { default: __VLS_229 } = __VLS_227.slots;
    // @ts-ignore
    [];
    var __VLS_227;
    // @ts-ignore
    [];
}
{
    const { 'append-inner': __VLS_230 } = __VLS_218.slots;
    let __VLS_231;
    /** @ts-ignore @type { | typeof __VLS_components.transition | typeof __VLS_components.Transition | typeof __VLS_components.transition | typeof __VLS_components.Transition} */
    transition;
    // @ts-ignore
    const __VLS_232 = __VLS_asFunctionalComponent1(__VLS_231, new __VLS_231({
        name: "slide-x",
    }));
    const __VLS_233 = __VLS_232({
        name: "slide-x",
    }, ...__VLS_functionalComponentArgsRest(__VLS_232));
    const { default: __VLS_236 } = __VLS_234.slots;
    if (__VLS_ctx.activeField === 'email') {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "d-flex ga-1" },
        });
        /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['ga-1']} */ ;
        let __VLS_237;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_238 = __VLS_asFunctionalComponent1(__VLS_237, new __VLS_237({
            ...{ 'onClick': {} },
            icon: "mdi-check",
            color: "success",
            size: "x-small",
            variant: "tonal",
        }));
        const __VLS_239 = __VLS_238({
            ...{ 'onClick': {} },
            icon: "mdi-check",
            color: "success",
            size: "x-small",
            variant: "tonal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_238));
        let __VLS_242;
        const __VLS_243 = {
            /** @type {typeof __VLS_242.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.activeField === 'email'))
                    throw 0;
                return (__VLS_ctx.saveField('email'));
                // @ts-ignore
                [activeField, saveField,];
            },
        };
        var __VLS_240;
        var __VLS_241;
        let __VLS_244;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_245 = __VLS_asFunctionalComponent1(__VLS_244, new __VLS_244({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            color: "error",
            size: "x-small",
            variant: "tonal",
        }));
        const __VLS_246 = __VLS_245({
            ...{ 'onClick': {} },
            icon: "mdi-close",
            color: "error",
            size: "x-small",
            variant: "tonal",
        }, ...__VLS_functionalComponentArgsRest(__VLS_245));
        let __VLS_249;
        const __VLS_250 = {
            /** @type {typeof __VLS_249.click} */
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.activeField === 'email'))
                    throw 0;
                return (__VLS_ctx.cancelField('email'));
                // @ts-ignore
                [cancelField,];
            },
        };
        var __VLS_247;
        var __VLS_248;
    }
    else {
        let __VLS_251;
        /** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
        vBtn;
        // @ts-ignore
        const __VLS_252 = __VLS_asFunctionalComponent1(__VLS_251, new __VLS_251({
            ...{ 'onClick': {} },
            icon: "mdi-pencil",
            color: "secondary",
            size: "x-small",
            variant: "text",
        }));
        const __VLS_253 = __VLS_252({
            ...{ 'onClick': {} },
            icon: "mdi-pencil",
            color: "secondary",
            size: "x-small",
            variant: "text",
        }, ...__VLS_functionalComponentArgsRest(__VLS_252));
        let __VLS_256;
        const __VLS_257 = {
            /** @type {typeof __VLS_256.click} */
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.activeField === 'email'))
                    throw 0;
                return (__VLS_ctx.activateField('email'));
                // @ts-ignore
                [activateField,];
            },
        };
        var __VLS_254;
        var __VLS_255;
    }
    // @ts-ignore
    [];
    var __VLS_234;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_218;
var __VLS_219;
// @ts-ignore
[];
var __VLS_212;
// @ts-ignore
[];
var __VLS_59;
// @ts-ignore
[];
var __VLS_51;
let __VLS_258;
/** @ts-ignore @type { | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row'] | typeof __VLS_components.vRow | typeof __VLS_components.VRow | typeof __VLS_components['v-row']} */
vRow;
// @ts-ignore
const __VLS_259 = __VLS_asFunctionalComponent1(__VLS_258, new __VLS_258({
    justify: "center",
    ...{ class: "mt-2" },
}));
const __VLS_260 = __VLS_259({
    justify: "center",
    ...{ class: "mt-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_259));
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
const { default: __VLS_263 } = __VLS_261.slots;
let __VLS_264;
/** @ts-ignore @type { | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col'] | typeof __VLS_components.vCol | typeof __VLS_components.VCol | typeof __VLS_components['v-col']} */
vCol;
// @ts-ignore
const __VLS_265 = __VLS_asFunctionalComponent1(__VLS_264, new __VLS_264({
    cols: "auto",
}));
const __VLS_266 = __VLS_265({
    cols: "auto",
}, ...__VLS_functionalComponentArgsRest(__VLS_265));
const { default: __VLS_269 } = __VLS_267.slots;
let __VLS_270;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_271 = __VLS_asFunctionalComponent1(__VLS_270, new __VLS_270({
    ...{ 'onClick': {} },
    variant: "text",
    color: "secondary",
    size: "small",
    ...{ class: "text-decoration-underline" },
}));
const __VLS_272 = __VLS_271({
    ...{ 'onClick': {} },
    variant: "text",
    color: "secondary",
    size: "small",
    ...{ class: "text-decoration-underline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_271));
let __VLS_275;
const __VLS_276 = {
    /** @type {typeof __VLS_275.click} */
    onClick: (...[$event]) => {
        return (__VLS_ctx.changePasswordDialog = true);
        // @ts-ignore
        [changePasswordDialog,];
    },
};
/** @type {__VLS_StyleScopedClasses['text-decoration-underline']} */ ;
const { default: __VLS_277 } = __VLS_273.slots;
// @ts-ignore
[];
var __VLS_273;
var __VLS_274;
const __VLS_278 = ChangePasswordDialog;
// @ts-ignore
const __VLS_279 = __VLS_asFunctionalComponent1(__VLS_278, new __VLS_278({
    modelValue: (__VLS_ctx.changePasswordDialog),
}));
const __VLS_280 = __VLS_279({
    modelValue: (__VLS_ctx.changePasswordDialog),
}, ...__VLS_functionalComponentArgsRest(__VLS_279));
// @ts-ignore
[changePasswordDialog,];
var __VLS_267;
// @ts-ignore
[];
var __VLS_261;
let __VLS_283;
/** @ts-ignore @type { | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog'] | typeof __VLS_components.vDialog | typeof __VLS_components.VDialog | typeof __VLS_components['v-dialog']} */
vDialog;
// @ts-ignore
const __VLS_284 = __VLS_asFunctionalComponent1(__VLS_283, new __VLS_283({
    modelValue: (__VLS_ctx.emailDialog),
    maxWidth: "340",
    persistent: true,
}));
const __VLS_285 = __VLS_284({
    modelValue: (__VLS_ctx.emailDialog),
    maxWidth: "340",
    persistent: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_284));
const { default: __VLS_288 } = __VLS_286.slots;
let __VLS_289;
/** @ts-ignore @type { | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card'] | typeof __VLS_components.vCard | typeof __VLS_components.VCard | typeof __VLS_components['v-card']} */
vCard;
// @ts-ignore
const __VLS_290 = __VLS_asFunctionalComponent1(__VLS_289, new __VLS_289({
    rounded: "lg",
    ...{ class: "pa-4" },
}));
const __VLS_291 = __VLS_290({
    rounded: "lg",
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_290));
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
const { default: __VLS_294 } = __VLS_292.slots;
let __VLS_295;
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_296 = __VLS_asFunctionalComponent1(__VLS_295, new __VLS_295({
    ...{ class: "font-weight-bold text-body-1 pa-0 mb-4" },
}));
const __VLS_297 = __VLS_296({
    ...{ class: "font-weight-bold text-body-1 pa-0 mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_296));
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
const { default: __VLS_300 } = __VLS_298.slots;
// @ts-ignore
[emailDialog,];
var __VLS_298;
let __VLS_301;
/** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
vCardText;
// @ts-ignore
const __VLS_302 = __VLS_asFunctionalComponent1(__VLS_301, new __VLS_301({
    ...{ class: "text-center text-body-2 text-medium-emphasis pa-0 mb-4" },
}));
const __VLS_303 = __VLS_302({
    ...{ class: "text-center text-body-2 text-medium-emphasis pa-0 mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_302));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
const { default: __VLS_306 } = __VLS_304.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.form.email);
// @ts-ignore
[form,];
var __VLS_304;
let __VLS_307;
/** @ts-ignore @type { | typeof __VLS_components.vOtpInput | typeof __VLS_components.VOtpInput | typeof __VLS_components['v-otp-input']} */
vOtpInput;
// @ts-ignore
const __VLS_308 = __VLS_asFunctionalComponent1(__VLS_307, new __VLS_307({
    ...{ 'onFinish': {} },
    modelValue: (__VLS_ctx.verificationCode),
    length: "6",
    variant: "outlined",
    color: "secondary",
}));
const __VLS_309 = __VLS_308({
    ...{ 'onFinish': {} },
    modelValue: (__VLS_ctx.verificationCode),
    length: "6",
    variant: "outlined",
    color: "secondary",
}, ...__VLS_functionalComponentArgsRest(__VLS_308));
let __VLS_312;
const __VLS_313 = {
    /** @type {typeof __VLS_312.finish} */
    onFinish: (__VLS_ctx.confirmEmailChange),
};
var __VLS_310;
var __VLS_311;
let __VLS_314;
/** @ts-ignore @type { | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text'] | typeof __VLS_components.vCardText | typeof __VLS_components.VCardText | typeof __VLS_components['v-card-text']} */
vCardText;
// @ts-ignore
const __VLS_315 = __VLS_asFunctionalComponent1(__VLS_314, new __VLS_314({
    ...{ class: "text-center pa-0 mt-1" },
}));
const __VLS_316 = __VLS_315({
    ...{ class: "text-center pa-0 mt-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_315));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
const { default: __VLS_319 } = __VLS_317.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-caption text-medium-emphasis" },
});
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
let __VLS_320;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_321 = __VLS_asFunctionalComponent1(__VLS_320, new __VLS_320({
    ...{ 'onClick': {} },
    variant: "text",
    color: "secondary",
    size: "x-small",
    loading: (__VLS_ctx.resending),
}));
const __VLS_322 = __VLS_321({
    ...{ 'onClick': {} },
    variant: "text",
    color: "secondary",
    size: "x-small",
    loading: (__VLS_ctx.resending),
}, ...__VLS_functionalComponentArgsRest(__VLS_321));
let __VLS_325;
const __VLS_326 = {
    /** @type {typeof __VLS_325.click} */
    onClick: (__VLS_ctx.resendCode),
};
const { default: __VLS_327 } = __VLS_323.slots;
// @ts-ignore
[verificationCode, confirmEmailChange, resending, resendCode,];
var __VLS_323;
var __VLS_324;
// @ts-ignore
[];
var __VLS_317;
let __VLS_328;
/** @ts-ignore @type { | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions'] | typeof __VLS_components.vCardActions | typeof __VLS_components.VCardActions | typeof __VLS_components['v-card-actions']} */
vCardActions;
// @ts-ignore
const __VLS_329 = __VLS_asFunctionalComponent1(__VLS_328, new __VLS_328({
    ...{ class: "justify-center pa-0 mt-4 ga-2" },
}));
const __VLS_330 = __VLS_329({
    ...{ class: "justify-center pa-0 mt-4 ga-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_329));
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
const { default: __VLS_333 } = __VLS_331.slots;
let __VLS_334;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_335 = __VLS_asFunctionalComponent1(__VLS_334, new __VLS_334({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    rounded: "lg",
}));
const __VLS_336 = __VLS_335({
    ...{ 'onClick': {} },
    variant: "tonal",
    color: "error",
    rounded: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_335));
let __VLS_339;
const __VLS_340 = {
    /** @type {typeof __VLS_339.click} */
    onClick: (__VLS_ctx.cancelEmailChange),
};
const { default: __VLS_341 } = __VLS_337.slots;
// @ts-ignore
[cancelEmailChange,];
var __VLS_337;
var __VLS_338;
let __VLS_342;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_343 = __VLS_asFunctionalComponent1(__VLS_342, new __VLS_342({
    ...{ 'onClick': {} },
    variant: "flat",
    color: "secondary",
    rounded: "lg",
    loading: (__VLS_ctx.verifying),
}));
const __VLS_344 = __VLS_343({
    ...{ 'onClick': {} },
    variant: "flat",
    color: "secondary",
    rounded: "lg",
    loading: (__VLS_ctx.verifying),
}, ...__VLS_functionalComponentArgsRest(__VLS_343));
let __VLS_347;
const __VLS_348 = {
    /** @type {typeof __VLS_347.click} */
    onClick: (__VLS_ctx.confirmEmailChange),
};
const { default: __VLS_349 } = __VLS_345.slots;
// @ts-ignore
[confirmEmailChange, verifying,];
var __VLS_345;
var __VLS_346;
// @ts-ignore
[];
var __VLS_331;
// @ts-ignore
[];
var __VLS_292;
// @ts-ignore
[];
var __VLS_286;
let __VLS_350;
/** @ts-ignore @type { | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar'] | typeof __VLS_components.vSnackbar | typeof __VLS_components.VSnackbar | typeof __VLS_components['v-snackbar']} */
vSnackbar;
// @ts-ignore
const __VLS_351 = __VLS_asFunctionalComponent1(__VLS_350, new __VLS_350({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}));
const __VLS_352 = __VLS_351({
    modelValue: (__VLS_ctx.snackbar.show),
    color: (__VLS_ctx.snackbar.color),
    rounded: "lg",
    timeout: "3000",
}, ...__VLS_functionalComponentArgsRest(__VLS_351));
const { default: __VLS_355 } = __VLS_353.slots;
(__VLS_ctx.snackbar.message);
// @ts-ignore
[snackbar, snackbar, snackbar,];
var __VLS_353;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_54 = __VLS_53;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
