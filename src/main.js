import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

// Config
const app = createApp(App);
app.config.devtools = true;

registerPlugins(app);

app.mount("#app");
