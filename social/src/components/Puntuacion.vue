<template>
    <div class="puntuacion" v-if="rating">
      <img
        v-for="index in numEstrellas"
        :key="index"
        src="../assets/star.png"
        alt="Estrella"
        class="estrella"
      />
    </div>
  </template>
  
  <script>
  export default {
    // Recibe el rating como propiedad (debe ser una cadena con formato 'X/10')
    props: {
      rating: {
        type: String,
        required: true,
      },
    },
    computed: {
      numEstrellas() {
        // Extrae la puntuación numérica del rating y la convierte en un rango de 0 a 5
        const puntuacion = parseInt(this.rating.split('/')[0]) || 0;
        return Math.round(puntuacion / 2); // Calcula el número de estrellas
      },
    },
  };
  </script>
  
  <style scoped>
  .estrella {
    width: 20px;
    height: 20px;
    margin: 0 2px;
  }
  </style>