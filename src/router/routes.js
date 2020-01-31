// GeneralViews
import Login from '@/pages/login.vue'
import axios from '../axios/axios_auth'
// import {store}  from '../store/'

// console.log('store: ' + JSON.stringify(store.auth));

const routes = [

  { path: '/', name: 'login', component: Login },
  { path: '/signup', name:'signup', component: () => import( /* webpackChunkName: "about" */ '@/pages/signup.vue')},

  { path: '/dashboard', name: 'dashboard', component: () => import( /* webpackChunkName: "about" */ '@/components/layout/dashboard_layout.vue'),
    
    beforeEnter(from, to, next) {
      if (localStorage.token) { 
        // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
        next()
      }
      else next('/');
    },

    children: [
      { path: '/', name:'expenses', component: () => import( /* webpackChunkName: "about" */ '@/pages/expenses.vue') }
    ]
  },

  { path: '*', name: 'notFound', component: () => import(/* webpackChunkName: "about" */ '@/pages/error_404.vue') }
]

export default routes
