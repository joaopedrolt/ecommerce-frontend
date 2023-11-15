// Utilities
import { defineStore } from "pinia";

/* Drawer */
export const useDrawerStore = defineStore("drawer", {
  state: () => ({
    displayDrawer: false,
  }),
  actions: {
    displayNavigationDrawer() {
      this.displayDrawer = true;
    },
    hideNavigationDrawer() {
      this.displayDrawer = false;
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
