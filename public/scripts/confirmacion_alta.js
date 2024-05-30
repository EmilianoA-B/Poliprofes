
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    // Simulación de datos recibidos del backend
    fetchProfesores(currentPage);
});

// Función para crear un contenedor de solicitud
function crearContenedor(solicitud) {
    console.log(solicitud.nombre);
    const contenedor = document.createElement('div');
    contenedor.className = 'container-confirmacion_alta';

    const header = document.createElement('div');
    header.className = 'header';

    const info = document.createElement('div');

    const nombre = document.createElement('span');
    nombre.className = 'name';
    nombre.textContent = solicitud.NOMBRE;

    const carrera = document.createElement('span');
    carrera.className = 'career';
    carrera.textContent = solicitud.CARRERA;

    info.appendChild(nombre);
    info.appendChild(document.createElement('br'));
    info.appendChild(carrera);

    const materias = document.createElement('div');
    materias.className = 'subjects';
    materias.textContent = solicitud.MATERIAS;

    header.appendChild(info);
    header.appendChild(materias);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const acceptButton = document.createElement('button');
    acceptButton.className = 'accept-button';
    acceptButton.textContent = 'Aceptar';
    acceptButton.addEventListener('click', async () => {
        // Aquí iría la lógica para aceptar la solicitud
        const response = await fetch('http://localhost:3000/endpoint/aceptarProf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ nombre: solicitud.NOMBRE })
        });
        if (response.ok) {
            console.log('Exito al confirmar la solicitud');
            fetchProfesores(currentPage); //Actualiza los contenidos
            //alert(`Solicitud de ${solicitud.NOMBRE} aceptada`);
            //contenedor.remove();
        } else {
            console.error('Error al confirmar la solicitud');
        }
        
    });

    buttonContainer.appendChild(acceptButton);

    contenedor.appendChild(header);
    contenedor.appendChild(buttonContainer);

    return contenedor;
}

async function fetchProfesores(page) {
    // Seleccionar el contenedor principal
    const listContainer = document.querySelector('main.list_container');
    //Llamada al API
    const response = await fetch(`/api/getSolProf?page=${page}`);
    const solicitudes = await response.json();
    //Limpiamos
    listContainer.innerHTML = '';
    //Por cada solicitud creamos un contenedor
    solicitudes.profesores.forEach(solicitud => {
        const contenedor = crearContenedor(solicitud);
        listContainer.appendChild(contenedor);
    });
    displayPagination(solicitudes.totalPages, solicitudes.currentPage);
}

//Lógica de paginación
function displayPagination(totalDePaginas, paginaActual) {
    const containerPaginacion = document.getElementById('paginacion');
    containerPaginacion.innerHTML = '';
  
    for (let i = 1; i <= totalDePaginas; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.classList = 'link';
      pageLink.textContent = i;
      if (i === paginaActual) {
        pageLink.style.fontWeight = 'bold';
      }
      pageLink.addEventListener('click', function (event) {
        event.preventDefault();
        fetchProfesores(i);
      });
      containerPaginacion.appendChild(pageLink);
      if (i < totalDePaginas) {
        containerPaginacion.appendChild(document.createTextNode(' '));
      }
    }
  }