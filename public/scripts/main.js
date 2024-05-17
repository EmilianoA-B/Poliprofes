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
});
