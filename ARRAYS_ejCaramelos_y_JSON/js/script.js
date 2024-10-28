let caramelos = [];
const txtNuevoCaramelo=document.querySelector('#txtNuevoCaramelo');//del input a nuevoCaramelo.value

const caramelosDiv = document.getElementById('caramelos'); 

document.getElementById('cargar').addEventListener('click', () => {
caramelos.push("carmelos");
caramelos.push("piruleta","chicle","gusanitos");
mostrarCaramelos();
});

document.getElementById('añadir').addEventListener('click', () => {
    const nuevoCaramelo = document.createElement('input');
    nuevoCaramelo.type = 'text';
    nuevoCaramelo.value=txtNuevoCaramelo.value;            //del input a nuevoCaramelo.value
    caramelosDiv.innerHTML = 'ultima acción añadido un caramelo: '+nuevoCaramelo.value;
    caramelos.push(nuevoCaramelo.value);
    mostrarCaramelos();
});

document.getElementById('eliminar').addEventListener('click', () => {
    caramelos.pop();
    caramelosDiv.innerHTML = 'ultima acción eliminado un caramelo';
    mostrarCaramelos();
});

document.getElementById('ver').addEventListener('click', () => {
    caramelosDiv.innerHTML = 'LISTADO COMPLETO DE CARAMELOS';
    mostrarCaramelos();
});

function mostrarCaramelos() {
    // caramelosDiv.innerHTML = '';
    caramelos.forEach(caramelo => {
        const div = document.createElement('div');
        div.textContent = caramelo;
        caramelosDiv.appendChild(div);
})};


const numeros =["1","2","3"]
console.log(parseInt(numeros)); //solo saca el primero
console.log(numeros.toString());//llama al metodo

console.log(isNaN("7"));

const isNaNArray=["hola",16,true,"1000",200,false]; //muestra que isNaNArray contiene los elementos que se definieron=6
console.log(isNaNArray);

const isNaNArrayResults=[];

const varios=["1","2","Maria","3"];
const varios2 = ["1", "2", "Maria", "3"];
const soloNumeros = varios2.filter(item => !isNaN(item) && item !== '');// solo los elementos que son cadenas que representan números ("1", "2", "3") pasarán el filtro.
console.log(soloNumeros);                                               // y no esten vacias tampoco
const soloNumeros2 = isNaN(varios2);
console.log(soloNumeros2);
// Aquí, isNaN(varios2) se aplica al array completo, no a sus elementos individuales. Esto no es correcto, ya que isNaN() espera un valor y no un array.
// La función isNaN() devolverá false porque varios2 es un objeto (un array) y no se puede considerar NaN. Esto podría resultar confuso, y en realidad no tiene sentido en este contexto.
// Por TransitionEvent, isNaN(varios2) se evalúa a false porque se pasa un array completo en lugar de un solo valor.
const cosas=["casa","120","coche","5","2,5","12.5","viaje","tobogan","123","alcohol125ml","1.970"];
const cosasFalse=[];
const cosasTrue=[];
cosas.forEach(element =>{
    if(isNaN(element)==false){
        cosasFalse.push(element)
    }else{
        cosasTrue.push(element)
        }
});
console.log("True(no numeros):");
console.log(cosasTrue);
console.log("False (numeros):");
console.log(cosasFalse);



// ARCHIVOS JSON
//import datos from "./data/usuario.json" with {type: 'json'}; //en la misma carpeta
import datos from "../data/usuario.json" with {type: 'json'}; //entrar en otra carpeta
console.log("EJERCICIO .JSON");
console.log('Nombre:', datos.nombre, 'Apellidos:', datos.apellidos);    
console.log('Edad:', datos.edad, 'Estudiante:', datos.estudiante); 
console.log('E-mail:', datos.correo); 