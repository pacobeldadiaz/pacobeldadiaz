<template>
  <div class="cuerpoCentral">
    <div class="columnaMenuVacia">
      <Menu /> <!-- 🎫 Componente Menu -->
    </div>
    <div class="columnaContenidoCuerpoCentral">
      <TarjetasHome /> <!-- 🔹 Componente de las tarjetas -->
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue';
import TarjetasHome from '../components/TarjetasHome.vue';
import { cargarJsonDatosVarios } from '../utils/datosvarios.js'; // 🔹 Importar el script que ejecuta datosvarios.js

export default {
  name: 'HomeView',
  components: { Menu, TarjetasHome },
  async mounted() {
    await this.cargarMenuEnLocalStorage(); // ✅ Cargar menu.json si es necesario
    await this.cargarDatosVariosEnLocalStorage(); // ✅ Ejecutar datosvarios.js si es necesario
  },
  methods: {
    async cargarMenuEnLocalStorage() {
      const claveMenu = "DatosMenu"; // 🔹 Cambiado de "menuData" a "DatosMenu"

      // Verificar si `DatosMenu` ya está en LocalStorage
      if (!localStorage.getItem(claveMenu)) {
        try {
          const response = await fetch('./data/menu.json');
          if (!response.ok) throw new Error("❌ Error al cargar menu.json");

          const menuData = await response.json();
          localStorage.setItem(claveMenu, JSON.stringify(menuData)); // 🔹 Guardado con la nueva clave

        } catch (error) {
          console.error("❌ Error al guardar menú en LocalStorage:", error);
        }
      }
    },

    async cargarDatosVariosEnLocalStorage() {
      const clavePrincipal = "varDatosVariosCargadosEnLS"; // Clave principal para verificar si ya se cargaron los datos

      // Verificar si los datos ya están en LocalStorage y si alguna clave tiene valor undefined o null
      const datosCargados = localStorage.getItem(clavePrincipal);
      const varFooterDisenyador = localStorage.getItem("varFooterDisenyador");

      if (!datosCargados || varFooterDisenyador === null || varFooterDisenyador === "null" || varFooterDisenyador === "undefined") {
        try {
          // Realizar la solicitud HTTP para cargar el archivo JSON
          const response = await fetch('./data/datosvarios.json');
          if (!response.ok) throw new Error("❌ Error al cargar datosvarios.json");

          // Convertir la respuesta en un array de objetos JSON
          const datosVarios = await response.json();

          // Verificar si el JSON tiene datos válidos
          if (!datosVarios || !Array.isArray(datosVarios) || datosVarios.length === 0) {
            throw new Error("❌ El archivo datosvarios.json está vacío, no es un array o no tiene datos válidos.");
          }

          // Obtener el primer objeto del array (asumiendo que solo hay un objeto)
          const primerObjeto = datosVarios[0];

          // Guardar cada propiedad del objeto en LocalStorage con su misma clave
          Object.keys(primerObjeto).forEach((clave) => {
            const valor = primerObjeto[clave];
            if (valor !== undefined && valor !== null) {
              // Guardar el valor directamente si es una cadena de texto, sin usar JSON.stringify
              if (typeof valor === "string") {
                localStorage.setItem(clave, valor);
              } else {
                // Usar JSON.stringify para otros tipos de datos (números, booleanos, objetos, etc.)
                localStorage.setItem(clave, JSON.stringify(valor));
              }
            } else {
              console.warn(`📕📙📘⚠️ La clave "${clave}" tiene un valor undefined o null en el JSON.`);
            }
          });

          // Marcar que los datos ya se cargaron
          localStorage.setItem(clavePrincipal, "true");

        } catch (error) {
          console.error("📕📙📘 Error al cargar o guardar datos varios:", error);
        }
      }
    }
  }
};
</script>

<style scoped>

.cuerpoCentral{
    display: grid;
    grid-template-columns: 40px auto; 
    height: 100%; 
    width: 100%; 
    background-color: white;
    color: black;
}
</style>
