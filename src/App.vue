<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup></script>

<style lang="scss">
.container-limit {
  padding: 0 !important;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: auto;
}

.default-input-color {
  color: rgb(var(--v-theme-on-background)) !important;
}

.error-input-color {
  color: rgb(var(--v-theme-error));
}

.hide-details-replacement {
  margin-bottom: 24px;
}
</style>
