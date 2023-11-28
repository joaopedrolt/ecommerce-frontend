<template>
  <v-app-bar
    class="nav-component"
    style="z-index: 1003 !important"
    :elevation="1"
  >
    <div class="container-limit navbar-limit nav-container">
      <div class="h-100 w-100 d-flex justify-space-between align-center">
        <!-- Desktop -->
        <div class="hidden-sm-and-down nav-side-container h-100">
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
              >
                section 1
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
              >
                section 2
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
                :ripple="false"
              >
                section 3
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
        <div class="h-100">
          <v-btn class="h-100" :ripple="false"> ECOMMERCE </v-btn>
        </div>

        <!-- Desktop -->
        <div class="hidden-sm-and-down nav-side-container h-100">
          <v-btn
            @click="displaySearchOverlay"
            class="nav-btn-custom h-100"
            :ripple="false"
          >
            Pesquisar
            <v-icon style="margin: 0 0 0 4px">mdi-magnify</v-icon>
          </v-btn>

          <v-btn class="nav-btn-custom h-100" :ripple="false">
            Carrinho
            <v-icon style="margin: 0 0 2px 3px">mdi-cart</v-icon>
          </v-btn>

          <v-btn
            @click="handleSignInClick"
            class="nav-btn-custom h-100"
            :ripple="false"
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
.container-limit.navbar-limit {
  max-width: 1202px !important;
}

.nav-container {
  /* Alteravel tamanho no futuro */
  height: 64px;
  min-width: 325px;
  z-index: 1 !important;

  .nav-side-container {
    width: 342px;
  }

  .nav-mobile-icon-container {
    padding: 0 7px;
  }
}

.nav-btn-custom {
  padding: 0px 8px !important;
}
</style>
