<template>
  <v-app-bar
    class="clean-navbar-container"
    style="z-index: 1003 !important"
    :elevation="0"
  >
    <div class="h-100 w-100 d-flex flex-column">
      <div style="margin: 0 auto" class="h-100">
        <v-btn @click="handleHomeClick" class="h-100" :ripple="false"> ECOMMERCE </v-btn>
      </div>
      <v-divider class="w-100" color="black" :thickness="1"></v-divider>
    </div>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleHomeClick = () => {
  router.push({
    name: "Home",
  });
};
</script>

<style lang="scss">
.clean-navbar-container {
  height: 64px;
}
</style>
