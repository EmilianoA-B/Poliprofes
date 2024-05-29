//Profesores aleatorios
document.addEventListener('DOMContentLoaded', async function(){
    try{
        const response = await fetch('http://localhost:3000/api/getProfesAleatorios');
        if(!response.ok){
            throw new Error('Fallo al recibir profesores');
        }
        const profesoresRand = await response.json();
        verProfesoresRand(profesoresRand);
    }catch(error){
        console.error("Fallo al recibir profesores");
    }
});



// Busqueda de profs. Redireccion ===> Esto se tiene que añadir a todas las páginas
document.getElementById('buscarProf').addEventListener('click', function(event) {
    event.preventDefault();

    const inputBusqueda = document.getElementById('inputBusqueda').value;
    window.location.href = `/pages/busqueda-visualizacion.html?query=${encodeURIComponent(inputBusqueda)}`;
});


/*
//Los valores de los comentarios
const dataFromBackend = [
    { nombre: "Profesor 1", calificacion: 4.5, indiceaprobacion: 80 },
    { nombre: "Profesor 2", calificacion: 3.8, indiceaprobacion: 70 },
    { nombre: "Profesor 3", calificacion: 4.2, indiceaprobacion: 75 }
];

// Itera sobre cada elemento y asigna los valores a los elementos correspondientes en el frontend
const spansNombre = document.querySelectorAll('.nombre');
const spansCalificacion = document.querySelectorAll('.calificacion');
const spansIndiceAprobacion = document.querySelectorAll('.indiceaprobacion');

dataFromBackend.forEach((item, index) => {
    spansNombre[index].textContent = item.nombre;
    spansCalificacion[index].textContent = item.calificacion;
    spansIndiceAprobacion[index].textContent = item.indiceaprobacion;
}); */

async function verProfesoresRand(profRand){
    const contenedor = document.getElementById('container-comentarios');
    contenedor.innerHTML = ''; // limpia el container

    profRand.forEach(profesor => {

         //link.href = `./pag_prof.html?query=${encodeURIComponent(nombreCompleto)}` ==> Era para linkear a las paginas de los profesores aleatorios, pero no viene en los requerimientos
        //const link = document.createElement('a');

        const contenedorNombre = document.createElement('div');
        const nombreCompleto = `${profesor.NOMBRE}`; 
        contenedorNombre.classList.add('comentarios');

        const elementoNombre = document.createElement('h3');
        elementoNombre.textContent = `Nombre del profesor: ${nombreCompleto}`;
        const elementoIndiceAprob = document.createElement('p');
        elementoIndiceAprob.textContent = `Indice de aprobación: ${profesor.INDICE_APROBACION}%`;
        const elementoCalificacion = document.createElement('p');
        elementoCalificacion.textContent = `Calificación: ${profesor.CALIFICACION}`;

        contenedorNombre.appendChild(elementoNombre);
        contenedorNombre.appendChild(elementoCalificacion);
        contenedorNombre.appendChild(elementoIndiceAprob);
        contenedor.appendChild(contenedorNombre);
        
    });
}
