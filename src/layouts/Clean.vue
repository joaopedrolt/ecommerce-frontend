<template>
    <v-main>
      <router-view />
    </v-main>
    <footer-area :showTopSide="false"/>
  </template>
  
  <script setup>
/*   import Navbar from "../components/header/Navbar.vue";
  import NavigationDrawer from "../components/header/NavigationDrawer.vue"; */
  import FooterArea from "../components/footer/Footer.vue";
  </script>
  