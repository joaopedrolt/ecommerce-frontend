<template>
  <div class="product-view container-limit container-size-padding">

    <div class="product-main">
      <div class="product-left">
        <div class="product-header hide-desktop">
          <div class="product-title font-weight-bold" style="line-height: 1.3; text-transform: uppercase !important">
            Camiseta Mangas Curtas Com Estampa Medusa
          </div>
          <div class="product-price mt-1">
            <div class="main-price font-weight-regular">R$24.90</div>
            <div class="old-price font-weight-light" style="margin-top: 2.5px">
              <s>R$32</s>
            </div>
          </div>
        </div>
        <div class="product-images">
          <div class="product-images-grid hide-mobile">
            <img class="product-img"
              src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919233_1000.jpg" />
            <img class="product-img"
              src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919239_1000.jpg" />
            <img class="product-img"
              src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919239_1000.jpg" />
            <img class="product-img"
              src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919164_1000.jpg" />
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
      <div class="product-right">
        <div class="product-header hide-mobile">
          <div class="product-title font-weight-bold" style="line-height: 1.3; text-transform: uppercase !important">
            Camiseta Mangas Curtas Com Estampa Medusa
          </div>
          <div class="product-price mt-1">
            <div class="main-price font-weight-regular">R$24.90</div>
            <div class="old-price font-weight-light" style="margin-top: 2.5px">
              <s>R$32</s>
            </div>
          </div>
        </div>
        <div class="product-checkout mt-4">
          <div class="">
            <div class="product-amount d-flex flex-column">
              <div class="text-body-2 font-weight-light mb-2">Quantidade</div>
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
              <v-btn class="font-weight-regular button-color button-black mt-3" height="45px" width="100%" variant="flat"
                :ripple="false">
                ADICIONAR AO CARRINHO
              </v-btn>
            </div>
          </div>

          <div class="small-desc" style="opacity: 0.6;">
            Verde, jacquard, fechamento frontal por botão e zíper, cordão de
            ajuste no cós, comprimento cropped, modelagem cenoura e cinco
            bolsos. Ao comprar este item unissex, considere que sua grade de
            tamanhos é masculina.
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex mx-auto" style="margin-top: 50px;">

      <div class="d-flex flex-column align-center justify-center" style="flex: 1;">

        <div class="mt-7">
          <div class="text-h5 font-weight-bold text-start">
            FUNCIONALIDADES DO FUTURO
          </div>
          <div class="text-start" style="opacity: 0.6; max-width: 400px;">
            Camiseta anti odor com ação antibacteriana, de rápida absorção e evaporação do suor, regulando a temperatura
            corporal.
          </div>
        </div>

      </div>

      <div class="d-flex align-center justify-center" style="flex: 1;">
        <div style="width: 100%; height: 600px;">
          <img style="width: 100%; height: 100%; object-fit: contain;"
            src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919239_1000.jpg" />
        </div>
      </div>

    </div>

    <div class="product-details-list">
      <v-list class="w-100">
        <v-list-group value="details">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Mais detalhes do produto"></v-list-item>
          </template>

          <v-list-item title="
          Detalhes do produto

          Trazer um acabamento feminino a produções casuais ficou fácil com o colar Louisette. Esta delicada peça apresenta a icônica Monogram Flower da Maison elegantemente presa a uma corrente fina ajustável. O colar pode ser usado sozinho ou com outros de diversas linhas da Louis Vuitton para criar um look impactante.

              Comprimento: ~16,5 polegadas / 42 cm ajustável para ~18,5 polegadas / 47 cm
              Metal com acabamento dourado
              Pingente de Monogram Flower
              Charms LV Circle
              Gravado com LV Initials
              Assinatura Louis Vuitton gravada
              Fecho metálico

          "></v-list-item>
        </v-list-group>

        <v-list-group value="measurements">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Medidas"></v-list-item>
          </template>

          <v-list-item class="px-0">
            <div class="w-100 h-100 d-flex" style="height: 578.983px !important">
              <div>
                Verde, jacquard, fechamento frontal por botão e zíper, cordão de
                ajuste no cós, comprimento cropped, modelagem cenoura e cinco
                bolsos. Ao comprar este item unissex, considere que sua grade de
                tamanhos é masculina.
              </div>

              <div class="product-details-img">
                <img class="h-100" style="object-fit: contain"
                  src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919164_1000.jpg" />
              </div>
            </div>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

const route = useRoute();
const productId = computed(() => route.params.produtoId);

const amount = ref(0);

watch(amount, () => {
  if (amount.value < 0) {
    amount.value = 0;
  }

  if (amount.value > 10) {
    amount.value = 10;
  }
});

onMounted(() => { });
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

        .main-price {
          font-size: 1.1rem;
        }

        .old-price {
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

  .product-details-list {
    margin-top: 22px;
  }

  .v-list-item {
    padding-right: 5px !important;
    padding-left: 5px !important;
  }

  .v-list-item--active:hover {
    opacity: 1 !important;
  }

  @media (max-width: $tablet) {
    padding-top: 15px;
    padding-bottom: 15px;

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

          .main-price {
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

          .small-desc {
            margin-top: 0 !important;
            margin-bottom: 15px !important;
          }
        }
      }
    }
  }
}
</style>
