/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import VueSplide from "@splidejs/vue-splide";
import VueCountdown from '@chenfengyuan/vue-countdown';

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(pinia).use(router).use(VueSplide);
  app.component(VueCountdown.name, VueCountdown)
}
