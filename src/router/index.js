import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

// configure router
const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
  // linkActiveClass: "active"
})

// router.beforeEach(beforeEach)  // using this makes sense ooh.

export default router
