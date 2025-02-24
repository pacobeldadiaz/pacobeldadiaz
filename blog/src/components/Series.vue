<!-- series las toma de un json que esta en ../../public/data/series.json -->
<!-- y luego pide a la api los datos -->

<script setup>
import { ref, onMounted } from 'vue';
import FichaIMDB from './fichaIMDB.vue'; // Importar el componente fichaIMDB.vue comun para Cine, Series...

// Datos reactivos para las series
const movies = ref([]);

// API Key de OMDB
const apiKey = '1afabe13'; // Reemplaza con tu API Key real

// Función para obtener los títulos de series desde un archivo JSON
const fetchSeriesTitles = async () => {
    try {
        const response = await fetch('../../public/data/series.json'); // Ruta al archivo JSON
        if (!response.ok) {
            throw new Error(`Error loading series.json: ${response.statusText}`);
        }
        const data = await response.json(); // Leer el contenido del JSON
        return data.map(item => item.titulo); // Extraer los títulos
    } catch (error) {
        console.error('Error fetching series titles:', error);
        return []; // Devolver un array vacío en caso de error
    }
};

// Función para obtener los datos de las series desde la API de OMDB
const fetchMovies = async () => {
    try {
        const titles = await fetchSeriesTitles(); // Obtener títulos desde el JSON

        const movieRequests = titles.map((title) =>
            fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`)
        );

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
        <h2>SERIES DE UN JSON Y LAS PIDE A OMDB(API)</h2>
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
