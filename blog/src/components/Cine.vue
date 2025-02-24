<!-- peliculas las toma de una api -->

<script setup>
import { ref, onMounted } from 'vue';
import FichaIMDB from './fichaIMDB.vue'; // Importar el componente fichaIMDB.vue comun para Cine, Series...

// Datos reactivos para las películas
const movies = ref([]);

// API Key de OMDB
const apiKey = '1afabe13'; 

// Función para obtener los datos de las películas
const fetchMovies = async () => {
    const titles = [
    'The Godfather',
    'The Shawshank Redemption',
    'Pulp Fiction',
    'The Dark Knight',
    'Schindler\'s List',
    'The Lord of the Rings: The Return of the King',
    'Forrest Gump',
    'Inception',
    'The Matrix',
    'Fight Club',
    'Goodfellas',
    'The Empire Strikes Back',
    'Interstellar',
    'Parasite',
    'Spirited Away',
    'The Green Mile',
    'The Silence of the Lambs',
    'Se7en',
    '12 Angry Men',
    'The Pianist',
    'The Good, the Bad and the Ugly',
    'Gladiator',
    'Titanic',
    'The Wolf of Wall Street',
    'City of God',
    'Song of the Sea',
    'Persepolis',
    'Ratatouille',
    'Casablanca',
    'One Flew Over the Cuckoo\'s Nest',
    'Saving Private Ryan',
    'La La Land',
    'Whiplash',
    'The Departed',
    'Joker',
    'The Truman Show',
    'The Grand Budapest Hotel',
    'Coco',
    'Back to the Future',
    'The Lion King',
    'Avatar',
    '2001: A Space Odyssey'
];

    const movieRequests = titles.map((title) =>
        fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`)
    );

    try {
        const responses = await Promise.all(movieRequests);

        // Procesar las respuestas
        const movieData = await Promise.all(
            responses.map((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
        );

        movies.value = movieData
            .filter((movie) => movie.Response === 'True') // Asegurarse de respuestas válidas
            .map((movie) => ({
                title: movie.Title,
                year: movie.Year,
                director: movie.Director,
                imdbID: movie.imdbID,
                poster: movie.Poster !== 'N/A' ? movie.Poster : null, // Agregar la URL de la carátula
            }));
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
};

// Obtener datos al montar el componente
onMounted(fetchMovies);
</script>

<template>
    <div>
        <h2>PELICULAS DE UN ARRAY Y LAS PIDE A OMDB(API)</h2>
        <div class="gridView">
            <FichaIMDB
                v-for="movie in movies"
                :key="movie.imdbID"
                :title="movie.title"
                :poster="movie.poster"
                :imdbID="movie.imdbID"
                :director="movie.director"
                :year="movie.year"
            />
        </div>
    </div>
</template>

<style scoped>
.gridView {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

</style>
