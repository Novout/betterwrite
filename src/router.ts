import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/pages/Landing.vue'
import Editor from '@/pages/Editor.vue'
import ErrorPage from '@/pages/404.vue'

const routes = [
  { path: '/', component: Editor },
  { path: '/landing', component: Landing },
  { path: '/:pathMatch(.*)*', component: ErrorPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
