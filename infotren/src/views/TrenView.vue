<!-- 
 falta:
  -colores lineas y texto + oscuro (variables)
  -hacer texto y lineas animadas relativas al tamaño de la imagen??
  -responsive lineas ¿? hacerlo relativo al tamaño de la imagen??
  -pintar una pieza y que la deje poner en unas coordenadas exactas
 -->
<template>
  <div class="cuerpoCentral">
    <div class="columnaMenuVacia">
      <Menu /> <!-- 🎫 Componente Menu -->
    </div>
    <div class="columnaContenidoCuerpoCentral">
      <ImagenEsquema :imagen="unidad" />
    </div>
    <div>
    <RectanguloAnimado
      :x1="300"
      :y1="-300"
      :x2="800"
      :y2="-440"
      :x3="300"
      :y3="50"
      texto="UNIDAD TREN TRAM 4100 - VOSSLOH."
    />
  </div> 
  </div>
</template>

<script>
import Menu from '../components/Menu.vue';
import ImagenEsquema from '../components/ImagenEsquema.vue';
import RectanguloAnimado from '../components/RectanguloAnimado.vue';
import { useRoute } from 'vue-router';

export default {
  name: "TrenEsquema",
  components: { Menu, ImagenEsquema, RectanguloAnimado },
  props: ['unidad'],
  mounted() {
    console.log('unidad', this.unidad);
    // console.log('propiedad2', propiedad2);
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