const btnEnviar = document.querySelector('#btn-enviar');
const txtNombre = document.querySelector('#nombre');
const txtEmail = document.querySelector('#e-mail');
const optAli = document.querySelector('#optAli');
const optVal = document.querySelector('#optVal');
const optCas = document.querySelector('#optCas');

const btnEditar = document.querySelector('#btn-editar');
const nombreEditar = document.querySelector('#nombreEditar');
const emailEditar = document.querySelector('#emailEditar');
const optAliEditar = document.querySelector('#optAliEditar');
const optValEditar = document.querySelector('#optValEditar');
const optCasEditar = document.querySelector('#optCasEditar');

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
});  