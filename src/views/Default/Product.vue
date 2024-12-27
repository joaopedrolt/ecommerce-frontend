<template>
  <div class="product-view container-limit">

    <div class="product-main container-size-padding desktop-padding">
      <div class="product-left">
        <div class="product-header hide-desktop container-size-padding">
          <div class="product-title font-weight-bold" style="line-height: 1.3; text-transform: uppercase !important">
            {{ product.name }}
          </div>
          <div class="product-price mt-1">
            <div class="final-price font-weight-regular"> {{ formatPrice(product.price) }}</div>
            <div class="gross-price font-weight-light" style="margin-top: 2.5px">
              <s>{{ formatPrice(product.grossPrice) }}</s>
            </div>
          </div>
        </div>
        <div class="product-images">
          <div class="product-images-grid hide-mobile">
            <img v-for="image in product.images" class="product-img" :src="image" />
          </div>

          <div class="product-images-slide hide-desktop">
            <div class="container-limit carousel-limit carousel-height-limit">
              <Splide :has-track="false" aria-label="..." :options="{
                arrows: true,
                speed: 1000,
              }">
                <SplideTrack>
                  <SplideSlide style="width: 100%" class="carousel-height-limit">
                    <img class="carousel-height-limit carousel-img-sizing"
                      src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919233_1000.jpg"
                      alt="Sample 1" />
                  </SplideSlide>

                  <SplideSlide style="width: 100%" class="carousel-height-limit">
                    <img class="carousel-height-limit carousel-img-sizing"
                      src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919239_1000.jpg"
                      alt="Sample 1" />
                  </SplideSlide>
                </SplideTrack>
              </Splide>
            </div>
          </div>
        </div>
      </div>
      <div class="product-right container-size-padding mobile-padding">
        <div class="product-header hide-mobile">
          <div class="product-title font-weight-bold" style="line-height: 1.3; text-transform: uppercase !important">
            {{ product.name }}
          </div>
          <div class="product-price mt-2">
            <div class="final-price font-weight-regular">{{ formatPrice(product.price) }}</div>
            <div class="gross-price font-weight-light" style="margin-top: 2.5px">
              <s>{{ formatPrice(product.grossPrice) }}</s>
            </div>
          </div>
        </div>
        <div class="product-checkout">
          <div class="">
            <div class="product-amount d-flex flex-column">
              <div class="text-subtitle-2 font-weight-regular mt-2" style="opacity: 0.6;">
                {{ product.shortDescription }}
              </div>
              <div class="text-body-2 font-weight-light mb-2 mt-7">Quantidade</div>
              <div class="d-flex" style="
                  border: 1px solid #111111;
                  border-radius: 3px;
                  height: 44px;
                  width: fit-content;
                ">
                <v-btn class="h-100 px-0" elevation="0" @click="amount--" :ripple="false" style="min-width: 45px">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>

                <div class="d-flex justify-center align-center h-100" style="width: 50px">
                  <div>
                    {{ amount }}
                  </div>
                </div>

                <v-btn class="h-100 px-0" elevation="0" @click="amount++" width="45px" :ripple="false"
                  style="min-width: 45px">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>

            <div>
              <v-btn class="font-weight-regular button-color button-light mt-4" height="45px" width="100%"
                variant="flat" :ripple="false">
                ADICIONAR AO CARRINHO
              </v-btn>
            </div>
          </div>
        </div>


        <div class="product-details-list mt-5">
          <v-divider color="#111111"></v-divider>

          <v-list class="frete-ratio" v-model:opened="open" open-strategy="single" eager>
            <v-list-group value="details">
              <template v-slot:activator="{ isOpen, props }">
                <v-list-item :ripple="false" v-bind="props">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <div class="d-flex align-center font-weight-medium py-2 text-overline" style="font-size: 1rem;
                            -webkit-user-select: none; 
                            -ms-user-select: none; 
                             user-select: none;">
                        Mais Detalhes do Produto
                      </div>
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item>
                <div
                  class="w-100 h-100 d-flex flex-column text-center py-1 text-subtitle-2 font-weight-regular text-start"
                  style="opacity: 0.6;">
                  <div class="pr-1">
                    {{ product.longDescription }}
                  </div>

                  <!-- <ul class="px-4 mt-4 mb-2" style=" list-style-type: square !important;">
                    <li>Metal com acabamento dourado</li>
                    <li>Cordão em couro de vitelo marrom</li>
                    <li>Assinaturas LV Initials e Flores do Monogram</li>
                  </ul> -->
                </div>
              </v-list-item>
            </v-list-group>
          </v-list>

          <v-divider color="#111111"></v-divider>
        </div>
      </div>
    </div>

    <div class="container-size-padding">
      <div v-for="section in product.sections" class="showcase">
        <div class="left-side d-flex flex-column align-center justify-center" style="flex: 7;">
          <div class="wrapper">
            <div class="font-weight-bold mb-4" style="font-size: 1.6rem; max-width: 580px;">
              {{ section.title }}
            </div>
            <div class="right-side" style="opacity: 0.6; padding-left: 2px;">
              {{ section.subtitle }}
            </div>
          </div>
        </div>

        <div class="d-flex align-center justify-center" style="flex: 5;">
          <div style="width: 100%; height: 600px;">
            <img style="width: 100%; height: 100%; object-fit: cover;" :src="section.image" />
          </div>
        </div>
      </div>

      <v-divider color="#111111"></v-divider>

      <div class="youmaylike flex-column">
        <div v-if="recommendedProducts.length > 0"
          class="d-flex text-h6 font-weight-medium justify-center text-overline mt-5 mb-1"
          style="font-size: .9rem !important;">
          Você também pode gostar
        </div>

        <div class="img-container d-flex" style="gap: 15px;">
          <div v-for="recomendedProduct in recommendedProducts.slice(0, 2)" class="d-flex" style="gap: 15px; flex: 1;">
            <div @click="handleRecommendedProductClick(recomendedProduct.id)" class="product-card d-flex flex-column"
              elevation="0" style="flex: 1;">
              <div class="product-card-top">
                <img :src="recomendedProduct.displayImage" alt="" />
              </div>

              <div class="product-card-bottom">
                <div class="font-weight-bold">{{ recomendedProduct.name }}</div>
                <p class="text-subtitle-2 font-weight-light" style="margin-bottom: 1px">
                  {{ recomendedProduct.displayDescription }}
                </p>
                <div class="product-card-price d-flex">
                  <div class="text-subtitle-2 font-weight-regular">{{ formatPrice(recomendedProduct.price) }}</div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="recommendedProducts.length > 0" v-for="recomendedProduct in recommendedProducts.slice(2, 4)"
            class="d-flex" style="gap: 15px; flex: 1;">
            <div @click="handleRecommendedProductClick(recomendedProduct.productId)"
              class="product-card d-flex flex-column" elevation="0" style="flex: 1;">
              <div class="product-card-top">
                <img :src="recomendedProduct.displayImage" alt="" />
              </div>

              <div class="product-card-bottom">
                <div class="font-weight-bold">{{ recomendedProduct.name }}</div>
                <p class="text-subtitle-2 font-weight-light" style="margin-bottom: 1px">
                  {{ recomendedProduct.displayDescription }}
                </p>
                <div class="product-card-price d-flex">
                  <div class="text-subtitle-2 font-weight-regular">{{ formatPrice(recomendedProduct.price) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

import formatPrice from "@/utils/formatPrice";

import { getProduct, getRecomendedProducts/* , duplicateDocument  */} from "@/data/product.js"

const route = useRoute();
const router = useRouter();

const amount = ref(0);
const open = ref([]);

// const product = ref({
//   discount: 10,
//   displayImage: "",
//   images: [
//     "https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919233_1000.jpg", 
//     "https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919239_1000.jpg", 
//     "https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919239_1000.jpg" , 
//     "https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919164_1000.jpg"],
//   longDescription: "Com detalhes refinados e um design exclusivo, a pulseira LV Bloom é um modelo icônico e marcante. O fino cordão em couro de vitelo é decorado com dois emblemas clássicos da Maison: as LV Initials e uma Flor do Monogram, elaboradas em metal brilhante com acabamento dourado. Um fecho inovador permite que essa pulseira se ajuste perfeitamente em qualquer pulso. Metal com acabamento dourado Cordão em couro de vitelo marrom Assinaturas LV Initials e Flores do Monogram",
//   name: "aaa",
//   price: 10.9,
//   grossPrice: 24.9,
//   sections: [{
//     image: "https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919233_1000.jpg",
//     positon: "left",
//     sectionPosition: 1,
//     subtitle: "Camiseta anti odor com ação antibacteriana, de rápida absorção e evaporação do suor, regulando a temperatura corporal.",
//     title: "FUNCIONALIDADES DO FUTURO"
//   }],
//   shortDescription: "Verde, jacquard, fechamento frontal por botão e zíper, cordão de ajuste no cós, comprimento cropped, modelagem cenoura e cinco bolsos. Ao comprar este item unissex, considere que sua grade de tamanhos é masculina.",
//   stock: 1
// });

const product = ref({
  discount: 0,
  displayImage: "",
  images: [],
  longDescription: "",
  name: "",
  price: 0,
  grossPrice: 0,
  sections: [],
  shortDescription: "",
  stock: 0
});

const recommendedProducts = ref([]);

const handleRecommendedProductClick = (productId) => {
  router.push({
    name: "Product",
    params: {
      productId,
    },
  });
}

watch(amount, () => {
  if (amount.value < 0) {
    amount.value = 0;
  }

  if (amount.value > 10) {
    amount.value = 10;
  }
});

watch(() => route.params.productId, (newVal) => {
  if (newVal != undefined) {
    router.go(0);
  }
});

onBeforeMount(async () => {
  const productId = route.params.productId;

  product.value = await getProduct(productId);
  recommendedProducts.value = await getRecomendedProducts(productId);

  // await duplicateDocument();
});
</script>

<style lang="scss">
.product-view {
  height: 100%;
  width: 100%;
  padding-top: 40px;
  padding-bottom: 40px;

  .product-main {
    display: flex;
    justify-content: center;
    width: 100%;

    .product-header {
      display: flex;
      flex-direction: column;
      padding-top: 40px;

      .product-title {
        font-size: 1.6rem;
      }

      .product-price {
        display: flex;
        align-items: center;
        gap: 8px;

        .final-price {
          font-size: 1.1rem;
        }

        .gross-price {
          font-size: 1rem;
        }
      }
    }

    .product-left {
      width: 60%;
      display: flex;
      justify-content: center;

      .product-images {
        margin-right: 1.8rem;
        height: 100%;
        width: 100%;

        .product-images-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-gap: 14px;
          width: 100%;

          .product-img {
            height: auto;
            max-width: 100%;
            grid-column: span 6;
          }
        }

        .product-images-slide {
          .carousel-height-limit {
            height: 500px !important;
          }

          .carousel-img-sizing {
            width: 100%;
            object-fit: cover;
            object-position: center center;
          }
        }
      }
    }

    .product-right {
      width: 40%;

      .product-checkout {
        .small-desc {
          font-size: 0.9rem;
          margin-top: 16px;
        }
      }
    }
  }

  .v-list-item {
    padding-right: 5px !important;
    padding-left: 5px !important;
  }

  .v-list-item--active:hover {
    opacity: 1 !important;
  }

  .v-list-item__overlay {
    opacity: 0 !important;
  }

  /*   .v-selection-control__input {
    transform: translateX(-1.8px);
  } */

  .v-list-item {
    padding: 0 !important;
  }

  .showcase {
    display: flex;
    margin: 0 auto;
    text-align: start;
    margin: 80px 0 80px;

    .left-side {
      border-left: 3px #111111 solid;

      .wrapper {
        max-width: 450px;
      }
    }

    .right-side {}
  }

  .youmaylike {
    display: flex;
    align-items: center;
    gap: 15px;

    .product-card {
      cursor: pointer;
      width: calc(33.33333% - 14px);
      max-width: 306px !important;

      .product-card-top {
        width: 100%;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .product-card-bottom {
        flex-shrink: 0;
        justify-content: center;
        padding: 12px 0;
      }
    }
  }

  @media (max-width: $tablet) {
    padding-top: 15px;
    padding-bottom: 45px;

    .product-main {
      flex-direction: column;

      .product-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-top: 0;
        padding-bottom: 12px;

        .product-title {
          padding-right: 43px;
          font-size: 1.1rem;
        }

        .product-price {
          flex-direction: column;
          align-items: end;
          gap: 0;

          .final-price {
            margin: 0 !important;
          }
        }
      }

      .product-left {
        flex-direction: column;
        width: 100%;
      }

      .product-right {
        width: 100%;

        .product-checkout {
          display: flex;
          flex-direction: column-reverse !important;
          margin: 10px 0 26px !important;

          .small-desc {
            margin-top: 0 !important;
            margin-bottom: 15px !important;
          }
        }
      }
    }

    .showcase {
      flex-direction: column;
      text-align: center;
      margin: 33px 0 38px;

      .left-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-left: none;

        .wrapper {
          max-width: none;
          display: flex;
          flex-direction: column;
          align-items: center;

          margin-bottom: 30px;
        }
      }

      .right-side {}
    }

    .youmaylike {
      .img-container {
        flex-direction: column !important;
      }
    }
  }
}
</style>
