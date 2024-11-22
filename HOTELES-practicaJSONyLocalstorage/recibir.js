console.log('JS RECIBIR cargado');
const hotelFilterName = document.querySelector('#hotel-filter-name');
const buttonFilterHotel = document.querySelector('#button-filter-hotel');
//constantes del input ciudad
const provinciaFilterName = document.querySelector('#provincia-filter-name');
const buttonFilterProvincia = document.querySelector('#button-filter-provincia');
//select ciudades
const selectProvincia = document.querySelector('#select-provincia');
const buttonFilterSelectProvincia = document.querySelector('#button-filterselect-provincia');
//box provincias
//const boxProvincias = document.querySelector('#box-provincias');
const buttonBoxFilterProvincias = document.querySelector('#button-box-filter-provincias');
//constante aseos
const aseoFilterName = document.querySelector('#aseo-filter-name');
const buttonFilterAseo = document.querySelector('#button-filter-aseo');
//constante cama
const camaFilterName = document.querySelector('#cama-filter-name');
const buttonFilterCama = document.querySelector('#button-filter-cama');
//constante variasProvincias
const variasProvinciasFilterName = document.querySelector('#variasProvincias-filter-name');
const buttonFiltervariasProvincias = document.querySelector('#button-filter-variasProvincias'); 

const buttonfiltradoBooking= document.querySelector('#button-filtrado-booking');
const buttonfiltradoGeneral= document.querySelector('#button-filtrado-general');

const buttonimprimirJSON= document.querySelector('#imprimir');


/*  LOCALSTORAGE   basico      *************************************/
/****************************************************************** */

const usuarioRecibido= localStorage.getItem('valorNombre');
console.log(usuarioRecibido);
// Recuperar el valor del nombre del usuario desde localStorage, actualizando contenido del h1
const usuarioH1 = document.getElementById('usuario-recibido');
if (usuarioRecibido) {
    usuarioH1.innerText += ` ${usuarioRecibido}`;
} else {
    usuarioH1.innerText += ' No se encontró un usuario en LocalStorage.';
}


/******   TODOS LOSHOTELES recibidos con STRINGFY ****muestra 1 solo ********/
/****************************************************************************/

    // Recuperar los datos JSON desde LocalStorage
    const datosJSONrecuperados = localStorage.getItem('datosJSON-HOTEL');
    console.log(datosJSONrecuperados);

    if (datosJSONrecuperados) {
        // parsear el JSON recuperado
        const DataJSONparseados = JSON.parse(datosJSONrecuperados);

        // Crear botones para cada hotel y mostrar detalles
        function crearBotonesLinkHoteles() {
            const listadoBotones = document.getElementById('listado-hoteles');
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
            const hotel = DataJSONparseados [index];
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




//********************************************************************************* */








//dentro del listado crear botones pongo el filtrado de hoteles
//quiero un filtro de hoteles para el input id="hotel-filter-name" que al pulsar el button id="button-filter-hotel"
//que muestre los hoteles filtrados //

buttonFilterHotel.addEventListener('click', () => {
    const filterNombreHotel = hotelFilterName.value.trim(); // Obtener el valor ingresado en el input
    console.log("Valor ingresado en el filtro:", filterNombreHotel);

    // Buscar el hotel por nombre en el array
    const hotelEncontrado = DataJSONparseados.find(
        hotel => hotel.nombre_hotel.toLowerCase() === filterNombreHotel.toLowerCase()
    );

    if (hotelEncontrado) {
        console.log("Hotel encontrado:", hotelEncontrado);
        // Mostrar los detalles del hotel encontrado
        const detallesContainer = document.getElementById('detalles');
        detallesContainer.innerHTML = `
            <h3>Detalles del Hotel</h3>
            <p><strong>Hotel:</strong> ${hotelEncontrado.nombre_hotel}</p>
            <p><strong>Estrellas:</strong> ${hotelEncontrado.estrellas}</p>
            <p><strong>Valoración:</strong> ${hotelEncontrado.valoracion_clientes}</p>
            <p><strong>Precio por noche:</strong> ${hotelEncontrado.precio_noche} €/noche</p>
            <p><strong>Ciudad:</strong> ${hotelEncontrado.ciudad}</p>
            <p><strong>Cama:</strong> ${hotelEncontrado.tipo_cama}</p>
            <p><strong>Baño:</strong> ${hotelEncontrado.banio}</p>
        `;
    } else {
        console.warn("No se encontró un hotel con el nombre:", filterNombreHotel);
        const detallesContainer = document.getElementById('detalles');
        detallesContainer.innerHTML = `
            <h3>Detalles del Hotel</h3>
            <p>No se encontró un hotel con el nombre "${filterNombreHotel}".</p>
        `;
    }
});


     //********** funcion para imprimir LISTADO DE HOTELES JSON ****************
     function imprimirJSON(hotelesFiltrados) {
        buttonimprimirJSON.addEventListener('click', () => {
        console.log(hotelesFiltrados);
        localStorage.setItem('imprimir', JSON.stringify(hotelesFiltrados));
        // Redirigir a otra página    
        window.location.href = 'imprimir.html';
        });
    }







//seleccionar con el "input" filtro de provincias

buttonFilterProvincia.addEventListener('click', () => {
    const ciudadFiltro = provinciaFilterName.value.trim(); // Obtener el valor del input
    console.log("Ciudad ingresada en el filtro:", ciudadFiltro);

    // Filtrar hoteles por ciudad
    const hotelesFiltrados = DataJSONparseados.filter(
        hotel => hotel.ciudad.toLowerCase() === ciudadFiltro.toLowerCase()
    );

    // Mostrar los resultados filtrados
    const detallesContainer = document.getElementById('detalles');

    if (hotelesFiltrados.length > 0) {
        console.log("Hoteles encontrados:", hotelesFiltrados);
        detallesContainer.innerHTML = `
            <h3>Hoteles en ${ciudadFiltro}</h3>
            <ul>
                ${hotelesFiltrados
                    .map(hotel => `
                        <li>
                            <strong>${hotel.nombre_hotel}</strong> - 
                            ${hotel.estrellas} estrellas, 
                            ${hotel.precio_noche} €/noche
                        </li>
                    `)
                    .join('')}
            </ul>
        `;
    } else {
        console.warn("No se encontraron hoteles en la ciudad:", ciudadFiltro);
        detallesContainer.innerHTML = `
            <h3>Hoteles en ${ciudadFiltro}</h3>
            <p>No se encontraron hoteles en esta ciudad.</p>
        `;
    }
    //********** imprimir JSON ****************
   imprimirJSON(hotelesFiltrados);
});










//seleccionar con el desplegable de provincias filtro

buttonFilterSelectProvincia.addEventListener('click', () => {
    const ciudadFiltro = selectProvincia.value.trim(); // Obtener el valor del input
    console.log("Ciudad ingresada en el filtro:", ciudadFiltro);

    // Filtrar hoteles por ciudad
    const hotelesFiltrados = DataJSONparseados.filter(
        hotel => hotel.ciudad.toLowerCase() === ciudadFiltro.toLowerCase()
    );

    // Mostrar los resultados filtrados
    const detallesContainer = document.getElementById('detalles');

    if (hotelesFiltrados.length > 0) {
        console.log("Hoteles encontrados:", hotelesFiltrados);
        detallesContainer.innerHTML = `
            <h3>Hoteles en ${ciudadFiltro}</h3>
            <ul>
                ${hotelesFiltrados
                    .map(hotel => `
                        <li>
                            <strong>${hotel.nombre_hotel}</strong> - 
                            ${hotel.estrellas} estrellas, 
                            ${hotel.precio_noche} €/noche
                        </li>
                    `)
                    .join('')}
            </ul>
        `;
    } else {
        console.warn("No se encontraron hoteles en la ciudad:", ciudadFiltro);
        detallesContainer.innerHTML = `
            <h3>Hoteles en ${ciudadFiltro}</h3>
            <p>No se encontraron hoteles en esta ciudad.</p>
        `;
    }
    //********** imprimir JSON ****************
   imprimirJSON(hotelesFiltrados);
});
                
              


            









//seleccionmultiple PROVINCIAS CON CHECKBOXES

buttonBoxFilterProvincias.addEventListener('click', () => {
    // 1aº Deseleccionar todos los botones de radio del otro grupo "cama"
    const camaRadios = document.querySelectorAll('input[name="cama"]');
    camaRadios.forEach(radio => {
        radio.checked = false;
    });
    // 1bº Deseleccionar todos los botones de radio del otro grupo "aseo"
    const aseoRadios = document.querySelectorAll('input[name="aseo"]');
    aseoRadios.forEach(aseo => {
        aseo.checked = false;
    });

    // 2aº Deseleccionar todos los botones de radio del grupo general
    const camasRadios = document.querySelectorAll('input[name="camas"]');
    camasRadios.forEach(radio => {
        radio.checked = false;
    });
    const aseosRadios = document.querySelectorAll('input[name="aseos"]');
    aseosRadios.forEach(aseos => {
        aseos.checked = false;
    });

    // Obtener el CHECKBOX seleccionado
    // Seleccionar todos los checkboxes del grupo "box-variasProvincias"
    // Capturar todos los checkboxes seleccionados en el momento del clic
    const provinciaBoxFiltro = document.querySelectorAll('input[name="variasProvincias"]:checked');

    // Convertir NodeList a Array y obtener los valores seleccionados
    const valoresBoxProvinciasSeleccionados = Array.from(provinciaBoxFiltro).map(checkbox => checkbox.value);

    // Mostrar resultados en la consola o en la página
    if (valoresBoxProvinciasSeleccionados.length > 0) {
        console.log("Provincias seleccionadas:", valoresBoxProvinciasSeleccionados);
    } else {
        console.log("No se seleccionó ninguna provincia.");
        //alert("No se seleccionó ninguna provincia.");
    }
    // Verificar si se seleccionó algo
    if (!valoresBoxProvinciasSeleccionados) {
        console.warn("No se seleccionó ninguna provincia checkbox");
        document.getElementById('detalles').innerHTML = "<p>Por favor, selecciona mínimo una provincia</p>";   
        return;
    }
    console.log("Valores seleccionados: valoresBoxProvinciasSeleccionados:", valoresBoxProvinciasSeleccionados);

    // Filtrar hoteles por provincias (checkbox)
    //const valorBoxProvincia = provinciaBoxFiltro.value;
    //console.log("Valores seleccionados: valorBoxProvincia:", valorBoxProvincia);

    // Filtrar hoteles por provincias (checkbox)    
    const hotelesFiltrados = DataJSONparseados.filter(
        hotel => valoresBoxProvinciasSeleccionados.includes(hotel.ciudad)
    );

    // Mostrar los resultados filtrados
    const detallesContainer = document.getElementById('detalles');

    if (hotelesFiltrados.length > 0) {
        console.log("Hoteles encontrados:", hotelesFiltrados);
        detallesContainer.innerHTML = `
            <h3>Hoteles por provincias: ${valoresBoxProvinciasSeleccionados}</h3>
            ${hotelesFiltrados
                .map(hotel => `
                    <div>
                        <p><strong>Hotel:</strong> ${hotel.nombre_hotel} - 
                            <strong>Estrellas:</strong> ${hotel.estrellas} -
                            <strong>Valoración:</strong> ${hotel.valoracion_clientes} -
                            <strong>Precio por noche:</strong> ${hotel.precio_noche} €/noche</p>
                            <p><strong>Ciudad:</strong> ${hotel.ciudad} -
                            <strong>Cama:</strong> ${hotel.tipo_cama} -
                            <strong>Baño:</strong> ${hotel.banio}</p>
                            <hr />
                        </div>
                    `)
                    .join('')}
            `;
        } else {
            console.warn("No se encontraron hoteles con:", valoresBoxProvinciasSeleccionados)
            detallesContainer.innerHTML = `
                <h3>Hoteles por Provincias: ${valoresBoxProvinciasSeleccionados}</h3>
                <p>No se encontraron hoteles en estas provincias</p>
            `;
        }
        //********** imprimir JSON ****************
         imprimirJSON(hotelesFiltrados);
    });












//seleccionmultiple (aseo)

buttonFilterAseo.addEventListener('click', () => {
    // 1º Deseleccionar todos los botones de radio del otro grupo "cama"
    const camaRadios = document.querySelectorAll('input[name="cama"]');
    camaRadios.forEach(radio => {
        radio.checked = false;
    });
    // 2º Deseleccionar todos los botones de radio del otro grupo "provincia"
    const provinciaRadios = document.querySelectorAll('input[name="provincia"]');
    provinciaRadios.forEach(provincia => {
        provincia.checked = false;
    });
    // 3º Deseleccionar todos los botones de radio del  grupo general
    const aseosRadios = document.querySelectorAll('input[name="aseos"]');
    aseosRadios.forEach(radio => {
        radio.checked = false;
    });
    const camasRadios = document.querySelectorAll('input[name="camas"]');
    camasRadios.forEach(radio => {
        radio.checked = false;
    });

    // Obtener el botón de radio seleccionado
    const aseoFiltro = document.querySelector('input[name="aseo"]:checked');
    //console.log("Valores seleccionados: aseo:", aseoFiltro.value);
    
    // Verificar si se seleccionó un botón de radio aseo
    if (!aseoFiltro) {
        console.warn("No se seleccionó ningún tipo de aseo.");
        document.getElementById('detalles').innerHTML = "<p>Por favor, selecciona un tipo de aseo</p>";   
        return;
    }

    const valorAseo = aseoFiltro.value.trim();
    console.log("Valores seleccionados: valorAseo:", valorAseo);

    // Filtrar hoteles por tipo de aseo
    const hotelesFiltrados = DataJSONparseados.filter(
        hotel => hotel.banio.toLowerCase() === valorAseo.toLowerCase()
    );

    // Mostrar los resultados filtrados
    const detallesContainer = document.getElementById('detalles');

    if (hotelesFiltrados.length > 0) {
        console.log("Hoteles encontrados:", hotelesFiltrados);
        detallesContainer.innerHTML = `
            <h3>Hoteles con ${valorAseo}</h3>
            ${hotelesFiltrados
                .map(hotel => `
                    <div>
                        <p><strong>Hotel:</strong> ${hotel.nombre_hotel} - 
                            <strong>Estrellas:</strong> ${hotel.estrellas} -
                            <strong>Valoración:</strong> ${hotel.valoracion_clientes} -
                            <strong>Precio por noche:</strong> ${hotel.precio_noche} €/noche</p>
                            <p><strong>Ciudad:</strong> ${hotel.ciudad} -
                            <strong>Cama:</strong> ${hotel.tipo_cama} -
                            <strong>Baño:</strong> ${hotel.banio}</p>
                            <hr />
                        </div>
                    `)
                    .join('')}
            `;
        } else {
            console.warn("No se encontraron hoteles con:", valorAseo)
            detallesContainer.innerHTML = `
                <h3>Hoteles con ${valorAseo}</h3>
                <p>No se encontraron hoteles con este tipo de aseo</p>
            `;
        }
        //********** imprimir JSON ****************
         imprimirJSON(hotelesFiltrados);
    });









//seleccionmultiple (cama)

buttonFilterCama.addEventListener('click', () => {

    // 1º Deseleccionar todos los botones de radio del otro grupo "provincia"
    const provinciaRadios = document.querySelectorAll('input[name="provincia"]');
    provinciaRadios.forEach(provincia => {
        provincia.checked = false;
    });
    // 2º Deseleccionar todos los botones de radio del otro grupo "aseo"
    const aseoRadios = document.querySelectorAll('input[name="aseo"]');
    aseoRadios.forEach(aseo => {
        aseo.checked = false;
    });
    // 3º Deseleccionar todos los botones de radio del  grupo general
    const aseosRadios = document.querySelectorAll('input[name="aseos"]');
    aseosRadios.forEach(radio => {
        radio.checked = false;
    });
    const camasRadios = document.querySelectorAll('input[name="camas"]');
    camasRadios.forEach(radio => {
        radio.checked = false;
    });


    // Obtener el botón de radio seleccionado
    const camaFiltro = document.querySelector('input[name="cama"]:checked');
    //console.log("Valores seleccionados:cama:", camaFiltro.value);
    
    // Verificar si se seleccionó un botón de radio cama
    if (!camaFiltro) {
        console.warn("No se seleccionó ningún tipo de cama.");
        document.getElementById('detalles').innerHTML = "<p>Por favor, selecciona un tipo de cama</p>";   
        return;
    }

    const valorCama = camaFiltro.value.trim();
    console.log("Valores seleccionados: valorCama:", valorCama);

    // Filtrar hoteles por tipo de cama
    const hotelesFiltrados = DataJSONparseados.filter(
        hotel => hotel.tipo_cama.toLowerCase() === valorCama.toLowerCase()
    );

    // Mostrar los resultados filtrados
    const detallesContainer = document.getElementById('detalles');

    if (hotelesFiltrados.length > 0) {
        console.log("Hoteles encontrados:", hotelesFiltrados);
        detallesContainer.innerHTML = `
            <h3>Hoteles con Tipo de cama: ${valorCama}</h3>
            ${hotelesFiltrados
                .map(hotel => `
                    <div>
                        <p><strong>Hotel:</strong> ${hotel.nombre_hotel} - 
                            <strong>Estrellas:</strong> ${hotel.estrellas} -
                            <strong>Valoración:</strong> ${hotel.valoracion_clientes} -
                            <strong>Precio por noche:</strong> ${hotel.precio_noche} €/noche</p>
                            <p><strong>Ciudad:</strong> ${hotel.ciudad} -
                            <strong>Cama:</strong> ${hotel.tipo_cama} -
                            <strong>Baño:</strong> ${hotel.banio}</p>
                            <hr />
                        </div>
                    `)
                    .join('')}
            `;
        } else {
            console.warn("No se encontraron hoteles con Tipo de cama:", valorCama)
            detallesContainer.innerHTML = `
                <h3>Hoteles con Tipo de cama: ${valorCama}</h3>
                <p>No se encontraron hoteles con este tipo de cama</p>
            `;
        }
        //********** imprimir JSON ****************
        imprimirJSON(hotelesFiltrados);
    });














        //seleccionmultiple (cama y aseo)
        buttonfiltradoGeneral.addEventListener('click', () => {

        // 2º Deseleccionar todos los botones de radio del otro grupo "provincia"
        const provinciaRadios = document.querySelectorAll('input[name="provincia"]');
        provinciaRadios.forEach(provincia => {
            provincia.checked = false;
        });
        // 1º Deseleccionar todos los botones de radio del otro grupo "aseo"
        const aseoRadios = document.querySelectorAll('input[name="aseo"]');
        aseoRadios.forEach(aseo => {
            aseo.checked = false;
        });

        // 1º Deseleccionar todos los botones de radio del otro grupo "cama"
        const camaRadios = document.querySelectorAll('input[name="cama"]');
        camaRadios.forEach(radio => {
        radio.checked = false;
         });

        // Obtener los valores seleccionados
        const aseoFiltro = document.querySelector('input[name="aseos"]:checked');
        const camaFiltro = document.querySelector('input[name="camas"]:checked');
    
        let valorCama = camaFiltro ? camaFiltro.value.trim() : "";
        let valorAseo = aseoFiltro ? aseoFiltro.value.trim() : "";
    
        // Verificar si ambos filtros están vacíos
        if (valorCama === "" && valorAseo === "") {
            console.warn("Debe seleccionar al menos un filtro.");
            document.getElementById('detalles').innerHTML = `
                <h3>No se seleccionaron filtros</h3>
                <p>Por favor, seleccione al menos un filtro para mostrar los resultados.</p>
            `;
            return; // Detener la ejecución si no hay filtros seleccionados
        }
    
        // Filtrar hoteles por ambos criterios
        const hotelesFiltrados = DataJSONparseados.filter(
            hotel =>
                (!valorAseo || hotel.banio.toLowerCase() === valorAseo.toLowerCase()) &&
                (!valorCama || hotel.tipo_cama.toLowerCase() === valorCama.toLowerCase())
        );
    
        const detallesContainer = document.getElementById('detalles');
        if (hotelesFiltrados.length > 0) {
            detallesContainer.innerHTML = `
                <h3>Hoteles con filtrado: tipo de aseo: ${valorAseo} y tipo de cama: ${valorCama}</h3>
                ${hotelesFiltrados
                    .map(hotel => `
                        <div>
                            <p><strong>Hotel:</strong> ${hotel.nombre_hotel} - 
                            <strong>Estrellas:</strong> ${hotel.estrellas} -
                            <strong>Valoración:</strong> ${hotel.valoracion_clientes} -
                            <strong>Precio por noche:</strong> ${hotel.precio_noche} €/noche</p>
                            <p><strong>Ciudad:</strong> ${hotel.ciudad} -
                            <strong>Cama:</strong> ${hotel.tipo_cama} -
                            <strong>Baño:</strong> ${hotel.banio}</p>
                            <hr />
                        </div>
                    `)
                    .join('')}
            `;
        } else {
            detallesContainer.innerHTML = `
                <h3>No se encontraron hoteles</h3>
                <p>No hay hoteles que cumplan con los filtros seleccionados.</p>
            `;
        }
        //********** imprimir JSON ****************
         imprimirJSON(hotelesFiltrados);
    });

        








    // Inicializar la página creando los botones de los hoteles
        crearBotonesLinkHoteles();
    } else {
        console.error('No se encontraron datos JSON en LocalStorage.');
}



