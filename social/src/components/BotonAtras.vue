<template>
    <button class="boton-atras" @click="volverAtras">Volver Atrás</button>
  </template>
  
  <script>
  export default {
    name: "BotonAtras",
    methods: {
      volverAtras() {
        this.$router.back(); // Navega a la página anterior
      },
    },
  };
  </script>
  
  <style>
  .boton-atras {
    padding: 10px 20px; /* Espaciado interno */
    background-color: #007bff; /* Color azul */
    color: white; /* Texto blanco */
    border: none; /* Sin borde */
    border-radius: 5px; /* Bordes redondeados */
    cursor: pointer; /* Cambia el cursor al pasar por el botón */
    font-size: 14px; /* Tamaño de fuente */
  }
  
  .boton-atras:hover {
    background-color: #0056b3; /* Azul más oscuro al pasar el ratón */
  }
  </style>
  