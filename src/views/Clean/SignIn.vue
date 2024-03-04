<template>
  <div style="height: 75px;"></div> <!-- Filler Arrumar -->
  <div class="signin-view w-100 px-3">
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
  height: calc(93% - 75px);
  padding-bottom: 75px;

  @media (max-width: $tablet) {
    height: calc(100% - 60px);
  }
}

.signin-form-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .signin-content {
    max-width: 400px;
    text-align: center;
    width: 100%;
  }
}
</style>
