const __VLS_emit = defineEmits({
    switch: () => false,
});
import { ref } from "vue";
import { useUserStore } from "../../stores/users.stores";
import { useRouter } from "vue-router";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog.vue";
const router = useRouter();
const userStore = useUserStore();
const isPassword = ref(true);
const email = ref("");
const password = ref("");
const message = ref(null);
const status = ref(false);
const showAlert = ref(false);
const openDialog = ref(false);
const handleLogin = async () => {
    userStore.isLoading = true;
    try {
        await userStore.login(email.value, password.value);
        if (userStore.error) {
            throw new Error(userStore.error);
        }
        status.value = userStore.status;
        message.value = userStore.message;
        status.value = true;
        router.push("/dashboard");
    }
    catch (error) {
        message.value = userStore.error || "Login failed";
        status.value = false;
    }
    finally {
        userStore.isLoading = false;
    }
    showAlert.value = true;
    setTimeout(() => {
        showAlert.value = false;
    }, 10000);
};
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
/** @ts-ignore @type { | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title'] | typeof __VLS_components.vCardTitle | typeof __VLS_components.VCardTitle | typeof __VLS_components['v-card-title']} */
vCardTitle;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ class: "text-center text-light mt-5 text-h5" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "text-center text-light mt-5 text-h5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h5']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
var __VLS_3;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form'] | typeof __VLS_components.vForm | typeof __VLS_components.VForm | typeof __VLS_components['v-form']} */
vForm;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ 'onSubmit': {} },
    ...{ class: "d-flex flex-column gap-3 px-5" },
}));
const __VLS_8 = __VLS_7({
    ...{ 'onSubmit': {} },
    ...{ class: "d-flex flex-column gap-3 px-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_11;
const __VLS_12 = {
    /** @type {typeof __VLS_11.submit} */
    onSubmit: (__VLS_ctx.handleLogin),
};
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
const { default: __VLS_13 } = __VLS_9.slots;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    type: "email",
    color: "light",
    baseColor: "light",
    variant: "underlined",
    ...{ class: "text-light" },
}));
const __VLS_16 = __VLS_15({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    type: "email",
    color: "light",
    baseColor: "light",
    variant: "underlined",
    ...{ class: "text-light" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ 'onClick:appendInner': {} },
    modelValue: (__VLS_ctx.password),
    label: "Password",
    type: (__VLS_ctx.isPassword ? 'password' : 'text'),
    color: "light",
    baseColor: "light",
    variant: "underlined",
    ...{ class: "text-light" },
    appendInnerIcon: (__VLS_ctx.isPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'),
}));
const __VLS_21 = __VLS_20({
    ...{ 'onClick:appendInner': {} },
    modelValue: (__VLS_ctx.password),
    label: "Password",
    type: (__VLS_ctx.isPassword ? 'password' : 'text'),
    color: "light",
    baseColor: "light",
    variant: "underlined",
    ...{ class: "text-light" },
    appendInnerIcon: (__VLS_ctx.isPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_24;
const __VLS_25 = {
    /** @type {typeof __VLS_24.'click:appendInner'} */
    'onClick:appendInner': (() => (__VLS_ctx.isPassword = !__VLS_ctx.isPassword)),
};
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
var __VLS_22;
var __VLS_23;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-right text-caption text-light" },
});
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.openDialog = true);
            // @ts-ignore
            [handleLogin, email, password, isPassword, isPassword, isPassword, isPassword, openDialog,];
        } },
    href: "",
    ...{ class: "text-light text-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
const __VLS_26 = ForgotPasswordDialog;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    modelValue: (__VLS_ctx.openDialog),
}));
const __VLS_28 = __VLS_27({
    modelValue: (__VLS_ctx.openDialog),
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_31;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
    ...{ class: "text-bold text-button text-none bg-primary text-accent py-5 mt-5" },
    variant: "flat",
    rounded: true,
    block: true,
    type: "submit",
    loading: (__VLS_ctx.userStore.isLoading),
}));
const __VLS_33 = __VLS_32({
    ...{ class: "text-bold text-button text-none bg-primary text-accent py-5 mt-5" },
    variant: "flat",
    rounded: true,
    block: true,
    type: "submit",
    loading: (__VLS_ctx.userStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-button']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
const { default: __VLS_36 } = __VLS_34.slots;
// @ts-ignore
[openDialog, userStore,];
var __VLS_34;
if (__VLS_ctx.showAlert) {
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert'] | typeof __VLS_components.vAlert | typeof __VLS_components.VAlert | typeof __VLS_components['v-alert']} */
    vAlert;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
        type: (__VLS_ctx.status ? 'success' : 'error'),
        ...{ class: "mt-4" },
    }));
    const __VLS_39 = __VLS_38({
        type: (__VLS_ctx.status ? 'success' : 'error'),
        ...{ class: "mt-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    const { default: __VLS_42 } = __VLS_40.slots;
    (__VLS_ctx.message);
    // @ts-ignore
    [showAlert, status, message,];
    var __VLS_40;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-center text-caption text-light mt-5" },
});
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    ...{ onClick: (...[$event]) => {
            return (__VLS_ctx.router.push('/signup'));
            // @ts-ignore
            [router,];
        } },
    href: "",
    ...{ class: "text-primary text-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
// @ts-ignore
[];
var __VLS_9;
var __VLS_10;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
});
export default {};
