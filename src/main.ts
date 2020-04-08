import Vue from 'vue'
import VueSelect from 'vue-select'

import App from './App.vue'
import router from './router'
import store from './store'

import * as Firebase from '@/lib/api/firebase'

// Import global CSS
import '@/main.scss'

// Firebase
Firebase.init()

// Config Vue
Vue.config.productionTip = false

// Register global components
Vue.component('vSelect', VueSelect)

// Render app
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
