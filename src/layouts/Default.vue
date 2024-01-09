<template>
  <div :class="{ 'scrollbar-filler': displayCartDrawer }">
    <navbar />
    <navigation-drawer />
    <cart-drawer />
    <v-main style="margin-top: 75px;">
      <router-view />
    </v-main>
    <footer-area :cleanFooter="true" />
  </div>
</template>

<script setup>
import { useDrawerStore } from "@/store/store.js";
import { storeToRefs } from "pinia";

import Navbar from "@/components/Header/Navbar.vue";
import NavigationDrawer from "@/components/Header/NavigationDrawer.vue";
import FooterArea from "@/components/Footer/Footer.vue";
import CartDrawer from "@/components/Header/CartDrawer.vue";

const drawerStore = useDrawerStore();
const { displayCartDrawer } = storeToRefs(drawerStore);
</script>
