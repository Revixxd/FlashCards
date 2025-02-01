import HomeView from './views/main/HomeView/HomeView.vue'
import LoginView from './views/main/LoginView/LoginView.vue'
import NotFoundView from './views/main/NotFoundView/NotFoundView.vue'
import RegisterView from './views/main/RegisterView/RegisterView.vue'
import DashBoardView from './views/user/DashboardView/DashBoardView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'home',
  },
  {
    path: '/dashboard',
    component: DashBoardView,
    name: 'dashboard',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: LoginView,
    name: 'login',
  },
  {
    path: '/register',
    component: RegisterView,
    name: 'register',
  },
  {
    path: '/404',
    component: NotFoundView,
    name: 'notFoundView',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

export default routes
