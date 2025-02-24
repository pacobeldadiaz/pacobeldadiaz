<template>
    <header class="header">
      <div class="titulo">HUMANOIDES</div>
      <div class="mensaje">
        La mejor red social para conocerse entre humanos y robots
      </div>
      <div class="boton">
        <boton-atras />
      </div>
    </header>
  </template>
  
  <script>
  import BotonAtras from "../components/BotonAtras.vue";
  
  export default {
    components: {
      BotonAtras,
    },
  };
  </script>
  
  <style>
  .header {
    display: grid; /* Diseño grid */
    grid-template-columns: 1fr 2fr 1fr; /* Tres columnas */
    align-items: center; /* Centrar verticalmente */
    height: 151px; /* Altura fija */
    background-color: #f4f4f4; /* Fondo gris claro */
    padding: 10px; /* Espaciado interno */
  }
  .titulo {
    font-size: 24px;
    font-weight: bold;
    text-align: left;
  }
  .mensaje {
    text-align: center;
    font-style: italic;
  }
  .boton {
    text-align: right;
  }
  </style>
  