// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import router from './route';


Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(VueRouter);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
