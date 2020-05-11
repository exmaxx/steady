import Vue from 'vue'
import VueSelect from 'vue-select'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'

import Spinner from '@/components/Spinner.vue'
import PlainLayout from '@/layouts/PlainLayout.vue'
import WithMenuLayout from '@/layouts/WithMenuLayout.vue'
import Firebase from '@/lib/api/firebase'
import {
  registerDayjsExtensions,
  registerVueFilters,
} from '@/lib/initialization'

// Import global CSS
import '@/main.scss'

// Firebase
Firebase.init()

// Config Vue
Vue.config.productionTip = false

// Add Vue filters
registerVueFilters()

// Config dayjs
registerDayjsExtensions()

// TODO: Add localization later.
// dayjs.locale('cs')

// Form Validation
Vue.use(Vuelidate)

// Register global components
Vue.component('WithMenuLayout', WithMenuLayout)
Vue.component('PlainLayout', PlainLayout)
Vue.component('vSelect', VueSelect)
Vue.component('Spinner', Spinner)

// Render app
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
