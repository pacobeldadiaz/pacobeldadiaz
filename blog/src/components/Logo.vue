<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink to="/" class="logo">
    <img src="../components/icons/logo.svg" alt="Logo" />
  </RouterLink>
</template>

<style scoped>
.logo {
  height: 80px;
  margin-right: 2rem;
  display: flex;
  align-items: center;
}

.logo img {
  height: 100%;
  width: auto;
}
</style>
