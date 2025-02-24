<template>
    <div id="inicio-belda-view">
        <h1>Series</h1>

        <!-- Mostrar todas las series almacenadas en 'serieList' -->
        <div class="serie-list">
            <router-link
                v-for="(serie, index) in serieList"
                :key="index"
                :to="`/serie/${serie.imdbID}`"
                class="serie-item"
            >
                <!-- Usamos el componente Caratula y le pasamos la serie -->
                <Caratula :serie="serie" :mostrarBotones="false" />
            </router-link>
        </div>
    </div>
</template>

<script>
// Importar el componente Caratula y funciones necesarias
import Caratula from '../components/Caratula.vue'
import { serieList, getMovieInfo } from '../script/functions.js'

export default {
    data() {
        return {
            // Lista de series obtenida desde localStorage o inicializada vacía
            serieList: JSON.parse(localStorage.getItem('serieList')) || []
        }
    },
    components: {
        // Registrar el componente Caratula
        Caratula
    },
    async mounted() {
        // Si la lista no está ya en localStorage, cargarla desde la API
        if (!localStorage.getItem('serieList')) {
            const fetchedSeries = await this.fetchSerieData()
            this.serieList = fetchedSeries
            localStorage.setItem('serieList', JSON.stringify(fetchedSeries))
        }
    },
    methods: {
        async fetchSerieData() {
            const seriesData = []
            for (const serie of serieList) {
                try {
                    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(serie)}&apikey=YOUR_API_KEY`)
                    const data = await response.json()
                    if (data && data.Response !== "False") {
                        seriesData.push(data)
                    }
                } catch (error) {
                    console.error(`Error fetching data for series "${serie}":`, error)
                }
            }
            return seriesData
        }
    }
}
</script>

<style scoped>
#inicio-belda-view h1 {
    text-align: center;
    padding: 0px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 2.5em;
    font-weight: 400;
    letter-spacing: 2px;
    color: darkblue;
    margin: 0;
}

.serie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
    margin-top: 0;
}

.serie-item {
    text-decoration: none;
    color: inherit;
}
</style>
