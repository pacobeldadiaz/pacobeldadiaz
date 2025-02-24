<template>
    <div class="contenido">
      <!-- Área de tarjetas (grid) para las tarjetas CARDS -->
      <div class="contenido-grid">
        <div v-for="opcion in opcionesTarjetas" :key="opcion.nombre" class="card" @click="irALink(opcion.link, opcion.submenu)">
          <div class="trenImg">
            <img :src="rutaCarpetaImagenes(opcion.link[1])" :alt="opcion.nombre"> 
          </div>
          <div class="trenTexto">
            <h1>{{ opcion.nombre }}</h1>
            <p>{{ opcion.descripcion }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "CardGrid",
        data() {
            return {
                opcionesTarjetas: [] // Almacenará las tarjetas del LocalStorage
            };
        },
        mounted() {
            const claveLocalStorage = "DatosMenu"; // Clave donde están los datos en LocalStorage

            // Intentar cargar los datos desde LocalStorage
            const menuDataEnLocalStorage = localStorage.getItem(claveLocalStorage);

            if (menuDataEnLocalStorage) {
                this.opcionesTarjetas = JSON.parse(menuDataEnLocalStorage).filter(item => item.menu === "menu-principal");
            } else {
                // 🔄 Redirigir a HomeView para que recargue los datos
                this.$router.push({ name: "HomeView" });
            }
        },
        methods: {
            irALink(link, submenu) {
                if (!link || link.length < 1) {
                    return;
                }

                const view = link[0] || ""; // ✅ Tomamos solo la vista de link[0]

                if (!view) {
                    return;
                }

                // 📌 Guardar el submenu en localStorage
                if (submenu) {
                    localStorage.setItem("selectedMenu", submenu);
                }

                // 📌 Si la URL es un archivo PDF, abrir en una nueva pestaña
                if (view.endsWith(".pdf")) {
                    window.open(view, "_blank");
                    return; // 🚀 Salir para evitar otras redirecciones
                }

                // 📌 Si la vista comienza con "/" (indica una URL absoluta), usar `window.location.href`
                if (view.startsWith("/")) {
                    window.location.href = view; //  Redirige directamente fuera de Vue Router
                } else {
                    // 📌 Si es una vista de Vue Router, usar Vue Router para navegar
                    const urlCompleta = this.$router.resolve({ name: view }).href;
                    this.$router.push({ name: view });
                }
            },
            //  Construir la ruta de la imagen correctamente
            rutaCarpetaImagenes(imageName) {
                return new URL(`../assets/img/${imageName}`, import.meta.url).href; 
            }
        }
    };
</script>

<style scoped>
  .contenido {
    padding: 20px;
  }

  .contenido-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsivo */
    gap: 15px;
    justify-content: center;
  }
  
  /* CARDS  ***********************/
.contenido-grid .card{
    position: relative;
    max-width: 260px; 
    width: 100%; 
    height: 270px;    
    background-color:#ffcc00 !important;
    margin: 30px 10px;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 10px 20px rgba(0,0, 0, 0.7);
    transition: 0.3s ease-in-out;
    border-radius: 10px;
}
.contenido-grid .card:hover{    
    height: 430px;
}
.contenido-grid .card .trenImg{
    position: relative;    
    width: 200px;
    height: 280px;  
    top: -60px;
    left: 20px;
    z-index: 1;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
    cursor: pointer;
}
.contenido-grid .card .trenImg img{
    background-color: red !important;
    max-width: 100%;
    border-radius: 3px;
}   
.contenido-grid .card .trenTexto{
    position: relative;
    margin-top: -140px;
    padding: 10px 15px;
    text-align: center;
    color: darkred;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s ease-in-out;
    border-radius: 20px;
    cursor: pointer;
}
.contenido-grid .card:hover .trenTexto{
    visibility: visible;
    opacity: 1;
    margin-top: -40px;
    transition-delay: 0.1s
}
.contenido-grid .card .trenTexto h1 {
    font-weight: bold;
    font-size: 1.3rem; 
    color: black; 
    line-height: 2; 
}
  </style>
  
