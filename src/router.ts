import { createRouter, createWebHistory } from 'vue-router'
import Editor from '@/pages/Editor.vue'
import ErrorPage from '@/pages/404.vue'

const routes = [
  { path: '/', component: Editor },
  { path: '/:pathMatch(.*)*', component: ErrorPage },
]
export default createRouter({
  history: createWebHistory('/better-write/'),
  routes,
})
