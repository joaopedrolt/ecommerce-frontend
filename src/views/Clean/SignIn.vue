<template>
  <div style="height: 75px; background-color: red;"></div> <!-- Filler Arrumar -->
  <div class="signin-view h-100 w-100 px-3">
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss">
@import "@/styles/global.scss";

.signin-view {
  display: flex;
  justify-content: center;
  align-items: center;

  @media (orientation: landscape) {
    height: 600px !important;
  }
}

.signin-form-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .signin-content {
    max-width: 400px;
    text-align: center;
  }
}
</style>
