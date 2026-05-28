import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/users.stores";

//Layouts
import GuestLayout from "@layouts/GuestLayout.vue";

//views
// import Home from "@comps/HelloWorld.vue";
import AuthView from "@views/auth/AuthView.vue";
import LoginView from "@views/auth/LoginView.vue";
import SignUpView from "@views/auth/SignUpView.vue";

const routes = [
  {
    path: "/",
    component: GuestLayout,
    children: [
      {
        path: "/",
        redirect: () => {
          const userStore = useUserStore();
          return userStore.isAuthenticated ? "/dashboard" : "/login";
        },
      },
      {
        path: "",
        component: AuthView,
        children: [
          {
            path: "login",
            name: "login",
            component: LoginView,
            meta: { title: "login" },
          },
          {
            path: "signup",
            name: "signup",
            component: SignUpView,
            meta: { title: "signup" },
          },
          {
            path: "verify",
            name: "verify-email",
            component: () => import("@views/auth/VerifyCodeView.vue"),
            meta: { title: "verify" },
          },
        ],
      },
    ],
  },

  {
    path: "/",
    component: () => import("@layouts/UserLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@views/user/Dashboard.vue"),
        meta: { title: "home" },
      },
      {
        path: "/income",
        name: "income",
        component: () => import("@views/user/Dashboard.vue"),
        meta: { title: "home" },
      },
      {
        path: "/expenses",
        name: "expenses",
        component: () => import("@views/user/Dashboard.vue"),
        meta: { title: "home" },
      },
      {
        path: "/rc-data",
        name: "rc-data",
        component: () => import("@views/user/Dashboard.vue"),
        meta: { title: "home" },
      },
      {
        path: "/bills",
        name: "bills",
        component: () => import("@views/user/Dashboard.vue"),
        meta: { title: "home" },
      },
      {
        path: "/summaries",
        name: "summaries",
        component: () => import("@views/user/Dashboard.vue"),
        meta: { title: "home" },
      },
      {
        path: "/plans",
        name: "plans",
        component: () => import("@views/user/Dashboard.vue"),
        meta: { title: "home" },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@views/user/Profile.vue"),
        meta: { title: "profile" },
      },
      {
        path: "/preferences",
        name: "preferences",
        component: () => import("@views/user/Dashboard.vue"),
        meta: { title: "Preferences" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
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
