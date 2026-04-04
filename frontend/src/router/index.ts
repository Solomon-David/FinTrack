import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/users.stores";

//Layouts
import GuestLayout from '@layouts/GuestLayout.vue';

//views
// import Home from "@comps/HelloWorld.vue";
import AuthView from "@views/auth/AuthView.vue";
import LoginView from '@views/auth/LoginView.vue';
import SignUpView from '@views/auth/SignUpView.vue';
import VerifyCodeView from '@views/auth/VerifyCodeView.vue';


const routes = [
    {
    path: "/",
    component: GuestLayout,
    children:[
        {
            path: "/",
            redirect: () => {
                const userStore = useUserStore();
                return userStore.user?.token ? "/dashboard" : "/signup";
            }
        },
        {
            path: "",
            component: AuthView,
            children: [
                {
                    path: "login",
                    component: LoginView,
                    meta: { title: "login" }
                },
                {
                    path: "signup",
                    component: SignUpView,
                    meta: { title: "signup" }
                },
                {
                    path: "verify",
                    component: VerifyCodeView,
                    meta: { title: "verify" }
                }
            ]
        }
        ]
    },

    {
        path: "/",
        component: () => import("@layouts/UserLayout.vue"),
        children:[
            {   
                path: "/dashboard",
                component: () => import("@views/user/Dashboard.vue"),
                meta: { title: "dashboard" }
            }
        ]
    }

];


const router = createRouter ({
    history: createWebHistory(),
    routes
});

// Initialize user from localStorage on first load
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (!userStore.user) {
        userStore.initializeUser();
    }
    next();
});

export default router; 