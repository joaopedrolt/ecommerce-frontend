<template>
  <div class="text-h4 font-weight-light">{{ title }}</div>
  <div class="text-subtile mb-6 font-weight-light">
    {{ subtitle }}
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
});
</script>

<style></style>
