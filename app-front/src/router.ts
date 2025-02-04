import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import isUserAuthenticated from './utils/checkUser/isUserAuthenticated'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const userAuthenticated = await isUserAuthenticated()

  if (!userAuthenticated && to.name !== 'login' && to.meta.requiresAuth) {
    return { name: 'login' }
  }

  if (userAuthenticated && (to.name === 'login' || to.name === 'register')) {
    return { name: 'dashboard' }
  }
})

export default router
