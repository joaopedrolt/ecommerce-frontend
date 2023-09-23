<template>
  <navbar />
  <navigation-drawer />
  <v-main>
    <router-view />
  </v-main>
  <v-footer>

  </v-footer>
</template>

<script setup>
import Navbar from '../components/navigation/Navbar.vue'
import NavigationDrawer from '../components/navigation/NavigationDrawer.vue';
</script>
