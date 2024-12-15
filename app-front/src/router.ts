import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import isUserAuthenticated from './utils/checkUser/isUserAuthenticated'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  if (!isUserAuthenticated && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

export default router
