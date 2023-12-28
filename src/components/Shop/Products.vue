<template>
  <div class="w-100">
    <div class="products-container">
      <v-card v-for="i in i" class="product-card d-flex flex-column" elevation="0">
        <div class="product-card-top">
          <img src="https://www.insiderstore.com.br/cdn/shop/files/kit666.jpg?v=1700881546&width=533" alt="" />
        </div>

        <div class="product-card-bottom">
          <div class="font-weight-bold">Macbook Air Pro</div>
          <p class="text-subtitle-2 font-weight-light" style="margin-bottom: 1px">
            Some small description for the product
          </p>
          <div class="product-card-price d-flex">
            <div class="text-subtitle-2 font-weight-regular">R$589</div>
            <!--             <div class="text-caption price-cents">99</div> -->
          </div>
        </div>
      </v-card>

      <v-card v-for="i in i" class="product-card d-flex flex-column" elevation="0">
        <div class="product-card-top">
          <img src="https://www.insiderstore.com.br/cdn/shop/files/kit666.jpg?v=1700881546&width=533" alt="" />
        </div>

        <div class="product-card-bottom">
          <div class="font-weight-bold">Macbook Air Pro</div>
          <p class="text-subtitle-2 font-weight-light" style="margin-bottom: 1px">
            Some small description for the product
          </p>
          <div class="product-card-price d-flex">
            <div class="text-subtitle-2 font-weight-regular">R$589</div>
            <!--             <div class="text-caption price-cents">99</div> -->
          </div>
        </div>
      </v-card>

      <v-card v-for="i in i" class="product-card d-flex flex-column" elevation="0">
        <div class="product-card-top">
          <img src="https://www.insiderstore.com.br/cdn/shop/files/kit666.jpg?v=1700881546&width=533" alt="" />
        </div>

        <div class="product-card-bottom">
          <div class="font-weight-bold">Macbook Air Pro</div>
          <p class="text-subtitle-2 font-weight-light" style="margin-bottom: 1px">
            Some small description for the product
          </p>
          <div class="product-card-price d-flex">
            <div class="text-subtitle-2 font-weight-regular">R$589</div>
            <!--             <div class="text-caption price-cents">99</div> -->
          </div>
        </div>
      </v-card>

      <v-card v-for="i in i" class="product-card d-flex flex-column" elevation="0">
        <div class="product-card-top">
          <img src="https://www.insiderstore.com.br/cdn/shop/files/faxinaplus444.jpg?v=1700881557&width=533" alt="" />
        </div>
        <div class="product-card-bottom">
          <div class="font-weight-bold">Macbook Air Pro</div>
          <p class="text-subtitle-2 font-weight-light" style="margin-bottom: 1px">
            Some small description for the product
          </p>
          <div class="product-card-price d-flex">
            <div class="text-subtitle-2 font-weight-regular">R$589.99</div>
            <!--      <div class="text-caption price-cents">99</div> -->
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const i = ref([``]);
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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .product-card {
    cursor: pointer;
    width: calc(33.33333% - 14px);

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

  @media (max-width: $tablet) {
    .product-card {
      width: calc(50% - 10px);
    }
  }

  @media (max-width: $phone) {
    .product-card {
      width: 100%;
    }
  }
}
</style>
