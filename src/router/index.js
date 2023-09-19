// Composables
import { createRouter, createWebHistory } from "vue-router";

// Layouts

import DefaultLayout from "@/layouts/Default.vue";
/* import PaymentLayout from "@/layouts/Payment.vue"; */

// Views

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
