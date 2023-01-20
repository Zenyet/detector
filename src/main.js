import Vue from "vue";
import App from "./App.vue";
// import router from "./router";

Vue.config.productionTip = false;

console.log(process.env.NODE_ENV);

new Vue({
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
