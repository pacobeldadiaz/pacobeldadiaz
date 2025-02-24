<template>
  <div class="cuerpoCentral">
    <div class="columnaMenuVacia">
      <Menu /> <!-- 🎫 Componente Menu -->
    </div>
    <div class="columnaContenidoCuerpoCentral">
      <div class="galeria-fotos">
        <div class="slider-container">
          <div class="slides">
            <div v-for="(foto, index) in fotos" :key="index" :class="['slide', { active: index === currentSlide }]">
              <img :src="foto" :alt="'Foto ' + (index + 1)" @error="imagenError(foto)">
            </div>
          </div>
          <button class="buttonfotos prev" @click="cambiarSlide(false)">&#10094;</button>
          <button class="buttonfotos next" @click="cambiarSlide(true)">&#10095;</button>
          <div class="nav-dots">
            <span v-for="(foto, index) in fotos" :key="index" :class="['nav-dot', { active: index === currentSlide }]"
              @click="irASlide(index)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'; // 🔹 Importa el componente Menu

export default {
  name: 'GaleriaFotosView',
  components: {
    Menu, // 🔹 Registra el componente Menu
  },
  data() {
    return {
      fotos: [], // 📸 Lista de imágenes generadas automáticamente
      currentSlide: 0, // 🔹 Índice del slide actual
      slideInterval: null // ⏳ Temporizador del slider automático
    };
  },
  mounted() {
    this.cargarFotos(); // ✅ Genera las rutas de las imágenes
    this.iniciarAutoSlide(); // ⏳ Iniciar cambio automático de imágenes
  },
  methods: {
    // 📌 Cargar imágenes según el número guardado en LocalStorage
    cargarFotos() {
      let totalFotos = localStorage.getItem("varNumeroDeFotos");

      // 🔹 Si no existe en LocalStorage, usar un valor por defecto (10 imágenes)
      if (!totalFotos || isNaN(totalFotos)) {
        console.warn("📷🛑 No se encontró 'varNumeroDeFotos' en LocalStorage. Usando 10 por defecto.");
        totalFotos = 10;
      } else {
        totalFotos = parseInt(totalFotos);
      }
      this.fotos = Array.from({ length: totalFotos }, (_, i) => `../src/assets/fotos/foto (${i + 1}).jpg`);
    },
    // 📌 Cambiar de imagen
    cambiarSlide(siguiente = true) {
      let total = this.fotos.length;
      if (total === 0) return;

      this.currentSlide = siguiente
        ? (this.currentSlide + 1) % total
        : (this.currentSlide - 1 + total) % total;

      this.reiniciarAutoSlide();
    },
    // 📌 Ir a una imagen específica
    irASlide(index) {
      if (index < 0 || index >= this.fotos.length) return;
      this.currentSlide = index;
      this.reiniciarAutoSlide();
    },
    // 📌 Manejo de errores en imágenes
    imagenError(url) {
      console.error(`📷❌ ERROR: No se pudo cargar la imagen ${url}`);
    },
    // 📌 Iniciar cambio automático de imágenes
    iniciarAutoSlide() {
      if (this.slideInterval) clearInterval(this.slideInterval);
      this.slideInterval = setInterval(() => {
        this.cambiarSlide(true);
      }, 3000);
    },
    // 📌 Reiniciar el temporizador cuando el usuario cambia manualmente
    reiniciarAutoSlide() {
      clearInterval(this.slideInterval);
      this.iniciarAutoSlide();
    }
  }
};
</script>

<style scoped>
/* 📌 Diseño general */
.cuerpoCentral {
  display: grid;
  grid-template-columns: 40px auto;
  height: 100%;
  width: 100%;
}
/* 📌 Contenedor del slider */
.slider-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 75vh; 
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}
/* 📌 Imágenes */
.slides {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}
.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.7s ease-in-out;
}
.slide.active {
  opacity: 1;
  z-index: 2;
}
.slide img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
  object-fit: contain;
  border-radius: 20px;
  padding: 20px;
}
/* 📌 Flechas de navegación */
.buttonfotos {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.3s;
  z-index: 3;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttonfotos.prev {
  left: 10px;
}
.buttonfotos.next {
  right: 10px;
}
.buttonfotos:hover {
  background: rgba(0, 255, 105, 0.7);
  color: black;
}
/* 📌 Dots de navegación */
.nav-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 2;
}
.nav-dot {
  width: 12px;
  height: 12px;
  background: wheat;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s, transform 0.3s;
  border: 2px solid black;
}
.nav-dot.active {
  opacity: 1;
  transform: scale(1.5);
  background: chartreuse;
  border-color: black;
}

/*******************************************************************/
/***************         R E S P O N S I V E         ***************/
/*******************************************************************/

@media (min-width: 50px) and (max-width: 767px) {

  /*767*/
  /* tamaño pantallas pequeñas (smartphones) */
  /* Para que las imágenes aparezcan en vertical */
/* 📌 Dots de navegación */
.slider-container {
    width: 90%;
    height: 60vh;
    margin: 5px auto;
    justify-content:flex-start;
  }
  /* 📌 Imágenes */
  .slides {
    width: 100%;
    height: 80%;
    justify-content:center;
    align-items:center;
  }
  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.7s ease-in-out;
    justify-content: center;
    align-items: center;
  }
  .slide.active {
    opacity: 1;
    z-index: 2;
  }
  .slide img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
    object-fit: contain;
    border-radius: 20px;
    padding: 20px;
  }
  .buttonfotos {
    font-size: 20px;
    width: 30px;
    height: 30px;
  }
  .buttonfotos.prev {
    left: 5px;
  }
  .buttonfotos.next {
    right: 5px;
  }
  .nav-dots {
    gap: 1px;
  }
  .nav-dot {
    width: 5px;
    height: 5px;
  }
  .nav-dot.active {
    transform: scale(2);
  }
}
</style>