import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/main/HomeView/HomeView.vue'
import LoginView from './views/main/LoginView/LoginView.vue'
import DashBoardView from './views/user/DashboardView/DashBoardView.vue'

export const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/dashboard', component: DashBoardView, name: 'dashboard' },
  { path: '/login', component: LoginView, name: 'login' },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
