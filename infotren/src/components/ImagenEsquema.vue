<template>
    <div class="contenido">
      <img :src="imagenSrc" :alt="alt">
    </div>
  </template>
  
  <script>
  export default {
    name: "ImagenEsquema",
    props: ['imagen', 'alt'], // 🔹 Recibe los valores de imagen y alt 
    computed: {
      imagenSrc() {
        return new URL(`../assets/img/${this.imagen}`, import.meta.url).href;
      }
    },
    mounted() {
    }
  };
  </script>
  
  <style scoped>

  /* 📌 Contenido principal */
  .contenido {
    display: flex;
    /* 🔹 Se adapta al espacio restante automáticamente */
    flex-grow: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }
  /* 📌 Imagen dentro del contenido */
  .contenido img {
    max-width: 88%;
    height: auto;
  }

  /*******************************************************************/
  /***************         R E S P O N S I V E         ***************/
  /*******************************************************************/

  @media (min-width: 50px) and (max-width: 376px) {
    /*767*/
    /* tamaño pantallas pequeñas (smartphones) */
    /* Para que las imágenes aparezcan en vertical */

    .contenido img {
      position: relative;
      transform: rotate(90deg);
      max-width: 140%;
      z-index: 0;
    }
  }

</style>