import dayjs from 'dayjs'
import Calendar from 'dayjs/plugin/calendar'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
import VueSelect from 'vue-select'
import Vuelidate from 'vuelidate'
import 'dayjs/locale/cs'

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

// Config dayjs
dayjs.extend(Calendar)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.locale('cs')

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
