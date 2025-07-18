<template>
  <div class="h-100" :class="{ 'scrollbar-filler': displayCartDrawer }">
    <!-- <navigation-drawer /> -->
    <cart-drawer />
    <navbar />

    <div class="h-100 d-flex flex-column">
      <v-main style="margin-top: 75px;">
        <router-view />
      </v-main>
      <footer-area :cleanFooter="true" />
    </div>

    <v-tooltip v-model="showTooltip" location="left">
      <template v-slot:activator="{ props }">
        <v-btn @click="handleProductForm" elevation="6" v-bind="props" icon class="chat-btn">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <div>Clique aqui para adicionar seu produto!</div>
    </v-tooltip>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import { useDrawerStore } from "@/store/store.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from 'vue-router';

import Navbar from "@/components/Header/Navbar.vue";
/* import NavigationDrawer from "@/components/Header/NavigationDrawer.vue"; */

import FooterArea from "@/components/Footer/Footer.vue";
import CartDrawer from "@/components/Header/CartDrawer.vue";

const drawerStore = useDrawerStore();
const { displayCartDrawer } = storeToRefs(drawerStore);

const router = useRouter();
const route = useRoute()

const showTooltip = ref(false);

const handleProductForm = () => {
  router.push({ name: "ProductForm" });
};

onBeforeMount(() => {
  if (route.name) {
    if (route.name == "Home") {
      setTimeout(() => {
        showTooltip.value = true;

        setTimeout(() => {
          showTooltip.value = false;
        }, 6000);
      }, 500);
    }
  }
})
</script>

<style>
.chat-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}
</style>
