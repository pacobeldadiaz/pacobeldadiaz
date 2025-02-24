<template>
  <div class="cuerpoCentral">
    <div class="columnaMenuVacia">
      <Menu /> <!-- 🎫 Componente Menu -->
    </div>

    <div class="columnaContenidoCuerpoCentral">
      <div class="titulo">
        <h1>PANEL AVERIAS UNIDAD S/{{ unidad }}</h1>
      </div>

      <!-- 🟩 PANEL DE AVERÍAS GENERADO DINÁMICAMENTE -->
      <div v-if="!loading" :class="'s' + unidad">
        <div v-for="item in DataPanelAverias" :key="item.link" class="celda"
          :style="{ backgroundColor: item.background}" @click="seleccionarAveria(item.link)">
          <img :src="getImageUrl(item.icono)" :alt="'Icono ' + item.tren">
        </div>
      </div>

      <!-- 🟩 Mostrar un mensaje de carga mientras se cargan los datos -->
      <div v-else class="mensaje-cargando">
        Cargando datos...
      </div>
    </div>
  </div>

  <!-- 🟩 MODAL PARA MOSTRAR INFORMACIÓN DE AVERÍA -->
  <AveriasModal v-if="averiaSeleccionada" :link="averiaSeleccionada" @cerrar="cerrarModal" />
</template>

<script>
import Menu from '../components/Menu.vue';
import AveriasModal from '../components/AveriasModal.vue';
import { watch } from 'vue'; // 🟩 Importar watch

export default {
  name: 'AveriasView',
  components: { Menu, AveriasModal },
  props: ['unidad'],
  data() {
    return {
      DataPanelAverias: [], // 🟩 Almacena las averías filtradas por unidad
      averiaSeleccionada: null,
      loading: true // 🟩 Estado de carga
    };
  },
  async created() {
    // 🟩 Asegurar que los datos estén en localStorage antes de cargarlos
    await this.cargarDatosAverias();

    // 🟩 Cargar los datos desde localStorage
    this.cargarDatosDesdeLocalStorage();

    // 🟩 Marcar que la carga ha terminado
    this.loading = false;
  },
  methods: {
    async cargarDatosAverias() {
      const DatosLStorageAveriasPanel = "DatosAveriasPanel";
      const DatosLStorageAveriasModal = "DatosAveriasModal";

      // 🟩 Verificar si los datos ya están en localStorage
      if (!localStorage.getItem(DatosLStorageAveriasPanel)) {
        try {
          const response = await fetch("/data/averiaspanel.json");
          if (!response.ok) throw new Error("⛔ Error al cargar averiaspanel.json");

          const datosPanel = await response.json();
          localStorage.setItem(DatosLStorageAveriasPanel, JSON.stringify(datosPanel));
        } catch (error) {
        }
      }

      if (!localStorage.getItem(DatosLStorageAveriasModal)) {
        try {
          const response = await fetch("/data/averiasmodal.json");
          if (!response.ok) throw new Error("⛔ Error al cargar averiasmodal.json");

          const datosModal = await response.json();
          localStorage.setItem(DatosLStorageAveriasModal, JSON.stringify(datosModal));
        } catch (error) {
        }
      }
    },

    cargarDatosDesdeLocalStorage() {
      const DatosLStorageAveriasPanel = "DatosAveriasPanel";
      const jsonData = localStorage.getItem(DatosLStorageAveriasPanel);

      if (!jsonData) {
        return;
      }
      const datosPanel = JSON.parse(jsonData);
      if (!this.unidad) {
        return;
      }
      // ⚡ Filtrar por unidad seleccionada
      this.DataPanelAverias = datosPanel.filter(item => item.tren === this.unidad);
    },

    seleccionarAveria(link) {
      this.averiaSeleccionada = link;
    },

    cerrarModal() {
      this.averiaSeleccionada = null;
    },

    // 🟩 Método para cargar imágenes dinámicamente
    getImageUrl(icono) {
      return new URL(`../assets/img/${icono}`, import.meta.url).href;
    }
  },
  watch: {
    // 🟩 Observar cambios en la prop 'unidad'
    unidad: {
      immediate: true, // 🟩 Ejecutar el watcher inmediatamente al montar el componente
      handler(newUnidad) {
        this.loading = true; // 🟩 Activar el estado de carga
        this.cargarDatosDesdeLocalStorage(); // 🟩 Recargar los datos
        this.loading = false; // 🟩 Desactivar el estado de carga
      }
    }
  }
};
</script>

<style scoped>
.cuerpoCentral {
  display: grid;
  grid-template-columns: 50px auto;
  height: 100%;
  width: 100%;
}
.columnaContenidoCuerpoCentral {
  display: grid;
  grid-template-rows: 28px auto;
  height: 100%;
  width: 100%;
  align-items: start;
  justify-content: center;
}
.s4100 {
  display: grid;
  grid-template-columns: repeat(6, 140px);
  grid-template-rows: repeat(auto-fit, 62px);
  gap: 15px 25px;
  padding: 10px 0px;
  justify-content:center;
  align-content:flex-start;
  height: auto;
  min-height: 400px;
}
.s4200 {
  display: grid;
  grid-template-columns: repeat(4, 140px);
  grid-template-rows: repeat(auto-fit, 62px);
  gap: 15px 25px;
  padding: 10px 0px;
  justify-content: center;
  align-content: flex-start;
  height: auto;
  min-height: 400px;
}
.celda {
  width: 140px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7);
}
.celda:hover {
  background-color: red !important;
  transform: scale(1.15);
}
.celda:active {
  background-color: red !important;
}
.celda img {
  width: auto;
  height: auto;
  max-height: 100%;
  object-fit: contain;
}
.titulo {
  width: 100%;
  text-align: center;
  margin: 5px;
}
.titulo h1 {
  text-align: center;
  font-family: 'Outfit', Arial, sans-serif;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 1.8em;
}
.mensaje-cargando {
  text-align: center;
  font-size: 1.2em;
  margin-top: 20px;
}

    /*******************************************************************/
    /***************         R E S P O N S I V E         ***************/
    /*******************************************************************/
  
    @media (min-width: 50px) and (max-width: 767px) {
  
      /*767*/
      /* tamaño pantallas pequeñas (smartphones) */
      /* Para que las imágenes aparezcan en vertical */
      .cuerpoCentral {
          grid-template-columns: 20px auto;
        }
      .s4100 {
          display: grid;
          grid-template-columns: repeat(6, 20px);
          grid-template-rows: repeat(auto-fit, 40px);
          justify-content:flex-start;
          gap: 
          31px;
        }
      .s4200 {
        display: grid;
        grid-template-columns: repeat(4, 20px);
        grid-template-rows: repeat(auto-fit, 40px);
        justify-content: center;
        gap: 31px;
      }
      .celda {
        width: 42px;
        height: 50x;
      }
      .celda img {
        width: auto;
        height: auto;
        max-height: 60%;
        object-fit: contain;

      }
      .titulo {
        width: 100%;
        margin: 10px 0px;
        justify-content: center;
        align-items: center;
      }
      .titulo h1 {
        font-size: 1.2em;
      }
  
    }

</style>
