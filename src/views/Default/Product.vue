<template>
  <div class="product-view container-limit container-size-padding">
    <div class="product-main">
      <div class="product-left">
        <div class="product-images h-100 w-100">
          <div class="product-images-grid w-100">
            <img
              class="product-img"
              src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919233_1000.jpg"
            />
            <img
              class="product-img"
              src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919239_1000.jpg"
            />
            <img
              class="product-img"
              src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919239_1000.jpg"
            />
            <img
              class="product-img"
              src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919164_1000.jpg"
            />
          </div>
          <!--  <div class="product-preview-container d-flex">
                <div class="product-preview-img selected-preview-img">
              <img
                src="//tatuapeconceito.cdn.plataformaneo.com.br/produtograde/20231211173403_3685996315_G.webp"
              />
            </div>
            <div v-for="preview in previewImages" class="product-preview-img">
              <img :src="preview" />
            </div>
          </div> -->
        </div>
      </div>
      <div class="product-right">
        <div class="product-header pt-10">
          <div
            class="product-title font-weight-bold"
            style="
              font-size: 26px;
              line-height: 1.3;
              text-transform: uppercase !important;
            "
          >
            Camiseta Mangas Curtas Com Estampa Medusa
          </div>
          <div class="product-price mt-1">
            <div class="d-flex align-center">
              <div class="text-h6 mr-4 font-weight-regular">R$24.90</div>
              <div
                class="text-body-1 font-weight-light"
                style="margin-top: 2px"
              >
                <s>R$32</s>
              </div>
            </div>
          </div>
        </div>
        <!--    <div class="product-filter d-flex align-center">v</div> -->
        <div class="product-checkout mt-4">
          <div class="product-amount d-flex flex-column">
            <div class="text-body-2 font-weight-light mb-2">Quantidade</div>
            <div
              class="d-flex"
              style="
                border: 1px solid #111111;
                border-radius: 3px;
                height: 44px;
                width: fit-content;
              "
            >
              <v-btn
                class="h-100 px-0"
                elevation="0"
                @click="amount--"
                :ripple="false"
                style="min-width: 45px"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              <div
                class="d-flex justify-center align-center h-100"
                style="width: 50px"
              >
                <div>
                  {{ amount }}
                </div>
              </div>

              <v-btn
                class="h-100 px-0"
                elevation="0"
                @click="amount++"
                width="45px"
                :ripple="false"
                style="min-width: 45px"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>

          <div>
            <v-btn
              class="font-weight-regular button-color button-black mt-3"
              height="45px"
              width="100%"
              variant="flat"
              :ripple="false"
            >
              ADICIONAR AO CARRINHO
            </v-btn>
          </div>

          <div class="mt-7" style="font-size: 14.6667px">
            Verde, jacquard, fechamento frontal por botão e zíper, cordão de
            ajuste no cós, comprimento cropped, modelagem cenoura e cinco
            bolsos. Ao comprar este item unissex, considere que sua grade de
            tamanhos é masculina.
          </div>
        </div>
      </div>
    </div>
    <div class="product-details mt-10">
      <v-list class="w-100">
        <v-list-group value="details">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Detalhes do Produto"
              :ripple="false"
            ></v-list-item>
          </template>

          <v-list-item
            title="Verde, jacquard, fechamento frontal por botão e zíper, cordão de ajuste
            no cós, comprimento cropped, modelagem cenoura e cinco bolsos. Ao
            comprar este item unissex, considere que sua grade de tamanhos é
            masculina."
          ></v-list-item>
        </v-list-group>

        <v-list-group value="measurements">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Medidas"
              :ripple="false"
            ></v-list-item>
          </template>

          <v-list-item class="px-0">
            <div
              class="w-100 h-100 d-flex"
              style="height: 578.983px !important"
            >
              <div>
                Verde, jacquard, fechamento frontal por botão e zíper, cordão de
                ajuste no cós, comprimento cropped, modelagem cenoura e cinco
                bolsos. Ao comprar este item unissex, considere que sua grade de
                tamanhos é masculina.
              </div>

              <div class="product-details-img">
                <img
                  class="h-100"
                  style="object-fit: contain"
                  src="https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919164_1000.jpg"
                />
              </div>
            </div>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!--  <div>
        Verde, jacquard, fechamento frontal por botão e zíper, cordão de ajuste
        no cós, comprimento cropped, modelagem cenoura e cinco bolsos. Ao
        comprar este item unissex, considere que sua grade de tamanhos é
        masculina.
      </div>
      <div class="product-details-img">
        <img
          src="https://tatuapeconceito.cdn.plataformaneo.com.br/produtograde/multifotos/20231211173404_9218990782_G.webp"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const productId = computed(() => route.params.produtoId);

const amount = ref(0);
const previewImages = ref([
  "https://tatuapeconceito.cdn.plataformaneo.com.br/produtograde/multifotos/20231211173403_9648990352_G.webp",
  "https://tatuapeconceito.cdn.plataformaneo.com.br/produtograde/multifotos/20231211173404_9218990782_G.webp",
]);

watch(amount, () => {
  if (amount.value < 0) {
    amount.value = 0;
  }

  if (amount.value > 10) {
    amount.value = 10;
  }
});

onMounted(() => {});
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

    .product-left {
      width: 60% !important;
      display: flex;
      justify-content: center;

      .product-images {
        margin-right: 1.8rem;

        .product-images-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-gap: 14px;

          .product-img {
            height: auto;
            max-width: 100%;
            grid-column: span 6;
          }
        }

        .product-preview-container {
          height: 150px;
          display: flex;
          justify-content: center;

          .product-preview-img {
            height: 100%;
            cursor: pointer;
            opacity: 0.4;
            margin: 0 10px;

            img {
              height: 100%;
              object-fit: contain;
            }

            &.selected-preview-img {
              opacity: 1 !important;
              border: 1px solid #111111;
            }
          }
        }
      }
    }

    .product-right {
      width: 40% !important;
    }

    @media (max-width: $tablet) {
      flex-direction: column-reverse;
    }
  }

  .product-price {
    display: flex;
    align-items: end;
    gap: 10px;
  }

  .product-filter {
    width: 300px;
    height: 300px;
  }
}
</style>
