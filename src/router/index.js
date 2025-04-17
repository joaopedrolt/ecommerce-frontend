// Composables
import { createRouter, createWebHistory } from "vue-router";

// Layouts

import DefaultLayout from "@/layouts/Default.vue";
import CleanLayout from "@/layouts/Clean.vue";
import SplittedLayout from "@/layouts/Splitted.vue";

// Stores

import { useSignInStore } from "@/store/store";
import { useSearchStore } from "@/store/store";

// Auth
import authRouteValidation from "@/auth/authRouteValidation";

/* import setUserState from "@/store/setUserState";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth"; */

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
            beforeEnter(to, from, next) {
              if (!to.query.from && from.name && !from.path?.includes("entrar")) {
                next({ name: 'EmailValidation', query: { from: from.name } });
              }
              else {
                next();
              }
            },
          },

          {
            path: "validacao",
            name: "EmailCodeValidation",
            component: () =>
              import("@/components/SignIn/EmailCodeValidationForm.vue"),
            beforeEnter(to, from, next) {
              const signInStore = useSignInStore();

              if (signInStore.signInEmailInput.length == 0) {
                console.log(signInStore.signInEmailInput)

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

              const signInStore = useSignInStore();

              if (!signInStore.signInEmailInput ||
                signInStore.signInEmailInput.length == 0 ||
                !signInStore.otpCode ||
                signInStore.otpCode.length == 0) {
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
            path: ":productId",
            name: "Product",
            component: () => import("@/views/Default/Product.vue"),
          },
        ],
      },
      {
        path: "/conta",
        children: [
          {
            path: "",
            name: "AccountOverview",
            component: () => import("@/components/Account/Overview.vue"),
          },
          {
            path: "endereco",
            name: "NewAddress",
            component: () => import("@/components/Account/AddressForm.vue"),
            children: [
              {
                path: ":addressId",
                name: "EditAddress",
                component: () => import("@/components/Account/AddressForm.vue"),
              },
            ],
          },
          {
            path: "pedido",
            children: [
              {
                path: ":orderId",
                name: "OrderDetails",
                component: () => import("@/components/Account/OrderDetails.vue"),
              },
            ],
          }
        ],
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/checkout",
    component: SplittedLayout,
    children: [
      {
        path: "",
        name: "Checkout",
        component: () => import("@/views/Splitted/Checkout.vue"),
      },
      {
        path: "payment",
        name: "Payment",
        component: () => import("@/views/Splitted/Payment.vue"),
      }
    ],
  },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
});

/*  const auth = getAuth();
 
  onAuthStateChanged(auth, (user) => {
    setUserState(user);
 
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth) {
      if (user) {
        next();
      }
      else {
        next({ name: 'EmailValidation' });
      }
    } else {
      next();
    }
  }); */

router.beforeEach(async (to, from, next) => {
  const isValid = await authRouteValidation();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    if (isValid) {
      next();
      return;
    }
    else {
      next({ name: 'EmailValidation' });
      return;
    }
  }

  next();
});

export default router;
