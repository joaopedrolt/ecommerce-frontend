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
      <v-btn @click="hideNavigationDrawer()" class="d-flex h-100 align-top" elevation="0" icon :ripple="false"
        style="height: 30px !important; width:30px;">
        <v-icon size="small">mdi-close</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>

    <template v-if="isCartEmpty">
      <div class="empty-cart-container w-100 d-flex justify-center align-center">
        <div class="d-flex flex-column">
          <div class="text-center mb-4">
            O seu carrinho ainda está vazio.
            <br />
            Aceita algumas sugestões?
          </div>
          <v-btn class="text-subtitle-1 font-weight-regular button-color button-black" color="#111111" height="45px"
            width="100%" variant="flat" :ripple="false">
            Voltar a loja
          </v-btn>
        </div>
      </div>
    </template>

    <template v-else>
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

                    <div class="counter-component mt-1" style="
                      border: 1px solid #111111;
                      border-radius: 3px;
                      height: 44px;
                      width: fit-content;">
                      <v-btn class="button-plus-minus" elevation="0" @click="updateProductQuantity(p, 'subtraction')"
                        :ripple="false">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>

                      <div class="counter-input" style="font-size: 0.8rem;">
                        <div>
                          {{ p.quantity }}
                        </div>
                      </div>

                      <v-btn class="button-plus-minus" elevation="0" @click="updateProductQuantity(p, 'sum')"
                        :ripple="false">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div>
                    <v-btn class="d-flex h-100 align-top" elevation="0" icon :ripple="false"
                      style="height: 30px !important; width:30px;">
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
            <div class="text-subtitle-1">R$ 399.00</div>
          </div>

          <v-btn @click="handleCheckout" class="text-subtitle-2 font-weight-regular button-color button-black"
            color="#111111" height="45px" width="100%" variant="flat" :ripple="false">
            FINALIZAR A COMPRA
          </v-btn>
        </div>
      </div>
    </template>

  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import { useDrawerStore } from "@/store/store.js";
import { storeToRefs } from "pinia";
import formatPrice from "@/utils/formatPrice";
import { useRouter } from "vue-router";

const drawerStore = useDrawerStore();
const { displayCartDrawer } = storeToRefs(drawerStore);

const open = ref([]);
const isCartEmpty = ref(false);
const quantity = ref(0);

const router = useRouter();

const updateProductQuantity = (product, operation) => {
  if (operation == 'sum') {
    if (product.quantity < 10)
      product.quantity++;
  }

  if (operation == 'subtraction') {
    if (product.quantity > 0) product.quantity--;
  }
}

watch(displayCartDrawer, (newValue) => {
  const htmlElement = document.getElementsByTagName("html");

  if (!newValue) {
    open.value = [];
    htmlElement[0].style.overflow = "";
  } else {
    htmlElement[0].style.overflow = "hidden";
  }
});

const hideNavigationDrawer = () => {
  displayCartDrawer.value = false;
};

const handleCheckout = async () => {
  await router.push({
    name: "Checkout"
  });
  router.go(0);
}

const products = reactive([
  {
    image: "https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919233_1000.jpg",
    title: "Calça Wide Leg",
    price: 399.00,
    quantity: 0
  },
  {
    image: "https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919233_1000.jpg",
    title: "Calça Wide Leg",
    price: 399.00,
    quantity: 0
  },
  {
    image: "https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919233_1000.jpg",
    title: "Calça Wide Leg",
    price: 399.00,
    quantity: 0
  },
  {
    image: "https://cdn-images.farfetch-contents.com/22/17/13/25/22171325_51919233_1000.jpg",
    title: "Calça Wide Leg",
    price: 399.00,
    quantity: 0
  },
]);
</script>

<style lang="scss">
@import "@/styles/global.scss";

.empty-cart-container {
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
