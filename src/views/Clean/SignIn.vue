<template>
  <div class="signin-view h-100 w-100 px-3 py-15">
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
}
</style>
