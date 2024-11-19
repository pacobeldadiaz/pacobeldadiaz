import Datajson from './data.json' with {type: 'json'};

//********** funcion getUsuarios saca del JSON el nombre de los Usuarios y los devuelve en un Array **************** */
function getNombresUsuarios(){
    let ArrayNombresUsuarios = [];

    Datajson.forEach(formularioData => {
        ArrayNombresUsuarios.push(formularioData.nombre);
    });
    return ArrayNombresUsuarios;
}

//llamada a la función para meter los datos del json en el array
var ArrayDeLosNombreDeUsuarios = getNombresUsuarios();
console.log(ArrayDeLosNombreDeUsuarios);

/* **************   funcion y su llamada para sacar los datos del json y meterlos en un array ********* */

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

//  ***  json   ********
//  ********************
 //guardar a la memoria temporal json
 btnGuardar.addEventListener('click', ()=> {
    console.log('pulsado guardar a json');
    const datos = {
        nombre: nombreEditar.textContent,
        email: emailEditar.textContent,
        optAli: optAliEditar.textContent,// === BOOLEAN
        optVal: optValEditar.textContent,// === BOOLEAN
        optCas: optCasEditar.textContent // === BOOLEAN
    };
    console.log('datos en json: ',datos);
    // Actualizamos los datos importados en 'Datajson' con los nuevos datos
    
    Datajson.push(datos);

    console.log('datos guardados correctamente: ', datos);
    //Mostrar un mensaje de éxito al usuario
    //alert("Datos guardados correctamente");
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
    MostrarDatosGuardadosJSON();
    
    //ocultar botones de formulario editar
    btnEditar.classList.remove('ocultar');
    btnGuardar.classList.remove('ocultar');
 })

/**********************  mostrar datos del array del formulario ****************************************************************** */

function MostrarDatosGuardadosJSON() {
    const usuariosGuardadosListado = document.querySelector('#usuarios-guardados-listado');

    // Limpiar la lista antes de agregar nuevos elementos
    usuariosGuardadosListado.innerHTML = '';

    // Iterar sobre los usuarios guardados y mostrarlos
    Datajson.forEach((formularioData,index) => { // Añado el index como segundo parámetro
        const usuariosListadoElement = document.createElement('li');  // Crear un nuevo elemento "li"
        
        const NuevoBotonBorrarLineaJson = document.createElement('button'); //*
        NuevoBotonBorrarLineaJson.innerText= '❌';
        console.log( NuevoBotonBorrarLineaJson);
        usuariosListadoElement.innerText = "Nombre: "+ formularioData.nombre + " - Mail: " + formularioData.email ;  // Usar el nombre de cada usuario del JSON
        // 1º Añadir el botón ❌ al li *************************************************
        usuariosListadoElement.appendChild(NuevoBotonBorrarLineaJson);
        // 1º Añadir el botón ❌ al li *************************************************    

        //LISTENER: para cuando pulse los botones nuevos de borrar/editar
        NuevoBotonBorrarLineaJson.addEventListener('click',()=>{
        console.log('❌ Borrando LINEA ⚠️', usuariosListadoElement);

        // Eliminar el usuario del arreglo Datajson
        Datajson.splice(index, 1);  // Elimina el usuario en la posición 'index'

        // Volver a renderizar la lista actualizada
        MostrarDatosGuardadosJSON();  // Vuelve a mostrar la lista con el usuario eliminado
    });
        // Agregar el nuevo elemento a la lista
        usuariosGuardadosListado.appendChild(usuariosListadoElement);
    });
}
MostrarDatosGuardadosJSON()

