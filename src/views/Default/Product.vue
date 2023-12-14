<template>
  <div class="product-view container-limit">
    <div class="d-flex justify-center h-100 w-100" style="padding-top: 36px">
      <div class="product-left">
        <div class="product-imagens h-100 w-100">
          <div class="product-main-img h-100 w-100" style="max-height: 500px">
            <img
              style="object-fit: contain;"
              class="h-100 w-100"
              src="//tatuapeconceito.cdn.plataformaneo.com.br/produtograde/20231211173403_3685996315_G.webp"
            />
          </div>
        </div>
      </div>

      <div class="product-right">
        <div class="product-desc">
          <div class="text-h4">Kit 6 Tech T-Shirt</div>
          <div class="product-price mt-6">
            <div class="d-flex flex-column">
              <div>R$ 899</div>
              <div>Preço normal</div>
            </div>
            <div>R$ 954</div>
          </div>
        </div>
        <div class="product-filter">v</div>
        <div class="product-checkout mt-4">
          <div class="product-amount">
            <div>Quantidade:</div>
            <div class="d-flex">
              <v-btn density="compact" icon="mdi-plus" @click="amount--" />
              <div class="px-5">
                <div>
                  {{ amount }}
                </div>
              </div>
              <v-btn density="compact" icon="mdi-plus" @click="amount++" />
            </div>
          </div>
          <div class="product-amount mt-5">
            <v-btn>Adicionar ao carrinho</v-btn>
          </div>
        </div>
      </div>
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

  .product-left {
    width: 60% !important;
  }

  .product-right {
    width: 40% !important;
  }

  .product-left {
    display: flex;
    justify-content: center;
  }

  .product-right {
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
