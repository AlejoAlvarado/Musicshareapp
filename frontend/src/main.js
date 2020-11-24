import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import Signup from "./components/UserViews/Signup";

const routes = [
  {
    path: "/signup",
    component: Signup,
  },
];

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const router = new VueRouter({ routes });

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
