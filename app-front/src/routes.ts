import HomeView from './views/main/HomeView/HomeView.vue'
import LoginView from './views/main/LoginView/LoginView.vue'
import NotFoundView from './views/main/NotFoundView/NotFoundView.vue'
import RegisterView from './views/main/RegisterView/RegisterView.vue'
import DashBoardView from './views/user/DashboardView/DashBoardView.vue'
import LibraryView from './views/user/LibraryView/LibraryView.vue'
import CreateSetView from './views/user/CreateSetView/CreateSetView.vue'
import AppView from './views/user/AppView/AppView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'home',
  },
  {
    path: '/app',
    component: AppView,
    name: 'app',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'dashboard',
        component: DashBoardView,
        name: 'dashboard',
      },
      {
        path: 'library',
        component: LibraryView,
        name: 'library',
      },
      {
        path: 'create-set',
        component: CreateSetView,
        name: 'createSet',
      },
    ],
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
