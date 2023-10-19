<template>
  <div class="home-view">
    <carousel />
    <category-cards />
   <!--  <category-cards /> -->
  </div>
</template>

<script setup>
import Carousel from "@/components/home/Carousel.vue";
import CategoryCards from "@/components/home/CategoryCards.vue";
</script>

<style lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
