import Vue from 'vue'
import VueRouter from 'vue-router'

import Experiences from '@/views/ExperiencesView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { name: 'experiences' } },
  {
    path: '/experiences',
    name: 'experiences',
    component: Experiences,
  },
  {
    path: '/experiences/add',
    name: 'add-experience',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "add-experience" */ '../views/AddExperienceView.vue'
      ),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
