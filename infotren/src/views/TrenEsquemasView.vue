<template>
  <div class="cuerpoCentral">
    <div class="columnaMenuVacia">
      <Menu /> <!-- 🎫 Componente Menu -->
    </div>
    <div class="columnaContenidoCuerpoCentral">
      <ImagenEsquema :imagen="imagen" :alt="propiedad2" />
    </div>  
  </div>
</template>

<script>
import Menu from '../components/Menu.vue';
import ImagenEsquema from '../components/ImagenEsquema.vue';
import { useRoute } from 'vue-router';

export default {
  name: "TrenEsquemasView",
  components: { Menu, ImagenEsquema },
  props: ['imagen', 'propiedad2'],
  mounted() {
  }
};
</script>

<style scoped>
.cuerpoCentral {
  display: grid;
  grid-template-columns: 50px auto;
  width: 100%; 
  height: 100%;
}
.columnaContenidoCuerpoCentral{
  display: grid;
  grid-template-rows: auto;
}
</style>