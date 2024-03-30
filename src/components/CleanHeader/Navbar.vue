<template>
  <v-app-bar
    class="clean-navbar-container"
    style="z-index: 1003 !important"
    :elevation="0"
    height="75px"
  >
    <div class="h-100 w-100 d-flex flex-column">
      <div class="h-100 logo-black" style="margin: 0 auto">
        <v-img
          src="/logo.svg"
          width="120px"
          height="75px"
        ></v-img>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

/* const handleHomeClick = () => {
  router.push({
    name: "Home",
  });
}; */
</script>

<style lang="scss">
.clean-navbar-container {
  height: 75px;


  .v-toolbar__content {
    height: 75px !important;
  }
}
</style>
