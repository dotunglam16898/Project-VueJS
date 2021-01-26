import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },

  {
    path: '/',
    name: 'Login',
    component: () => import( '../layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import( '../views/Login.vue'),
      },
      {
        path: 'register',
        component: () => import( '../views/Register.vue'),
      },
    ]
  },

  {
    path: '/admin',
    name: 'Admin',
    component: () => import( '../layouts/AdminLayout.vue'),
    children: [
      {
        path: 'Main',
        component: () => import( '../views/Main.vue'),
      },
    ]
  },

  {
    path: '/profile',
    name: 'Profile',
    component: () => import( '../views/UpdateUser.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
