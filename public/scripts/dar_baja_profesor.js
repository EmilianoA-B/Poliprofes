// Variable global para almacenar una referencia al divProfesor que se debe eliminar
var divProfesorToRemove;



// Función para mostrar el modal de confirmación
function mostrarModal() {
  var modal = document.getElementById('modal');
  var overlay = document.getElementById('overlay');
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
  var modal = document.getElementById('modal');
  var overlay = document.getElementById('overlay');
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  // Función para mostrar los resultados en la página
  function mostrarResultados(resultados) {
    var resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores

    resultados.forEach(function (profesor) {
      var divProfesor = document.createElement('div');
      divProfesor.classList.add('profesor-container'); 

      var enlaceNombre = document.createElement('a');
      enlaceNombre.href = `pag_prof.html?profesor=${encodeURIComponent(
        profesor.nombre
      )}`; // Enlace a la página del profesor
      enlaceNombre.classList.add('resultado-nombre');
      enlaceNombre.innerText = profesor.nombre;

      var materiasParrafo = document.createElement('p');
      materiasParrafo.classList.add('resultado-materias');
      // Agregar cada materia al párrafo en una línea separada
      profesor.materias.forEach(function (materia, index) {
        materiasParrafo.innerHTML += materia;
        if (index < profesor.materias.length - 1) {
          materiasParrafo.innerHTML += '<br>';
        }
      });

      var containerButton = document.createElement('div');
      containerButton.classList.add('container-button');

      var button = document.createElement('button');
      button.classList.add('baja-btn');
      var spanTrash = document.createElement('i');
      spanTrash.classList.add('lar', 'la-trash-alt'); 
      button.appendChild(spanTrash);
      button.innerHTML += ' Dar de baja';
      button.onclick = function () {
        mostrarModal();
        divProfesorToRemove = divProfesor;
        var nombreProf = profesor.nombre; 
        document.getElementById('confirmarBaja').onclick = async function () {
          await darDeBajaProfesor(nombreProf);
        };
      };
      containerButton.appendChild(button);
      divProfesor.appendChild(enlaceNombre);
      divProfesor.appendChild(materiasParrafo);
      resultadosDiv.appendChild(divProfesor);
      divProfesor.appendChild(containerButton);
    });
  }

  // Función para dar de baja al profesor
async function darDeBajaProfesor(nombreProf) {
  console.log(nombreProf);
  try {
    const url = '/endpoint/eliminarProfesor';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: nombreProf }),
    });
    if (!response.ok) {
      throw new Error('Error al eliminar al profesor');
    }
    // Remover el divProfesor localmente después de eliminarlo en la base de datos
    if (divProfesorToRemove) {
      divProfesorToRemove.remove();
      divProfesorToRemove = null;
    }
    
    cerrarModal(); // Cerrar el modal después de eliminar al profesor
  } catch (error) {
    console.error('Error al dar de baja al profesor:', error);
  }
}

  // Función para obtener los resultados desde el servidor
  async function obtenerResultados() {
    try {
      const url = '/api/getProfesByCalificacionAndMaterias';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const resultados = await response.json();
      mostrarResultados(resultados);
    } catch (error) {
      console.error('Error al obtener los resultados:', error);
    }
  }

  // Llamada a la función para obtener y mostrar los resultados
  obtenerResultados();
});

document.getElementById('buscarProf').addEventListener('click', function(event) {
  event.preventDefault();

  const inputBusqueda = document.getElementById('inputBusqueda').value;
  window.location.href = `/busqueda-visualizacion.html?profesor=${encodeURIComponent(inputBusqueda)}`;
});