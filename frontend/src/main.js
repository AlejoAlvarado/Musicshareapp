import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.use(VueAxios, axios);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
