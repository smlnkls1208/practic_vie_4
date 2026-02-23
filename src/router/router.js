import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/MainPage.vue'
import Orders from '@/pages/OrdersPage.vue'

const routes = [
  { path: '/', component: Main },
  { path: '/orders', component: Orders }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
