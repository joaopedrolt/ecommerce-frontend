// Composables
import { createRouter, createWebHistory } from "vue-router";

// Layouts

import DefaultLayout from "@/layouts/Default.vue";
import CleanLayout from "@/layouts/Clean.vue";

// Views

const routes = [
  {
    path: "/c", // Ver se vai mudar o nome
    component: CleanLayout,
    children: [
      {
        path: "entrar",
        component: () => import("@/views/Clean/SignIn.vue"),
        children: [
          {
            path: "indetificar",
            name: "Identifier",
            component: () => import("@/components/SignIn/IdentifierForm.vue"),
          },
          {
            path: "credencial",
            name: "Credentials",
            component: () => import("@/components/SignIn/CredentialsForm.vue"),
          },
        ],
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
        component: () => import("@/views/Default/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
