<template>
  <footer v-if="cleanFooter" class="footer-component py-0" :class="{
    'regular-footer': cleanFooter,
    'footer-hide-top': !cleanFooter,
    'footer-white-theme': !cleanFooter,
  }">
    <div class="container-limit container-size-padding">
      <top-side />
      <v-divider class="w-100" :thickness="1" :color="cleanFooter ? '#fff' : '#111111'"></v-divider>
    </div>
    <bottom-side />
  </footer>
</template>

<script setup>
import TopSide from "./Columns.vue";
import BottomSide from "./Baseboard.vue";

import { ref } from "vue";

const props = defineProps({
  cleanFooter: Boolean,
});

const cleanFooter = ref(props.cleanFooter);
</script>

<style lang="scss">
@import "@/styles/global.scss";

.footer-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background-color: $color-black;
  color: $color-white !important;

  @media (max-width: $tablet) {
    padding-top: 27px;
  }

  @media (max-width: $phone) {
    padding-top: 8px;
  }

  .footer-container {
    height: 100%;
    width: 100%;
    margin: auto;
  }

  &.regular-footer {
    border-top: $border-small-line;
  }

  &.footer-hide-top {
    padding-top: 0 !important;
  }
}

.footer-white-theme {
  background-color: $color-white;
  color: $color-black !important;

  .footer-breadcrumbs {
    color: $color-black !important;
  }
}
</style>
