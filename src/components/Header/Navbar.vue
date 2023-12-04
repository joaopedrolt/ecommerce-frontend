<template>
  <v-app-bar
    class="nav-component"
    style="z-index: 1003 !important"
    :elevation="0"
    height="75px"
  >
    <div class="container-limit container-size-padding nav-container">
      <div class="h-100 w-100 d-flex justify-space-between align-center">
        <!-- Desktop -->
        <div class="hidden-sm-and-down nav-side-container side-left h-100">
          <v-menu
            v-model="firstMenu"
            open-on-hover
            :close-on-content-click="false"
            close-delay="0"
            open-delay="0"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="nav-btn-custom h-100"
                :ripple="false"
                variant="plain"
              >
                Masculino
              </v-btn>
            </template>

            <dropdown :menu="1" />
          </v-menu>

          <v-menu
            v-model="secondMenu"
            open-on-hover
            :close-on-content-click="false"
            close-delay="0"
            open-delay="0"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="nav-btn-custom h-100"
                :ripple="false"
                variant="plain"
              >
                Roupas
              </v-btn>
            </template>

            <dropdown :menu="2" />
          </v-menu>

          <v-menu
            v-model="thirdMenu"
            open-on-hover
            :close-on-content-click="false"
            close-delay="0"
            open-delay="0"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="nav-btn-custom h-100"
                style="margin: 0"
                :ripple="false"
                variant="plain"
              >
                Acessorios
              </v-btn>
            </template>

            <dropdown :menu="3" />
          </v-menu>
        </div>

        <!-- Mobile -->
        <div class="d-md-none nav-mobile-icon-container">
          <v-btn @click="displayNavigationDrawer" icon size="small">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-btn icon size="small" @click="displaySearchOverlay">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>

        <!-- Hybrid -->
        <div class="h-100 logo-black">
          <v-img src="/logo.svg" width="120px" height="75px"></v-img>
          <!-- <v-btn class="h-100" :ripple="false"> ECOMMERCE </v-btn> -->
        </div>

        <!-- Desktop -->
        <div class="hidden-sm-and-down nav-side-container side-right h-100">
          <v-btn
            @click="displaySearchOverlay"
            class="nav-btn-custom h-100"
            style="margin: 0"
            :ripple="false"
            variant="plain"
          >
            Pesquisar
            <v-icon style="margin: 0 0 0 4px">mdi-magnify</v-icon>
          </v-btn>

          <v-btn class="nav-btn-custom h-100" :ripple="false" variant="plain">
            Carrinho
            <v-icon style="margin: 0 0 2px 3px">mdi-cart</v-icon>
          </v-btn>

          <v-btn
            @click="handleSignInClick"
            class="nav-btn-custom h-100"
            :ripple="false"
            variant="plain"
          >
            Entrar
            <v-icon style="margin: 0 0 2px 3px">mdi-account</v-icon>
          </v-btn>
        </div>

        <!-- Mobile -->
        <div class="d-md-none nav-mobile-icon-container">
          <v-btn icon size="small">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
          <v-btn @click="handleSignInClick" icon size="small">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </div>

        <!-- Meta -->
        <v-overlay v-model="displaySearch">
          <search />
        </v-overlay>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { useDrawerStore } from "@/store/store";
import { useRouter } from "vue-router";

import Dropdown from "./Dropdown.vue";
import Search from "./Search.vue";

const drawerStore = useDrawerStore();
const router = useRouter();

const firstMenu = ref(false);
const secondMenu = ref(false);
const thirdMenu = ref(false);

const displaySearch = ref(false);

const displayNavigationDrawer = () => {
  drawerStore.displayNavigationDrawer();
};

const displaySearchOverlay = () => {
  displaySearch.value = true;
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
      width: 295px;
    }

    @media (max-width: $tablet) {
      &.container-size-padding {
        padding: 0 !important;
      }
    }
  }

  .side-left {
    button {
      margin-right: 10px;
    }
  }

  .side-right {
    button {
      margin-left: 10px;
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
