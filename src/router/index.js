// Composables
import { createRouter, createWebHistory } from "vue-router";

// Layouts

import DefaultLayout from "@/layouts/Default.vue";
import CleanLayout from "@/layouts/Clean.vue";

// Views

const routes = [
  {
    path: "/entrar", // Ver se vai mudar o nome
    component: CleanLayout,
    children: [
      {
        path: "",
        name: "SignIn",
        component: () => import("@/views/clean/SignIn.vue"),
      },
    ],
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/default/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
