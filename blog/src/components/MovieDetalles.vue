<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BotonAtras from './BotonAtras.vue';

const movieDetalles = ref(null);
const apiKey = '1afabe13'; 
const route = useRoute();

const fetchmovieDetalles = async () => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${route.params.id}&apikey=${apiKey}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        movieDetalles.value = await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};

onMounted(fetchmovieDetalles);
</script>

<template>
    <div v-if="movieDetalles" class="movie-details">
        <div class="movie-details-container">
            <div class="columna-izquierda">
                <h1>{{ movieDetalles.Title }}</h1>
                <img :src="movieDetalles.Poster" alt="Poster" class="poster" />
            </div>
            <div class="columna-derecha">
                <p>Director: <span class="movie-data">{{ movieDetalles.Director }}</span></p>
                <p>Actores: <span class="movie-data">{{ movieDetalles.Actors }}</span></p>
                <p>Escritores: <span class="movie-data">{{ movieDetalles.Writer }}</span></p>
                <p>Producción: <span class="movie-data">{{ movieDetalles.Production }}</span></p>
                <p>País: <span class="movie-data">{{ movieDetalles.Country }}</span></p>
                <p>Idiomas: <span class="movie-data">{{ movieDetalles.Language }}</span></p>
                <p>Puntuaciones: IMDB: <span class="movie-data">{{ movieDetalles.imdbRating }}</span>, Metascore: <span class="movie-data">{{ movieDetalles.Metascore }}</span></p>
                <p>Resumen: <span class="movie-data">{{ movieDetalles.Plot }}</span></p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Cargando detalles...</p>
    </div>
    <!-- Botón para volver atrás -->
    <div>
        <BotonAtras />
    </div>
</template>

<style scoped>
.movie-details-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    text-align: left;
}

.columna-izquierda {
    text-align: left;
}

.columna-derecha {
    text-align: left;
}

h1 {
    color: darkblue;
    font-weight: bold;
    margin-bottom: 1rem;
}

p {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.movie-data {
    font-weight: normal;
    color: red;
}

.poster {
    width: 100%;
    max-width: 400px;
    height: auto;
    margin-bottom: 1rem;
    display: block;
}
</style>
