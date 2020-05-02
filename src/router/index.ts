import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/habits/add',
    name: 'habit-add',
    component: () =>
      import(
        /* webpackChunkName: "experiences-view" */ '../views/AddHabitView.vue'
      ),
  },
  {
    path: '/habits/:id',
    name: 'habits',
    component: () =>
      import(
        /* webpackChunkName: "experiences-view" */ '../views/HabitView.vue'
      ),
  },
  {
    path: '/experiences',
    name: 'experiences',
    component: () =>
      import(
        /* webpackChunkName: "experiences-view" */ '../views/ExperiencesView.vue'
      ),
  },
  {
    path: '/experiences/add',
    name: 'add-experience',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "add-experience-view" */ '../views/AddExperienceView.vue'
      ),
  },
  {
    path: '/experiences/:id',
    name: 'edit-experience',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "add-experience-view" */ '../views/AddExperienceView.vue'
      ),
  },
  {
    path: '/activities',
    name: 'activities',
    component: () =>
      import(
        /* webpackChunkName: "activities-view" */ '../views/ActivitiesView.vue'
      ),
  },
  {
    path: '/emotions',
    name: 'emotions',
    component: () =>
      import(
        /* webpackChunkName: "emotions-view" */ '../views/EmotionsView.vue'
      ),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
