console.log('JS RECIBIR cargado');
const usuarioRecibido=document.querySelector('#usuario-recibido');
//usuarioRecibido.textContent = 'Nombre de Usuario: ' + localStorage.getItem('valorNombre');
usuarioRecibido.textContent += localStorage.getItem('valorNombre');
console.log(localStorage.getItem('valorNombre'));
