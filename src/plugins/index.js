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
/* import { IMaskDirective } from 'vue-imask'; */

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(pinia).use(router).use(VueSplide);
  app.component(VueCountdown.name, VueCountdown);

  /*   app.directive('imask', IMaskDirective); */
}
