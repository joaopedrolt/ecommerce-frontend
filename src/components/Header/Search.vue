<template>
  <v-card>
    <div class="search-container">
      <div class="search-input-wrapper">
        <v-menu
          v-model="menu"
          transition="slide-y-transition"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="searchQuery"
              @input="handleSearch"
              clearable
              v-bind="props"
              hide-details="auto"
              variant="outlined"
              placeholder="O que deseja?"
              :append-icon="'mdi-magnify'"
            >
            </v-text-field>
          </template>

          <v-card elevation="1" class="py-5"> xxxxxxxxxxxxxxxxxxxxx </v-card>
        </v-menu>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const menu = ref(false);

let timer = null;

const handleSearch = () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    menu.value = true;
    console.log(`Make API request with query: ${searchQuery.value}`);
  }, 500);
};

const search = () => {
  alert(searchInputValue);
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

.search-container {
  height: 150px;
  width: 100dvw;
  display: flex;
  align-items: center;
  justify-content: center;

  .search-input-wrapper {
    width: 60%;

    @media (max-width: $tablet) {
      width: 90%;
    }
  }
}

.menu-search {
  width: calc(100% - 54px) !important;
}
</style>
