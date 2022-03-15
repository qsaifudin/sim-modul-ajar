import Vue from "vue";
import Vuex from "vuex";

import Components from "./Components/module";
Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    Components
  }
});
