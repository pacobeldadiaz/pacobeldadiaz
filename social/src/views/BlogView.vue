<!-- { path: "/usuario/:clave", name: "Usuario", component: UsuarioView }, -->
<template>
    <div class="usuario">
      <router-link :to="{ name: 'Usuario', params: { clave: usuario.clave } }">
        <img :src="usuario.foto" :alt="usuario.nombre" />
        <p>{{ usuario.nombre }}</p>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    props: ["usuario"],
  };
  </script>
  
  <style>
  .usuario {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Sombra */
    padding: 10px; /* Espaciado interno */
    text-align: center; /* Centrar texto */
    background: white; /* Fondo blanco */
  }
  img {
    width: 100%; /* Imagen ocupa el ancho del contenedor */
    height: auto; /* Mantiene proporción */
    border-radius: 10px; /* Esquinas redondeadas */
  }
  </style>
  