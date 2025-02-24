<template>
    <div class="login-container">
      <h1>HUMANOIDES</h1>
      <img class="logo" src="../components/icons/logo.png" alt="Logo" />
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" />
        <button type="submit">Entrar</button>
      </form>
      <p v-if="error" class="error">Usuario o contraseña incorrectos</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        error: false,
      };
    },
    methods: {
        login() {
        if (this.username === "1" && this.password === "1") {
            this.$router.push("/tablero"); // Redirige al tablero
        } else {
            this.error = true;
        }
        }
    },
  };
  </script>
  
  <style>
  .login-container {
    display: flex; /* Flexbox para centrar elementos */
    flex-direction: column; /* Columnas para organizar elementos */
    align-items: center; /* Centramos horizontalmente */
    justify-content: center; /* Centramos verticalmente */
    height: 100vh; /* Ocupa todo el alto de la pantalla */
    text-align: center;
  }
  .logo {
    margin: 20px 0; /* Espaciado alrededor de la imagen */
    width: 300px;
    height: auto;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    margin: 10px 0; /* Separación entre campos */
    padding: 10px; /* Espaciado interno */
    font-size: 16px; /* Tamaño de fuente */
  }
  button {
    padding: 10px; /* Espaciado interno */
    font-size: 16px; /* Tamaño de fuente */
    background-color: #007bff; /* Color azul */
    color: white; /* Texto blanco */
    border: none; /* Sin borde */
    cursor: pointer; /* Icono de mano */
  }
  button:hover {
    background-color: #0056b3; /* Color azul más oscuro al pasar el mouse */
  }
  .error {
    color: red; /* Color rojo para errores */
  }
  </style>
  