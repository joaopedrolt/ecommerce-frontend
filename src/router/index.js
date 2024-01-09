// Composables
import { createRouter, createWebHistory } from "vue-router";

// Layouts

import DefaultLayout from "@/layouts/Default.vue";
import CleanLayout from "@/layouts/Clean.vue";

// Stores

import { useSignInStore } from "@/store/store";
import { useSearchStore } from "@/store/store";

// Views

const routes = [
  {
    //Layout Limpo
    path: "/c",
    component: CleanLayout,
    children: [
      {
        path: "entrar",
        component: () => import("@/views/Clean/SignIn.vue"),
        children: [
          //Rotas Cadastro Usuario
          {
            path: "indetificar",
            name: "EmailValidation",
            component: () =>
              import("@/components/SignIn/EmailValidationForm.vue"),
          },

          {
            path: "validacao",
            name: "EmailCodeValidation",
            component: () =>
              import("@/components/SignIn/EmailCodeValidationForm.vue"),
            beforeEnter(to, from, next) {
              const signInStore = useSignInStore();

              if (signInStore.signInEmailInput.length == 0) {
                next(from.path);
                return;
              }

              if (to.query.type != "create" && to.query.type != "recover") {
                next(from.path);
                return;
              }

              next();
            },
          },

          {
            path: "credencial",
            name: "Login",
            component: () => import("@/components/SignIn/LoginForm.vue"),
            beforeEnter(to, from, next) {
              const signInStore = useSignInStore();

              if (signInStore.signInEmailInput.length == 0) {
                next(from.path);
                return;
              }

              next();
            },
          },

          {
            path: "criarsenha",
            name: "Password",
            component: () => import("@/components/SignIn/PasswordForm.vue"),
            beforeEnter(to, from, next) {
              if (to.query.type != "create" && to.query.type != "recover") {
                next(from.path);
                return;
              }

              next();
            },
          },
        ],
      },
    ],
  },
  //Home
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Default/Home.vue"),
      },
      {
        path: "/loja",
        name: "Shop",
        component: () => import("@/views/Default/Shop.vue"),
      },
      {
        path: "/produto",
        children: [
          {
            path: ":produtoId",
            name: "Product",
            component: () => import("@/views/Default/Product.vue"),
          },
        ],
      },
      {
        path: "/conta",
        name: "Account",
        component: () => import("@/views/Default/Account.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
