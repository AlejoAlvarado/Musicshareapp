import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

const token = localStorage.getItem("user");
if (token) {
  axios.defaults.headers.common["authorization"] =
    "Bearer " + JSON.parse(token).token;
  console.log(axios.defaults.headers.common["authorization"]);
}

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
