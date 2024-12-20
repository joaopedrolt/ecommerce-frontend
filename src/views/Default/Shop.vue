<template>
  <div class="shop-view">
    <div class="shop-container h-100">
      <div class="d-flex flex-column container-limit height-limit container-size-padding">
        <search />
        <div class="mb-2">
          <div class="search-details-container d-flex flex-column text-center">
            <div class="search text-subtitle-2 font-weight-light">
              Resultados da sua pesquisa
            </div>
            <div class="text-h5 font-weight-bold" style="overflow-wrap: break-word;">'{{ searchQuery }}'</div>
          </div>
        </div>

        <div class="search-options-row d-flex justify-space-between pb-2">
          <!-- Desktop -->
          <button class="filter-desktop filter-button-container d-flex align-end text-subtitle-2 font-weight-regular"
            style="width: 150px" @click="handleFilterDesktopClick()">
            Filtrar
            <div class="filter-chevron-left" :class="{ 'active': showFilters }">
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </button>

          <!-- Mobile -->
          <button class="filter-mobile filter-button-container d-flex align-end text-subtitle-2 font-weight-regular"
            style="width: 200px" @click="handleFilterMobileClick()">
            Filtrar e Organizar por
            <div class="filter-chevron-left" :class="{ 'active': showFilters }">
              <v-icon>mdi-chevron-right</v-icon>
            </div>
          </button>

          <v-menu v-model="showOrderByDropdown" offset="5" transition="slide-x-transition">
            <template v-slot:activator="{ props }">
              <button
                class="filter-desktop filter-button-container d-flex justify-end align-end text-subtitle-2 font-weight-regular"
                style="width: 150px; position: relative;">
                Ordernar por
                <div class="filter-chevron-right" :class="{ 'active': showOrderByDropdown }">
                  <v-icon>mdi-chevron-down</v-icon>
                </div>

                <div class="h-100" style="position: absolute; width: 148px; left: 0;" v-bind="props"></div>
              </button>

            </template>

            <v-list elevation="1" class="dropdown-orderby-list" density="compact" :items="items">
              <v-list-item :ripple="false" v-for="(item, index) in items" :key="index" @click="selectedItem = index"
                :active="index == selectedItem">
                <v-list-item-title>
                  <div class="w-100 h-100 text-end font-weight-regular" style="font-size: 0.8rem;">{{ item }}</div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
  <filter-drawer />
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from 'vue-router';

import FilterList from "@/components/Shop/FilterList.vue";
import Products from "@/components/Shop/Products.vue";
import Search from "@/components/Shop/Search.vue";
import FilterDrawer from "@/components/Shop/FilterDrawer.vue";

import { storeToRefs } from "pinia";
import { useSearchStore, useDrawerStore } from "@/store/store";

const route = useRoute();

const searchStore = useSearchStore();
const drawerStore = useDrawerStore();

const { searchQuery } = storeToRefs(searchStore);
const { displayFilterDrawer } = storeToRefs(drawerStore);

const showFilters = ref(false);
const showOrderByDropdown = ref(false);

const handleScroll = () => {
  showOrderByDropdown.value = false;
};

watch(showOrderByDropdown, (newValue) => {
  if (newValue) {
    window.addEventListener('scroll', handleScroll);

    if (showFilters.value == true)
      showFilters.value = false;
  }
  else {
    window.removeEventListener('scroll', handleScroll);
  }
});

const items = [`Maior Preço`, `Menor Preço`, `Nossa Seleção`];

const selectedItem = ref(0);

const handleFilterDesktopClick = () => {
  showFilters.value = !showFilters.value;
};

const handleFilterMobileClick = () => {
  displayFilterDrawer.value = true;
};

onMounted(() => {
  searchQuery.value = route.query.q;
})
</script>

<style lang="scss">
@import "@/styles/global.scss";

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
      &-left {
        transform: rotate(0) translateY(-1.5px);
        transition: transform 0.3s ease-in-out;

        &.active {
          transform: rotate(180deg) translateY(-1.2px);
        }
      }

      &-right {
        transform: rotate(0) translateY(0px);
        transition: transform 0.3s ease-in-out;

        &.active {
          transform: rotate(180deg) translateY(-1.5px);
        }
      }
    }

    .filter-desktop {
      @media (max-width: $tablet) {
        display: none !important;
      }
    }

    .filter-mobile {
      @media (min-width: $tablet) {
        display: none !important;
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

  input {
    font-size: 13px !important;
  }
}

.dropdown-orderby-list {
  padding: 0 !important;

  .v-list-item--one-line {
    padding-inline: 22px !important;
  }
}
</style>
