// ✅ Importar JSON con `import()`
export async function fetchMenuData() {
  try {

    const data = await import('../assets/data/menu.json');

    // Guardar en localStorage
    localStorage.setItem('menuItems', JSON.stringify(data.default));

    return data.default;
  } catch (error) {
    console.error("❌ Error cargando el menú:", error);
    return []; // Retorna un array vacío en caso de error
  }
}

// 🔹 Selección de los contenedores del menú
const menu = document.querySelector('.menu');
const menuBurger = document.querySelector('.menu-burger');
const contenido = document.querySelector('.contenido');
const menuTrenes = document.querySelector('.menu-trenes');
const contenidoGrid = document.querySelector('.contenido-grid');
const body = document.body;

/*************************************************************** */
/* MENU CARGA DE OPCIONES ************************************** */
/*************************************************************** */

// Verificar si la página cargada es index.html y eliminar 'selectedMenu'
if (window.location.pathname === '/index.html') {
    localStorage.removeItem('selectedMenu');
}

// ✅ Cargar el JSON para el menú
fetchMenuData().then(menuData => {
    if (!menuData.length) {
        console.error("⚠️ No se encontraron datos de menú.");
        return;
    }

    // Carga del menú principal y submenú lateral
    const opcionesMenuPrincipal = menuData.filter(item => item.menu === "menu-principal" && item.submenu !== "");

    opcionesMenuPrincipal.forEach(opcion => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-option';
        menuItem.setAttribute('data-submenu', opcion.submenu);

        // Crear contenido del menú
        const logotren = document.createElement('img');
        logotren.src = '../assets/img/tren-tram-icon_p.svg';
        logotren.height = 20;
        logotren.alt = 'tren';

        const texto = document.createElement('span');
        texto.textContent = opcion.nombre;

        menuItem.appendChild(logotren);
        menuItem.appendChild(texto);

        menuItem.addEventListener('click', () => {
            document.querySelectorAll('.menu-option').forEach(item => item.classList.remove('selected'));
            menuItem.classList.add('selected');
            menuTrenes.appendChild(menuItem);
            localStorage.setItem('selectedMenu', opcion.submenu);
            mostrarSubmenu(opcion.submenu);
        });

        menuTrenes.appendChild(menuItem);
    });

    // 🔹 Mostrar opciones del submenu
    function mostrarSubmenu(submenuId) {
        const opcionesSubmenu = menuData.filter(item => item.menu === submenuId);
        const opcionesContenedor = document.querySelector('.menu-opciones-tren');
        if (!opcionesContenedor) return console.error('⚠️ Contenedor del submenu no encontrado en el DOM');

        opcionesContenedor.innerHTML = '';
        if (opcionesSubmenu.length === 0) return;

        opcionesSubmenu.forEach(opcion => {
            const submenuItem = document.createElement('a');
            submenuItem.href = opcion.link;
            submenuItem.textContent = opcion.nombre;
            submenuItem.className = 'submenu-item';
            opcionesContenedor.appendChild(submenuItem);
        });
    }

    // 🔹 Cargar submenu almacenado en localStorage
    const selectedMenu = localStorage.getItem('selectedMenu');
    if (selectedMenu) {
        mostrarSubmenu(selectedMenu);
        const menuOptionSelected = document.querySelector(`.menu-option[data-submenu="${selectedMenu}"]`);
        if (menuOptionSelected) {
            document.querySelectorAll('.menu-option').forEach(item => item.classList.remove('selected'));
            menuOptionSelected.classList.add('selected');
            menuTrenes.appendChild(menuOptionSelected);
        }
    }

    // 🔹 Cargar tarjetas de trenes del INDEX
    const opcionesTarjetas = menuData.filter(item => item.menu === "menu-principal");
    if (contenidoGrid) {
        opcionesTarjetas.forEach(opcion => {
            const card = document.createElement('div');
            card.className = 'card';

            const trenImg = document.createElement('div');
            trenImg.className = 'trenImg';
            const img = document.createElement('img');
            img.src = opcion.img;
            img.alt = opcion.nombre;
            trenImg.appendChild(img);

            const trenTexto = document.createElement('div');
            trenTexto.className = 'trenTexto';
            const title = document.createElement('h1');
            title.textContent = opcion.nombre;
            const description = document.createElement('p');
            description.textContent = opcion.descripcion;

            trenTexto.appendChild(title);
            trenTexto.appendChild(description);
            card.appendChild(trenImg);
            card.appendChild(trenTexto);

            card.addEventListener('click', () => {
                window.location.href = opcion.link;
            });

            contenidoGrid.appendChild(card);
        });
    }
}).catch(error => console.error('❌ Error en la carga o procesamiento del menú:', error));

/*************************************************************** */
/* MENU PLEGADO Y DESPLEGADO *********************************** */
/*************************************************************** */
if (menuBurger && menu) {
    menuBurger.addEventListener('click', () => {
        menu.classList.toggle('open');
        if (contenido) contenido.style.marginLeft = menu.classList.contains('open') ? '240px' : '40px';
    });
}

// 🔹 Cerrar menú si se hace clic fuera
if (body && menu && menuBurger) {
    body.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuBurger.contains(e.target)) {
            menu.classList.remove('open');
            if (contenido) contenido.style.marginLeft = '40px';
        }
    });
}
