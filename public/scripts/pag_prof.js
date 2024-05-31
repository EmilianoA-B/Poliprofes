// Variable global para almacenar una referencia al divProfesor que se debe eliminar
var divCommentToRemove;

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
    // Función para obtener los parámetros de la URL
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
    
    // Obtener los parámetros de la URL
    const queryParams = getQueryParams();
    const nombreProfesor = queryParams['profesor'];
    
    // Función para mostrar los resultados en la página
    function mostrarDatosDelProfesor(profesores) {
        var profesorDiv = document.getElementById("infoProfesor");
        var profesorCalificar = document.getElementById("Calificar");
        profesorDiv.classList.add("infoProfesor")
        profesorDiv.innerHTML = ""; // Limpiar resultados anteriores

        profesores.forEach(profesor => {
            var h2Profesor = document.createElement("h2");
            h2Profesor.classList.add("nombreDelProfesor");
            h2Profesor.innerText = profesor.nombre;
            profesorDiv.appendChild(h2Profesor);

            var pMaterias = document.createElement("p");
            var strongMaterias = document.createElement("strong");
            strongMaterias.innerText = profesor.materias.join(", ");
            pMaterias.appendChild(strongMaterias);
            profesorDiv.appendChild(pMaterias);

            var pCalificacion = document.createElement("p");
            var strongCalificacion = document.createElement("strong");
            strongCalificacion.innerText = "Calificación general del profesor: ";
            var spanCalificacion = document.createElement("span");
            spanCalificacion.innerText = profesor.calificacion;
            pCalificacion.appendChild(strongCalificacion);
            pCalificacion.appendChild(spanCalificacion);
            profesorDiv.appendChild(pCalificacion);

            var pProbabilidad = document.createElement("p");
            var strongProbabilidad = document.createElement("strong");
            strongProbabilidad.innerText = "Probabilidad de pasar la materia con el profesor: ";
            var spanProbabilidad = document.createElement("span");
            spanProbabilidad.innerText = profesor.probabilidad + "%";
            pProbabilidad.appendChild(strongProbabilidad);
            pProbabilidad.appendChild(spanProbabilidad);
            profesorDiv.appendChild(pProbabilidad);
            profesorDiv.appendChild(document.createElement("br")); // Añadir un <br> entre profesores

            profesorCalificar.onclick = function(){
                var nameProf = nombreProfesor;
                window.location.href = `/calprofesor.html?profesor=${encodeURIComponent(
                    nameProf
                  )}`   
            }
        });
    }
    
    // Función para obtener los resultados desde el servidor
    async function obtenerDatosDelProfesor(nombreProfesor) {
        try {
            let url = `/api/getProfesorWithMateriasCalificacionAndProbabilidad?profesor=${encodeURIComponent(nombreProfesor)}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const datosDelProfesor = await response.json();
            mostrarDatosDelProfesor(datosDelProfesor);
        } catch (error) {
            console.error('Error al obtener los datos del profesor:', error);
        }
    }
    
    // Llamada a la función para obtener y mostrar los resultados
    obtenerDatosDelProfesor(nombreProfesor);

    function mostrarResultados(resultados) {
        var resultadosDiv = document.getElementById("resultados");
        resultadosDiv.innerHTML = ""; // Limpiar resultados anteriores
    
        resultados.forEach(function (profesor) {
          var divProfesor = document.createElement("div");
          divProfesor.classList.add("profesor-container");
    
          var enlaceNombre = document.createElement("a");
          
          enlaceNombre.classList.add("resultado-nombre");
          enlaceNombre.innerText = profesor.nombre;
    
          var calificacionSpan = document.createElement("span");
          calificacionSpan.classList.add("resultado-calificacion"); //span class="calificacion"
          calificacionSpan.innerText = profesor.calificacion;
    
          var comentarioParrafo = document.createElement("p");
          comentarioParrafo.classList.add("resultado-materias"); // p class="materias"
          // Agregar cada materia al párrafo en una línea separada
          comentarioParrafo.innerText = profesor.comentario;
          comentarioParrafo.innerHTML += "<br>";
          comentarioParrafo.innerHTML += "<br>";
          if (profesor.aprobo == 1) {
            comentarioParrafo.innerHTML += 'Aprobado <i class="lar la-smile"></i>';
            comentarioParrafo.innerHTML += "<br>";
          }
          else if(profesor.aprobo == 0) {
            comentarioParrafo.innerHTML += 'No aprobado <i class="lar la-frown"></i>';
            comentarioParrafo.innerHTML += "<br>";
          }
          if (profesor.recomienda == 1) {
            comentarioParrafo.innerHTML += 'Recomendado <i class="lar la-thumbs-up"></i>';
            comentarioParrafo.innerHTML += "<br>";
          }
          else if(profesor.recomienda == 0) {
            comentarioParrafo.innerHTML += 'No recomendado <i class="lar la-thumbs-down"></i>';
            comentarioParrafo.innerHTML += "<br>";
          }
    
          var comentarioParrafoFecha = document.createElement("p");
          comentarioParrafoFecha.classList.add("resultado-materias");
          comentarioParrafoFecha.innerText = profesor.fecha;
          comentarioParrafoFecha.innerHTML += "<br>";
    
          var containerButton = document.createElement("div");
          containerButton.classList.add("container-button");
    
          var button = document.createElement("button");
          button.classList.add("baja-btn");
          var spanTrash = document.createElement("i");
          spanTrash.classList.add("lar", "la-trash-alt");
          button.appendChild(spanTrash);
          button.innerHTML += " Eliminar Comentario";
          button.onclick = function () {
            mostrarModal();
            divCommentToRemove = divProfesor;
            var idComment = profesor.id_comentario;
            document.getElementById("confirmarBaja").onclick = async function () {
              await deleteComentario(idComment);
            };
          };
          containerButton.appendChild(button);
          divProfesor.appendChild(enlaceNombre);
          divProfesor.appendChild(calificacionSpan);
          divProfesor.appendChild(comentarioParrafo);
          divProfesor.appendChild(comentarioParrafoFecha);
          resultadosDiv.appendChild(divProfesor);
          divProfesor.appendChild(containerButton);
        });
      }
    
      // Función para dar de baja al profesor
      async function deleteComentario(idComment) {
        console.log(idComment);
        try {
          const url = "/endpoint/eliminarComentario";
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_comentario: idComment }),
          });
          if (!response.ok) {
            throw new Error("Error al eliminar el comentario desde front");
          }
          // Remover el divProfesor localmente después de eliminarlo en la base de datos
          if (divCommentToRemove) {
            divCommentToRemove.remove();
            divCommentToRemove = null;
          }
    
          cerrarModal(); // Cerrar el modal después de eliminar al profesor
        } catch (error) {
          console.error("Error al eliminar el comentario desde front:", error);
        }
      }
    
      // Función para obtener los resultados desde el servidor
async function obtenerResultados(nombreProfesor) {
    try {
      const url = `/api/getComentariosV3?profesor=${encodeURIComponent(nombreProfesor)}`;
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
  obtenerResultados(nombreProfesor);
  
});

document.getElementById('buscarProf').addEventListener('click', function(event) {
    event.preventDefault();

    const inputBusqueda = document.getElementById('inputBusqueda').value;
    window.location.href = `/busqueda-visualizacion.html?profesor=${encodeURIComponent(inputBusqueda)}`;
});

