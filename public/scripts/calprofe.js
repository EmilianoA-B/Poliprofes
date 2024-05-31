document.addEventListener("DOMContentLoaded", () => {
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
        } catch (error) {
            console.error('Error al obtener los datos del profesor:', error);
        }
    }
    obtenerDatosDelProfesor(nombreProfesor);
});
