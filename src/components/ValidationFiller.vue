<template>
  <div class="validation-filler" :class="{
    'active-default': active && density == undefined || density == 'default',
    'active-compact': active && density == 'compact'
  }"></div>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
  density: String,
});
</script>

<style lang="scss">
.validation-filler {
  height: 0;
  transition: height 0.2s ease-in-out;

  &.active-default {
    height: 22px !important;
  }

  &.active-compact {
    height: 18px !important;
  }
}
</style>
