// Utilities
import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'

/* Drawer */
export const useDrawerStore = defineStore("navbar", {
  state: () => ({
    displayNavigationDrawer: false,
    displayFilterDrawer: false,
    displayCartDrawer: false
  }),
  actions: {
    displayNavigationDrawerx() {
      this.displayNavigationDrawer = true;
    },
    displayCartDrawerx() {
      this.displayCartDrawer = true;
    },
    hideNavigationDrawer() {
      this.displayNavigationDrawer = false;
    },
  },
});

/* SignIn */
export const useSignInStore = defineStore("signin", {
  state: () => ({
    signInEmailInput: "",
  }),
  actions: {
    setSignInEmail(value) {
      this.signInEmailInput = value;
    },
  },
});

/* Search */
export const useSearchStore = defineStore("search", {
  state: () => ({
    searchInput: "",
    searchQuery: "",
    displaySearchOverlay: false,
  }),
  actions: {
    setSignInEmail(value) {
      this.signInEmailInput = value;
    },
    displaySearchOverlayx() {
      this.displaySearchOverlay = true;
    }
  },
});

/* Cart */
var cartlocalStorageKeys = ["shippingData", "isShippingDataValid", "freteData", "isFreteDataValid"];
export const useCartStore = defineStore("cart", {
  state: () => ({
    shippingData: useStorage(cartlocalStorageKeys[0], {
      email: "",
      telefone: "",
      newsletter: true,
      wpp: true,
      nome: "",
      sobrenome: "",
      cpf: "",
      endereco: "",
      numero: "",
      bairro: "",
      complemento: "",
      cidade: "",
      estado: null,
      cep: "",
      save: true
    }),
    isShippingDataValid: useStorage(cartlocalStorageKeys[1], false),

    freteData: useStorage(cartlocalStorageKeys[2], {
      method: null,
    }),
    isFreteDataValid: useStorage(cartlocalStorageKeys[3], true),
  }),
  actions: {
    clearCartLocalStorage() {
      cartlocalStorageKeys.forEach(key => {
        localStorage.removeItem(key);
      });;
    },

    // Shipping
    setShippingDataStatus(isValid) {
      if (!isValid) this.clearCartLocalStorage();
      else this.isShippingDataValid = isValid;
    },
    setShippingData(obj) {
      if (!obj) return;

      this.setShippingDataStatus(true);
      this.shippingData = obj;
    },

    // Frete
    setFreteDataStatus(isValid) {
      if (!isValid) this.clearCartLocalStorage();
      else this.isFreteDataValid = isValid;
    },
    setFreteData(obj) {
      if (!obj) return;

      this.setFreteDataStatus(true);
      this.freteData = obj;
    }
  },
});