// Simula el JSON que recibirías del backend
var resultadosBackend = [
    {
        "nombre": "Nombre del Profesor 1",
        "calificacion": 4.5,
        "carreras": ["Carrera 1", "Carrera 2"]
    },
    {
        "nombre": "Nombre del Profesor 2",
        "calificacion": 3.8,
        "carreras": ["Carrera 3", "Carrera 4"]
    },
    {
        "nombre": "Nombre del Profesor 3",
        "calificacion": 3.8,
        "carreras": ["Carrera 5", "Carrera 6"]
    }

];

// Función para mostrar los resultados en la página
function mostrarResultados(resultados) {
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ""; // Limpiar resultados anteriores

    resultados.forEach(function(profesor) {
        var divProfesor = document.createElement("div");
        divProfesor.classList.add("resultado-profesor"); //elemento div class=profesor

        var enlaceNombre = document.createElement("a");
        enlaceNombre.href = "pagina_profesor.html"; // Enlace a la página del profesor
        enlaceNombre.classList.add("resultado-nombre");  //elemento a class="nombre"
        enlaceNombre.innerText = profesor.nombre;  

        var calificacionSpan = document.createElement("span");
        calificacionSpan.classList.add("resultado-calificacion");  //span class="calificacion"
        calificacionSpan.innerText = profesor.calificacion; 

        var carrerasParrafo = document.createElement("p");
        carrerasParrafo.classList.add("resultado-carreras");  // p class="carreras"
        //carrerasParrafo.innerText = profesor.carreras.join(", ");
        // Agregar cada carrera al párrafo en una línea separada
        profesor.carreras.forEach(function(carrera, index) {
        carrerasParrafo.innerHTML += carrera;
    if (index < profesor.carreras.length - 1) {
        carrerasParrafo.innerHTML += "<br>"; // Agregar etiqueta <br> si no es la última carrera
         }
        });

        divProfesor.appendChild(enlaceNombre);
        divProfesor.appendChild(calificacionSpan);
        divProfesor.appendChild(carrerasParrafo);
        resultadosDiv.appendChild(divProfesor);
    });
}

// Llamada a la función para mostrar los resultados (simulando una respuesta del backend)
mostrarResultados(resultadosBackend);