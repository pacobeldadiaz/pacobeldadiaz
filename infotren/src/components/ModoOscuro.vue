<template>
  <label class="slider">
    <i class="fas fa-sun icon-sun"></i> <!-- Ícono de sol (modo claro) -->
    <input type="checkbox" id="varModoOscuro" name="varModoOscuro" v-model="varModoOscuro"
      @change="toggleVarModoOscuro">
    <span class="slider-circle"></span> <!-- Interruptor deslizante -->
  </label>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
const varModoOscuro = ref(false);

onMounted(() => {
  // 🟢 Leer el estado de `varModoOscuro` desde localStorage al cargar la página
  const savedVarModoOscuro = localStorage.getItem('varModoOscuro');
  varModoOscuro.value = savedVarModoOscuro === 'true'; // Convertir string a booleano

  // 🟢 Aplicar el modo oscuro al inicio si estaba activado
  applyVarModoOscuro(varModoOscuro.value);
});

// 🟢 `watch` detecta cambios en `varModoOscuro` y lo guarda en `localStorage`
watch(varModoOscuro, (newValue) => {
  localStorage.setItem('varModoOscuro', newValue ? 'true' : 'false');
  applyVarModoOscuro(newValue);
});

// 🟢 Aplica o quita la clase `oscuro` al body y container
const applyVarModoOscuro = (modoOscuro) => {
  const container = document.querySelector('.container');
  if (modoOscuro) {
    document.body.classList.add('oscuro');
    if (container) container.classList.add('oscuro');
  } else {
    document.body.classList.remove('oscuro');
    if (container) container.classList.remove('oscuro');
  }
};

// 🟢 Cambia el modo oscuro manualmente cuando el usuario interactúa con el checkbox
const toggleVarModoOscuro = () => {
  applyVarModoOscuro(varModoOscuro.value);
};
</script>

<style scoped>
/* 🔹 Estilos del switch */
.icon-sun {
    position: absolute;
    top: -37px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    color: black;
    transition: color 0.3s ease;
    padding-top: 20px;
}

.slider {
    display: inline-flex;
    align-items: center;
    position: relative;
    width: 36px;
    height: 16px;
    background-color:#ababab;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    top: 10px;
    padding: 2px;
}

/* Ocultar el input checkbox */
input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
}

/* Circulo dentro del slider */
.slider-circle {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    background-color:darkblue;
    border-radius: 50%;
    transition: transform 0.3s ease, background-color 0.3s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Mover el círculo cuando el checkbox está activado */
input:checked + .slider-circle {
    transform: translateX(20px);
}
.oscuro .icon-sun {
  color: white;
}

</style>
    
