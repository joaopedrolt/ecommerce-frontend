<template>
  <div class="home-view">
    <carousel />
    <category-cards />
  </div>
</template>

<script setup>
import Carousel from "@/components/Home/Carousel.vue";
import CategoryCards from "@/components/Home/CategoryCards.vue";
</script>

<style lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
