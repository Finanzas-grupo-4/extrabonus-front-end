import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Divider from "primevue/divider";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });

app.component("pv-toolbar", Toolbar);
app.component("pv-button", Button);
app.component("pv-sidebar", Sidebar);
app.component("pv-divider", Divider);

app.mount("#app");
