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
});