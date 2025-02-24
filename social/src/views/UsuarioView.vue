<template>
    <div class="usuario-detalle">
      <div class="usuario-info">
        <img :src="usuario.foto" alt="Foto del usuario" />
        <h2>{{ usuario.nombre }}</h2>
        <p>{{ usuario.apellidos }}</p>
        <router-link to="/tablero">Volver al tablero</router-link>
      </div>
  
      <div class="usuario-gustos">
        <h3>MIS GUSTOS PELICULEROS</h3>
        <ul>
          <li v-for="pelicula in usuario.peliculas" :key="pelicula">{{ pelicula }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        usuario: null, // Usuario inicializado como null
      };
    },
    created() {
      // Obtener la clave desde los parámetros de la URL y asegurarse de convertirla a número
      const clave = parseInt(this.$route.params.clave, 10);
  
      // Leer los usuarios desde el localStorage
      const storedUsuarios = JSON.parse(localStorage.getItem("usuarios"));
  
      // Verificar si existen usuarios en el localStorage
      if (storedUsuarios && Array.isArray(storedUsuarios)) {
        // Buscar el usuario correspondiente por clave
        this.usuario = storedUsuarios.find((user) => user.clave === clave);
  
        // Manejar el caso en que no se encuentre el usuario
        if (!this.usuario) {
          alert("Usuario no encontrado");
          this.$router.push("/tablero"); // Redirigir al tablero si no existe el usuario
        }
      } else {
        // Si no hay usuarios en el localStorage, mostrar mensaje y redirigir
        alert("No hay usuarios en el sistema.");
        this.$router.push("/tablero");
      }
    },
  };
  </script>
  
  <style>
  .usuario-detalle {
    display: grid; /* Usar grid para dividir el contenedor en columnas */
    grid-template-columns: 1fr 1fr; /* Dos columnas iguales */
    gap: 20px; /* Espaciado entre columnas */
    width: 100%; /* Ocupa todo el ancho disponible */
    max-width: 1000px; /* Limita el tamaño máximo */
    margin: 0 auto; /* Centra horizontalmente */
    padding: 20px; /* Espaciado interno */
    box-sizing: border-box; /* Incluye padding en el cálculo del tamaño total */
  }
  
  .usuario-info {
    text-align: left; /* Alinea el contenido a la izquierda */
  }
  
  .usuario-info img {
    width: 100%; /* Imagen ocupa el ancho disponible */
    max-width: 300px; /* Limita el tamaño máximo de la imagen */
    height: auto; /* Mantiene la proporción de la imagen */
    border-radius: 10px; /* Bordes redondeados */
    margin-bottom: 10px; /* Espaciado debajo de la imagen */
  }
  
  .usuario-info h2 {
    font-size: 24px; /* Tamaño de fuente del nombre */
    margin: 10px 0; /* Espaciado superior e inferior */
  }
  
  .usuario-info p {
    font-size: 18px; /* Tamaño de fuente de los apellidos */
    margin: 5px 0; /* Espaciado superior e inferior */
  }
  
  .usuario-info a {
    text-decoration: none; /* Elimina el subrayado */
    color: #007bff; /* Color del enlace */
  }
  
  .usuario-gustos {
    text-align: center; /* Centra el texto en la columna derecha */
    display: flex;
    flex-direction: column;
    align-items: center; /* Centra el contenido horizontalmente */
    justify-content: flex-start; /* Alinea el contenido en la parte superior */
    font-size: 20px; /* Tamaño de fuente para el texto */
    font-weight: bold; /* Resalta el texto */
    color: #333; /* Color del texto */
  }
  
  .usuario-gustos ul {
    list-style: none; /* Elimina los estilos de lista */
    padding: 0; /* Elimina el padding */
    margin: 10px 0 0; /* Añade un margen superior */
  }
  
  .usuario-gustos li {
    font-size: 16px; /* Tamaño de fuente para las películas */
    color: #555; /* Color para el texto de las películas */
    margin: 5px 0; /* Espaciado entre elementos de la lista */
  }
  </style>
  