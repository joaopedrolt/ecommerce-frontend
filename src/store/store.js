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
export const useCartStore = defineStore("cart", {
  state: () => ({
    shippingData: useStorage('shippingData', {
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

    isShippingDataValid: useStorage('isShippingDataValid', false)
  }),
  actions: {
    setShippingData(obj) {
      this.setShippingDataStatus(true);
      this.shippingData = obj;
    },
    setShippingDataStatus(isValid) {
      if (!isValid) this.$reset();
      else this.isShippingDataValid = isValid;
    }
  },
});