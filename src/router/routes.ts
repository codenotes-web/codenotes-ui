import MainView from '@pages/main-view/MainView.vue'

// TODO By id
export const routes = [
  {
    path: '/',
    component: MainView
  },
  {
    path: '/snippet/:id',
    component: MainView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
