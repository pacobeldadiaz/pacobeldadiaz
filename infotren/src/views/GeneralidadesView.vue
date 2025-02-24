<template>
  <div class="cuerpoCentral">
      <div class="columnaMenuVacia">
        <Menu /> <!-- 🎫 Componente Menu -->
      </div>

    <div class="columnaContenidoCuerpoCentral">
      <div v-if="data.length">
        <div v-for="(grupo, index) in dataDividida" :key="index" class="forColumnaContenidoCuerpoCentral">
          <div class="columna-izquierda">
            <div v-for="(item, i) in grupo.izquierda" :key="'left-' + i">
              <component v-if="item.tipo !== 'imagen'" :is="item.propiedad" v-html="formatContent(item.contenido)"></component>
              <img v-else :src="getImagePath(item.contenido)" :alt="item.propiedad || 'Imagen'" class="imagen-json">
            </div>
          </div>
          
          <div class="columna-derecha">
            <div v-for="(item, i) in grupo.derecha" :key="'right-' + i">
              <component v-if="item.tipo !== 'imagen'" :is="item.propiedad" v-html="formatContent(item.contenido)"></component>
              <img v-else :src="getImagePath(item.contenido)" :alt="item.propiedad || 'Imagen'" class="imagen-json">
            </div>
          </div>
        </div>
      </div>  
      <div v-else>
        <p>No hay datos disponibles.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue';

export default {
  name: 'GeneralidadesView',
  components: { Menu },
  props: ['imagen', 'propiedad2'], // ✅ Recibimos imagen (vacía) y propiedad2 (tren4100 o 4200) desde router
  data() {
    return {
      data: [],
      dataDividida: [] // 🔹 Guardaremos aquí el contenido dividido en 2 columnas
    };
  },
  async mounted() {
    // Cargar el JSON en localStorage si no existe
    await this.cargarJsonEnLocalStorage();

    // Cargar los datos desde el localStorage
    this.cargarDatosDesdeLocalStorage();
  },
  watch: {
    propiedad2: {
      immediate: true, // ✅ Se ejecuta al iniciar el componente
      handler(newVal, oldVal) {
        this.cargarDatosDesdeLocalStorage(); // ✅ Recargar los datos al cambiar propiedad2
      }
    }
  },
  methods: {
    async cargarJsonEnLocalStorage() {
      const claveLocalStorage = 'DatosGeneralidades'; // 🔹 Cambio de clave

      // Verificar si ya hay datos en localStorage para evitar sobreescribir
      if (localStorage.getItem(claveLocalStorage)) {
        return;
      }

      try {

        const response = await fetch('../../public/data/generalidades.json'); // Ruta desde utils al json en public\data\
        if (!response.ok) throw new Error("❌ Error al cargar el archivo generalidades.json");

        const jsonData = await response.json();

        // Guardar en localStorage con la nueva clave
        localStorage.setItem(claveLocalStorage, JSON.stringify(jsonData));
      } catch (error) {
        console.error("❌ Error al cargar Generalidades en localStorage:", error);
      }
    },

    cargarDatosDesdeLocalStorage() {
      const claveLocalStorage = 'DatosGeneralidades'; // 🔹 Cambio de clave
      const jsonData = localStorage.getItem(claveLocalStorage); // 🔹 Leer del localStorage

      if (!jsonData) {
        return;
      }

      let data = JSON.parse(jsonData); // 🔹 Convertimos a objeto

      if (!this.propiedad2) {
        console.error("❌ Error: propiedad2 es undefined, no se puede filtrar.");
        return;
      }

      this.data = data.filter(item => item.tren === this.propiedad2);
      this.dataDividida = this.separarContenido(this.data);
    },

    separarContenido(data) {
      let izquierda = [];
      let derecha = [];
      let isLeft = true;

      data.forEach(item => {
        if (item.contenido.includes("[SALTODECOLUMNA]")) {
          isLeft = false;
          return;
        }
        isLeft ? izquierda.push(item) : derecha.push(item);
      });

      return [{ izquierda, derecha }];
    },

    formatContent(texto) {
      return texto.replaceAll('#', '<br>');
    },

    getImagePath(nombreArchivo) {
      return new URL(`../assets/img/${nombreArchivo}`, import.meta.url).href;
    }
  }
};
</script>


<style scoped>
/* @import url('../assets/css/fonts.css'); */
.columnaContenidoCuerpoCentral{
  display: flex;
}


.cuerpoCentral{
    display: grid;
    grid-template-columns: 50px auto; 
    height: 100%; 
    width: 100%; 
}
/* ini --- dos columnas, una para el menu, y otra para el curpo central */
.columnaMenuVacia{
  width: 50px;
 
}
.forColumnaContenidoCuerpoCentral{
    display: grid;
    grid-template-columns: 1fr 1fr; 
    width: 100%;
    gap: 10px; 
    padding: 5px;
    box-sizing: border-box; 
    overflow-x: hidden; 
}
/* fin --- dos columnas, una para el menu, y otra para el cuerpo central */

.contenido-tren {
    display: contents; /* ✅ Asegurar que los elementos hijos respeten el grid */
}
.columna-izquierda {
  flex: 1;
    padding: 10px;
}

.columna-derecha {
  flex: 1;
  padding: 10px;

}

.columna-izquierda h1, .columna-derecha h1 {
    text-align:left;
    font-size:  clamp(1.5rem, 2vw, 2em); 
    color: darkred;
    line-height: 1.3;
    font-family: 'Outfit', Arial, sans-serif;
}
.columna-izquierda h2, .columna-derecha h2 {
    text-align:left;
    font-size:  clamp(0.9rem, 1.1vw, 1.5em); 
    font-weight: bold;
    color: darkred;
    line-height: 1.3;
    font-family: 'Outfit', Arial, sans-serif;
}
.columna-izquierda h3, .columna-derecha h3 {
    text-align:left;
    font-weight: bold;
    font-size: clamp(0.9rem, 1vw, 1.3em); 
    line-height: 1.3;
    font-family: 'Outfit', Arial, sans-serif;
}
.columna-izquierda p, .columna-derecha p {
    text-align:left;
    font-size: clamp(0.9rem, 1vw, 1em); 
    color: rgb(0, 0, 0);
    line-height: 1.3;
    font-family: 'Outfit', Arial, sans-serif;
}
.imagen-json {
    width: 95%; 
    max-width: 100%; 
    height: auto; 
    margin-bottom: 10px; 
    margin-TOP: 5px;
    border-radius: 8px; 
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); 
}


/*******************************************************************/
/***************         R E S P O N S I V E         ***************/
/*******************************************************************/

@media (min-width: 50px) and (max-width: 376px) { /*767*/
/* tamaño pantallas pequeñas (smartphones) */
/* Para que las imágenes aparezcan en vertical */

  .forColumnaContenidoCuerpoCentral {
    grid-template-columns: 1fr; 
  }
}
</style>
