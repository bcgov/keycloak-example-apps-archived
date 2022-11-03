import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import HomeView from '../views/HomeView.vue'
import { initializeKeycloak } from '../services/keycloak'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth) {
    const keycloak = await initializeKeycloak()
    if (keycloak.authenticated) return true
  } else return true
})

export default router
