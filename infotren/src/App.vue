<script setup>
  import { RouterView } from 'vue-router';
  import HeaderView from './views/HeaderView.vue';
  import FooterView from './views/FooterView.vue';
</script>

<template>
  <div class="container">
    <!-- Cabecera -->
    <header>
      <HeaderView />
    </header>

    <!-- Cuerpo principal donde cambia la vista -->
    <main>
      <RouterView />
    </main>

    <!-- Pie de página -->
    <footer>
      <FooterView />
    </footer>
  </div>
</template>

<style>

* {
    margin: 0;
    padding: 0;
}

html, body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', 'Arial Narrow', Arial, sans-serif;
    overflow: hidden;
}
/* cONTENEDOR PRINCIPAL */
.container {
    display: grid;
    grid-template-rows: auto 1fr auto; 
    height: 100vh; 
    width: 100%;
    box-sizing: border-box;
}
main {
  position: relative;
  width: 100%;
  overflow: auto;
}
header, footer {
  width: 100%;
  text-align: center;
}
</style>