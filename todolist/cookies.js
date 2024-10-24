//cookies 

    // Obtener la ventana de cookies
    var ventanaCookies = document.getElementById("idVentanaCookies"); //var del div


    // Obtener los botones de Aceptar y Cancelar
    var btnAceptarCookies = document.getElementById("idAceptarCookies"); //*****
    var btnCancelarCookies = document.getElementById("idCancelarCookies");

    // Mostrar la ventana de cookies si no se ha aceptado antes
    if (!localStorage.getItem("cookiesSeAceptaron")) {
        ventanaCookies.style.display = "block"; 
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
    };



setTimeout(Visible, 1 * 1500);

function Visible() {
    btnAceptarCookies.classList.remove('ocultar');
    btnCancelarCookies.classList.remove('ocultar');
};
