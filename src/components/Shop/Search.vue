<template>
  <div class="products-search-container w-100 pt-7 pb-10 d-flex justify-center">
    <div class="search-input-wrapper">
      <!--       <v-text-field hide-details="auto" variant="outlined" placeholder="O que deseja?" density="compact">
      </v-text-field>
 -->
      <v-menu class="search-dropdown" v-model="menu" transition="slide-y-transition" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <div class="d-flex">
            <v-text-field v-model="searchQuery" @input="handleSearch" maxLength="80" v-bind="props" hide-details="auto"
              variant="outlined" placeholder="O que deseja?" append-inner-icon="mdi-magnify" clearable
              @click:clear="handleClearSearchInput()">
            </v-text-field>
          </div>
        </template>

        <v-card elevation="1">
          <!--           <div class="search-list-subheader v-list-subheader">
            Produtos encontrados:
          </div> -->

          <div v-if="isSearching" class="h-100 w-100 d-flex justify-center align-center py-15 px-12 flex-column">
            <div class="mb-3">Buscando...</div>
            <v-progress-linear indeterminate striped></v-progress-linear>
          </div>

          <template v-else>
            <v-list :items="items" item-props lines="three">
              <template v-slot:subtitle="{ subtitle }">
                <div v-html="subtitle"></div>
              </template>
            </v-list>

            <button
              class="btn-search w-100 d-flex justify-space-between align-center search-list-subheader v-list-subheader pr-6"
              style="max-width: 100% !important; height: 50px;">
              <div style="overflow-wrap: anywhere;">Pesquisar todos os resuldos para : "{{ searchQuery }}"</div>

              <div class="right-arrow ml-3 h-100">
                <v-icon>mdi-arrow-right</v-icon>
              </div>
            </button>
          </template>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

//Menu

const menu = ref(false);
const searchQuery = ref("");
const isSearching = ref(false);

const search = () => {
  isSearching.value = true;

  // Aguarda resposta
  setTimeout(() => {
    isSearching.value = false;
  }, 2000);
};

let timer = null;

const handleSearch = () => {
  clearTimeout(timer);

  timer = setTimeout(() => {

    if (!searchQuery.value) {
      menu.value = false;
      return;
    }

    if (searchQuery.value.length == 0) {
      menu.value = false;
      return;
    }

    if (!menu.value) {
      menu.value = true;
    }

    search();
  }, 500);
};

const handleClearSearchInput = () => {
  menu.value = false;
}

const handleScroll = () => {
  menu.value = false;
};

watch(menu, (newVal) => {
  if (newVal) {
    window.addEventListener('scroll', handleScroll);

    if (!searchQuery.value) {
      menu.value = false;
      return;
    }

    if (searchQuery.value.length == 0)
      menu.value = false;

    return;
  }

  if (!newVal) {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(timer);
  }
})

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
.search-dropdown {
  .v-overlay__content {
    max-width: 50% !important;
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

.v-list{
  padding: 0;
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
