document.addEventListener("DOMContentLoaded", function() {
    const accountButton = document.getElementById("account-button");
    const accountDropdown = document.getElementById("account-dropdown");

    // Ocultar el menú de cuenta al cargar la página
    hideAccountMenu();

    // Manejar clic en el botón de cuenta para mostrar/ocultar el menú desplegable
    accountButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Detener la propagación para evitar que se cierre inmediatamente
        if (accountDropdown.style.display === "none" || accountDropdown.style.display === "") {
            showAccountMenu();
        } else {
            hideAccountMenu();
        }
    });

    // Función para mostrar el menú de cuenta
    function showAccountMenu() {
        accountDropdown.style.display = "block";
    }

    // Función para ocultar el menú de cuenta
    function hideAccountMenu() {
        accountDropdown.style.display = "none";
    }

    // Obtener el elemento contenedor de comentarios
    const comentariosContainer = document.getElementById('comentarios');

    // Simulando la carga de comentarios desde una fuente de datos
    const comentariosData = [
        {
            profesor: 'Profesor 1',
            calificacion: 2,
            dificultad: 'Facil',
            comentario: 'Este profesor es genial.',
            aprobaste: 'Sí',
            recomiendas: 'No'
        },
        {
            profesor: 'Profesor 2',
            calificacion: 3,
            dificultad: 'Facil',
            comentario: 'Buen profesor, pero las evaluaciones son difíciles.',
            aprobaste: 'Sí',
            recomiendas: 'No'
        }
    ];

    // Función para crear y agregar un comentario al contenedor
    function agregarComentario(comentario) {
        const opinionElement = document.createElement('div');
        opinionElement.classList.add('comentario-Eliminar');

        const contenidoHTML = `
            <p>${comentario.profesor}</p>
            <p>Calificación: ${comentario.calificacion}</p>
            <p>Dificultad: ${comentario.dificultad}</p>
            <p>${comentario.comentario}</p>
            <p>Aprobaste: ${comentario.aprobaste}</p>
            <p>Recomiendas: ${comentario.recomiendas}</p>
            <button class="Botones-General">Eliminar opinión</button>
        `;

        opinionElement.innerHTML = contenidoHTML;
        comentariosContainer.appendChild(opinionElement);

        // Manejar clic en el botón de eliminar dentro de esta opinión
        const eliminarButton = opinionElement.querySelector('.Botones-General');
        eliminarButton.addEventListener('click', function() {
            const confirmarEliminar = confirm('¿Estás seguro de que quieres eliminar esta opinión?');
            if (confirmarEliminar) {
                opinionElement.remove(); // Eliminar la opinión del DOM
                // Aquí puedes implementar código para eliminar la opinión del servidor si es necesario
            }
        });
    }

    // Cargar comentarios desde el array de datos
    comentariosData.forEach(function(comentario) {
        agregarComentario(comentario);
    });

    // Manejar envío de formulario
    const form = document.getElementById('professorForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario por defecto

        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const carrera = document.getElementById('carrera').value;

        // Mostrar un mensaje de confirmación
        const mensaje = `Enviado`;
        mostrarMensaje(mensaje);

        // Resetear el formulario
        form.reset();
    });

    // Función para mostrar un mensaje temporal en la página
    function mostrarMensaje(mensaje) {
        const mensajeBox = document.createElement('div');
        mensajeBox.classList.add('mensaje-box');
        mensajeBox.textContent = mensaje;

        document.body.appendChild(mensajeBox);

        // Desaparecer el mensaje después de 3 segundos (3000 milisegundos)
        setTimeout(function () {
            mensajeBox.remove();
        }, 3000);
    }

    // Obtener referencias a los elementos del DOM para información de usuario
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');

    // Simular datos de usuario (esto puede venir de una fuente dinámica en tu aplicación)
    const userInfo = {
        name: 'Juan Pérez',
        email: 'juan@example.com'
    };

    // Actualizar el contenido del DOM con los datos del usuario
    userNameElement.textContent = userInfo.name;
    userEmailElement.textContent = userInfo.email;
});

