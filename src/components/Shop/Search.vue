<template>
  <div class="products-search-container w-100 pt-7 pb-10 d-flex justify-center">
    <div class="search-input-wrapper">
      <v-text-field v-model="searchInput" class="shop-text-field-desktop" density="compact" maxLength="80"
        hide-details="auto" variant="outlined" placeholder="O que deseja?" append-inner-icon="mdi-magnify"
        @click="displaySearchOverlay()">
      </v-text-field>
    </div>
  </div>
</template>

<script setup>
import { useSearchStore } from "@/store/store";
import { storeToRefs } from "pinia";

const searchStore = useSearchStore();

const { searchInput } = storeToRefs(searchStore);

const displaySearchOverlay = () => {
  searchStore.displaySearchOverlayx();
};
</script>

<style lang="scss"></style>
