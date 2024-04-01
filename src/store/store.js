// Utilities
import { defineStore } from "pinia";

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
    shippingStore: {
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
      estado: "",
      cep: "",
      save: true
    }
  }),
  actions: {
    setShippingData(obj) {
      this.shipping = obj;
    }
  },
});