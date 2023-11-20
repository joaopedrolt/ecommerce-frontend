<template>
  <div class="validation-filler" :class="active ? 'validation-active' : ''"></div>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
});
</script>

<style lang="scss">
.validation-filler {
  height: 0;
  transition: height 0.2s ease-in-out;

  &.validation-active {
    height: 20px !important;
  }
}
</style>
