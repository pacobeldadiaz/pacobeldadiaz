<template>
    <div class="usuario">
      <!-- Enlace al detalle del usuario -->
      <router-link :to="{ name: 'Usuario', params: { clave: usuario.clave } }">
        <img :src="usuario.foto" :alt="usuario.nombre" />
        <p>{{ usuario.nombre }}</p>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: ["usuario"], // Recibe el usuario como prop desde TableroView
  };
  </script>
  
  <style>
  .usuario {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra */
    padding: 10px; /* Espaciado interno */
    text-align: center; /* Centrar el texto */
    background: white; /* Fondo blanco */
    border-radius: 10px; /* Bordes redondeados */
  }
  
  .usuario img {
    width: 100%; /* Imagen ocupa el ancho del contenedor */
    max-width: 300px; /* Limita el tamaño máximo */
    height: auto; /* Mantiene la proporción */
    border-radius: 10px; /* Esquinas redondeadas */
    margin-bottom: 10px; /* Espaciado inferior */
  }
  
  .usuario p {
    font-size: 16px; /* Tamaño de fuente del nombre */
    font-weight: bold; /* Resalta el nombre */
    margin: 0; /* Elimina el margen superior e inferior */
  }
  </style>
  