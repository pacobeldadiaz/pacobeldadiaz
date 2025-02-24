import './assets/main.css';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

// Importar componentes para las rutas
import Home from './components/Home.vue';
import Cine from './components/Cine.vue';
import Series from './components/Series.vue';
import CinePlus from './components/Cineplus.vue';
import Contacto from './components/Contacto.vue';
import Blog from './components/Blog.vue';
// Importar componentes para rutas dinamicas
import MovieDetails from './components/MovieDetalles.vue'; // Ruta dinámica para entradas del blog
import BlogEntry from './components/BlogEntrada.vue'; // Ruta dinámica para entradas del blog

// Configuración de las rutas
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/cine', name: 'Cine', component: Cine },
    { path: '/series', name: 'Series', component: Series },
    { path: '/cineplus', name: 'CinePlus', component: CinePlus },
    { path: '/contacto', name: 'Contacto', component: Contacto },
    { path: '/blog', name: 'Blog', component: Blog },
    //Configuracion de ruta dinamica CinePlus
    {
        path: '/movie/:id',
        name: 'MovieDetails',
        component: MovieDetails,
        props: true, // Para pasar parámetros como props al componente
    },
    //Configuracion de ruta dinamica Blog
    {
        path: '/blog/:id',
        name: 'BlogEntrada',
        component: BlogEntry,
        props: true, // Para pasar parámetros como props
    },
];

// Crear el router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Crear la aplicación y usar el router
const app = createApp(App);
app.use(router);
app.mount('#app');