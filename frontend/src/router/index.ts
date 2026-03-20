import { createRouter, createWebHistory } from "vue-router";

//Layouts
import GuestLayout from '@layouts/GuestLayout.vue';

//views
// import Home from "@comps/HelloWorld.vue";
import SignUpView from "@views/auth/SignUpView.vue";

const routes = [
    {path: "/", 
    component: GuestLayout,
    children:[
        {
            path: "",
            redirect: "sign"
        },
        {
            path: "sign",
            component: SignUpView,
        }
        ]
    }
]

const router = createRouter ({
    history: createWebHistory(),
    routes
});

export default router; 