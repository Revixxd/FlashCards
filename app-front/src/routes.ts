import HomeView from './views/main/HomeView/HomeView.vue'
import LoginView from './views/main/LoginView/LoginView.vue'
import NotFoundView from './views/main/NotFoundView/NotFoundView.vue'
import RegisterView from './views/main/RegisterView/RegisterView.vue'
import AppView from './views/user/AppView/AppView.vue'
import DashBoardView from './views/user/DashboardView/DashBoardView.vue'
import FlashCardEditView from './views/user/FlashCard/FlashCardEditView/FlashCardEditView.vue'
import FlashCardEditPlay from './views/user/FlashCard/FlashCardPlayView/FlashCardPlayView.vue'
import LibraryView from './views/user/LibraryView/LibraryView.vue'

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
        path: 'flashcard',
        name: 'flashcard',
        children: [
          {
            path: 'edit/:id',
            component: FlashCardEditView,
            name: 'flashcard-edit',
          },
          {
            path: 'play/:id',
            component: FlashCardEditPlay,
            name: 'flashcard-play',
          },
        ],
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
