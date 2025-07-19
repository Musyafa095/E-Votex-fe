import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomePage.vue'),
    name: 'Home',
    meta: {
      layout: 'Default',
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/Dashboard.vue'),
    name: 'Dashboard',
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: '',
        name: 'HomeDashboard',
        component: () => import('@/components/Admin/HomeDashboard.vue'),
      },
      {
        path: 'candidate',
        name: 'Candidate',
        component: () => import('@/components/Admin/Movie.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/components/Admin/Genre.vue'),
      },
    ],
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      layout: 'Default',
      requiresAuth: true,
    },
  },
  {
    path: '/candidate/:id',
    component: () => import('@/views/MovieDetail.vue'),
    name: 'CandidateDetail',
    meta: {
      layout: 'Default',
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/verify-account',
    name: 'VerifyAccount',
    component: () => import('@/views/VerifyAccount.vue'),
    meta: {
      requiresAuth: true, // hanya bisa diakses jika sudh login
      requiresUnverified: true, // hanya bisa diakses jika belum verifikasi
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const store = authStore()

  if (!store.currentUser && store.token) {
    await store.getUserLogged()
  }

  //hanya user yang verif email
  if (store.token && store.currentUser) {
    if (
      store.currentUser.role.name === 'user' &&
      !store.currentUser.email_verified_at &&
      to.path !== '/verify-account'
    ) {
      store.showNotification('Silakan verifikasi email Anda terlebih dahulu')
      return next('/verify-account')
    }
  }

  // Jika user sudh verifikasi langsung ke homepage
  if (store.token && store.currentUser?.email_verified_at && to.path === '/verify-account') {
    store.showNotification('Anda berhasil login dan  sudah terverifikasi')
    return next('/')
  }

  // Khusus buat halaman admin
  if (to.meta.requiresAdmin) {
    if (!store.token) {
      store.showNotification('Anda harus login terlebih dahulu')
      return next('/login')
    }
    if (store.currentUser?.role?.name !== 'admin') {
      store.showNotification('Anda bukan admin')
      return next('/')
    }
  }

  next()
})

export default router
