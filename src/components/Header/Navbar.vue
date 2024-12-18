<template>
  <v-app-bar class="nav-component" absolute style="z-index: 1003 !important" :elevation="0" height="75px">
    <div class="container-limit container-size-padding navbar-padding nav-container">
      <div id="navbar-anchor" class="h-100 w-100 d-flex justify-space-between align-center">
        <div class="h-100 logo-black">
          <v-img src="/logo.svg" width="120px" height="75px"></v-img>
        </div>

        <div class="nav-side-container h-100">
          <v-btn @click="handleSignInClick" icon size="small">
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-btn @click="displayCartDrawerr" icon size="small">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
          <v-btn icon size="small" @click="displaySearchOverlay">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
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
import { useDrawerStore, useSearchStore } from "@/store/store";
import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";

import Search from "./Search.vue";

const drawerStore = useDrawerStore();
const searchStore = useSearchStore();
const router = useRouter();

const firstMenu = ref(false);
const secondMenu = ref(false);
const thirdMenu = ref(false);

const { displayCartDrawer } = storeToRefs(drawerStore);

const displayNavigationDrawer = () => {
  drawerStore.displayNavigationDrawerx();
};

const displayCartDrawerr = () => {
  drawerStore.displayCartDrawerx();
};

const displaySearchOverlay = () => {
  searchStore.displaySearchOverlayx();
};

const handleSignInClick = () => {
  router.push({
    name: "EmailValidation",
  });
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
