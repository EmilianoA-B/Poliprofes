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
    const carrera = queryParams['carrera'];
    const profesor = queryParams['profesor'];
    const evaluacion = queryParams['evaluacion']
    
    // Función para mostrar los resultados en la página
    function mostrarResultados(resultados) {
        var resultadosDiv = document.getElementById("resultados");
        resultadosDiv.innerHTML = ""; // Limpiar resultados anteriores
    
        resultados.forEach(function(profesor) {
            var divProfesor = document.createElement("div");
            divProfesor.classList.add("resultado-profesor"); //elemento div class=profesor
    
            var enlaceNombre = document.createElement("a");
            enlaceNombre.href = `pag_eliminar_coment_desde_prof.html?profesor=${encodeURIComponent(profesor.nombre)}`; // Enlace a la página del profesor
            enlaceNombre.classList.add("resultado-nombre");  //elemento a class="nombre"
            enlaceNombre.innerText = profesor.nombre;  
    

            var materiasParrafo = document.createElement("p");
            materiasParrafo.classList.add("resultado-materias");  // p class="materias"
            // Agregar cada materia al párrafo en una línea separada
            profesor.materias.forEach(function(materia, index) {
                materiasParrafo.innerHTML += materia;
                if (index < profesor.materias.length - 1) {
                    materiasParrafo.innerHTML += "<br>"; // Agregar etiqueta <br> si no es la última materia
                }
            });
    
            divProfesor.appendChild(enlaceNombre);
            divProfesor.appendChild(materiasParrafo);
            resultadosDiv.appendChild(divProfesor);
        });
    }
    
    // Función para obtener los resultados desde el servidor
    async function obtenerResultados(carrera, profesor, evaluacion) {
        try {
            //Cuidado porque falla cuando recibe carrera y profesor
            let url = '/api/getProfesByCalificacionAndMaterias';
            if (carrera) {
                url += `?carrera=${encodeURIComponent(carrera)}`;
            }
            if(profesor){
                url += `?profesor=${encodeURIComponent(profesor)}`;
            }
            if(evaluacion){
                url += `?evaluacion=${encodeURIComponent(evaluacion)}`;
            }
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
    obtenerResultados(carrera, profesor, evaluacion);
});

document.getElementById('buscarProf').addEventListener('click', function(event) {
        event.preventDefault();
    
        const inputBusqueda = document.getElementById('inputBusqueda').value;
        window.location.href = `/busqueda-visualizacion.html?profesor=${encodeURIComponent(inputBusqueda)}`;
});