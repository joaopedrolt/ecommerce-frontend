// Utilities
import { defineStore } from "pinia";

/* Drawer */
export const useNavbarStore = defineStore("navbar", {
  state: () => ({
    displayDrawer: false,
    displaySearch: false,
  }),
  actions: {
    displayNavigationDrawer() {
      this.displayDrawer = true;
    },
    hideNavigationDrawer() {
      this.displayDrawer = false;
    },
    displaySearchOverlay() {
      this.displaySearch = true;
    }
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

/* export const useSearchStore = defineStore("search", {
  state: () => ({
    displaySearch: false,
  }),
  actions: {
    setDisplaySearch(value) {
      this.displaySearch = value;
    },
  },
}); */
