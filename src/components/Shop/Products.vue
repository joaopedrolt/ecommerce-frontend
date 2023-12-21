<template>
  <div class="w-100">
    <div
      class="products-container"
      :class="i.length > 2 ? 'container-grid' : 'container-flex'"
    >
      <v-card
        v-for="i in i"
        class="product-card d-flex flex-column"
        elevation="0"
      >
        <img
          src="https://http2.mlstatic.com/D_Q_NP_2X_919127-MLA54983207567_052023-T.webp"
          alt=""
        />
        <div class="product-card-bottom">
          <div class="text-subtitle-1 font-weight-medium">Macbook Air Pro</div>
          <div class="product-card-price d-flex">
            <div class="text-subtitle-2 font-weight-regular">R$589</div>
            <div class="text-caption price-cents">99</div>
          </div>
        </div>
      </v-card>
      <v-card
        v-for="i in i"
        class="product-card d-flex flex-column"
        elevation="0"
      >
        <img
          src="https://down-br.img.susercontent.com/file/br-11134207-7r98o-lnlsez95d8encb_tn"
          alt=""
        />
        <div class="product-card-bottom">
          <div class="text-subtitle-1 font-weight-medium">Macbook Air Pro</div>
          <div class="product-card-price d-flex">
            <div class="text-subtitle-2 font-weight-regular">R$589</div>
            <div class="text-caption price-cents">99</div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const i = ref([``, ``, ``, ``]);
const searchInputValue = ref("");

const search = () => {
  console.log("pesquisou");
};
</script>

<style lang="scss">
@import "@/styles/global.scss";

.products-search-container {
  .search-input-wrapper {
    width: 60%;

    @media (max-width: $tablet) {
      width: 100%;
    }
  }
}

.products-container {
  .product-card {
    cursor: pointer;
    max-width: 302px;
    max-height: 374px;
    border: $border-small-line;
    border-radius: 10px;
    flex: 1;

    .product-card-bottom {
      flex-shrink: 0;
      justify-content: center;
      border-top: $border-small-line;
      padding: 10px 20px;
    }
  }

  &.container-grid {
    @include grid(200px);
  }

  &.container-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
}
</style>
