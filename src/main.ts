import dayjs from 'dayjs'
import Calendar from 'dayjs/plugin/calendar'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
import VueSelect from 'vue-select'
import Vuelidate from 'vuelidate'

// TODO: Add localization later.
// import 'dayjs/locale/cs'

import App from './App.vue'
import router from './router'
import store from './store'

import PlainLayout from '@/layouts/PlainLayout.vue'
import WithMenuLayout from '@/layouts/WithMenuLayout.vue'
import Firebase from '@/lib/api/firebase'

// Import global CSS
import '@/main.scss'

// Firebase
Firebase.init()

// Config Vue
Vue.config.productionTip = false

// Add Vue filters

// TODO: Show nicer format (needs additonal translations first).
// Vue.filter('asIntervalDate', (datetime: string) => dayjs(datetime).calendar())
Vue.filter('formatDateAndTime', (datetime: string) =>
  dayjs(datetime).format('LLL')
)
Vue.filter('formatDate', (datetime: string) => dayjs(datetime).format('LL'))
Vue.filter('asIntervalDate', (datetime: string) => dayjs(datetime).fromNow())
Vue.filter('dayInWeek', (datetime: string) => dayjs(datetime).format('dddd'))

// Config dayjs
dayjs.extend(Calendar)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

// TODO: Add localization later.
// dayjs.locale('cs')

// Form Validation
Vue.use(Vuelidate)

// Register global components
Vue.component('WithMenuLayout', WithMenuLayout)
Vue.component('PlainLayout', PlainLayout)
Vue.component('vSelect', VueSelect)

// Render app
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
