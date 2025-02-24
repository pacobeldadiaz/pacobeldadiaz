<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BotonAtras from './BotonAtras.vue';

// Define props para aceptar 'id' desde el router dinámico
defineProps({
    id: [String, Number], // Puede ser String o Number, aunque estoy pasando un number
});

const BlogEntrada = ref(null);
const route = useRoute(); // Obtenemos la ruta actual

// Función para obtener los datos de la entrada del blog
const fetchBlogEntrada = async () => {
    try {
        // Recuperar datos desde localStorage
        const storedData = localStorage.getItem('blogEntradas');
        if (storedData) {
            const entries = JSON.parse(storedData);
            BlogEntrada.value = entries.find((entry) => entry.id === parseInt(route.params.id));
        }
    } catch (error) {
        console.error('Error al cargar la entrada del blog:', error);
    }
};

// Llamar a la función al montar el componente
onMounted(fetchBlogEntrada);
</script>

<template>
    <!-- Mostrar la entrada del blog si está disponible -->
    <div v-if="BlogEntrada" class="blog-entry">
        <h1 class="blog-title">{{ BlogEntrada.titulo }}</h1>
        <img :src="BlogEntrada.foto" :alt="BlogEntrada.titulo" class="blog-photo" />
        <p class="blog-description">{{ BlogEntrada.descripcion }}</p>
    </div>

    <!-- Mostrar un mensaje de carga mientras se obtienen los datos -->
    <div v-else>
        <p>Cargando entrada del blog...</p>
    </div>

    <!-- Botón vue para volver atrás -->
    <div>
        <BotonAtras />
    </div>
</template>

<style scoped>
.blog-entry {
    width: 100%; /* Asegura que el contenedor ocupe todo el ancho */
    margin: 0 auto; /* Centra el contenido */
    padding: 2rem;
    text-align: left; /* Alinea el texto a la izquierda */
}

.blog-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.blog-photo {
    width: 100%; /* La imagen ocupa el 100% del ancho disponible */
    height: auto; /* Mantiene la proporción de la imagen */
    margin-bottom: 1.5rem;
    display: block; /* La imagen ocupa toda la línea */
}

.blog-description {
    font-size: 1.2rem;
    color: #444;
    line-height: 1.6;
    text-align: justify; /* Justifica el texto */
}
</style>
