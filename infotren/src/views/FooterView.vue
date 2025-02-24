<template>
  <footer class="footer">
    <Creador />
  </footer>
</template>

<script setup>
import Creador from '../components/Creador.vue';
</script>

<style scoped>
.footer {
  display: flex;
  height: 35px;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-top: 1px solid rgba(88,88,88,1); 
  color: white;
  font-size: 14px;
}
</style>
