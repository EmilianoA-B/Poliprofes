// Variable global para almacenar una referencia al divProfesor que se debe eliminar
var divProfesorToRemove;

//Get de parametros para profes
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.slice(1);
    const pairs = queryString.split('&');

    for (const pair of pairs) {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    }

    return params;
}
const queryParams = getQueryParams();
const carrera = queryParams['nombre'];


// Función para dar de baja al profesor
function darDeBaja() {
  // Verificar si divProfesorToRemove está definido y no es null
  if (divProfesorToRemove) {
    // Remover el divProfesor
    divProfesorToRemove.remove();
    // Limpiar la variable global
    divProfesorToRemove = null;
  }
  cerrarModal();
}

// Función para mostrar el modal de confirmación
function mostrarModal() {
  var modal = document.getElementById("modal");
  var overlay = document.getElementById("overlay");
  modal.style.display = "block";
  overlay.style.display = "block";
}

// Función para cerrar el modal
function cerrarModal() {
  var modal = document.getElementById("modal");
  var overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  
  // Función para obtener los resultados desde el servidor
  async function obtenerResultados(carrera) {
    try {
      let url = "/api/getProfesByCalificacionAndMaterias";
      if (carrera) {
        url += `?carrera=${encodeURIComponent(carrera)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const resultados = await response.json();
      mostrarResultados(resultados);
    } catch (error) {
      console.error("Error al obtener los resultados:", error);
    }
  }

  obtenerResultados(carrera);

  //Funcion para desplegar los resultados en un contenedor
  function mostrarResultados(resultados) {
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ""; // Limpiar resultados anteriores

    resultados.forEach(function (profesor) {
      var divProfesor = document.createElement("div");
      divProfesor.classList.add("resultado-profesor"); //elemento div class=profesor

      var enlaceNombre = document.createElement("a");
      enlaceNombre.href = "pagina_profesor.html"; // Enlace a la página del profesor
      enlaceNombre.classList.add("resultado-nombre"); //elemento a class="nombre"
      enlaceNombre.innerText = profesor.nombre;

      var calificacionSpan = document.createElement("span");
      calificacionSpan.classList.add("resultado-calificacion"); //span class="calificacion"
      calificacionSpan.innerText = profesor.calificacion;

      var materiasParrafo = document.createElement("p");
      materiasParrafo.classList.add("resultado-materias"); // p class="materias"
      // Agregar cada materia al párrafo en una línea separada
      profesor.materias.forEach(function (materia, index) {
        materiasParrafo.innerHTML += materia;
        if (index < profesor.materias.length - 1) {
          materiasParrafo.innerHTML += "<br>"; // Agregar etiqueta <br> si no es la última materia
        }
      });

      divProfesor.appendChild(enlaceNombre);
      divProfesor.appendChild(calificacionSpan);
      divProfesor.appendChild(materiasParrafo);
      resultadosDiv.appendChild(divProfesor);
    });
  }

  // Función para crear un contenedor de profesor
  function crearContenedor(profesor) {
    var divProfesor = document.createElement("div");
    divProfesor.classList.add("profesor-container");

    var nombre = document.createElement("div");
    nombre.classList.add("nombre");
    nombre.textContent = profesor.nombre;

    var carrera = document.createElement("div");
    carrera.classList.add("carrera");
    carrera.textContent = profesor.carrera;

    var materias = document.createElement("div");
    materias.classList.add("materias");
    materias.textContent = profesor.materias.join(", ");

    var containerButton = document.createElement("div");
    containerButton.classList.add("container-button");

    var button = document.createElement("button");
    button.classList.add("baja-btn");
    button.textContent = "Dar de baja";
    button.onclick = mostrarModal;

    // Asociar el divProfesor al botón "Dar de baja"
    button.onclick = function () {
      mostrarModal();
      // Almacenar una referencia al divProfesor asociado con este botón
      divProfesorToRemove = divProfesor;
    };

    containerButton.appendChild(button);

    divProfesor.appendChild(nombre);
    divProfesor.appendChild(carrera);
    divProfesor.appendChild(materias);
    divProfesor.appendChild(containerButton);

    return divProfesor;
  }

  // Función para agregar los profesores al contenedor principal
  function agregarProfesores() {
    var container = document.querySelector(".list_container");
    profesores.forEach(function (profesor) {
      var contenedor = crearContenedor(profesor);
      container.appendChild(contenedor);
    });
  }

  // Llamar a la función para agregar los profesores cuando el DOM se haya cargado completamente
  agregarProfesores();
});
