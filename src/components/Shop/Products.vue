<template>
  <div class="w-100">
    <v-data-iterator v-model:items-per-page="itemsPerPage" :items="filteredProducts" :items-per-page="itemsPerPage"
      :page.sync="page" :footer-props="footerProps">
      <template v-slot:default="{ items }">
        <div class="products-container"> ´
          <div v-for="p in items" class="product-card d-flex flex-column" elevation="0"
            @click="handleProductClick(p.value)">
            <div class="product-card-top">
              <img :src="p.raw.displayImage" alt="" />
            </div>

            <div class="product-card-bottom">
              <div class="font-weight-bold">{{ p.raw.name }}</div>
              <p class="text-subtitle-2 font-weight-light" style="margin-bottom: 1px">
                {{ p.raw.displayDescription }}
              </p>
              <div class="product-card-price">
                <div class="text-subtitle-2 font-weight-regular"> {{ p.raw.price }} </div>
                <div class="text-caption price-cents">99</div>
              </div>
            </div>
          </div>
        </div>

        <!--    <v-row>
          <v-col v-for="item in items" :key="item.raw.id" cols="12" md="4">
            <v-card>
              <v-card-title>{{ item.raw.name }}</v-card-title>
              <v-card-subtitle>{{ item.raw.displayDescription }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row> -->
      </template>

      <template v-slot:footer>
        <v-pagination v-model="page" :length="paginationLength" />
        <!-- <v-select v-model="itemsPerPage" :items="[5, 10, 15, 20]" label="Items per page" dense hide-details /> -->
      </template>
    </v-data-iterator>

    <!--  <v-data-iterator :items="items" :itemsPerPage="itemsPerPage">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
          <v-card v-bind="item.raw"> </v-card>

          <br>
        </template>
      </template>

      <template v-slot:footer>
        <v-pagination v-model="page"  />
      </template>
    </v-data-iterator> -->

    <!-- <div class="products-container">
      <div v-for="p in products" class="product-card d-flex flex-column" elevation="0"
        @click="handleProductClick(p.id)">
        <div class="product-card-top">
          <img :src="p.displayImage" alt="" />
        </div>

        <div class="product-card-bottom">
          <div class="font-weight-bold">{{ p.name }}</div>
          <p class="text-subtitle-2 font-weight-light" style="margin-bottom: 1px">
            {{ p.displayDescription }}
          </p>
          <div class="product-card-price">
            <div class="text-subtitle-2 font-weight-regular"> {{ p.price }} </div>
            <div class="text-caption price-cents">99</div>
          </div>
        </div>
      </div>
    </div> -->

    <!--  <v-data-iterator :items="products" :items-per-page="itemsPerPage">
      <template v-slot:default="{ items }">
        <div class="w-100 d-flex flex-column" style="gap: 20px;">
          <div v-for="p in items" class="product-item w-100 d-flex flex-column">
            xxxx
          </div>
        </div>
      </template>

<template v-if="products.length > itemsPerPage" v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn :disabled="page === 1" icon="mdi-arrow-left" density="comfortable" variant="tonal" rounded
            @click="prevPage"></v-btn>

          <div class="mx-2 text-caption">
            Página {{ page }} de {{ pageCount }}
          </div>

          <v-btn :disabled="page >= pageCount" icon="mdi-arrow-right" density="comfortable" variant="tonal" rounded
            @click="nextPage"></v-btn>
        </div>
      </template>
</v-data-iterator> -->


  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  products: Array,
  activeFilters: Object
});

const router = useRouter();

const handleProductClick = (productId) => {
  router.push({ name: "Product", params: { produtoId: productId } });
};

/* -------------------------- */

const itemsPerPage = ref(6);
const page = ref(1);
const paginationLength = ref(1);

const footerProps = computed(() => ({
  'items-per-page-options': [5, 10, 15, 20],
  'items-per-page-text': 'Items per page',
}));


const filteredProducts = ref([])

const updatePaginationLength = () => {
  paginationLength.value = Math.ceil(filteredProducts.value.length / itemsPerPage.value);
};

watch([itemsPerPage, page], updatePaginationLength);

/* const filterProductsByPrice = () => {

};
 */
/* const filterProductsByCategory = () => {

}; */

const handleFilteredProducts = () => {
  if (props.activeFilters.length) {
    props.activeFilters.forEach(activeFilter => {
      if (activeFilter.section == 'Preço') {
        filteredProducts.value = props.products.slice().sort((a, b) => {
          if (activeFilter.filter === "M") {
            return a.price - b.price;
          } else if (activeFilter.filter === "a") {
            return b.price - a.price;
          }

          return 0;
        });
      }

      else if (activeFilter.filter == 'Categoria') {

      }
    })
  }
  else {
    filteredProducts.value = props.products;
  }
}

watch(() => props.activeFilters, handleFilteredProducts);

watch(() => props.products, () => filteredProducts.value.length == 0 ? filteredProducts.value = props.products : []);

/* onMounted(() => {
  filteredProducts.value = props.products;
  updatePaginationLength();
}); */
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
}
</style>
