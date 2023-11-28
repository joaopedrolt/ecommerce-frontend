<template>
  <div class="shop-view mt-16">
    <div class="shop-container h-100">
      <div class="d-flex container-limit height-limit" style="">
        <filter-list />
        <products />
      </div>
    </div>
    <div style="height: 300px; width: 100%"></div>
  </div>
</template>

<script setup>
import FilterList from "@/components/Shop/FilterList.vue";
import Products from "@/components/Shop/Products.vue";
</script>

<style lang="scss">
.shop-container {
  .height-limit {
    min-height: 500px;
  }

  .shop-wrapper {
    display: flex;
  }
}
</style>
