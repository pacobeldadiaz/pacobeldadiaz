const btnNueva=document.querySelector('#btn-nueva');
const txtNueva=document.querySelector('#nueva-tarea');
const tareas=document.querySelector('#tareas');

//click en boton nueva
btnNueva.addEventListener('click', ()=> {
    console.log('Añado nueva tarea');
    const nuevaTarea=document.createElement('li');          //li
    const nuevaTareaTitulo = document.createElement('span');//span
    const nuevaTareaBorrar = document.createElement('button');//*
    const nuevaTareaEditar = document.createElement('button');

    nuevaTareaTitulo.innerText=txtNueva.value;  //meter texto dentro del span
    nuevaTareaBorrar.innerText= '❌';     //*meter icono dentro del span
    nuevaTareaEditar.innerText = '✏️Editar';

    //LISTENER: para cuando pulse los botones nuevos de borrar/editar
    nuevaTareaBorrar.addEventListener('click',()=>{
        console.log('❌ Borrando la Tarea ⚠️', nuevaTareaTitulo.innerText);
        tareas.removeChild(nuevaTarea); // de las tareas borra esta tarea en la que esta el boton(nuevatarea)
    });

    nuevaTareaEditar.addEventListener('click', () => {
        console.log('✏️ Editando la tarea 👉🏻', nuevaTarea.innerText);

        const tareaEditada = prompt('Cambia el nombre de la tarea', nuevaTareaTitulo.innerText);
        nuevaTareaTitulo.innerText = tareaEditada;        
    });
   


    // continuamos con el codigo, fuera de los listener
    nuevaTarea.appendChild(nuevaTareaTitulo);
    nuevaTarea.appendChild(nuevaTareaBorrar);//*
    nuevaTarea.appendChild(nuevaTareaEditar);
   
    tareas.appendChild(nuevaTarea);//*mete las pequeñas tareas en el li de tareas
    txtNueva.value='';
    txtNueva.focus();

});//fin click botones


    
 

// Obtener la ventana de cookies
var ventanaCookies = document.getElementById("idVentanaCookies"); //var del div

// Obtener los botones de Aceptar y Cancelar
var btnAceptarCookies = document.getElementById("idAceptarCookies"); //*****
var btnCancelarCookies = document.getElementById("idCancelarCookies");

// Mostrar la ventana de cookies si no se ha aceptado antes
if (!localStorage.getItem("cookiesSeAceptaron")) {
    ventanaCookies.style.display = "block"; //no entiendo????
};

// Función para cerrar la ventana de cookies cuando se hace clic en Aceptar
btnAceptarCookies.onclick = function() { //*****
    ventanaCookies.style.display = "none";
    localStorage.setItem("cookiesSeAceptaron", false); //almacena en localstorage-cookiesSeAceptaron=true
};

// Función para cerrar la ventana de cookies cuando se hace clic en Cancelar
btnCancelarCookies.onclick = function() {
    ventanaCookies.style.display = "none";
    window.location.href = "about:blank"; // Redirige a una página en blanco
}

setTimeout(visible, 1 * 1500);

function visible() {
    btnAceptarCookies.classList.remove('ocultar');
    btnCancelarCookies.classList.remove('ocultar');
};
    


 
 
