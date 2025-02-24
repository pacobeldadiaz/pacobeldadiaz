<template>
  <header class="cabecera">
    <div class="cabecera-izquierda">
      <Logo />
    </div>

    <div class="cabecera-titulo">
      <Titulo />
    </div>

    <div class="cabecera-derecha">
      <ModoOscuro />
    </div>
  </header>
</template>

<script setup>
import Logo from '../components/Logo.vue';
import Titulo from '../components/Titulo.vue';
import ModoOscuro from '../components/ModoOscuro.vue';
</script>

<style scoped>
/* Estilos de la cabecera */
.cabecera {
  overflow: hidden;
  position: relative;
  background-color: rgb(236,116,6);
  height: 80px;
  display: grid;
  grid-template-columns: auto 1fr 60px;
  justify-content: center;
  align-items: center;
  /* border-bottom:2px solid black; */
}
.cabecera-izquierda {
  display: flex;
  justify-content: left;
  padding-left : 0px;
}

/* RESPONSIVE*/
@media (max-width: 767px) {
  .logo {
    max-width: 150px;
  }
}
</style>
