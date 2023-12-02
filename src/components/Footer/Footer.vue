<template>
  <footer
    class="footer-component   black-theme "
    :class="{ 'regular-footer': cleanFooter, 'footer-hide-top': !cleanFooter }"
  >
    <div v-if="cleanFooter" class="container-limit container-size-padding">
      <top-side />
    </div>
    <bottom-side :cleanFooter="cleanFooter" />
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
  padding-top: 14px;
  padding-bottom: 8px !important;

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
</style>
