<template>
  <div class="shop-view">
    <div class="shop-container h-100">
      <div class="d-flex flex-column container-limit height-limit container-size-padding" style="">
        <search />

        <div>
          <div class="search-details-container d-flex flex-column text-center">
            <div class="search text-subtitle-2 font-weight-light">
              Resultados da sua pesquisa
            </div>
            <div class="text-h5 font-weight-bold">'capuz'</div>
          </div>
        </div>

        <div class="search-options-row d-flex justify-space-between pb-2">
          <button class="filter-button-container d-flex align-end text-subtitle-2 font-weight-regular"
            style="width: 295px" @click="handleFilterClick()">
            Filtrar
            <div class="filter-chevron" :class="{ 'active': showFilters }">
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </button>

          <button class="filter-button-container d-flex justify-end align-end text-subtitle-2 font-weight-regular"
            style="width: 295px">
            <v-icon>mdi-chevron-down</v-icon>
            Ordernar por
          </button>
        </div>
        <div class="d-flex">
          <div class="filter-tab" :class="{ 'active': showFilters }">
            <filter-list />
          </div>
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
import Search from "@/components/Shop/Search.vue";

const searchQuery = ref("");
const showFilters = ref(false);

let timer = null;

const handleFilterClick = () => {
  console.log("oi")
  showFilters.value = !showFilters.value;
};

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

  .search-options-row {
    height: 33px;

    .filter-chevron {
      transition: transform 0.3s ease-in-out;
      transform: rotate(0) translateY(-1.5px);

      &.active {
        transform: rotate(180deg) translateY(-1.25px);
      }
    }
  }

  .filter-tab {
    width: 0;
    opacity: 0;
    overflow: hidden !important;
    transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;

    &.active {
      opacity: 1;
      width: 320px;
    }
  }
}
</style>
