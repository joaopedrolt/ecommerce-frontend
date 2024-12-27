<template>
  <div class="home-view">
    <template v-for="(featuredProduct, index) in featuredProducts" :key="index">
      <div class="featured-product container-size-padding"
        :class="[`featured-product-${featuredProduct.theme}`, { 'background-image-fill': featuredProduct.fullscreen }]"
        style="padding-top: 35px;"
        :style="featuredProduct.fullscreen ? `background-image: url(${featuredProduct.image})` : ''">
        <div class="mb-2">
          <h2 class="font-weight-bold text-uppercase" style="font-size: 2.3rem;">{{ featuredProduct.title }}</h2>
          <h3 class="text-overline" style="font-size: 0.9rem !important;">{{ featuredProduct.subtitle }}</h3>

          <div v-if="featuredProduct.showIcons && featuredProduct.icons.length > 0" class="d-flex mt-6 justify-center"
            style="gap: 40px;">
            <div v-for="(icon, index) in featuredProduct.icons" :key="index" class="d-flex flex-column align-center">
              <div style="border: 1px solid black; border-radius: 50%; padding: 9px;">
                <v-icon>mdi-{{ icon.mdiCode }}</v-icon>
              </div>
              <div class="mt-2 text-body-2">
                {{ icon.title }}
              </div>
            </div>
          </div>
        </div>

        <v-img v-if="!featuredProduct.fullscreen" class="mt-1 h-100 w-100 mt-7 mb-6"
          style="max-height: 500px; max-width: 600px;" :src="featuredProduct.image"></v-img>

        <div class="featured-product-actions">
          <v-btn @click="handleProductPageClick(featuredProduct.productId)"
            class="featured-product-button font-weight-regular mt-4" height="45px" variant="outlined" :ripple="false">
            Conhecer melhor <v-icon>mdi-chevron-right</v-icon>
          </v-btn>

          <v-btn @click="displayCartDrawerr" class="featured-product-button font-weight-regular button-color mt-4"
            height="45px" variant="flat" :ripple="false"
            :class="[`featured-product-${featuredProduct.theme}`, `button-${featuredProduct.theme}`]">
            Comprar agora <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
      <v-divider v-if="featuredProducts.length != index + 1"></v-divider>
    </template>
  </div>
</template>

<script setup>
import { useDrawerStore } from "@/store/store";
import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";

import { getFeaturedProductsOrdered } from "@/data/home.js"

const route = useRoute();
const router = useRouter();

const featuredProducts = ref([]);

// const queryParamCart = route.query.cart;

const drawerStore = useDrawerStore();

const displayCartDrawerr = () => {
  drawerStore.displayCartDrawerx();
};

const handleProductPageClick = (productId) => {
  router.push({
    name: "Product",
    params: {
      productId,
    },
  });
}

onBeforeMount(async () => {
  featuredProducts.value = await getFeaturedProductsOrdered();
});
</script>

<style lang="scss">
@import "@/styles/global.scss";

.home-view {
  display: flex;
  flex-direction: column;
  /*  gap: 30px; */
}

.featured-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 600px;

  .featured-product-actions {
    display: flex;
    width: 100%;
    margin-bottom: 60px;
    max-width: 600px;
    gap: 15px;
    flex-wrap: wrap;

    .featured-product-button {
      flex: 1;
    }

    @media (max-width: $phone) {
      gap: 0;

      .featured-product-button {
        min-width: 260px;
      }
    }
  }

  &.featured-product-light {
    color: black !important;
  }

  &.featured-product-dark {
    color: white !important;
  }
}
</style>
