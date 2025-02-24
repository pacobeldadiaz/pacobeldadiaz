<template>
  <div class="app-container">
    <HeaderView v-if="mostrarHeaderFooter" />
    <main class="content">
      <!-- Contenido dinámico -->
      <router-view />
    </main>
    <FooterView v-if="mostrarHeaderFooter" />
  </div>
</template>

<script>
import HeaderView from "./views/HeaderView.vue";
import FooterView from "./views/FooterView.vue";

export default {
  name: "App",
  components: {
    HeaderView,
    FooterView,
  },
  computed: {
    mostrarHeaderFooter() {
      return this.$route.path !== "/";
    },
  },
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1; /* Ocupa el espacio restante entre el header y el footer */
  display: flex; /* Asegura que sus hijos puedan expandirse */
  flex-direction: column; /* Organiza verticalmente los elementos dentro */
  width: 100%; /* Asegura que ocupe todo el ancho del contenedor padre */
  box-sizing: border-box; /* Incluye padding y border en el tamaño total */
  overflow-y: auto; /* Agrega desplazamiento si el contenido es mayor que el contenedor */
}
</style>
