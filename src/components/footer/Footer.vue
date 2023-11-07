<template>
  <footer class="footer-component elevation-10">
    <div v-if="showTopSide" class="container-limit">
      <top-side />
    </div>
    <v-divider class="w-100" color="black" :thickness="1"></v-divider>
    <bottom-side />
  </footer>
</template>

<script setup>
import TopSide from "./Columns.vue";
import BottomSide from "./Baseboard.vue";

import { ref } from "vue";

const props = defineProps({
  showTopSide: Boolean,
});

const showTopSide = ref(props.showTopSide);
</script>

<style lang="scss">
@import "@/styles/global.scss";

.footer-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
  padding-bottom: 8px !important;

  @media (max-width: $tablet) {
    padding-top: 27px !important;
  }

  @media (max-width: $phone) {
    padding-top: 8px !important;
  }

  .footer-container {
    height: 100%;
    width: 100%;
    margin: auto;
  }
}
</style>
