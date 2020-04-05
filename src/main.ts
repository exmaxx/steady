import Vue from 'vue'
import VueSelect from 'vue-select'

import App from './App.vue'
import router from './router'
import store from './store'

// Import global CSS
import '@/main.scss'

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
