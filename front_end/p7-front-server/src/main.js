import Vue from 'vue';
import App from './App.vue';
import { router } from './router';

//  Evite l 'erreur redondante sur router push
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
};
import store from './store';
import { BootstrapVue, IconsPlugin, LayoutPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap';
import 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);



Vue.config.productionTip = false;
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(LayoutPlugin)

Vue.use(VeeValidate);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


