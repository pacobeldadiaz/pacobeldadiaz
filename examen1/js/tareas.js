const btnNueva=document.querySelector('#btn-nueva');
const txtNueva=document.querySelector('#nueva-tarea');
const txtDescripcion=document.querySelector('#nueva-descripcion');
const tareas=document.querySelector('#tareas');

//LISTENER click en boton nueva
btnNueva.addEventListener('click', ()=> {
    console.log('Añado nueva tarea');
    const nuevaTarea=document.createElement('li');          //li
    const nuevaTareaTitulo = document.createElement('input'); //titulo en input
    nuevaTareaTitulo.type = 'text';
    nuevaTareaTitulo.value = txtNueva.value; // Asigna el valor de txtTiulo
    const nuevaTareaDescripcion = document.createElement('input'); //descripcion en input
    nuevaTareaDescripcion.type = 'text';
    nuevaTareaDescripcion.value = txtDescripcion.value; // Asigna el valor de txtDescripcion
    const nuevaTareaBorrar = document.createElement('button');//*
    const nuevaTareaEditar = document.createElement('button');
    nuevaTareaTitulo.innerText=txtNueva.value;  //meter texto dentro del span
    nuevaTareaBorrar.innerText= '❌';     //*meter icono dentro del span
    nuevaTareaEditar.innerText = '✏️Editar';

    //dentro del LISTENER: para cuando pulse los botones nuevos de borrar/editar
    nuevaTareaBorrar.addEventListener('click',()=>{
        // console.log('❌ Borrando la Tarea ⚠️', nuevaTareaTitulo.innerText);
        tareas.removeChild(nuevaTarea); // de las tareas borra esta tarea en la que esta el boton(nuevatarea)
    });
    nuevaTareaEditar.addEventListener('click', () => {
        // console.log('✏️ Editando la tarea 👉🏻', nuevaTarea.innerText);
        const tareaEditada = prompt('Cambia el titulo de la tarea', nuevaTareaTitulo.value);
        const descripcionEditada = prompt('Cambia la descripcion de la tarea', nuevaTareaDescripcion.value);
        nuevaTareaTitulo.value = tareaEditada; 
        nuevaTareaDescripcion.value=  descripcionEditada;     
    });

    // continuamos con el codigo, fuera de los listener
    nuevaTarea.appendChild(nuevaTareaTitulo);
    nuevaTarea.appendChild(nuevaTareaDescripcion);
    nuevaTarea.appendChild(nuevaTareaBorrar);
    nuevaTarea.appendChild(nuevaTareaEditar);
    tareas.appendChild(nuevaTarea);//*mete las pequeñas tareas en el generl de tareas
    txtNueva.value='';
	txtDescripcion.value='';
    txtNueva.focus();

});