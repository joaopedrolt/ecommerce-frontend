<template>
  <v-overlay v-model="displaySearchOverlay">
    <v-card v-if="displaySearchOverlay">
      <div class="search-container">
        <div class="search-input-wrapper">
          <v-menu class="search-dropdown" v-model="menu" transition="slide-y-transition" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <div class="d-flex">
                <v-text-field id="searchHeader" class="shop-text-field-desktop" v-model="searchInput"
                  @input="handlePreSearch" maxLength="80" v-bind="props" hide-details="auto" variant="outlined"
                  placeholder="O que deseja?" append-inner-icon="mdi-magnify" @click:append-inner="search()"
                  @keypress.enter="search()" clearable @click:clear="handleClearSearchInput()">
                </v-text-field>
                <div class="shop-text-field-mobile" @click="displaySearchOverlay()">
                </div>
              </div>
            </template>

            <v-card elevation="1">
              <div v-if="isSearching" class="h-100 w-100 py-12 d-flex justify-center">
                <div class="d-flex justify-center align-center flex-column" style="width: 60%;">
                  <div class="mb-3 text-subtitle font-weight-light">Buscando...</div>
                  <v-progress-linear indeterminate striped></v-progress-linear>
                </div>
              </div>

              <template v-else>
                <div class="w-100 d-flex align-center search-list-subheader v-list-subheader"
                  style="max-width: 100% !important; height: 50px; padding-top: 7px;">
                  <div style="overflow-wrap: anywhere;">Alguns produtos encontrados:</div>
                </div>

                <v-list class="list-search" :items="items" item-props lines="three">
                  <v-list-item v-for="item in items" :key="item.title" :title="item.title" :subtitle="item.subtitle"
                    :prepend-avatar="item.prependAvatar" @click="handleListProductClick(item.value)">
                  </v-list-item>
                </v-list>

                <button
                  class="btn-search w-100 d-flex justify-space-between align-center search-list-subheader v-list-subheader pr-6"
                  style="max-width: 100% !important; height: 50px;" @click="search()">
                  <div style="overflow-wrap: anywhere;">Pesquisar todos os resuldos para : "{{ searchInput }}"</div>

                  <div class="right-arrow ml-3 h-100">
                    <v-icon>mdi-arrow-right</v-icon>
                  </div>
                </button>
              </template>
            </v-card>
          </v-menu>
        </div>
      </div>
    </v-card>
  </v-overlay>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSearchStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

const searchStore = useSearchStore();
const { searchInput, searchQuery, displaySearchOverlay } = storeToRefs(searchStore);

const isSearching = ref(false);
const menu = ref(false);

const router = useRouter();

const search = () => {
  if (menu.value)
    setTimeout(() => {
      menu.value = false;
    }, 500)

  if (searchInput.value != undefined && searchInput.value.length != 0) {
    router.push({ name: "Shop", query: { q: searchInput.value } });
    searchQuery.value = searchInput.value;
  }

  displaySearchOverlay.value = false;
};

const preSearch = () => {
  isSearching.value = true;

  // Aguarda resposta
  setTimeout(() => {
    isSearching.value = false;
  }, 2000);
};

const handlePreSearch = () => {
  clearTimeout(timer);

  timer = setTimeout(() => {

    if (!searchInput.value) {
      menu.value = false;
      return;
    }

    if (searchInput.value.length == 0) {
      menu.value = false;
      return;
    }

    if (!menu.value) {
      menu.value = true;
    }

    preSearch();
  }, 500);
};

const handleClearSearchInput = () => {
  menu.value = false;
};

const handleListProductClick = (productId) => {
  displaySearchOverlay.value = false;
  router.push({ name: "Product", params: { produtoId: productId } });
  /*  router.push(`/produto/${productId}`); */
};

let timer = null;

watch(menu, (newVal) => {
  if (newVal) {
    if (!searchInput.value) {
      menu.value = false;
      return;
    }

    if (searchInput.value.length == 0)
      menu.value = false;

    return;
  }

  if (!newVal) {
    clearTimeout(timer);
  }
})

watch(displaySearchOverlay, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      searchInput.value = "";
    }, 120);

    setTimeout(() => {
      const searchRef = document.querySelector("#searchHeader");
      searchRef.focus();
    }, 200);
  }
});

const items = [
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `R$ 165 `,
    value: 1,
  },
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `R$ 165 `,
    value: 2
  },
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `R$ 165 `,
    value: 3
  },
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `R$ 165 `,
    value: 4
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

#searchBar {
  position: relative;

  .shop-text-field-mobile {
    position: absolute;
    z-index: 100;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    @media (min-width: $tablet) {
      display: none;
    }
  }
}

.custom-btn:hover {
  .v-btn__overlay {
    background-color: transparent !important;
  }
}

.search-dropdown {
  .v-overlay__content {
    max-width: 50% !important;
    position: fixed !important;
    z-index: 9999 !important;
  }

  .v-overlay {}
}

.right-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: bounceAnimation 1s infinite;
}

.btn-search {
  transition: background-color 0.2s;

  &:hover {
    background: #f6f6f6;
  }
}

.list-search {
  padding: 0 !important;

  .v-list-item {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
    align-content: center !important;
    min-height: 70px !important;
  }
}

.v-list-subheader {
  min-height: 20px !important;
}

@keyframes bounceAnimation {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(8px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
