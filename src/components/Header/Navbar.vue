<template>
  <v-app-bar class="nav-component" absolute style="z-index: 1003 !important" :elevation="0" height="75px">
    <div class="container-limit container-size-padding navbar-padding nav-container">
      <div id="navbar-anchor" class="h-100 w-100 d-flex justify-space-between align-center">
        <div class="d-flex align-center h-100 logo-black">
          <!-- <v-img src="/logo.svg" width="120px" height="75px"></v-img> -->
          <logo width="120px" height="40px" />
        </div>

        <div class="nav-side-container h-100">
          <v-btn @click="displayCartDrawerr" icon size="small">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
          <v-btn icon size="small" @click="displaySearchOverlay">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-menu location="bottom left">
            <template v-slot:activator="{ props }">
              <v-btn v-if="user && user.email.length > 0" v-bind="props" icon size="small">
                <div class="d-flex align-center flex-column">
                  <v-avatar density="compact" color="surface-variant" style="padding-bottom: 2px; padding-left: 2.1px;"> {{
                    user.email.substring(0, 2).toUpperCase() }}</v-avatar>
                </div>
              </v-btn>
              <v-btn v-else @click="handleSignInClick" icon size="small">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="handleSignInClick">
                <v-list-item-title> <v-icon>mdi-account-arrow-right</v-icon> Sua Conta</v-list-item-title>
              </v-list-item>

              <v-list-item @click="handleSignOutClick">
                <v-list-item-title><v-icon>mdi-logout</v-icon> Sair</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <!-- Meta -->
        <search />
      </div>
    </div>
    <div v-show="displayCartDrawer" style="width: 19px;">displayCartDrawer</div>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { useDrawerStore, useSearchStore, useAuthStore } from "@/store/store";
import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";

import Search from "./Search.vue";

import signOut from "@/auth/signOut";

import Logo from "@/components/Logo.vue";

const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]

const authStore = useAuthStore();
const drawerStore = useDrawerStore();
const searchStore = useSearchStore();
const router = useRouter();

const firstMenu = ref(false);
const secondMenu = ref(false);
const thirdMenu = ref(false);

const { displayCartDrawer } = storeToRefs(drawerStore);
const { user } = storeToRefs(authStore);

const displayNavigationDrawer = () => {
  drawerStore.displayNavigationDrawerx();
};

const displayCartDrawerr = () => {
  drawerStore.displayCartDrawerOverlay();
};

const displaySearchOverlay = () => {
  searchStore.displaySearchOverlayx();
};

const handleSignInClick = () => {
  router.push({
    name: "AccountOverview",
  });
};

const handleSignOutClick = async () => {
  const response = await signOut();

  if (response) {
    router.go(0);
  } else {
    alert("Não foi possivel finalizar sua sessão!");
  }
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

.nav-component {
  /*   border-bottom: $border-small-line !important; */
  height: $navbar-height !important;
  background-color: white !important;

  .nav-container {
    /* Alteravel tamanho no futuro */
    height: $navbar-height;
    min-width: 325px;
    z-index: 1 !important;

    .nav-side-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.nav-btn-custom {
  padding: 0 !important;
  transition: opacity 0.2s ease-in !important;
  font-size: 0.8rem !important;

  &.v-btn--variant-plain {
    opacity: 1 !important;
  }

  &.v-btn--size-default {
    min-width: auto !important;
  }

  &:hover {
    opacity: 0.6 !important;
  }
}
</style>
