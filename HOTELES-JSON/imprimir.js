// Declarar la variable fuera del if para que sea accesible en todo el script
let DataJSONparseados = [];

// Recuperar los datos JSON desde LocalStorage
const datosJSONrecuperados = localStorage.getItem('imprimir');
console.log("localStorage-imprimir", datosJSONrecuperados);

if (datosJSONrecuperados) {
    // parsear el JSON recuperado
    DataJSONparseados = JSON.parse(datosJSONrecuperados);
    console.log("parseados", DataJSONparseados);
    // Llamar a la función después de parsear los datos
    crearListadoHoteles();
    crearBotonesLinkHoteles();
}

// Crear el listado de hoteles
function crearListadoHoteles() {
    const listadoHoteles = document.getElementById('listado-hoteles-detallado');
    listadoHoteles.innerHTML = ''; // Limpiar el listado antes de agregar

    DataJSONparseados.forEach((hotel) => {
        const li = document.createElement('li');
        li.className = 'hotel-item';
        li.innerHTML = `
            <p><strong>${hotel.nombre_hotel}</strong>: Estrellas: ${hotel.estrellas} - 
            Valoración: ${hotel.valoracion_clientes} - 
            Precio por noche ${hotel.precio_noche} €/noche - 
            Ciudad: ${hotel.ciudad} - Cama: ${hotel.tipo_cama} - Baño: ${hotel.banio}</p>
        `;
        listadoHoteles.appendChild(li);
    });
}

// Crear botones para cada hotel y mostrar detalles
function crearBotonesLinkHoteles() {
    const listadoBotones = document.getElementById('listado-hoteles-botones');
    listadoBotones.innerHTML = ''; // Limpiar antes de agregar

    DataJSONparseados.forEach((hotel, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = hotel.nombre_hotel;
        button.className = 'hotel-button';
        button.addEventListener('click', () => mostrarDetallesHoteles(index)); // Mostrar detalles
        li.appendChild(button);
        listadoBotones.appendChild(li);
    });
}

// Mostrar los detalles de un hotel específico
function mostrarDetallesHoteles(index) {
    const detallesContainer = document.getElementById('detalles');
    const hotel = DataJSONparseados[index];
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
}