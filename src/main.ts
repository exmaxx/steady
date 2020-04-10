import Vue from 'vue'
import VueSelect from 'vue-select'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'

import Firebase from '@/lib/api/firebase'

// Import global CSS
import '@/main.scss'

// Firebase
Firebase.init()

// Config Vue
Vue.config.productionTip = false

// Form Validation
Vue.use(Vuelidate)

// Register global components
Vue.component('vSelect', VueSelect)

// Render app
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
