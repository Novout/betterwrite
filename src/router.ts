import { createRouter, createWebHistory } from 'vue-router'
import Editor from '@/pages/Editor.vue'

const routes = [{ path: '/', component: Editor }]

export default createRouter({
  history: createWebHistory('/better-write/'),
  routes,
})
