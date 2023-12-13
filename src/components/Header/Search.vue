<template>
  <v-overlay v-model="displaySearch">
    <v-card v-if="displaySearch">
      <div class="search-container">
        <div class="search-input-wrapper">
          <v-menu
            v-model="menu"
            transition="slide-y-transition"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ props }">
              <div class="d-flex">
                <v-text-field
                  v-model="searchQuery"
                  @input="handleSearch"
                  v-bind="props"
                  hide-details="auto"
                  variant="outlined"
                  placeholder="O que deseja?"
                  append-inner-icon="mdi-magnify"
                >
                </v-text-field>
                <v-btn
                  class="custom-btn"
                  :ripple="false"
                  @click="hideSearchOverlay()"
                  icon="mdi-close"
                />
              </div>
            </template>

            <v-card elevation="1" class="py-5">
              <div class="search-list-subheader v-list-subheader">
                Alguns produtos encontrados:
              </div>
              <v-list :items="items" item-props lines="three">
                <template v-slot:subtitle="{ subtitle }">
                  <div v-html="subtitle"></div>
                </template>
              </v-list>
              <div class="search-list-subheader">
                Pesquisar por todos os resuldos para : "{{ searchQuery }}"
              </div>
            </v-card>
          </v-menu>
        </div>
      </div>
    </v-card>
  </v-overlay>
</template>

<script setup>
import { ref, watch } from "vue";
import { useNavbarStore } from "@/store/store";
import { storeToRefs } from "pinia";

const navbarStore = useNavbarStore();
const { displaySearch } = storeToRefs(navbarStore);

const searchQuery = ref("");
const menu = ref(false);

const search = () => {};

let timer = null;

const handleSearch = () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    if (!menu.value) {
      menu.value = true;
    }

    search();
  }, 500);
};

const hideSearchOverlay = () => {
  displaySearch.value = false;
  menu.value = false;
};

watch(displaySearch, (newVal) => {
  if (!newVal) searchQuery.value = "";
});

const items = [
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `R$ 165 `,
  },
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `R$ 165 `,
  },
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `R$ 165 `,
  },
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `R$ 165 `,
  },
];
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

.search-list-subheader {
  padding: 0 20px;
}

.custom-btn:hover {
  .v-btn__overlay {
    background-color: transparent !important;
  }
}
</style>
