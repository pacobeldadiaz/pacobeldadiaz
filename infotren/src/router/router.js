import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import GaleriaFotosView from '../views/GaleriaFotosView.vue';
import GeneralidadesView from '../views/GeneralidadesView.vue';
import TrenEsquemasView from '../views/TrenEsquemasView.vue';
import TrenView from '../views/TrenView.vue';
import AveriasView from '../views/AveriasView.vue';

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },

  { path: '/generalidades/:imagen?/:propiedad2?', // 🔹 Hacemos los parámetros opcionales
      name: 'GeneralidadesView',
      component: GeneralidadesView,
      props: true },

  { path: '/tren/:unidad?', // 🔹 Hacemos los parámetros opcionales
      name: 'TrenView',
      component: TrenView,
      props: true },

  { path: '/tren-esquemas/:imagen?/:propiedad2?', // 🔹 Hacemos los parámetros opcionales
      name: 'TrenEsquemasView',
      component: TrenEsquemasView,
      props: true },
  
    { path: '/galeria-fotos/:unidad?/:propiedad2?', // 🔹 Hacemos los parámetros opcionales',
      name: 'GaleriaFotosView',
      component: GaleriaFotosView,
      props: true},

    { path: '/averias/:unidad?', // 🔹 Hacemos los parámetros opcionales
      name: 'AveriasView',
      component: AveriasView,
      props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;