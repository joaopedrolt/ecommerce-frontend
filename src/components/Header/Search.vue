<template>
  <v-overlay v-model="displaySearchOverlay">
    <v-card v-if="displaySearchOverlay">
      <div class="search-container desktop">
        <div class="search-input-wrapper">
          <v-menu scroll-strategy="block" class="search-dropdown desktop" v-model="menu" transition="slide-y-transition"
            :close-on-content-click="false" location="bottom">

            <template v-slot:activator="{ props }">
              <div class="d-flex h-100">
                <div class="search-input-desktop">
                  <v-text-field id="searchHeader" v-model="searchInput" @input="handlePreSearch" maxLength="80"
                    v-bind="props" hide-details="auto" variant="outlined" placeholder="O que deseja?"
                    append-inner-icon="mdi-magnify" @click:append-inner="search()" @keypress.enter="search()" clearable
                    @click:clear="handleClearSearchInput()">
                  </v-text-field>
                </div>
              </div>
            </template>

            <v-card elevation="1">
              <div v-if="isSearching" class="h-100 w-100 py-12 d-flex justify-center">
                <div class="d-flex justify-center align-center flex-column" style="width: 60%;">
                  <div class="mb-3 text-subtitle font-weight-regular" style="opacity: 0.6">Buscando...</div>
                  <v-progress-linear indeterminate striped></v-progress-linear>
                </div>
              </div>

              <template v-else>
                <v-list class="list-search" :items="items" item-props lines="three">
                  <div class="w-100 d-flex align-center search-list-subheader v-list-subheader"
                    style="max-width: 100% !important; padding: 17px 0 15px;">
                    <div style="overflow-wrap: anywhere;">Alguns produtos encontrados:</div>
                  </div>

                  <v-divider color="#111111"></v-divider>

                  <v-list-item v-for="item in items" :key="item.title" :prepend-avatar="item.prependAvatar"
                    @click="handleListProductClick(item.value)">

                    <template v-slot:title>
                      <div class="text-subtitle-2 font-weight-regular" style="margin-top: 5px;">{{ item.title }}</div>
                    </template>

                    <template v-slot:subtitle>
                      <div class="text-caption font-weight-regular">{{ item.subtitle }}</div>
                    </template>
                  </v-list-item>
                </v-list>

                <button
                  class="btn-search w-100 d-flex justify-space-between align-center search-list-subheader v-list-subheader py-4 pr-6"
                  style="max-width: 100% !important;" @click="search()">
                  <div style="overflow-wrap: anywhere;">Buscar todos os resuldos para: {{ searchInput }}</div>

                  <div class="right-arrow ml-3 h-100">
                    <v-icon>mdi-arrow-right</v-icon>
                  </div>
                </button>
              </template>
            </v-card>
          </v-menu>
        </div>
      </div>

      <div class="search-container mobile">
        <div class="search-input-wrapper">
          <v-menu scroll-strategy="block" class="search-dropdown mobile" v-model="menu" transition="slide-y-transition"
            :close-on-content-click="false" location="bottom">

            <template v-slot:activator="{ props }">
              <div class="d-flex h-100">
                <div class="search-input-mobile">
                  <v-text-field id="searchHeader" v-model="searchInput" @input="handlePreSearch" maxLength="80"
                    v-bind="props" hide-details="auto" placeholder="O que você deseja?" append-inner-icon="mdi-magnify"
                    @click:append-inner="search()" @keypress.enter="search()" clearable
                    @click:clear="handleClearSearchInput()">
                  </v-text-field>
                </div>

                <div class="shop-text-field-mobile" @click="displaySearchOverlay()">
                </div>
              </div>
            </template>

            <v-card elevation="1">
              <div v-if="isSearching" class="h-100 w-100 py-12 d-flex justify-center">
                <div class="d-flex justify-center align-center flex-column" style="width: 60%;">
                  <div class="mb-3 text-subtitle font-weight-regular" style="opacity: 0.6">Buscando...</div>
                  <v-progress-linear indeterminate striped></v-progress-linear>
                </div>
              </div>

              <template v-else>
                <v-list class="list-search" :items="items" item-props lines="three">
                  <div class="w-100 d-flex align-center search-list-subheader v-list-subheader"
                    style="max-width: 100% !important; padding: 17px 0 15px;">
                    <div style="overflow-wrap: anywhere;">Alguns produtos encontrados:</div>
                  </div>

                  <v-divider color="#111111"></v-divider>

                  <v-list-item v-for="item in items" :key="item.title" :prepend-avatar="item.prependAvatar"
                    @click="handleListProductClick(item.value)">

                    <template v-slot:title>
                      <div class="text-subtitle-2 font-weight-regular" style="margin-top: 5px;">{{ item.title }}</div>
                    </template>

                    <template v-slot:subtitle>
                      <div class="text-caption font-weight-regular">{{ item.subtitle }}</div>
                    </template>
                  </v-list-item>
                </v-list>

                <button
                  class="btn-search w-100 d-flex justify-space-between align-center search-list-subheader v-list-subheader py-4 pr-6"
                  style="max-width: 100% !important;" @click="search()">
                  <div style="overflow-wrap: anywhere;">Buscar todos os resuldos para: {{ searchInput }}</div>

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

.v-field__loader {
  display: none !important;
}

.v-card {
  border-radius: 0 !important;
}

/* .v-divider {
  opacity: 1 !important;
} */

.search-container {
  height: 150px;
  width: 100dvw;
  display: flex;
  align-items: center;
  justify-content: center;

  .search-input-wrapper {
    width: 60%;

    .search-input-desktop,
    .search-input-mobile {
      width: 100%;
    }

    .search-input-desktop {
      display: block;
    }

    .search-input-mobile {
      display: none;
    }

    @media (max-width: $tablet) {
      width: 100%;
      height: 100%;

      .search-input-desktop {
        display: none;
      }

      .search-input-mobile {
        display: block;
      }

      .v-field__input {
        padding-top: 26px;
        padding-bottom: 26px;
      }

      .v-field__overlay {
        background-color: transparent !important;
      }
    }
  }

  &.desktop {
    display: flex;

    @media (max-width: $tablet) {
      display: none;
    }
  }

  &.mobile {
    display: none;
    height: 75px;

    @media (max-width: $tablet) {
      display: flex;
    }
  }
}

/* .search-container {
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
} */

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

    @media (min-width: $tablet) {
      padding: 0 1px !important;
    }

    @media (max-width: $tablet) {
      left: 0 !important;
    }
  }

  &.desktop {
    display: flex;

    @media (max-width: $tablet) {
      display: none;
    }
  }

  &.mobile {
    display: none;

    @media (max-width: $tablet) {
      display: flex;
      height: 75px !important;
    }
  }
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
    padding-bottom: 13px !important;
    padding-top: 11px !important;
    align-content: center !important;
    min-height: 70px !important;
    border-bottom: 1px solid $color-border;

    /*   &:first-child {
      border-top: 1px solid $color-border;
    } */
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
