<template>
  <footer class="creador">
    <p>Desarrollado por {{ creador }}</p>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { cargarJsonDatosVarios } from '../utils/datosvarios.js'; 

const creador = ref(localStorage.getItem('varFooterDisenyador') || "Cargando...");

onMounted(async () => {
  // Si ya hay un valor en localStorage, no hace falta volver a cargarlo
  if (!localStorage.getItem('varFooterDisenyador')) {
    const datos = await cargarJsonDatosVarios();
    creador.value = datos.footerDisenyador;
  } 
});
</script>

<style scoped>
.creador {
  text-align: center;
  font-size: 14px;
  color: white;
}
</style>

