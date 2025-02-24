<template>
    <button :class="['boton', tipo]" @click="$emit('click')">
      <slot>Botón</slot>
    </button>
  </template>
  
  <script>
  export default {
    name: "Boton",
    props: {
      tipo: {
        type: String,
        default: "primario", // "primario", "secundario", "terciario"
      },
    },
  };
  </script>
  
  <style scoped>
  .boton {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    margin-top: 20px;
  }
  
  .boton.primario {
    background-color: #007bff;
    color: white;
  }
  
  .boton.primario:hover {
    background-color: #0056b3;
  }
  
  .boton.secundario {
    background-color: #6c757d;
    color: white;
  }
  
  .boton.secundario:hover {
    background-color: #5a6268;
  }
  </style>