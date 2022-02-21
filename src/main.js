import Vue from "vue";
import VueRouter from "vue-router";
import VueResoure from "vue-resource";
import VuejsDialog from "vuejs-dialog";
import App from "./App.vue";
import Routes from "./routes/index";
import VeeValidate from "vee-validate";
import VueCookie from "vue-cookie";
import VueD3Uxgraph from "vue-d3-uxgraph";
import VueChartkick from "vue-chartkick";
import Chart from "chart.js";
import VueCharts from "vue-chartjs";
import VueHighcharts from "vue-highcharts";
import Highcharts from "highcharts";
import ToggleButton from "vue-js-toggle-button";
import CKEDITOR from "../ckeditor/ckeditor.js";
import store from "./store.js";
import VueMathjax from "vue-mathjax";
import i18n from "./i18n";
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueRouter);
Vue.use(VueResoure);
Vue.use(VuejsDialog);
Vue.use(VeeValidate);
Vue.use(require("vue-moment"));
Vue.use(VueCookie);
Vue.use(VueD3Uxgraph);
Vue.use(VueChartkick, { adapter: Chart });
Vue.use(VueHighcharts, { Highcharts: Highcharts });
Vue.use(ToggleButton);
Vue.use(CKEDITOR);
Vue.use(VueMathjax);
Vue.use(VueSimpleAlert);

const router = new VueRouter({
  routes: Routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
new Vue({
  el: "#app",
  router: router,
  store,
  i18n,
  render: h => h(App)
});
