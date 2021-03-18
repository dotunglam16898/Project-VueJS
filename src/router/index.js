import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },

  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import( '../layouts/LoginLayout.vue'),
  //   children: [
  //     {
  //       path: 'login',
  //       component: () => import( '../views/Login.vue'),
  //     },
  //     {
  //       path: 'register',
  //       component: () => import( '../views/Register.vue'),
  //     },
  //   ]
  // },

  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue'),
    
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/Register.vue'),
    
  },

  {
    path: '/admin',
    name: 'Admin',
    component: () => import( '../views/Main.vue'),
    
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
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !store.state.login.isAuthenticated) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })
export default router
