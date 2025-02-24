<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

// Definir las propiedades (props) que este componente aceptará
defineProps({
    title: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    imdbID: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
});

// Router para manejar las rutas dinámicas
const router = useRouter();

// Función para redirigir a la página de detalles dinámicos
const goToDetails = () => {
    router.push({ name: 'MovieDetails', params: { id: imdbID } });
};
</script>

<template>
    <article class="card">
        <!-- POSTER-CARATULA -->
        <!-- ruta no dinamica -->
            <!-- <img v-if="movie.poster" :src="movie.poster" :alt="`${movie.title} Poster`" class="poster" /> -->
        <!-- Mostrar carátula con enlace dinámico -->
            <router-link :to="{ name: 'MovieDetails', params: { id: imdbID } }">
                <img v-if="poster" :src="poster" :alt="`${title} Poster`" class="poster" />
            </router-link>

        <!-- TITULO -->
        <!-- ruta no dinamica -->
            <!-- <img v-if="movie.poster" :src="movie.poster" :alt="`${movie.title} Poster`" class="poster" /> -->
        <!-- Título con enlace dinámico -->
            <h4 class="movie-title">
                <router-link :to="{ name: 'MovieDetails', params: { id: imdbID } }">
                    {{ title.toUpperCase() }}
                </router-link>
            </h4>

        <!-- Información adicional -->
        <p class="cardContent">Director: {{ director }}</p>
        <p class="cardContent">Año: {{ year }}</p>
    </article>
</template>

<style scoped>
.card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.card img.poster {
    width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

h4.movie-title a {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: darkblue;
    text-transform: uppercase;
}

.cardContent {
    font-size: 0.9rem;
    color: darkred;
}
</style>
