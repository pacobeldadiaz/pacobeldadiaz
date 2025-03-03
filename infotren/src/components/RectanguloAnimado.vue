<template>
  <div class="container">
    <!-- Línea -->
    <div ref="line" class="line"></div>

    <!-- Recuadro -->
    <div ref="box" class="box">
      <p ref="text" class="text"></p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  props: {
    x1: { type: Number, required: true }, // Punto inicial de la línea (x1, y1)
    y1: { type: Number, required: true },
    x2: { type: Number, required: true }, // Punto final de la línea (x2, y2)
    y2: { type: Number, required: true },
    x3: { type: Number, required: true }, // Longitud horizontal del rectángulo
    y3: { type: Number, required: true }, // Altura del rectángulo
    texto: { type: String, required: true }, // Texto que aparecerá en el rectángulo
  },
  setup(props) {
    const line = ref(null);
    const box = ref(null);
    const text = ref(null);
    const velocidadTexto = 100; // Velocidad de escritura del texto (más rápida)

    let lineInterval = null;
    let textInterval = null;

    onMounted(() => {
      // 1. Dibujar la línea desde (x1, y1) hasta (x2, y2)
      const length = Math.sqrt((props.x2 - props.x1) ** 2 + (props.y2 - props.y1) ** 2);
      const angle = Math.atan2(props.y2 - props.y1, props.x2 - props.x1) * (180 / Math.PI);

      // Configuración inicial de la línea
      line.value.style.width = '0'; // Inicia con ancho 0
      line.value.style.transform = `rotate(${angle}deg)`;
      line.value.style.left = `${props.x1}px`;
      line.value.style.top = `${props.y1}px`;

      // Animación de la línea punto a punto
      let currentLength = 0;
      const animationDuration = 500; // Duración de la animación de la línea (0.5 segundos)
      const steps = 50; // Número de pasos para la animación
      const increment = length / steps; // Incremento de longitud por paso
      const intervalTime = animationDuration / steps; // Tiempo entre cada paso

      lineInterval = setInterval(() => {
        if (currentLength < length) {
          currentLength += increment;
          line.value.style.width = `${currentLength}px`;
        } else {
          clearInterval(lineInterval);

          // 2. Dibujar el rectángulo después de que la línea termine
          const boxWidth = Math.abs(props.x3); // Ancho del rectángulo (valor absoluto de x3)
          const boxHeight = props.y3; // Altura del rectángulo
          const boxLeft = props.x3 > 0 ? props.x2 : props.x2 - boxWidth; // Posición X del rectángulo
          const boxTop = props.y2 - boxHeight / 2; // Posición Y del rectángulo (centrado verticalmente)

          box.value.style.width = `${boxWidth}px`;
          box.value.style.height = `${boxHeight}px`;
          box.value.style.left = `${boxLeft}px`;
          box.value.style.top = `${boxTop}px`;
          box.value.style.opacity = '1';

          // 3. Mostrar texto caracter por caracter
          let index = 0;
          textInterval = setInterval(() => {
            if (index < props.texto.length && text.value) { // Verifica que text.value no sea null
              text.value.textContent += props.texto[index];
              index++;
            } else {
              clearInterval(textInterval);
            }
          }, velocidadTexto); // Velocidad de escritura del texto
        }
      }, intervalTime);
    });

    // Limpiar intervalos cuando el componente se desmonte
    onUnmounted(() => {
      if (lineInterval) clearInterval(lineInterval);
      if (textInterval) clearInterval(textInterval);
    });

    return {
      line,
      box,
      text,
    };
  },
};
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.line {
  position: absolute;
  height: 2px;
  background-color: black;
  width: 0;
  transform-origin: 0 0;
  transition: width 0.5s;
}

.box {
  position: absolute;
  border: 2px solid black;
  opacity: 0;
  transition: all 0.5s;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  margin: 0;
  white-space: nowrap;
}
</style>