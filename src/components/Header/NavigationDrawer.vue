<template>
  <v-navigation-drawer v-model="displayNavigationDrawer" scroll-strategy="block" style="width: 500px;" fixed temporary>
    <div class="px-2 drawer-header justify-space-between">
      <template v-if="window != 0">
        <v-btn @click="returnDefaultWindow()" class="d-flex h-100 align-top" elevation="0" icon :ripple="false"
          style="height: 30px !important; width:30px;">
          <v-icon size="small">mdi-arrow-left</v-icon>
        </v-btn>

        <div class="d-flex align-center text-overline font-weight-regular px-4 py-2">
          <div style="font-size: 0.95rem; margin-top: 2.5px;">
            Masculino
          </div>
        </div>
      </template>

      <template v-if="window == 0">
        <div class="pl-1 d-flex align-center h-100 logo-black">
          <v-img src="/logo.svg" width="120px"></v-img>
        </div>
      </template>

      <v-btn @click="hideNavigationDrawer()" class="d-flex h-100 align-top" elevation="0" icon :ripple="false"
        style="height: 30px !important; width:30px;">
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>

    <v-window class="drawer-content" v-model="window">

      <v-window-item :value="0">
        <div class="h-100 d-flex flex-column justify-space-between">
          <v-list class="list-featured" :items="items" item-props lines="three">
            <v-list-item v-for="item in items" :key="item.value" @click="moveWindow(1)">

              <template v-slot:title>
                <div class="mt-2 text-subtitle-1 font-weight-regular">
                  {{ item.title }}
                </div>
              </template>

              <template v-slot:append>
                <v-icon size="small">mdi-arrow-right</v-icon>
              </template>
            </v-list-item>
          </v-list>

          <div class="d-flex flex-column justify-space-between w-100 drawer-content-bottom">
            <v-btn class="py-6 d-flex justify-center" elevation="0">
              <v-icon class="mr-2">mdi-account</v-icon>
              Entrar
            </v-btn>
          </div>
        </div>
      </v-window-item>

      <v-window-item :value="1">
        <div>
          <!--   <div class="d-flex align-center px-4 pt-3 pb-1">
            <div class="text-overline font-weight-regular" style="font-size: 0.8rem;">Mais vendidos</div>
          </div> -->

          <div>
            <v-list class="list-featured" item-props lines="three">
              <v-list-item v-for="item in products" :key="item.title" @click="handleListProductClick(item.value)">

                <template v-slot:prepend>
                  <div class="mr-3" style="height: 70px; width: 64px;">
                    <v-img class="h-100 w-100" style="border-radius: 10px;" :src="item.prependAvatar"></v-img>
                  </div>
                </template>

                <template v-slot:title>
                  <div class="mt-2 text-subtitle-2 font-weight-bold">
                    {{ item.title }}
                  </div>
                </template>

                <template v-slot:subtitle>
                  <div class="text-body-2 font-weight-light">
                    {{ item.subtitle }}
                  </div>
                </template>
              </v-list-item>
            </v-list>
            <div>
              <v-btn style="height: 48px;" elevation="0"
                class="py-2 w-100 d-flex justify-space-between align-center text-overline font-weight-regular">
                Ver todos os produtos dessa categoria

                <div class="right-arrow ml-3 h-100">
                  <v-icon>mdi-arrow-right</v-icon>
                </div>
              </v-btn>
            </div>
          </div>

          <div>
            <v-img src="https://www.insiderstore.com.br/cdn/shop/files/menu_BOXY.jpg?v=1700676161&width=450" />



          </div>
        </div>
      </v-window-item>

    </v-window>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDrawerStore } from "@/store/store.js";
import { storeToRefs } from "pinia";

const drawerStore = useDrawerStore();
const { displayNavigationDrawer } = storeToRefs(drawerStore);

const open = ref([]);

const window = ref(0);

watch(displayNavigationDrawer, (newValue) => {
  const htmlElement = document.getElementsByTagName("html");

  if (!newValue) {
    open.value = [];
    htmlElement[0].style.overflow = "";
  } else {
    htmlElement[0].style.overflow = "hidden";
  }
});

const hideNavigationDrawer = () => {
  drawerStore.hideNavigationDrawer();
};

const returnDefaultWindow = () => {
  window.value = 0;
};

const moveWindow = (windowValue) => {
  window.value = windowValue;
};

const items = [
  {
    title: "Masculino",
    value: 1,
  },
  {
    title: "Roupas",
    value: 2
  },
  {
    title: "Acessórios",
    value: 3
  }
];

const products = [
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `Preta / PP`,
    value: 1,
  },
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `Preta / PP`,
    value: 2
  }
];
</script>

<style lang="scss">
@import "@/styles/global.scss";

.drawer-content {
  height: calc(100% - 50px);

  .drawer-content-bottom {
    border-top: 1px solid $color-border;
  }

  .v-window__container,
  .v-window-item {
    height: 100% !important;
  }
}
</style>
