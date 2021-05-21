import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const configureRouter = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
    ],
  })
  return router
}

export default configureRouter
