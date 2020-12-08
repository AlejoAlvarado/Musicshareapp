/**
 * Class that exports vuetify to be used by all the application's frontend
 */
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {};

export default new Vuetify(opts);
