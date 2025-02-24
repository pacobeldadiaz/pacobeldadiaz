<template>
    <div class="caratula">
      <!-- Imagen de la carátula -->
      <router-link :to="`/serie/${serie.imdbID}`">
        <img :src="serie.Poster" :alt="serie.Title" class="caratula__imagen" />
      </router-link>
  
      <!-- Título de la película -->
      <h2 class="caratula__titulo">{{ serie.Title }}</h2>
  
      <!-- Línea inferior con botones e información -->
      <div class="caratula__linea-inferior">
        <!-- Botones IMDb y Video alineados a la izquierda -->
        <div v-if="mostrarBotones" class="caratula__botones">
          <a
            :href="`https://www.imdb.com/title/${serie.imdbID}`"
            target="_blank"
            class="boton imdb"
          >
            IMDb
          </a>
          <a
            :href="`https://www.imdb.com/title/${serie.imdbID}/videogallery/`"
            target="_blank"
            class="boton video"
          >
            Videos
          </a>
        </div>
  
        <!-- Puntuación alineada a la derecha -->
        <Puntuacion
          v-if="serie.Ratings && serie.Ratings[0]"
          :rating="serie.Ratings[0].Value"
          class="caratula__puntuacion"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Puntuacion from "./Puntuacion.vue";
  
  export default {
    props: {
      serie: {
        type: Object,
        required: true,
      },
      mostrarBotones: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      Puntuacion,
    },
  };
  </script>
  
  <style scoped>
  /* Contenedor de la carátula */
  .caratula {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgb(92, 7, 7);
    width: 80%;
    height: auto;
  }
  
  /* Imagen de la carátula */
  .caratula__imagen {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  
  /* Título de la carátula */
  .caratula__titulo {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 1.5em;
    font-weight: 400;
    letter-spacing: 2px;
    color: #333;
    margin-bottom: 15px;
  }
  
  /* Línea inferior con botones e información */
  .caratula__linea-inferior {
    display: flex;
    justify-content: space-between; /* Botones a la izquierda y puntuación a la derecha */
    align-items: center;
    width: 100%; /* Asegura que ocupe todo el ancho */
    margin-top: 10px; /* Espacio entre el título y la línea inferior */
  }
  
  /* Botones IMDb y Video */
  .caratula__botones {
    display: flex;
    gap: 10px; /* Espaciado entre los botones */
  }
  
  .boton {
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
  }
  
  .boton.imdb {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    background-color: #f5c518;
    color: black;
  }
  
  .boton.video {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    background-color: #f5c518;
    color: darkred;
  }
  
  /* Puntuación (Estrellas) */
  .caratula__puntuacion {
    font-size: 1.2em;
    font-weight: bold;
  }
  </style>
  