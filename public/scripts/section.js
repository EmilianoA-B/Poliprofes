import { usuarioModule } from './modulov.js';

// Función para mostrar u ocultar la sección de registro según si el usuario está registrado
    function actualizarRegistro() {
        var registroSection = document.querySelector('.seccion-Solicitud');
        var registroTeacher = document.querySelector('.solicitud-Profesor');
        const registrado = usuarioModule.usuarioRegistrado();

        if (registrado) {
            registroSection.style.display = 'none'; // Ocultar la sección de registro
            registroTeacher.style.display = 'flex'; // Mostrar la sección de registro de profesores
        } else {
            registroSection.style.display = 'flex'; // Mostrar la sección de registro
            registroTeacher.style.display = 'none'; // Ocultar la sección de registro de profesores
        }
    }

    // Función para manejar el clic en el botón de registro
    function manejarRegistro() {
        console.log("Redirigir al usuario a la página de registro...");
    }
    
    actualizarRegistro();

// Agregar un event listener para el botón de registro
document.getElementById('registroBtn').addEventListener('click', manejarRegistro);

// Llamar a la función para actualizar el estado de la sección de registro cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    actualizarRegistro();
});