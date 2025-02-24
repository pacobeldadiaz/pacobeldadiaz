<script setup>
import { useRouter } from 'vue-router';

const router = useRouter(); // To handle navigation

// Función ir a la página anterior
const goBack = () => {
    router.back();
};
</script>

<template>
    <button @click="goBack" class="back-button">
        <img src="../components/icons/atras.png" alt="Atrás" class="back-icon" /> Volver
    </button>
</template>

<style scoped>
.back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #e0e0e0;
}

.back-icon {
    width: 20px;
    height: 20px;
}
</style>