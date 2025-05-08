// Utilities
import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  actions: {
    setUserState(userData) {
      this.user = userData ? { email: userData.email, uid: userData.uid } : null;
    },
    getUserEmail() {
      return this.user && this.user.email ? this.user.email : null;
    },
    getUserId() {
      return this.user && this.user.uid ? this.user.uid : null;
    }
  }
});

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
    displayCartDrawerOverlay() {
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
    otpCode: "",
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
var cartlocalStorageKeys = ["shippingData", "isShippingDataValid", "freteData", "isFreteDataValid", "localCart"];
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
      price: 0.0,
      save: false,
    }),

    isShippingDataValid: useStorage(cartlocalStorageKeys[1], false),

    freteData: useStorage(cartlocalStorageKeys[2], {
      title: null,
      price: null
    }),

    isFreteDataValid: useStorage(cartlocalStorageKeys[3], true),

    localCart: useStorage(cartlocalStorageKeys[4], {
      items: []
    }),
  }),
  actions: {
    clearCartLocalStorage(total = false) {
      if (total)
        this.localCart.items = [];

      cartlocalStorageKeys.forEach(key => {
        if (total || key !== "localCart") {
          localStorage.removeItem(key);
        }
      });
    },

    // Shipping
    setShippingDataStatus(isValid) {
      if (!isValid) {
        this.clearCartLocalStorage();
      }

      this.isShippingDataValid = isValid;
    },
    setShippingData(obj) {
      if (!obj) return;

      if (this.shippingData != null && this.shippingData.cep == obj.cep && Number(this.shippingData.price) > 0) {
        this.shippingData = { ...obj, price: Number(this.shippingData.price) };
      }
      else {
        this.shippingData = { ...obj, price: Number(obj.price) };
      }

      this.setShippingDataStatus(true);
    },

    // Frete
    setFreteDataStatus(isValid) {
      if (!isValid) {
        this.freteData = null;
        localStorage.removeItem('freteData');
      }

      this.isFreteDataValid = isValid;
    },
    setFreteData(obj) {
      if (!obj) return;

      this.setFreteDataStatus(true);
      this.freteData = obj;
    },

    // Local Cart
    getLocalCart() {
      return this.localCart.items ?? [];
    },
    updateCartProduct(productId, operation) {
      try {
        if (!productId || !operation) return false;

        const product = this.localCart.items.find(item => item.productId === productId);

        if (operation === "subtraction" && product.quantity === 1) {
          operation = "remove";
        } else if (operation === "sum" && product.quantity >= 10) {
          return false;
        }

        const updatedItems = operation === "remove"
          ? this.localCart.items.filter(item => item.productId !== productId)
          : this.localCart.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + (operation === "subtraction" ? -1 : 1) }
              : item
          );

        this.localCart.items = updatedItems;

        return true;
      }
      catch {
        return false;
      }
    },
    addProductToCart(productId, quantity) {
      try {
        if (!productId || !quantity) return false;

        var updatedItems = [];

        const product = this.localCart.items.find(item => item.productId === productId);

        if (!product) {
          const cartItem = {
            productId,
            quantity
          }

          updatedItems = [...this.localCart.items, cartItem];
        }
        else {
          quantity = (product.quantity + quantity) >= 10 ? 10 : product.quantity + quantity;

          updatedItems = this.localCart.items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          );
        }

        this.localCart.items = updatedItems;
        return true;
      }
      catch {
        return false;
      }
    }
  },
});