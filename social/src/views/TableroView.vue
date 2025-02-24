<template>
  <div class="tablero">
    <!-- Pasar cada usuario como prop al componente Usuario -->
    <usuario
      v-for="user in usuarios"
      :key="user.clave"
      :usuario="user"
    />
  </div>
</template>

<script>
import Usuario from "../components/Usuario.vue";

export default {
  components: { Usuario },
  data() {
    return {
      usuarios: [], // Inicializa como un arreglo vacío
    };
  },
  mounted() {
    // Verificar si los usuarios ya están en el localStorage
    const storedUsuarios = localStorage.getItem("usuarios");

    if (storedUsuarios) {
      // Si existen en el localStorage, los cargamos
      this.usuarios = JSON.parse(storedUsuarios);
    } else {
      // Si no existen, mostramos un mensaje de error
      alert("No se encontraron usuarios en el sistema.");
    }
  },
};
</script>

<style>
.tablero {
  display: grid; /* Usa grid layout para organizar los componentes */
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr)); /* Define columnas dinámicas */
  gap: 30px; /* Espaciado entre las tarjetas */
  padding: 40px 20px; /* Añade padding para que las tarjetas no queden pegadas al borde */
  width: 100%; /* Ocupa todo el ancho del contenedor padre */
  box-sizing: border-box; /* Asegura que el padding no desborde el contenedor */
}
</style>
