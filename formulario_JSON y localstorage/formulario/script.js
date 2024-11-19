import Datajson from './data.json' with {type: 'json'};

//const nombreJson = document.querySelector('#pokemon-filter-name');
//const buttonFilterNombreJson = document.querySelector('#button-filter-pokemon');


//funcion getUsuarios saca del JSON los Usuarios y los devuelve en un Array
function getUsuarios(){
    let ArrayUsuarios = [];

    Datajson.forEach(formularioData => {
        ArrayUsuarios.push(formularioData.nombre);
    });
    return ArrayUsuarios;
}

//llamada a la función para meter los datos del json en el array
var ArrayUsuarios = getUsuarios();





const txtNombre = document.querySelector('#nombre');
const txtEmail = document.querySelector('#e-mail');
const optAli = document.querySelector('#optAli');
const optVal = document.querySelector('#optVal');
const optCas = document.querySelector('#optCas');
const btnEnviar = document.querySelector('#btn-enviar');

const nombreEditar = document.querySelector('#nombreEditar');
const emailEditar = document.querySelector('#emailEditar');
const optAliEditar = document.querySelector('#optAliEditar');
const optValEditar = document.querySelector('#optValEditar');
const optCasEditar = document.querySelector('#optCasEditar');
const btnEditar = document.querySelector('#btn-editar');
const btnGuardar = document.querySelector('#btn-guardar');

btnEnviar.addEventListener('click', ()=> {
    console.log('pulsado enviar',txtNombre.value,txtEmail.value);
    nombreEditar.textContent = txtNombre.value;
    emailEditar.textContent = txtEmail.value;
    optAliEditar.textContent=optAli.checked;
    optValEditar.textContent=optVal.checked;
    optCasEditar.textContent=optCas.checked;
    // vaciar formulario1 y ver botón Editar (quita ocultar)
    console.log('checkAli=',optAli.checked);
    txtNombre.value="";
    txtEmail.value="";
    optAli.checked=false;
    optVal.checked=false;
    optCas.checked=false;
    btnEditar.classList.remove('ocultar');
    btnGuardar.classList.remove('ocultar');
})

btnEditar.addEventListener('click', ()=> {
    txtNombre.value = nombreEditar.textContent;
    txtEmail.value = emailEditar.textContent;
    if (optAliEditar.textContent=="true"){
        optAli.checked=true
    } else {
        optAli.checked=false
    };
    if (optValEditar.textContent=="true"){
        optVal.checked=true
    } else {
        optVal.checked=false
    };
    if (optCasEditar.textContent=="true"){
        optCas.checked=true
    } else {
        optCas.checked=false
    };
    // vaciar formulario2 y quitar botón Editar (añade ocultar) para que no pulsen otra vez y borre formulario1
    console.log('pulsado editar',optAliEditar.textContent,":",optAli.checked);
    nombreEditar.textContent="";
    emailEditar.textContent="";
    optAliEditar.textContent=null;
    optValEditar.textContent=null;
    optCasEditar.textContent=null;
    btnEditar.classList.add('ocultar');
    btnGuardar.classList.add('ocultar');
})

//json

 //guardar al json
 btnGuardar.addEventListener('click', ()=> {
    console.log('pulsado guardar a json');
    const datos = {
        nombre: nombreEditar.textContent,
        email: emailEditar.textContent,
        optAli: optAliEditar.textContent,// === "true"
        optVal: optValEditar.textContent,
        optCas: optCasEditar.textContent
    };
    console.log('datso en json: ',datos);
    // Actualizamos los datos importados en 'Datajson' con los nuevos datos
    
    Datajson.push(datos);

    console.log('datos guardados correctamente: ', datos);
    //Mostrar un mensaje de éxito al usuario
    alert("Datos guardados correctamente");
    // Limpiar el formulario de edición después de guardar los datos
    nombreEditar.textContent = "";
    emailEditar.textContent = "";
    optAliEditar.textContent = "";
    optValEditar.textContent = "";
    optCasEditar.textContent = "";
    // vaciar formularioEditar 
    console.log('vaciar formulario editar');
    nombreEditar.value="";
    emailEditar.value="";
    optAliEditar.checked=false;
    optValEditar.checked=false;
    optCasEditar.checked=false;
    
    //ocultar botones de formulario editar
    btnEditar.classList.remove('ocultar');
    btnGuardar.classList.remove('ocultar');
})