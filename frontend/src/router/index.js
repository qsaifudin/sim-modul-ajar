import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/NavBar.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'content',
    component: () => import('@/layouts/Content.vue'),
    children: [
      // {
      //   path: '',
      //   redirect: 'dosen',
      // },
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: 'tes',
        name: 'tes',
        component: () => import('@/views/Tes.vue'),
      },
      {
        path: 'dosen',
        name: 'dosen',
        component: () => import('@/views/admin/dosen.vue'),
      },
    ],
  },

  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
