<template>
  <navbar />
  <navigation-drawer />
  <v-main>
    <router-view />
  </v-main>
  <footerbar />
</template>

<script setup>
import Navbar from '../components/header/Navbar.vue'
import NavigationDrawer from '../components/header/NavigationDrawer.vue';
import Footerbar from '../components/Footer.vue';
</script>
