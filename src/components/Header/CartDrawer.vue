<template>
  <v-navigation-drawer scroll-strategy="block" v-model="displayCartDrawer" style="width: 500px;" fixed temporary
    location="right">
    <div class="pl-4 pr-1 drawer-header justify-space-between">
      <div>Carrinho</div>
      <v-btn @click="hideNavigationDrawer()" elevation="0" icon :ripple="false">
        <v-icon>mdi-close</v-icon>
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
        <div class="d-flex flex-column w-100  pl-4" style="overflow-y: scroll;">
          <div class="w-100 h-100">
            <div class="cart-products d-flex flex-column py-4">
              <div v-for="p in products" class="cart-product d-flex">
                <div style="width: 60%;">
                  <v-img :src="p.image" />
                </div>

                <div class="d-flex align-center justify-space-between ml-4 w-100">
                  <div class="d-flex flex-column">

                    <div>{{ p.title }}</div>
                    <div class="mb-2">{{ p.price }}</div>

                    <div class="counter-component" style="
                      border: 1px solid #111111;
                      border-radius: 3px;
                      height: 44px;
                      width: fit-content;">
                      <v-btn class="button-plus-minus" elevation="0" @click="p.amount--" :ripple="false">
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>

                      <div class="counter-input">
                        <div>
                          {{ p.amount }}
                        </div>
                      </div>

                      <v-btn class="button-plus-minus" elevation="0" @click="p.amount++" :ripple="false">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div class="pr-3">
                    <v-btn class="d-flex h-100 align-top" elevation="0" icon :ripple="false"
                      style="height: 30px !important; width:30px;">
                      <v-icon size="small">mdi-close</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-checkout flex-column pb-4 px-4">
          <v-divider></v-divider>
          <div class="w-100 d-flex justify-space-between py-5">
            <div>Total: </div>
            <div>R$ 399.00</div>
          </div>

          <v-btn class="text-subtitle-1 font-weight-regular button-color button-black" color="#111111" height="45px"
            width="100%" variant="flat" :ripple="false">
            Voltar a loja
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

const drawerStore = useDrawerStore();
const { displayCartDrawer } = storeToRefs(drawerStore);

const open = ref([]);
const isCartEmpty = ref(false);
const amount = ref(0);

watch(displayCartDrawer, (newValue) => {
  const htmlElement = document.getElementsByTagName("html");

  if (!newValue) {
    open.value = [];
    htmlElement[0].style.overflow = "auto";
  } else {
    htmlElement[0].style.overflow = "hidden";
  }
});

const hideNavigationDrawer = () => {
  displayCartDrawer.value = false;
};

const products = reactive([
  {
    image: "https://www.insiderstore.com.br/cdn/shop/files/WideLegOffWhite2_cropar.jpg?v=1698680349&width=300",
    title: "Calça Wide Leg",
    price: "R$ 399.00",
    amount: 0
  },
  {
    image: "https://www.insiderstore.com.br/cdn/shop/files/WideLegOffWhite2_cropar.jpg?v=1698680349&width=300",
    title: "Calça Wide Leg",
    price: "R$ 399.00",
    amount: 0
  },
  {
    image: "https://www.insiderstore.com.br/cdn/shop/files/WideLegOffWhite2_cropar.jpg?v=1698680349&width=300",
    title: "Calça Wide Leg",
    price: "R$ 399.00",
    amount: 0
  }
]);
</script>

<style lang="scss">
.empty-cart-container {
  height: calc(100% - 50px);
}

.cart-products {
  gap: 15px;
  overflow: auto;

  .cart-product {}
}

.v-navigation-drawer__content {
  overflow-y: hidden !important;
}
</style>
