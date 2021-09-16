import Vue from "vue";
import App from "./App.vue";
import { router } from "./router/index";
import { vuetify } from "./plugins";
import { store } from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");