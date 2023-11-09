<template>
  <navbar />
  <navigation-drawer />
  <v-main>
    <router-view />
  </v-main>
  <footer-area :showTopSide="true"/>
</template>

<script setup>
import Navbar from "@/components/Header/Navbar.vue";
import NavigationDrawer from "@/components/Header/NavigationDrawer.vue";
import FooterArea from "@/components/Footer/Footer.vue";
</script>
