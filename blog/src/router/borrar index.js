import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'; // Añadimos esta línea para el vue router
import App from './App.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/cine',component: Cine },
    { path: '/serie',component: Series },
    { path: '/cineplus',component: CinePlus },
    { path: '/contacto',component: Contacto },
    { path: '/blog',component: Blog },
  ]
})

export default router