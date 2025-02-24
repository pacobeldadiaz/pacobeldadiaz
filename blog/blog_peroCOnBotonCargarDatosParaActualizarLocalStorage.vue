<script setup>
import { ref, onMounted } from 'vue';

// Datos reactivos para las entradas del blog
const blogEntries = ref([]);

// Función para obtener los datos desde el archivo JSON
const fetchBlogEntries = async (forceUpdate = false) => {
    try {
        // Verificar si los datos ya están en localStorage y si no se requiere forzar la actualización
        if (!forceUpdate) {
            const storedData = localStorage.getItem('blogEntries');
            if (storedData) {
                blogEntries.value = JSON.parse(storedData); // Cargar datos desde localStorage
                return;
            }
        }

        // Si no hay datos en localStorage o se requiere forzar la actualización
        const response = await fetch('/data/blog.json'); // Ruta al archivo JSON
        if (!response.ok) {
            throw new Error(`Error al cargar blog.json: ${response.statusText}`);
        }
        const data = await response.json(); // Leer los datos del JSON

        // Formatear los datos y guardarlos en el estado y en localStorage
        const formattedData = data.map((entry) => ({
            id: entry.id,
            foto: "../../public/fotosblog/" + entry.foto, // Ruta completa a las fotos
            titulo: entry.titulo,
            resumen: entry.resumen,
            descripcion: entry.descripcion,
        }));
        blogEntries.value = formattedData;
        localStorage.setItem('blogEntries', JSON.stringify(formattedData)); // Guardar en localStorage
    } catch (error) {
        console.error('Error al obtener los datos del blog:', error);
    }
};

// Cargar los datos al montar el componente
onMounted(() => fetchBlogEntries());
</script>

<template>
    <div class="blog">
        <h1>Bienvenido mi blog de Naturaleza y algo más...</h1>
        <button @click="fetchBlogEntries(true)" class="update-button">Actualizar Datos</button>
        <div class="blog-grid">
            <article class="blog-card" v-for="entry in blogEntries" :key="entry.id">
                <!-- Foto con enlace dinámico -->
                <router-link :to="`/blog/${entry.id}`">
                    <img :src="entry.foto" :alt="entry.titulo" class="blog-photo" />
                </router-link>
                <!-- Título con enlace dinámico -->
                <h2 class="blog-title">
                    <router-link :to="`/blog/${entry.id}`">{{ entry.titulo }}</router-link>
                </h2>
                <!-- Resumen del blog -->
                <p class="blog-summary">{{ entry.resumen }}</p>
            </article>
        </div>
    </div>
</template>

<style scoped>
.blog {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.update-button {
    margin-bottom: 1.5rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.update-button:hover {
    background-color: #0056b3;
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.blog-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
}

.blog-card:hover {
    transform: translateY(-5px);
}

.blog-photo {
    width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 1rem;
    object-fit: cover;
}

.blog-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
}

.blog-summary {
    font-size: 1rem;
    color: #666;
}
</style>
