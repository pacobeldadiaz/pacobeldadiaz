<script setup>
import { ref, onMounted } from 'vue';
import FichaIMDBDinamica from './fichaIMDBdinamica.vue'; // Importar el componente fichaIMDB.vue comun para Cine, Series...
import { useRouter } from 'vue-router'; //rutas dinamicas **************************

// Datos reactivos para las películas
const movies = ref([]);

// API Key de OMDB
const apiKey = '1afabe13'; 

//rutas dinamicas ******************************************************************
const router = useRouter();

// Función para obtener los datos de las películas
const fetchMovies = async () => {
    const titles = [
        'City of God',
        'Song of the Sea',
        'Persepolis',
        'Ratatouille',
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
        'The Wolf of Wall Street' 
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

//rutas dinamicas ******************************************************************
const goToDetails = (id) => {
    router.push({ name: 'MovieDetails', params: { id } });
};


// Obtener datos al montar el componente
onMounted(fetchMovies);
</script>

<template>
    <div>
        <h2>PELICULAS DE UN ARRAY Y LAS PIDE A OMDB(API) AL HACER CLICK ABRIRAN EN OTRA PAGINA</h2>
        <div class="gridView">
            <FichaIMDBDinamica
                v-for="movie in movies"
                :key="movie.imdbID"
                :title="movie.title"
                :poster="movie.poster"
                :imdbID="movie.imdbID"
                :director="movie.director"
                :year="movie.year"
            />



            <!-- <article class="card" v-for="movie in movies" :key="movie.title">
                <router-link :to="{ name: 'MovieDetails', params: { id: movie.imdbID } }">
                    <img v-if="movie.poster" :src="movie.poster" :alt="`${movie.title} Poster`" class="poster" />
                </router-link>
                <h4 class="movie-title">
                    <router-link :to="{ name: 'MovieDetails', params: { id: movie.imdbID } }">
                        {{ movie.title.toUpperCase() }}
                    </router-link>
                </h4>
                <p class="cardContent">Year: {{ movie.year }}</p>
                <p class="cardContent">Director: {{ movie.director }}</p>
            </article> -->
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