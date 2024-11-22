console.log('JS ENVIAR cargado');
import Datajson from './data/data.json' with {type: 'json'};



/*localstorage basico *********/
/***************************** */
const nombreUsuario = document.querySelector('#usuario'); // Selector correcto
const btnEnviar = document.getElementById('btn-enviar');  // Sin '#' en getElementById

btnEnviar.addEventListener('click', () => {
    const nombre = nombreUsuario.value.trim(); // Verifica que el valor no esté vacío

    if (nombre) {
        localStorage.setItem('valorNombre', nombre); // Guardar en LocalStorage
        console.log("Nombre guardado:", nombre);

        // Redirigir a otra página
        window.location.href = 'recibir.html';
    } else {
        console.log("El campo de nombre está vacío");
        alert("Por favor, introduce un nombre.");
    }
});



/*localstorage del json *********/
/***************************** */
const btnLocalStorage = document.querySelector("#btn-local-storage"); // Selector correcto

btnLocalStorage.addEventListener('click', () => {
    // Serializar el JSON y guardarlo en LocalStorage
    localStorage.setItem('datosJSON-HOTEL', JSON.stringify(Datajson));
    localStorage.setItem('datosJSON-HOTEL-bruto', (Datajson)); //como objeto no va

    console.log('Datos del JSON guardados:', Datajson);

    // Redirigir a otra página
    window.location.href = 'recibir.html';
});


/************************************************************************* */
//**** funcion get para saca datos del JSON: "nombre__hotel"  y los devuelve en un Array **************** */
function getNombres(){
    let ArrayNombres = [];

    Datajson.forEach(listadoData => {
        ArrayNombres.push(listadoData.nombre);
    });
    return ArrayNombres;
}
var ArrayNombresHotel = getNombres();



/* link botones HOTELES *********************************************************/
// Seleccionar elementos del DOM
//import Datajson from './data/data.json' with {type: 'json'};

// Seleccionar elementos del DOM
//const listadoBotones = document.getElementById('listado-hoteles');
//const detallesContainer = document.getElementById('detalles');
// Función para crear los botones de los hoteles dentro de <li>**********
function crearBotonesLinkHoteles() {
    // Limpiar el listado antes de agregar elementos
    const listadoBotones = document.getElementById('listado-hoteles');
    listadoBotones.innerHTML = ''; // Limpiar antes de agregar

    Datajson.forEach((hotel, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = hotel.nombre_hotel;
        button.className = 'hotel-button';
        button.addEventListener('click', () => mostrarDetallesHoteles(index)); // Mostrar detalles
        li.appendChild(button);
        listadoBotones.appendChild(li);
    });
}

// Función para mostrar los detalles de un hotel
function mostrarDetallesHoteles(index) {
    const detallesContainer = document.getElementById('detalles');
    const hotel = Datajson[index];
    detallesContainer.innerHTML = `
        <h3>Detalles del Hotel</h3>
        <p><strong>Hotel:</strong> ${hotel.nombre_hotel}</p>
        <p><strong>Estrellas:</strong> ${hotel.estrellas}</p>
        <p><strong>Valoración:</strong> ${hotel.valoracion_clientes}</p>
        <p><strong>Precio por noche:</strong> ${hotel.precio_noche} €/noche</p>
        <p><strong>Ciudad:</strong> ${hotel.ciudad}</p>
        <p><strong>Cama:</strong> ${hotel.tipo_cama}</p>
        <p><strong>Baño:</strong> ${hotel.banio}</p>
    `;
};

/* fin link botones HOTELES****************************************************/








//llamada a la función para meter los datos del json en el array

// Seleccionamos los elementos del DOM
const listadoHabitaciones = document.getElementById('habitaciones');

// Función para cargar el JSON y meter las habitaciones
function fun_CargarListadoHabitaciones() {
    // Limpiar el listado antes de agregar elementos
    listadoHabitaciones.innerHTML = '';

    // Crear elementos <li> para cada habitación
    Datajson.forEach((habitacion,index) => {
        const li = document.createElement('li');
        li.textContent = `
            Hotel: ${habitacion.nombre_hotel}, 
            Estrellas: ${habitacion.estrellas}, 
            Valoración: ${habitacion.valoracion_clientes}, 
            Precio: ${habitacion.precio_noche}€/noche, 
            Ciudad: ${habitacion.ciudad}, 
            Cama: ${habitacion.tipo_cama}, 
            Baño: ${habitacion.banio}
        `;
        /* boton borrar *********************************/
        const NuevoBotonBorrarLineaJson = document.createElement('button'); //*
        NuevoBotonBorrarLineaJson.innerText= '❌';
       
        // 1º Añadir el botón ❌ al li *************************************************
        listadoHabitaciones.appendChild(NuevoBotonBorrarLineaJson);
        // 1º Añadir el botón ❌ al li *************************************************    

        //LISTENER: para cuando pulse los botones nuevos de borrar/editar
        NuevoBotonBorrarLineaJson.addEventListener('click',()=>{

        // Eliminar el usuario del arreglo Datajson
        Datajson.splice(index, 1);  // Elimina el usuario en la posición 'index'

        // Volver a renderizar la lista actualizada
        fun_CargarListadoHabitaciones();  // Vuelve a mostrar la lista con el usuario eliminado
        /* fin boton borrar *********************************/
    });
        listadoHabitaciones.appendChild(li);
    });
}






const listadoHabitacionesINPUT = document.getElementById('habitacionesINPUT');

function fun_CargarListadoHabitacionesINPUT() {
    // Limpiar el listado antes de agregar elementos
    listadoHabitacionesINPUT.innerHTML = '';

    // Crear un contenedor con inputs para cada habitación
    Datajson.forEach((habitacion,index) => {  /*  añadir index para poder borrar */
        const div = document.createElement('div');
        div.className = 'habitacion';

        div.innerHTML = `
            <label>Hotel: <input type="text" value="${habitacion.nombre_hotel}" readonly></label>
            <label>Estrellas: <input type="text" value="${habitacion.estrellas}" readonly></label>
            <label>Valoración: <input type="text" value="${habitacion.valoracion_clientes}" readonly></label>
            <label>Precio: <input type="text" value="${habitacion.precio_noche} €/noche" readonly></label>
            <label>Ciudad: <input type="text" value="${habitacion.ciudad}" readonly></label>
            <label>Cama: <input type="text" value="${habitacion.tipo_cama}" readonly></label>
            <label>Baño: <input type="text" value="${habitacion.banio}" readonly></label>
            <hr>
        `;

        listadoHabitacionesINPUT.appendChild(div);
    });
}




// Cargar los datos al inicio cuando se completa la carga del DOM
document.addEventListener('DOMContentLoaded', () => {
    fun_CargarListadoHabitacionesINPUT();
    fun_CargarListadoHabitaciones();
    crearBotonesLinkHoteles();
});









// // Cuando se hace clic en el botón para enviar los datos con LOCALSTORAGE
// document.querySelector('#btn-localstorage').addEventListener('click', () => {
//     // Serializar los datos JSON en un string
//     localStorage.setItem('datosJSON', JSON.stringify(Datajson));
//     console.log("Datos guardados en localStorage");

//     // Redirigir a otra página
//     window.location.href = 'recibir.html';
// });