<template>
  <div ref="menuContainer" class="menu" :class="{ open: menuAbierto }">
    <button class="menu-burger" @click.stop="toggleMenu">&#9776;</button>

    <div class="menu-contenido">
      <!-- Listado de trenes -->
      <div class="menu-trenes">
        <!-- para que salga el tren seleccionado el último, reordenamos la lista con computed -->
        <div v-for="opcion in opcionesOrdenadas" :key="opcion.submenu" class="menu-option"
          :class="{ selected: opcion.submenu === selectedMenu }" @click="seleccionarOpcion(opcion)">
          <img src="../assets/img/tren-tram-icon_p.svg" height="20" alt="tren">
          <span>{{ opcion.nombre }}</span>
        </div>
      </div>
      <!-- Submenú de tren seleccionado -->
      <div class="menu-opciones-tren">
        <div v-for="sub in opcionesSubmenu" :key="sub.nombre" class="submenu-item" @click="navegar(sub)">
          {{ sub.nombre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuAbierto: false, // 🔹 Estado del menú (cerrado por defecto)
      opcionesMenu: [],
      opcionesSubmenu: [],
      selectedMenu: localStorage.getItem('selectedMenu') || null,
      menuData: JSON.parse(localStorage.getItem('DatosMenu')) || [] // ✅ Ahora toma los datos desde LocalStorage
    };
  },
  computed: {
    opcionesOrdenadas() {
      if (!this.selectedMenu) return this.opcionesMenu;

      // Filtrar la opción seleccionada y moverla al final
      return [
        ...this.opcionesMenu.filter(op => op.submenu !== this.selectedMenu),
        ...this.opcionesMenu.filter(op => op.submenu === this.selectedMenu)
      ];
    }
  },
  mounted() {
    if (this.menuData.length > 0) {

      // Filtrar opciones principales del menú
      this.opcionesMenu = this.menuData.filter(item => item.menu === "menu-principal" && item.submenu !== "");

      if (this.selectedMenu) {
        this.mostrarSubmenu(this.selectedMenu);
      }
    } 

    document.addEventListener('click', this.cerrarMenuSiClick);
    window.addEventListener('scroll', this.cerrarMenuSiScroll);

    const menuContainer = this.$refs.menuContainer;
    if (menuContainer) {
      menuContainer.addEventListener('scroll', this.cerrarMenuSiScroll);
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.cerrarMenuSiClick);
    window.removeEventListener('scroll', this.cerrarMenuSiScroll);
    const menuContainer = this.$refs.menuContainer;
    if (menuContainer) {
      menuContainer.removeEventListener('scroll', this.cerrarMenuSiScroll);
    }
  },
  methods: {
    seleccionarOpcion(opcion) {
      this.selectedMenu = opcion.submenu;
      localStorage.setItem('selectedMenu', this.selectedMenu);
      const datosSeleccionados = {
        nombre: opcion.nombre,
        link: opcion.link
      };
      localStorage.setItem('opcionMenuSeleccionada', JSON.stringify(datosSeleccionados));
      this.mostrarSubmenu(this.selectedMenu);
    },
    mostrarSubmenu(submenuId) {
      this.opcionesSubmenu = this.menuData.filter(item => item.menu === submenuId);
    },
    toggleMenu() {
      this.menuAbierto = !this.menuAbierto;
    },
    cerrarMenuSiClick(event = null) {
      if (event && this.$refs.menuContainer && this.$refs.menuContainer.contains(event.target)) {
        return;
      }
      this.menuAbierto = false;
    },
    cerrarMenuSiScroll() {
      if (this.menuAbierto) {
        this.menuAbierto = false;
      }
    },
    navegar(sub) {
      if (!sub.link || sub.link.length < 1) {
        console.error("⚠️ No hay datos suficientes en link para navegar.");
        return;
      }
      const view = sub.link[0] || "";
      const imagen = sub.link[1] || "default.png";
      const propiedad2 = sub.link[2] || "";
      if (!view) {
        console.error("❌ No se puede navegar porque la vista no está definida en link[0].");
        return;
      }
      try {
        const resolvedRoute = this.$router.resolve({ name: view });
        if (!resolvedRoute || !resolvedRoute.matched.length) {
          console.error(`❌ No existe la ruta para la vista "${view}". Verifica router.js.`);
          return;
        }
        if (view === "TrenEsquemasView" || view === "GeneralidadesView") {
          this.$router.push({
            name: view,
            params: {
              imagen: imagen,
              propiedad2: propiedad2
            }
          });
          } else if (view === "TrenView") {

          // Verificar que propiedad2 no esté vacío
          if (!imagen) {
            console.error("❌ Error: imagen está vacía. No se puede navegar a TrenView.");
            return;
          }
          this.$router.push({
            name: view,
            params: {
              unidad: imagen
            }
            });
              } else if (view === "AveriasView") {

                // Verificar que propiedad2 no esté vacío
                if (!propiedad2) {
                  console.error("❌ Error: unidad está vacía. No se puede navegar a AveriasView.");
                  return;
                }
                this.$router.push({
                  name: view,
                  params: {
                    unidad: propiedad2
                  }
                });
              } else {
                this.$router.push({ name: view });
              }
        this.cerrarMenuSiClick();
      } catch (error) {
        console.error(`❌ Error al navegar: ${error.message}`);
      }
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 250px;
  box-sizing: border-box;
  background-color: #ffcc00;
}
/* Cuerpo */
.cuerpo {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
  height: auto;
  background-color: #8a7523;
}
/* Botón hamburguesa */
.menu-burger {
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  margin-left: 6px;
  justify-content: center;
}
/* Menú lateral */
.menu {
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40px; /* Menú cerrado */
  height:100%;
  background-color: rgb(236, 116, 6);
  transition: width 0.3s ease, background-color 0.3s ease;
  font-family: 'Roboto', Arial, sans-serif;
  overflow: hidden;
  z-index: 2; /*para que aparezca encima de las imagenes verticales de TrenEsquemasView.vue*/
}
/* Menú abierto */
.menu.open {
  width: 250px;
  background-color: rgb(236, 116, 6);
  border-right: 1px solid rgb(236, 116, 6);
 }
.menu:not(.open) .menu-burger {
  position: fixed;
  top: 80x;
}
/* Vuelve al flujo normal del documento */
.menu.open .menu-burger {
  position: static; 
}
/* Contenido del menú */
.menu-contenido {
  display: flex;
  flex-direction: column;
}
/* Asegurar que el submenú sea visible cuando el menú esté abierto */
.menu.open .submenu-item {
  display: block !important;
}
/* Ocultar el submenú solo si el menú está cerrado */
.menu:not(.open) .submenu-item {
  display: none;
}
/* Ocultar contenido del menú cuando está plegado */
.menu:not(.open) .menu-contenido,
.menu:not(.open) .menu-option,
.menu:not(.open) .submenu-item{
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, visibility 0.3s;
}
/* Mostrar contenido del menú cuando está abierto */
.menu.open .menu-contenido,
.menu.open .menu-option,
.menu.open .submenu-item{
  visibility: visible;
  opacity: 1;
}
/* fin de Ocultar contenido del menú cuando está plegado */
/* Opciones del menú */
.menu-option {
  display: flex;
  align-items: center;
  margin: 8px 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: bisque;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}
.menu-option:hover {
  background-color: #ffcc00;
  color: black;
  font-weight: bold;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
}
/* Opción seleccionada */
.menu-option.selected {
  background-color: #ffcc00;
  color: red;
  font-weight: bold;
  border: 2px solid red;
  padding: 10px;
  height: auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: auto;
}
.menu-option.selected:hover {
  box-shadow: none;
}
/* Mostrar opciones cuando el menú está abierto */
.menu.open .menu-trenes,
.menu.open .menu-trenes-item,
.menu.open .menu-opciones-tren,
.menu.open .menu-opciones-tren-item {
  display: block;
}
/* Submenú */
.submenu-item {
  display: block;
  padding: 7px;
  margin: 5px 25px;
  text-decoration: none;
  color: black;
  border-radius: 15px;
  background-color: white;
  transition: all 0.3s ease;
  cursor: pointer;
}
.submenu-item:hover {
  background-color: orange;
  color: black;
  font-weight: bold;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.8);
}
/* Ocultar submenú cuando el menú está cerrado */
.menu:not(.open) .submenu-item,
.menu:not(.open) .menu-opciones-tren-item {
  display: none;
}
/* Submenú seleccionado */
.selected-submenu {
  font-weight: bold;
  text-decoration: none;
  color: #0077cc;
}
</style>

