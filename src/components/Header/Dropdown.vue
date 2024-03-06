<template>
  <v-card v-if="menu == 1" elevation="1">
    <div class="d-flex h-100">
      <div style="flex: 2;">
        <div class="d-flex align-center pl-4 pt-2 pb-1 text-overline font-weight-regular" style="height: 48px;">
          Mais vendidos
        </div>

        <v-divider color="black"></v-divider>

        <div>
          <v-list class="list-featured" :items="items" item-props lines="three">
            <v-list-item v-for="item in items" :key="item.title" @click="handleListProductClick(item.value)">

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
        </div>

        <v-divider color="black"></v-divider>

        <div>
          <v-btn style="height: 50px;" elevation="0" @click="seeAllCategory()"
            class="w-100 d-flex justify-space-between align-center text-overline font-weight-regular">
            Ver todos os produtos dessa categoria

            <div class="right-arrow ml-3 h-100" style="margin-bottom: 3.5px;">
              <v-icon>mdi-arrow-right</v-icon>
            </div>
          </v-btn>
        </div>
      </div>

      <div style="flex: 1; background-color: red; position: relative; overflow: hidden;">
        <div class="h-100 w-100" style="background-color: red; position: absolute;">
          <img class="h-100 w-100" style="object-fit: cover;"
            src="https://www.insiderstore.com.br/cdn/shop/files/menu_atu.jpg?v=1700768732&width=450" />
        </div>
      </div>
    </div>
  </v-card>

  <v-card v-if="menu == 2" style="width: 1286px;" elevation="1">
    <div class="d-flex h-100">
      <div style="flex: 2;">
        <div class="pl-4 pt-2 pb-1 text-overline font-weight-regular" style="height: 48px;">
          Destacados
        </div>

        <v-divider color="black"></v-divider>

        <div>
          <v-list class="list-featured" :items="items" item-props lines="three">
            <v-list-item v-for="item in items" :key="item.title" @click="handleListProductClick(item.value)">

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
        </div>

        <v-divider color="black"></v-divider>

        <div>
          <v-btn style="height: 48px;" elevation="0" @click="seeAllCategory()"
            class="py-2 w-100 d-flex justify-space-between align-center text-overline font-weight-regular">
            Ver todos os produtos dessa categoria

            <div class="right-arrow ml-3 h-100">
              <v-icon>mdi-arrow-right</v-icon>
            </div>
          </v-btn>
        </div>
      </div>

      <div style="flex: 1; background-color: red; position: relative; overflow: hidden;">
        <div class="h-100 w-100" style="background-color: red; position: absolute;">
          <img class="h-100 w-100" style="object-fit: cover;"
            src="https://www.insiderstore.com.br/cdn/shop/files/minitrio3.jpg?v=1699492556&width=450" />
        </div>
      </div>
    </div>
  </v-card>

  <v-card v-if="menu == 3" style="width: 1286px;" elevation="1">
    <div class="d-flex h-100">
      <div style="flex: 2;">
        <div class="pl-4 pt-2 pb-1 text-overline font-weight-regular" style="height: 48px;">
          Destacados
        </div>

        <v-divider color="black"></v-divider>

        <div>
          <v-list class="list-featured" :items="items" item-props lines="three">
            <v-list-item v-for="item in items" :key="item.title" @click="handleListProductClick(item.value)">

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
        </div>

        <v-divider color="black"></v-divider>

        <div>
          <v-btn style="height: 48px;" elevation="0" @click="seeAllCategory()"
            class="py-2 w-100 d-flex justify-space-between align-center text-overline font-weight-regular">
            Ver todos os produtos dessa categoria

            <div class="right-arrow ml-3 h-100">
              <v-icon>mdi-arrow-right</v-icon>
            </div>
          </v-btn>
        </div>
      </div>

      <div style="flex: 1; background-color: red; position: relative; overflow: hidden;">
        <div class="h-100 w-100" style="background-color: red; position: absolute;">
          <img class="h-100 w-100" style="object-fit: cover;"
            src="https://www.insiderstore.com.br/cdn/shop/files/menu_BOXY.jpg?v=1700676161&width=450" />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  menu: Number,
});

const menu = ref(props.menu);

const items = [
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
  },
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `Preta / PP`,
    value: 3
  },
  {
    prependAvatar:
      "https://cdn.shopify.com/s/files/1/0526/4123/5093/files/PRETO-01_1.jpg?v=1700691687&width=150",
    title: "Tech T-Shirt Gola V Feminina",
    subtitle: `Preta / PP`,
    value: 4
  },
];

const seeAllCategory = () => {
  menu.value = false;
  router.push({ name: "Shop", query: { q: "Masculine" } });
}

const handleListProductClick = (productId) => {
  menu.value = false;
  router.push({ name: "Product", params: { produtoId: productId } });
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

.list-featured {
  padding: 0 !important;

  .v-list-item {
    padding-bottom: 12px !important;
    padding-top: 6px !important;
    align-content: center !important;
    min-height: 70px !important;
    border-bottom: 1px solid $color-border;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
