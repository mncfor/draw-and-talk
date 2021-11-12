import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'HomeLayout'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/draw/:session',
    name: 'Draw',
    meta: {layout: 'DrawLayout'},
    props: true,
    component: () => import('../views/Draw.vue'),
    beforeEnter: (to, from, next) => {
      store.commit('SET_SESSION', to.params.session);
      next();
    }
  },
  {
    path: '/draw',
    redirect: { name: 'Draw', params: { session: `f${(+new Date).toString(16)}` } }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('SET_PRELOADER', true);
  next();
})

router.afterEach((to, from) => {
  // setTimeout(() => {
    store.commit('SET_PRELOADER', false);
  // }, 1000);
})

export default router
