//document.addEventListener('DOMContentLoaded', inicializarEnlaces);
// Espera a que el DOM esté completamente cargado


    // importar el archivo JSON
    import Filemenu from '../data/menu.json' with {type: 'json'};
    
    // Obtener los elementos del DOM, para agrregar los elementos del html [li dinamicamente] 
    const listadoMenu = document.querySelector('#listado-menu'); //todos los links de las unidades en menu izq
    const listaLinks = document.querySelector('#lista-links');   //todos los links de las unidades (pruebas centro)
    const cuerpo = document.querySelector('#cuerpo');  // Contenedor donde se insertarán las imágenes y enlaces
    const listadoTren = document.querySelector('#listado-tren');  //boton tren-menu index.html
    const imagen4100 = document.querySelector('#imagen-4100');    //boton 4100
    const imagen4200 = document.querySelector('#imagen-4200');    //boton 4200
    const unidad =document.querySelector('#id-unidad');
    const enlace = document.querySelector('a');
    const serieTren = enlace.getAttribute('serie-tren');
    const enlaces = document.querySelectorAll('#listado-tren a'); //para capturar el click sobre enlace <a href="#" serie-tren="4x00"...
    console.log(serieTren); // "4100"
   // const unidad = idUnidad.textContent;
   console.log("enlace=",enlace);
   console.log("enlaces=",enlaces);
    console.log("serieTren",serieTren);
    console.log("listadoMenu",listadoMenu);
    console.log("unidad",unidad);
    console.log("urlActual",window.location.href); 

    
    // Función para llenar la lista de links en el HTML 
    function listadoLinks(unidad) {
        // Primero limpiamos el contenido del ul
        console.log("listado"+unidad);
        listadoMenu.innerHTML = '';

        // Recorremos el array Filemenu para obtener las opciones correspondientes
        Filemenu.forEach(elementoMenu => {
            if (elementoMenu.tren === unidad) {  // Solo elementos donde tren es "4100" o "4200"
                // Crear un nuevo <li> para cada elemento en el JSON
                const listadoMenuElement = document.createElement('li');
                
                // Crear un nuevo <a> para cada <li> y asignamos el link y el nombre
                const enlace = document.createElement('a');// Crear el elemento <a>
                console.log("q1enlace=",enlace);
                enlace.href = elementoMenu.link;  // Asignamos el href del link
                console.log("q2enlace.href=",enlace.href);
                enlace.innerText = elementoMenu.nombre;  // Asignamos el nombre como texto del enlace
                console.log("q3enlace.innerText=",enlace.innerText);

                // Añadimos el enlace al <li>
                listadoMenuElement.appendChild(enlace);
                console.log("q4listadoMenuElement.appendChild=",listadoMenuElement.appendChild);

                // Finalmente, añadimos el <li> al <ul>
                listadoMenu.appendChild(listadoMenuElement);
                console.log("q5listadoMenu.appendChild=",listadoMenu.appendChild);
            }
        });
    }

    // Añadir event listeners a los enlaces dentro de #listado-tren
    const enlacesTrenesTexto = document.querySelectorAll('#listado-tren a');
    enlacesTrenesTexto.forEach(enlace => {
        enlace.addEventListener('click', (evento) => {
            evento.preventDefault();  // Prevenir que se siga el enlace

            // Obtenemos el valor del atributo serie-tren (4100 o 4200)
            const trenSeleccionado = enlace.getAttribute('serie-tren');
            console.log(trenSeleccionado);
            // Llamamos a la función listadoLinks para cargar el menú correspondiente
            listadoLinks(trenSeleccionado);

            // Llamamos a la función para ocultar la imagen correspondiente
            //ocultarImagenes(trenSeleccionado);

            // Llamamos a la función para mostrar la imagen correspondiente 
            //mostrarImagenes();

            // Llamamos a la función mostrarImagenesYEnlaces para cargar la imagen y el menú correspondiente
            mostrarImagenesYEnlaces(trenSeleccionado);
            console.log("🚗",trenSeleccionado)

            // Cambiar el fondo del botón seleccionado (4100/4200)
            cambiarFondoBoton(trenSeleccionado);
            console.log("👱‍♂️",trenSeleccionado)
        });
    });


    function cambiarFondoBoton(trenSeleccionado) {
        // Primero, eliminamos la clase 'selected' de todos los botones
        const enlacesTrenes = document.querySelectorAll('#listado-tren a');
        enlacesTrenes.forEach(enlace => {
            console.log("borrar",enlace,"=",trenSeleccionado);    
            enlace.classList.remove('selected');
        });
    
        // Ahora, añadimos la clase 'selected' al botón correspondiente
        const botonSeleccionado = document.querySelector(`#listado-tren a[serie-tren="${trenSeleccionado}"]`);
        if (botonSeleccionado) {
            console.log("pintar",enlace,"=",trenSeleccionado); 
            botonSeleccionado.classList.add('selected');
        }
    }   



/* no funcionan
// Este script se encargará de mostrar el listado si estamos en la URL correcta
document.addEventListener('DOMContentLoaded', function() {
    // Obtenemos la URL de la página actual
    const urlActual = window.location.href;

    // Verificamos si la URL contiene "4200superior.html"
    if (urlActual.includes('4200superior.html')) {
        // Si es así, mostramos el listado
        console.log("☸4200superior");
        if (urlActual.includes('4200')) {console.log("☸4200");listadoLinks(4200);console.log("☸4200-ok");}
        listadoTren(4200);
       //const listado = document.getElementById('listado-serie');
        //listado.style.display = 'block';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Obtén todos los enlaces dentro de #listado-tren
    const enlaces = document.querySelectorAll('#listado-tren a');

    // Recorre todos los enlaces y asigna un evento de clic
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(evento) {
            evento.preventDefault();  // Previene el comportamiento por defecto del enlace (evitar que cambie la URL)

            // Obtén el valor del atributo 'serie-tren'
            const serieTren = enlace.getAttribute('serie-tren');

            // Llamar a la función listadoLinks con el valor de serie-tren
            listadoLinks(serieTren);

            // Cambiar la clase 'selected' para resaltar el enlace seleccionado
            enlaces.forEach(enlace => enlace.classList.remove('selected'));  // Quitar la clase 'selected' de todos los enlaces
            enlace.classList.add('selected');  // Añadir la clase 'selected' al enlace clicado
        });
    });
});

*/






    //  CUERPO = IMAGENES TRENES 4100 Y 4200 ******************************************************
    //********************************************************************************************

    // EN CUERPO ==> Función para llenar el contenedor #cuerpo con las imágenes 4100 y 4200 y sus enlaces
    function mostrarImagenesYEnlaces(tren) {
        // Limpiar el contenido de #cuerpo antes de agregar nuevos elementos
        if (tren === "menu") {
            console.log('menu');
            window.location.href = "index.html";
            //return;
            //location.reload(); // Si es "menu", no limpiamos el cuerpo, ya que vamos a mostrar ambas imágenes
        }

        cuerpo.innerHTML = ''; // Limpiar solo cuando no sea "menu"

        // Crear las imágenes y enlaces para la serie seleccionada
        const imagenTren = document.createElement('img');
        const enlaceTren = document.createElement('a');

        // Configurar los enlaces y las imágenes según la serie seleccionada
        if (tren === '4100') {
            imagenTren.src = 'img/serie4100h.png';
            imagenTren.width = 1000;
            imagenTren.alt = 'SERIE 4100';
            enlaceTren.href = '#';
            enlaceTren.innerText = '';
        } else if (tren === '4200') {
            imagenTren.src = 'img/serie4200h.png';
            imagenTren.width = 1000;
            imagenTren.alt = 'SERIE 4200';
            enlaceTren.href = '#';
            enlaceTren.innerText = '';
        }

        // Añadir un evento de clic a la imagen para ejecutar la función listadoLinks(trenSeleccionado)
        enlaceTren.addEventListener('click', (evento) => {
            evento.preventDefault();  // Prevenir la navegación predeterminada

            // Llamar a la función listadoLinks pasando el tren seleccionado
            listadoLinks(tren);
        });

        // Añadir la imagen y el enlace al contenedor #cuerpo
        cuerpo.appendChild(imagenTren);
        cuerpo.appendChild(enlaceTren);
    }



    // Añadir event listeners a las imágenes de los 2 trenes dentro de #cuerpo para seleccionar 4100 o 4200
    const imagenesTrenes = document.querySelectorAll('#cuerpo a');
    imagenesTrenes.forEach(imagen => {
        imagen.addEventListener('click', (evento) => {
            evento.preventDefault();  // Prevenir que se siga el enlace

            // Obtenemos el valor del atributo serie-tren (4100 o 4200)
            const trenSeleccionado = imagen.getAttribute('serie-tren');

            // Llamamos a la función listadoLinks para cargar el menú correspondiente
            listadoLinks(trenSeleccionado);

            // Llamamos a la función para ocultar la imagen correspondiente
            ocultarImagenes(trenSeleccionado);
        });
    });



// Función para ocultar las imágenes de los trenes 4100 y 4200 del cuerpo al hacer clic en ellas
function ocultarImagenes(unidad) {
    if (unidad === '4100') {
        if (imagen4200) {
            imagen4200.style.display = 'none';  // Oculta la imagen y enlace de la serie 4200
        }
    } else if (unidad === '4200') {
        if (imagen4100) {
            imagen4100.style.display = 'none';  // Oculta la imagen y enlace de la serie 4100
        }
}
}


function mostrarImagenes() {
    imagen4100.style.display = 'block';  // Muestra la imagen de la serie 4100
    imagen4200.style.display = 'block';  // Muestra la imagen de la serie 4200
}

