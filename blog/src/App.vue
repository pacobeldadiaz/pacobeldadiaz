<script setup>
import { RouterView } from 'vue-router'
import NavegacionLinks from './components/NavegacionLinks.vue'
import Logo from './components/Logo.vue'
</script>

<template>
  <div class="app-container">
    <header class="header">
      <div class="header-content">
        <Logo />
        <NavegacionLinks />
      </div>
    </header>
    <main class="content">
      <RouterView />
    </main>
    <footer class="footer">
      <div class="footer-content">
        <p>© 2025 Francisco Belda</p>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.app-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.header {
  height: 100px;
  background-color: #f8f9fa;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 0;
  padding: 0;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 2rem;
}

.content {
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 2rem;
}

.footer {
  height: 150px;
  background-color: #343a40;
  width: 100%;
  margin: 0;
  padding: 0;
}

.footer-content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
