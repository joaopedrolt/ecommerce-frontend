<template>
  <v-navigation-drawer scroll-strategy="block" v-model="displayCartDrawer" style="width: 500px;" fixed temporary
    location="right">
    <div class="pl-4 pr-3 drawer-header justify-space-between">
      <div class="d-flex align-center text-overline font-weight-regular">
        <v-icon class="mr-2">mdi-cart</v-icon>
        <div style="font-size: 0.85rem; margin-top: 2.5px;">
          Carrinho
        </div>
      </div>
      <v-btn @click="handleHideNavigationDrawer()" class="d-flex h-100 align-top" elevation="0" icon :ripple="false"
        style="height: 30px !important; width:30px;">
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </div>

    <v-divider></v-divider>

    <template v-if="!isCartEmpty && !loading">
      <div class="empty-cart-container justify-space-between flex-column w-100 d-flex">
        <div class="d-flex flex-column w-100 pl-3 pr-3 h-100" style="overflow-y: auto;">
          <div class="w-100 h-100">
            <div class="cart-products pt-4 pb-4 d-flex flex-column">
              <div v-for="p in products" class="cart-product d-flex" style="height: 122px;">
                <div style="width: 35%; border-radius: 15px; overflow: hidden;">
                  <img :src="p.image" style="height: 100%; width: 100%; object-fit: cover;" />
                </div>

                <div class="d-flex align-center justify-space-between ml-4 w-100 pb-1">
                  <div class="d-flex flex-column">

                    <div class="font-weight-bold text-subtitle-1">{{ p.title }}</div>
                    <div class="text-subtitle-2 font-weight-regular">{{ formatPrice(p.price) }}</div>

                    <div class="d-flex justify-center counter-component mt-1" style="
                      border: 1px solid #111111;
                      border-radius: 3px;
                      height: 44px;
                      width: fit-content;
                      min-width: 87px;">
                      <v-btn class="button-plus-minus" elevation="0"
                        @click="handleUpdateProductQuantity(p.id, 'subtraction')"
                        v-if="!loadingProductQuantity.loading || (loadingProductQuantity.loading && loadingProductQuantity.productId != p.id)"
                        :ripple="false">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>

                      <div class="counter-input" style="font-size: 0.8rem; margin-bottom: 1.4px;">
                        <div
                          v-if="!loadingProductQuantity.loading || (loadingProductQuantity.loading && loadingProductQuantity.productId != p.id)">
                          {{ p.quantity }}
                        </div>
                        <v-progress-circular
                          v-else-if="loadingProductQuantity.loading && loadingProductQuantity.productId == p.id"
                          indeterminate :size="17" :width="2"></v-progress-circular>
                      </div>

                      <v-btn class="button-plus-minus" elevation="0" @click="handleUpdateProductQuantity(p.id, 'sum')"
                        v-if="!loadingProductQuantity.loading || (loadingProductQuantity.loading && loadingProductQuantity.productId != p.id)"
                        :ripple="false">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div>
                    <v-btn class="d-flex h-100 align-top" @click="handleRemoveProduct(p.id)" elevation="0" icon
                      :ripple="false" style="height: 30px !important; width:30px;">
                      <v-icon size="small">mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-checkout flex-column pb-4 px-4">
          <v-divider color="111111"></v-divider>
          <div class="w-100 d-flex justify-space-between px-1 pt-3 pb-3">
            <div class="text-subtitle-1">Total: </div>
            <div class="text-subtitle-1">{{ formatPrice(totalPrice) }}</div>
          </div>

          <v-btn @click="handleCheckout" class="text-subtitle-2 font-weight-regular button-color button-black"
            color="#111111" height="45px" width="100%" variant="flat" :ripple="false">
            FINALIZAR A COMPRA
          </v-btn>
        </div>
      </div>
    </template>

    <template v-if="isCartEmpty && !loading">
      <div class="centralized-cart-container w-100 d-flex justify-center align-center">
        <div class="d-flex flex-column align-center">
          <div class="">
            <v-icon class="mb-4" size="x-large">mdi-cart-plus</v-icon>
          </div>

          <div class="text-center mb-4">
            O seu carrinho ainda está vazio.
            <br />
            Aceita algumas sugestões?
          </div>
          <v-btn class="text-subtitle-1 font-weight-regular button-color button-light"
            @click="handleHideNavigationDrawer()" color="#111111" height="45px" width="100%" variant="flat"
            :ripple="false">
            Voltar a loja
          </v-btn>
        </div>
      </div>
    </template>

    <template v-if="loading">
      <div class="centralized-cart-container w-100 d-flex justify-center align-center">
        <circular-loading />
      </div>
    </template>

  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useDrawerStore, useAuthStore, useCartStore } from "@/store/store.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { getUserCart, getProductsDetails, updateCartProduct } from "@/data/cart"

import CircularLoading from "@/components/CircularLoading.vue";

import formatPrice from "@/utils/formatPrice";

const authStore = useAuthStore();
const drawerStore = useDrawerStore();
const cartStore = useCartStore();

const { displayCartDrawer } = storeToRefs(drawerStore);

const router = useRouter();

const loading = ref(false);
const loadingProductQuantity = ref({ productId: null, loading: false });

const userId = ref();
const cartMethod = ref();

const products = ref([]);
const isCartEmpty = computed(() => {
  return !(products.value && products.value.length > 0);
});

const totalPrice = computed(() =>
  products.value.length
    ? products.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
    : 0
);

const handleHideNavigationDrawer = () => {
  displayCartDrawer.value = false;
};

const handleCheckout = async () => {
  await router.push({
    name: "Checkout"
  });
  router.go(0);
};

const loadCart = async (userId, params) => {
  if (params.type == "general") {
    loading.value = true;

    if (cartMethod.value == 'online') {
      products.value = await getUserCart(userId);
    }
    else {
      const localCart = cartStore.getLocalCart();

      if (localCart) {
        products.value = await getProductsDetails(localCart);
      }
    }

    loading.value = false;
  }

  else if (params.type == "qtd") {
    loadingProductQuantity.value = { productId: params.productId, loading: true };

    if (cartMethod.value == 'online') {
      products.value = await getUserCart(userId);
    }
    else {
      const localCart = cartStore.getLocalCart();

      if (localCart) {
        products.value = await getProductsDetails(localCart);
      }
    }

    setTimeout(() => {
      loadingProductQuantity.value = { productId: null, loading: false } // Efect
    }, 100)
  }
};

const handleUpdateProductQuantity = async (productId, operation) => {
  var response;

  if (cartMethod.value == 'online') {
    response = await updateCartProduct(userId.value, productId, operation);
  }
  else {
    response = cartStore.updateCartProduct(productId, operation);
  }

  if (response) {
    await loadCart(userId.value, { type: "qtd", productId });
  }
};

const handleRemoveProduct = async (productId) => {
  var response;

  if (cartMethod.value == 'online') {
    response = await updateCartProduct(userId.value, productId, "remove");
  }
  else {
    response = cartStore.updateCartProduct(productId, "remove");
  }

  if (response) {
    await loadCart(userId.value, { type: "general" });
  }
};

watch(displayCartDrawer, async (newValue) => {
  const htmlElement = document.getElementsByTagName("html");

  if (!newValue) {
    htmlElement[0].style.overflow = "";
  } else {
    userId.value = authStore.getUserId();
    cartMethod.value = userId.value ? 'online' : 'local';

    await loadCart(userId.value, { type: "general" });

    htmlElement[0].style.overflow = "hidden";
  }
});
</script>

<style lang="scss">
@import "@/styles/global.scss";

.centralized-cart-container {
  height: calc(100% - 50px);
}

.cart-products {
  gap: 15px;
  overflow: auto;

  .cart-product {
    padding-bottom: 15px;
    border-bottom: 1px solid $color-border;

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
  }
}

.v-navigation-drawer__content {
  overflow-y: hidden !important;
}
</style>
