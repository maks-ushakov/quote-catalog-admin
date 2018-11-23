import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery'
global.$ = jQuery
// eslint-disable-next-line
let Bootstrap = require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')