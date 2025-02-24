<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { path: '/', text: 'Inicio' },
  { path: '/cine', text: 'Cine' },
  { path: '/series', text: 'Series' },
  { path: '/cineplus', text: 'CinePlus' },
  { path: '/contacto', text: 'Contacto' },
  { path: '/blog', text: 'Blog' }
]
</script>

<template>
  <nav class="navigation">
    <RouterLink
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      class="nav-link"
    >
      {{ link.text }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  gap: 2rem;
  flex-grow: 1;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: lightgreen;
}
</style>
