import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA4flObfJL9BV2W__93h9rsnHhH3segtBA",
  },
  installComponents: true,
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
