<template>
  <div class="shop-view">
    <div class="shop-container h-100">
      <div class="d-flex flex-column container-limit height-limit" style="">
        <div
          class="products-search-container w-100 mb-3 pt-8 pb-5 d-flex justify-center"
        >
          <!--     @click:append="search"
              @keyup.enter="search" -->
          <div class="search-input-wrapper">
            <v-text-field
              v-model="searchQuery"
              @input="handleSearch"
              clearable
              hide-details="auto"
              variant="outlined"
              placeholder="O que deseja?"
              :append-icon="'mdi-magnify'"
              density="compact"
            >
            </v-text-field>
          </div>
        </div>
        <div class="d-flex container-limit container-size-padding">
          <filter-list />
          <products />
        </div>
      </div>
    </div>
    <div style="height: 300px; width: 100%"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import FilterList from "@/components/Shop/FilterList.vue";
import Products from "@/components/Shop/Products.vue";

const searchQuery = ref("");

let timer = null;

const handleSearch = () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    console.log(`Make API request with query: ${searchQuery.value}`);
  }, 500);
};
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
