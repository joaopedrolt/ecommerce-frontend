<template>
  <v-navigation-drawer 
  v-model="displayCartDrawer" 
  style="width: 500px;" 
  fixed
  temporary
  location="right">
    <div class="drawer-header justify-space-between">
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
      <div class="empty-cart-container w-100 d-flex px-4 py-4">
        <div class="d-flex flex-column w-100 justify-space-between">
          <div class="cart-products">

            <div class="d-flex ">
              <div style="width: 33%;">
                <v-img
                  src="https://www.insiderstore.com.br/cdn/shop/files/WideLegOffWhite2_cropar.jpg?v=1698680349&width=300" />
              </div>

              <div class="d-flex align-center justify-space-between ml-4 w-100">
                <div class="d-flex flex-column">
                  <div>Calça Wide Leg</div>
                  <div>R$ 399.00</div>
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

                <!--   <v-btn elevation="0" icon :ripple="false">
                  <v-icon>mdi-close</v-icon>
                </v-btn> -->
              </div>
            </div>


          </div>

          <div class="cart-checkout flex-column">
            <v-divider></v-divider>
            <div class="w-100 d-flex justify-space-between">
              <div>Total: </div>
              <div>R$ 399.00</div>
            </div>

            <v-btn class="text-subtitle-1 font-weight-regular button-color button-black" color="#111111" height="45px"
              width="100%" variant="flat" :ripple="false">
              Voltar a loja
            </v-btn>
          </div>
        </div>
      </div>
    </template>

  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDrawerStore } from "@/store/store.js";
import { storeToRefs } from "pinia";

const drawerStore = useDrawerStore();
const { displayCartDrawer } = storeToRefs(drawerStore);

const open = ref([]);
const isCartEmpty = ref(false);
const amount = ref(0);

watch(displayCartDrawer, (newValue) => {
  if (!newValue) {
    open.value = [];
  }
});

const hideNavigationDrawer = () => {
  displayCartDrawer.value = false;
};
</script>

<style lang="scss">
.empty-cart-container {
  height: calc(100% - 50px);
}

.cart-products {}

.v-navigation-drawer__content {
  overflow-y: hidden !important;
}
</style>
