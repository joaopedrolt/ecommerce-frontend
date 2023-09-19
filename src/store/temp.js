// Utilities
import { defineStore } from "pinia";

export const useOverlayStore = defineStore("overlay", {
  state: () => ({
    display: false,
    type: "",
  }),
  actions: {
    displayOverlay() {
      this.display = true;
    },
    hideOverlay() {
      this.display = false;
    },
    setOverlayType(type) {
      this.type = type;
    },
  },
});
