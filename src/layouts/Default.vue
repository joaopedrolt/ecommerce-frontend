<template>
  <navbar />
  <navigation-drawer />
  <v-main style="margin-top: 75px;">
    <router-view />
  </v-main>
  <footer-area :cleanFooter="true"/>
</template>

<script setup>
import Navbar from "@/components/Header/Navbar.vue";
import NavigationDrawer from "@/components/Header/NavigationDrawer.vue";
import FooterArea from "@/components/Footer/Footer.vue";
</script>
