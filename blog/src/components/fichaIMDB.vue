<script setup>
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
</script>

<template>
    <article class="card">
        <!-- Carátula con enlace a IMDb -->
        <a :href="`https://www.imdb.com/title/${imdbID}/`" target="_blank" rel="noopener noreferrer">
            <img v-if="poster" :src="poster" :alt="`${title} Poster`" class="poster" />
        </a>
        <!-- Título de la película -->
        <h1 class="movie-title">
            <a :href="`https://www.imdb.com/title/${imdbID}/`" target="_blank" rel="noopener noreferrer">
                {{ title.toUpperCase() }}
            </a>
        </h1>
        <!-- Información adicional -->
        <p class="cardContent">Director: {{ director }}</p>
        <p class="cardContent">Año: {{ year }}</p>
    </article>
</template>

<style scoped>
.card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    background: #f9f9f9;
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

h1.movie-title a {
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
