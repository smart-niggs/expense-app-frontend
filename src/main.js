import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store/index'
import './filters'
import vuelidate from 'vuelidate'
import 'bootstrap';   // imports bootstrap.js and popper.js
import axios from './axios/axios_auth' // the same axios instance used everywhere



require('@/assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css')
require('@/assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css')
require('@/assets/vendors/iconfonts/simple-line-icon/css/simple-line-icons.css')

require('@/assets/css/style.css')

Vue.use(vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
