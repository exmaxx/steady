import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/habits/add',
    name: 'add-habit',
    component: () =>
      import(
        /* webpackChunkName: "add-habit-view" */ '../views/AddHabitView.vue'
      ),
  },
  {
    path: '/habits/:habitId',
    name: 'habit',
    component: () =>
      import(/* webpackChunkName: "habit-view" */ '../views/HabitView.vue'),
  },
  {
    path: '/habits/:habitId/experiences/add',
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
    path: '/habits/:habitId/experiences/:experienceId',
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
  {
    path: '/not-found',
    name: 'not-found',
    component: () =>
      import(/* webpackChunkName: "not-found-view" */ '../views/NotFound.vue'),
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "not-found-view" */ '../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
