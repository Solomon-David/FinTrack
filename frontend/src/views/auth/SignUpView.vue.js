import { ref } from "vue";
import { useUserStore } from "../../stores/users.stores";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const isPassword = ref(true);
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const handleSignUp = async () => {
    userStore.isLoading = true;
    try {
        await userStore.signUp(email.value, password.value, firstName.value, lastName.value);
        router.push({
            path: "/verify",
            query: { email: email.value },
        });
    }
    catch (error) {
        // Error is handled by the store and displayed via userStore.error
    }
    finally {
        userStore.isLoading = false;
    }
};
const __VLS_emit = defineEmits({
    switch: () => true,
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
    ...{ class: "d-flex flex-column gap-3 px-5" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "d-flex flex-column gap-3 px-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-column']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-5']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "d-flex flex-row" },
});
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-row']} */ ;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.firstName),
    name: "firstname",
    label: "First Name",
    id: "fname",
    color: "light",
    baseColor: "light",
    ...{ class: "text-light text-bold w-33" },
    variant: "underlined",
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.firstName),
    name: "firstname",
    label: "First Name",
    id: "fname",
    color: "light",
    baseColor: "light",
    ...{ class: "text-light text-bold w-33" },
    variant: "underlined",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['w-33']} */ ;
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer'] | typeof __VLS_components.vSpacer | typeof __VLS_components.VSpacer | typeof __VLS_components['v-spacer']} */
vSpacer;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    modelValue: (__VLS_ctx.lastName),
    name: "lastname",
    label: "Last Name",
    id: "lname",
    color: "light",
    baseColor: "light",
    ...{ class: "text-light text-bold w-33" },
    variant: "underlined",
}));
const __VLS_24 = __VLS_23({
    modelValue: (__VLS_ctx.lastName),
    name: "lastname",
    label: "Last Name",
    id: "lname",
    color: "light",
    baseColor: "light",
    ...{ class: "text-light text-bold w-33" },
    variant: "underlined",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['w-33']} */ ;
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    type: "email",
    color: "light",
    baseColor: "light",
    variant: "underlined",
    ...{ class: "text-light" },
}));
const __VLS_29 = __VLS_28({
    modelValue: (__VLS_ctx.email),
    label: "Email",
    type: "email",
    color: "light",
    baseColor: "light",
    variant: "underlined",
    ...{ class: "text-light" },
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field'] | typeof __VLS_components.vTextField | typeof __VLS_components.VTextField | typeof __VLS_components['v-text-field']} */
vTextField;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
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
const __VLS_34 = __VLS_33({
    ...{ 'onClick:appendInner': {} },
    modelValue: (__VLS_ctx.password),
    label: "Password",
    type: (__VLS_ctx.isPassword ? 'password' : 'text'),
    color: "light",
    baseColor: "light",
    variant: "underlined",
    ...{ class: "text-light" },
    appendInnerIcon: (__VLS_ctx.isPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_37;
const __VLS_38 = {
    /** @type {typeof __VLS_37.'click:appendInner'} */
    'onClick:appendInner': (() => (__VLS_ctx.isPassword = !__VLS_ctx.isPassword)),
};
/** @type {__VLS_StyleScopedClasses['text-light']} */ ;
var __VLS_35;
var __VLS_36;
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn'] | typeof __VLS_components.vBtn | typeof __VLS_components.VBtn | typeof __VLS_components['v-btn']} */
vBtn;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    ...{ 'onClick': {} },
    ...{ class: "text-bold text-button text-none bg-primary text-accent py-5 mt-5" },
    variant: "flat",
    rounded: true,
    block: true,
    loading: (__VLS_ctx.userStore.isLoading),
}));
const __VLS_41 = __VLS_40({
    ...{ 'onClick': {} },
    ...{ class: "text-bold text-button text-none bg-primary text-accent py-5 mt-5" },
    variant: "flat",
    rounded: true,
    block: true,
    loading: (__VLS_ctx.userStore.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
let __VLS_44;
const __VLS_45 = {
    /** @type {typeof __VLS_44.click} */
    onClick: (__VLS_ctx.handleSignUp),
};
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-button']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-accent']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-5']} */ ;
const { default: __VLS_46 } = __VLS_42.slots;
// @ts-ignore
[firstName, lastName, email, password, isPassword, isPassword, isPassword, isPassword, userStore, handleSignUp,];
var __VLS_42;
var __VLS_43;
if (__VLS_ctx.userStore.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-center text-error mt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-error']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    (__VLS_ctx.userStore.error);
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
            return (__VLS_ctx.router.push('/login'));
            // @ts-ignore
            [userStore, userStore, router,];
        } },
    href: "",
    ...{ class: "text-primary text-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
});
export default {};
