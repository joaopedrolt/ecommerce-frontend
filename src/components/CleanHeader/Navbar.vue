<template>
  <v-app-bar
    class="nav-component"
    style="z-index: 1003 !important;"
    :elevation="1"
  >
    <div style="margin: 0 auto" class="h-100">
      <v-btn class="h-100" :ripple="false"> ECOMMERCE </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>

</script>

<style lang="scss">
.container-limit.navbar-limit {
  max-width: 1202px !important;
}

.nav-container {
  /* Alteravel tamanho no futuro */
  height: 64px;
  min-width: 325px;
  z-index: 1 !important;

  .nav-side-container {
    width: 342px;
  }

  .nav-mobile-icon-container {
    padding: 0 7px;
  }
}

.nav-btn-custom {
  padding: 0px 8px !important;
}
</style>
