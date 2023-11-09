<template>
  <div class="signin-view">
    <sign-in-form></sign-in-form>
  </div>
</template>

<script setup>
import SignInForm from '@/components/SignIn/SignInForm.vue'
</script>

<style lang="scss">
.signin-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
}
</style>
