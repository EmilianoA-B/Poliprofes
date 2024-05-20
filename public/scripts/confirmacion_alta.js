document.addEventListener('DOMContentLoaded', () => {
    // Simulación de datos recibidos del backend
    const solicitudes = [
        {
            nombre: 'Profesor A',
            carrera: 'Ingeniería',
            materias: ['Matemáticas', 'Física']
        },
        {
            nombre: 'Profesor B',
            carrera: 'Ciencias Sociales',
            materias: ['Historia', 'Geografía']
        },
        {
            nombre: 'Profesor C',
            carrera: 'Artes',
            materias: ['Pintura', 'Escultura']
        }
    ];

    // Función para crear un contenedor de solicitud
    function crearContenedor(solicitud) {
        const contenedor = document.createElement('div');
        contenedor.className = 'container-confirmacion_alta';

        const header = document.createElement('div');
        header.className = 'header';

        const info = document.createElement('div');

        const nombre = document.createElement('span');
        nombre.className = 'name';
        nombre.textContent = solicitud.nombre;

        const carrera = document.createElement('span');
        carrera.className = 'career';
        carrera.textContent = solicitud.carrera;

        info.appendChild(nombre);
        info.appendChild(document.createElement('br'));
        info.appendChild(carrera);

        const materias = document.createElement('div');
        materias.className = 'subjects';
        materias.textContent = solicitud.materias.join(', ');

        header.appendChild(info);
        header.appendChild(materias);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const acceptButton = document.createElement('button');
        acceptButton.className = 'accept-button';
        acceptButton.textContent = 'Aceptar';
        acceptButton.addEventListener('click', () => {
            // Aquí iría la lógica para aceptar la solicitud
            alert(`Solicitud de ${solicitud.nombre} aceptada`);
            contenedor.remove();
        });

        buttonContainer.appendChild(acceptButton);

        contenedor.appendChild(header);
        contenedor.appendChild(buttonContainer);

        return contenedor;
    }

    // Seleccionar el contenedor principal
    const listContainer = document.querySelector('main.list_container');

    // Añadir cada solicitud al contenedor principal
    solicitudes.forEach(solicitud => {
        const contenedor = crearContenedor(solicitud);
        listContainer.appendChild(contenedor);
    });
});
