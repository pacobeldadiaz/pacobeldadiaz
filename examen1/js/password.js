// Usuario y contraseña válidas 
const usuarioValido = "1";
const passwordValido = "1";

// Función para avanzar al siguiente paso
function nextStep() {
    const username = document.getElementById("username").value;
    if (username === "") {
        alert("Por favor, introduce un nombre de usuario.");
    } else {
        document.getElementById("paso1").classList.remove("activo");
        document.getElementById("paso2").classList.add("activo");
    }
}
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === usuarioValido && password === passwordValido) {
        showResult("Datos Correctos. Bienvenido, " + username + "!", false);
        setTimeout(visible, 1 * 3000);
        window.location.href = "tareas.html"; // Redirige a la segunda pagina, pero no funciona
        
    } else {
        showResult("Error: El Usuario o contraseña son incorrectos.", true);
    }
}
function showResult(message, isError) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = message;
    if (isError) {
        resultDiv.classList.add("error");
    } else {
        resultDiv.classList.remove("error");
    }
    document.getElementById("paso2").classList.remove("activo");
    resultDiv.style.display = "block";
   };

 
