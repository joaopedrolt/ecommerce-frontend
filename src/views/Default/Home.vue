<template>
  <div class="home-view">
    <carousel />
    <category-cards />
    <div class="d-flex flex-column align-center justify-center text-center container-size-padding">
      <div class="mb-2">
        <h2 class="font-weight-bold" style="font-size: 2.3rem;">A MELHOR DE TODAS</h2>
        <h3 class="text-overline" style="font-size: 0.9rem !important;">Insanamente confortável!</h3>

        <div class="d-flex mt-6 justify-center" style="gap: 40px;">
          <div class="d-flex flex-column align-center">
            <div style="border: 1px solid black; border-radius: 50%; padding: 9px;">
              <v-icon>mdi-leaf</v-icon>
            </div>
            <div class="mt-2 text-body-2">
              Sustentavel
            </div>
          </div>
          <div class="d-flex flex-column align-center">
            <div style="border: 1px solid black; border-radius: 50%; padding: 9px;">
              <v-icon>mdi-silverware-clean</v-icon>
            </div>
            <div class="mt-2 text-body-2">
              Sustentavel
            </div>
          </div>
          <div class="d-flex flex-column align-center">
            <div style="border: 1px solid black; border-radius: 50%; padding: 9px;">
              <v-icon>mdi-archive</v-icon>
            </div>
            <div class="mt-2 text-body-2">
              Sustentavel
            </div>
          </div>
        </div>
      </div>


      <v-img class="mt-16 mb-10 h-100 w-100" style="max-width: 900px;"
        src="https://www.jouse.com.br/static/img/home/camiseta-mobile-2x.jpg" alt="Camiseta dobrada"></v-img>
      <div class="featured-product">
        <v-btn class="featured-product-button font-weight-regular mt-4" height="45px" variant="outlined"
          :ripple="false">
          Conhecer melhor <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <v-btn @click="displayCartDrawerr"
          class="featured-product-button font-weight-regular button-color button-black mt-4" height="45px"
          variant="flat" :ripple="false">
          Comprar agora <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="d-flex flex-column align-center justify-center text-center container-size-padding">
      <div class="mb-2">
        <h2 class="font-weight-bold" style="font-size: 2.3rem;">UMA CARTEIRA MENOR</h2>
        <h3 class="text-overline" style="font-size: 0.9rem !important;">Insanamente confortável!</h3>
      </div>
      <v-img class="mt-9 h-100 w-100" style="max-width: 900px;"
        src="https://www.jouse.com.br/static/img/home/jouse-mobile-2x.jpg" alt="Camiseta dobrada"></v-img>
      <div class="featured-product">
        <v-btn class="featured-product-button font-weight-regular mt-4" height="45px" variant="outlined"
          :ripple="false">
          Conhecer melhor <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <v-btn @click="displayCartDrawerr"
          class="featured-product-button font-weight-regular button-color button-black mt-4" height="45px"
          variant="flat" :ripple="false">
          Comprar agora <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import Carousel from "@/components/Home/Carousel.vue";
import CategoryCards from "@/components/Home/CategoryCards.vue";

import { useDrawerStore } from "@/store/store";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();

const queryParamCart = route.query.cart;

const drawerStore = useDrawerStore();

const displayCartDrawerr = () => {
  drawerStore.displayCartDrawerx();
};

onMounted(() => {
  if (queryParamCart) displayCartDrawerr();
});
</script>

<style lang="scss">
@import "@/styles/global.scss";

.home-view {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.featured-product {
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
</style>
