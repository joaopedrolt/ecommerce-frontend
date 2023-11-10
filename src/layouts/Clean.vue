<template>
  <clean-navbar />
  <v-main>
    <div class="h-100 w-100">
      <router-view />
    </div>
  </v-main>
  <footer-area :cleanFooter="false" />
</template>

<script setup>
/*   import Navbar from "../components/header/Navbar.vue";
  import NavigationDrawer from "../components/header/NavigationDrawer.vue"; */
import FooterArea from "@/components/Footer/Footer.vue";
import CleanNavbar from "@/components/CleanHeader/Navbar.vue";
</script>
