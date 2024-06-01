document.addEventListener("DOMContentLoaded", async () => {
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

    function desplegarMaterias(profesores){
        let selectMaterias = document.getElementById("materia");
        
        profesores.forEach(profesor => {
            const newMateria = document.createElement('option');
                newMateria.textContent = `${profesor.materias}`;
                selectMaterias.appendChild(newMateria);
        });

    }

    async function obtenerDatosDelProfesor(nombreProfesor) {
        try {
            let url = `/api/getMateriasV2?profesor=${encodeURIComponent(nombreProfesor)}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const datosDelProfesor = await response.json();
            desplegarMaterias(datosDelProfesor);
            return datosDelProfesor[0].idprof;
        } catch (error) {
            console.error('Error al obtener los datos del profesor:', error);
        }
    }

    document.getElementById("form-califProf").addEventListener("submit", async function(event){
        //Variable con ID del profesor
        
        const materia = document.getElementById('materia').value;
        const calif = document.querySelector('input[name="calificacion"]:checked').value;
        const dificultad = document.getElementById('dificultad').value;
        const comentario = document.getElementById('comentario').value;
        const recomienda = document.querySelector('input[name="recomienda"]:checked').value;
        const aprobo = document.querySelector('input[name="aprobo"]:checked').value;

        event.preventDefault();
        const response = await fetch('http://localhost:3000/endpoint/calProfesor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({ idAlumno:1, idProfesor, materia, calif, dificultad, comentario, recomienda, aprobo  })
            });

            if (response.ok) {
                console.log('Exito al calificar profesor');
                window.location.href = `./pag_prof.html?profesor=${encodeURIComponent(nombreProfesor)}`;
            } else {
                console.error('Error al calificar profesor');
            }
    });

    const idProfesor = await obtenerDatosDelProfesor(nombreProfesor);
});
document.getElementById('buscarProf').addEventListener('click', function(event) {
    event.preventDefault();
  
    const inputBusqueda = document.getElementById('inputBusqueda').value;
    window.location.href = `/busqueda-visualizacion.html?profesor=${encodeURIComponent(inputBusqueda)}`;
  });


