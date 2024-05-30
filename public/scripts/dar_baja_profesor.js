// Variable global para almacenar una referencia al divProfesor que se debe eliminar
var divProfesorToRemove;

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
  // Función para mostrar los resultados en la página
  function mostrarResultados(resultados) {
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ""; // Limpiar resultados anteriores

    resultados.forEach(function (profesor) {
      var divProfesor = document.createElement("div");
      divProfesor.classList.add("profesor-container"); //elemento div class=profesor

      var enlaceNombre = document.createElement("a");
      enlaceNombre.href = `pag_prof.html?profesor=${encodeURIComponent(
        profesor.nombre
      )}`; // Enlace a la página del profesor
      enlaceNombre.classList.add("resultado-nombre"); //elemento a class="nombre"
      enlaceNombre.innerText = profesor.nombre;

      var materiasParrafo = document.createElement("p");
      materiasParrafo.classList.add("resultado-materias"); // p class="materias"
      // Agregar cada materia al párrafo en una línea separada
      profesor.materias.forEach(function (materia, index) {
        materiasParrafo.innerHTML += materia;
        if (index < profesor.materias.length - 1) {
          materiasParrafo.innerHTML += "<br>"; // Agregar etiqueta <br> si no es la última materia
        }
      });

      var containerButton = document.createElement("div");
      containerButton.classList.add("container-button");

      var button = document.createElement("button");
      button.classList.add("baja-btn");
      var spanTrash = document.createElement("i");
      spanTrash.classList.add("lar", "la-trash-alt"); // Separo las clases con comas
      button.appendChild(spanTrash);
      button.innerHTML += " Dar de baja"; // Agrego espacio antes de "Dar de baja"
      button.onclick = function () {
        mostrarModal();
        // Almacenar una referencia al divProfesor asociado con este botón
        divProfesorToRemove = divProfesor;
      };
      containerButton.appendChild(button);
      divProfesor.appendChild(enlaceNombre);
      divProfesor.appendChild(materiasParrafo);
      resultadosDiv.appendChild(divProfesor);
      divProfesor.appendChild(containerButton);
    });
  }

  // Función para obtener los resultados desde el servidor
  async function obtenerResultados() {
    try {
      let url = "/api/getProfesByCalificacionAndMaterias";
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

  // Llamada a la función para obtener y mostrar los resultados
  obtenerResultados();
});
