console.log('JS ENVIAR cargado');
const nombreUsuario=document.querySelector('#usuario');
document.querySelector('#btn-enviar').addEventListener('click', () => {
    localStorage.setItem('valorNombre', nombreUsuario.value);
    console.log(nombreUsuario);
    window.location.href = 'recibir.html';
})
