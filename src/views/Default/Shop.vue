<template>
  <div v-if="renderComponent" class="shop-view h-100">
    <div class="shop-container h-100">
      <div class="d-flex flex-column container-limit height-limit container-size-padding h-100">
        <search />

        <template v-if="loadingProducts">
          <div class="d-flex flex-column align-center px-3 height-limit h-100 justify-center"
            style="flex: 1; padding-bottom: 75px !important;">
            <div class="mb-2 text-subtitle-1 font-weight-light">Buscando Produtos...</div>
            <v-progress-linear indeterminate></v-progress-linear>
          </div>
        </template>
        <template v-else>
          <div class="mb-2">
            <div class="search-details-container d-flex justify-center">
              <div class="d-flex flex-column text-center align-center">
                <div class="d-flex justify-center search text-subtitle-2 font-weight-light mb-1">
                  <div v-if="!products.length" class="mr-1" style="transform: translateY(-1.8px);">
                    <v-icon style="font-size: 1.5rem;">mdi-close-circle-outline</v-icon>
                  </div>
                  {{ !products.length ? ' Nenhum produto encontrado para: ' : 'Resultados da sua pesquisa' }}
                </div>

                <div class="text-h5 font-weight-bold" style="overflow-wrap: break-word;">' {{ searchQuery }} '</div>

                <v-btn v-if="!products.length" @click="displaySearchOverlay()"
                  class="featured-product-button font-weight-regular button-color button-dark mt-4" variant="outlined"
                  height="35px" :ripple="false" style="width: 100% !important; font-size: 0.75rem !important;">
                  Pesquisar Novamente <v-icon class="pl-2">mdi-magnify</v-icon>
                </v-btn>
              </div>
            </div>
          </div>

          <template v-if="products.length">
            <div class="search-options-row d-flex justify-space-between pb-2">
              <!-- Desktop -->
              <button
                class="filter-desktop filter-button-container d-flex align-end text-subtitle-2 font-weight-regular"
                @click="handleFilterDesktopClick()">
                Filtrar e Organizar
                <div class="filter-chevron-left" :class="{ 'active': showFilters }">
                  <v-icon>mdi-chevron-right</v-icon>
                </div>
              </button>

              <!-- Mobile -->
              <button class="filter-mobile filter-button-container d-flex align-end text-subtitle-2 font-weight-regular"
                style="width: 200px" @click="handleFilterMobileClick()">
                Filtrar e Organizar
                <div class="filter-chevron-left" :class="{ 'active': showFilters }">
                  <v-icon>mdi-chevron-right</v-icon>
                </div>
              </button>
              <!--   <v-menu v-model="showOrderByDropdown" offset="5" transition="slide-x-transition">
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
</v-menu> -->
            </div>

            <div class="d-flex">
              <div class="filter-tab" :class="{ 'active': showFilters }">
                <filter-list :filterList="filterList" :active-filters="activeFilters"
                  @update-filters="updateActiveFilters" />
              </div>
              <products :products="products" :active-filters="activeFilters"
                :updateRenderComponent="updateRenderComponent" />
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
  <loading-white-screen v-else />
  <filter-drawer :filterList="filterList" :active-filters="activeFilters" @update-filters="updateActiveFilters" />
</template>

<script setup>
import { ref, watch, onMounted, onBeforeMount } from "vue";
import { useRoute } from 'vue-router';

import FilterList from "@/components/Shop/FilterList.vue";
import Products from "@/components/Shop/Products.vue";
import Search from "@/components/Shop/Search.vue";
import FilterDrawer from "@/components/Shop/FilterDrawer.vue";

import { storeToRefs } from "pinia";
import { useSearchStore, useDrawerStore } from "@/store/store";
import { getProductsByName } from "@/data/product";

import LoadingWhiteScreen from "@/components/LoadingWhiteScreen.vue";

const route = useRoute();

const searchStore = useSearchStore();
const drawerStore = useDrawerStore();

const { searchQuery } = storeToRefs(searchStore);
const { displayFilterDrawer } = storeToRefs(drawerStore);

const displaySearchOverlay = () => {
  searchStore.displaySearchOverlayx();
};

const renderComponent = ref(true);

const showFilters = ref(false);
const showOrderByDropdown = ref(false);

const products = ref([]);
const loadingProducts = ref(false);

const activeFilters = ref([]);

const filterList = ref([
  {
    title: "Preço",
    items: [
      "Menor Preço",
      "Maior Preço"
    ],
    multiple: false
  },
  {
    title: "Outros Filtros",
    items: [
      "Modelo 1",
      "Modelo 2"
    ],
    multiple: true
  }
]);

const updateRenderComponent = (newValue) => {
  renderComponent.value = newValue;
};

const updateActiveFilters = (newValue) => {
  activeFilters.value = newValue;
};

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

watch(searchQuery, async () => {
  if (searchQuery.value) {
    loadingProducts.value = true;

    products.value = [];
    products.value = await getProductsByName(searchQuery.value);

    loadingProducts.value = false;
  }
})

onBeforeMount(async () => {
  searchQuery.value = "";
  loadingProducts.value = true;

  setTimeout(() => {
    searchQuery.value = route.query.q;
    loadingProducts.value = false;

    document.title = searchQuery.value[0].toUpperCase() + searchQuery.value.slice(1) + " | FURVANA";
  }, 500);
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
          transform: rotate(180deg) translateY(0.5px);
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
