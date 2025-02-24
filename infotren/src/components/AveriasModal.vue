<template>
  <div class="modal-overlay" @click.self="$emit('cerrar')">
    <div class="filaTituloModalSolucion">
      <h2 id="modalTituloSolAveria">💡 SOLUCIÓN AVERÍA 🚀</h2>
    </div>

    <div class="ContenidoDinamicoModel">
      <!-- 🔹 Icono y Título -->
      <div v-if="averia" class="ContenidoDinamicoModelif">
        <div class="averiaIcono">
          <img v-if="averia.icono" :src="'../src/assets/img/' + averia.icono" class="iconoModal"
            :alt="'Icono de ' + averia.averia" />
        </div>
        <div class="averiaTitulo">
          <h1>{{ averia.titulo || "Información no disponible" }}</h1>
        </div>
      </div>

      <!-- 🧲 Contenido de la avería -->
      <div class="textoProcesado" v-html="textoProcesado"></div>

      <!-- 🔹 Imagen de la avería -->
      <div v-if="averia.imagen" class="imageModaldiv">
        <img :src="'../src/assets/img/' + averia.imagen" class="imagenModal" :alt="averia.titulo">
      </div>

      <!-- 🔹 Contenido adicional -->
      <div v-if="averia.extra" class="modal-extra" v-html="extraProcesado"></div>
    </div>

    <div class="filaBotonesModal">
      <button class="close-btn" @click="$emit('cerrar')">❌ CERRAR</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AveriasModal',
  props: {
    link: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      averia: {}
    };
  },
  computed: {
    // ✅ Propiedad computada para formatear el contenido
    textoProcesado() {
      return this.procesarContenidoHTML(this.averia.texto);
    },
    extraProcesado() {
      return this.procesarContenidoHTML(this.averia.extra);
    }
  },
  mounted() {
    const DatosLStorageAveriasModal = "DatosAveriasModal";
    const jsonData = localStorage.getItem(DatosLStorageAveriasModal);

    if (jsonData) {
      const DataPanelAverias = JSON.parse(jsonData);
      this.averia = DataPanelAverias.find(item => item.averia === this.link) || {};
    }
  },
  methods: {
    procesarContenidoHTML(contenido) {
      if (!contenido) return "<p>No hay detalles disponibles.</p>";

      // Reemplazar '##' con saltos de línea <br>
      contenido = contenido.replace(/##/g, "<br>");

      // Reemplazar '==' por una línea horizontal con estilo
      contenido = contenido.replace(/==/g, '<hr style="width: 100%; background-color: black; border: none; height: 2px;">');

      // 🔹 Reemplazar etiquetas personalizadas por etiquetas HTML con estilos
      const estilosBase = "display: inline; line-height: 1.4; font-family: 'Outfit', Tahoma, Geneva, Verdana, sans-serif; font-size: 1em;";

      const estilos = {
        "&N&": `<h2 style="${estilosBase} color: black;">`,
        "&R&": `<h3 style="${estilosBase} color: red;">`,
        "&A&": `<h4 style="${estilosBase} color: blue;">`,
        "&V&": `<h5 style="${estilosBase} color: green;">`
      };

      let resultado = "";
      let partes = contenido.split(/(&N&|&R&|&A&|&V&)/); // Separar por etiquetas
      let estiloActual = "<span>"; // Iniciar con un `span` por defecto

      partes.forEach(parte => {
        if (estilos[parte]) {
          estiloActual = estilos[parte]; // Cambiar estilo cuando encuentra un marcador
        } else {
          resultado += estiloActual + parte + "</span>"; // Aplicar estilo y cerrar etiqueta
        }
      });

      return resultado;
    }
  }
};
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    display: grid;
    grid-template-rows: 4% auto 8%;
    align-items: center;
    justify-content: center;
    top: 60px;
    left: 5px;
    width: 95%;
    height: 85%;
    border-radius: 8px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 1);
    background: #52528ded;
    z-index: 10;
  }
  .Xcerrar {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  .modal {
    padding: 10px 10px;
    background: rgb(242, 255, 0);
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    position: relative;
  }
  #modalTituloSolAveria {
    font-family: 'Roboto', 'Arial Narrow', Arial, sans-serif;
    text-align: center;
    font-size: 20px;
    color: white;
    font-weight: bolder;
    letter-spacing: 5px;
    margin-top: 15px;
  }
  .ContenidoDinamicoModel {
    min-width: 200px;
    min-height: 150px;
    height: 95%;
    width: 90%;
    background-color: white;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
    overflow-y: auto;
    border: 5px solid darkred;
    margin: 50px 2%;
    border-radius: 20px;
    text-align: justify;
    line-height: 1.3;
    scrollbar-width: thin;
    scrollbar-color: rgba(111, 157, 111, 0.7) rgba(0, 0, 0, 0.1);
    position: relative;
    box-sizing: border-box;
  }
  /* 🔹 Estilo para la barra de desplazamiento en algunos navegadores (webkit)*/
  .ContenidoDinamicoModel::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }
  .ContenidoDinamicoModel img {
    max-width: 100%;
    height: auto;
  }
  .ContenidoDinamicoModelif {
    display: grid;
    grid-template-columns: 100px auto;
    align-items: center;
    gap: 10px;
    height: 100px;
    background-color: white;
    border-bottom: 2px solid darkred;
  }
  .averiaIcono {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 104, 104);
    height: 100%;
  }
  .averiaIcono img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
  .averiaTitulo {
    font-family: 'Roboto', Verdana, sans-serif;
    font-weight: bolder;
    font-size: 1.3em;
    font-style: italic;
    letter-spacing: 1.3px;
    color: darkblue;
    margin-left: 20px;
  }
  .extraModal {
    padding: 0px 10px;
  }
  .filaBotonesModal {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .filaBotonesModal button {
    padding: 10px 70px;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 10px;
    font-size: 14px;
  }
  .cerrar {
    background-color: rgb(255, 91, 91);
    font-weight: bold;
    color: black;
  }
  .botonesRedimensionar {
    background-color: blue;
    color: white;
  }
  h1 {
    font-family: 'Roboto', Verdana, sans-serif;
    font-weight: bolder;
    /* text-decoration: underline; */
    font-size: 1.3em;
    font-style: italic;
    letter-spacing: 1.3px;
    color: darkblue;
    margin-left: 20px;
  }
    /* clase del script*/
  .textoProcesado {
    padding-left:10px;
    padding-right: 15px;
    object-fit: contain;
  }
  /* Evita que los títulos generen saltos de línea */
  .textoProcesado h1,
  .textoProcesado h2,
  .textoProcesado h3,
  .textoProcesado h4,
  .textoProcesado h5 {
    font-family: 'Outfit', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.2em;
    display: inline;
    /* Hace que los títulos sigan en la misma línea */
    margin-right: 10px;
    /* Agrega espacio entre los títulos */
  }
  .textoProcesado h2 {
    color: black;
  }
  .textoProcesado h3 {
    color: darkred;
  }
  .textoProcesado h4 {
    color: blue;
  }
  .textoProcesado h5 {
    color: darkgreen;
  }

  /*******************************************************************/
  /***************         R E S P O N S I V E         ***************/
  /*******************************************************************/

  @media (min-width: 50px) and (max-width: 776px) {
    /*767*/
    /* tamaño pantallas pequeñas (smartphones) */
    /* Para que las imágenes aparezcan en vertical */
    .ContenidoDinamicoModelif {
      gap: 2px;
      height: 90px;
    }
    .averiaIcono img {
      max-height: 80%;
      max-width: 80%;
    }
    .averiaTitulo {
      font-size: 1em;
      letter-spacing: 1px;
      margin-left: 5px;
      padding-right: 10px;
    }
    
  }

</style>
