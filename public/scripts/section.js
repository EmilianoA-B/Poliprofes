
  // Verifica si el usuario está registrado
  function usuarioRegistrado(){
    return false;
 }
// Función para mostrar u ocultar la sección de registro según si el usuario está registrado
    function actualizarRegistro() {
        var registroSection = document.querySelector('.registration-section');
        var registroTeacher = document.querySelector('.registration-teacher');

        if (!usuarioRegistrado()) {
            registroSection.style.display = 'flex'; // Mostrar la sección de registro
            registroTeacher.style.display = 'none'; // Ocultar la sección de registro de profesores
        } else {
            registroSection.style.display = 'none'; // Ocultar la sección de registro
            registroTeacher.style.display = 'flex'; // Mostrar la sección de registro de profesores
        }
    }

    // Función para manejar el clic en el botón de registro
    function manejarRegistro() {
        console.log("Redirigir al usuario a la página de registro...");
    }
    
    actualizarRegistro();

// Función para mostrar u ocultar la sección de registro según si el usuario está registrado
function actualizarRegistro() {

    var registroSection = document.querySelector('.registration-section');
    if (!usuarioRegistrado()) {
        registroSection.style.display = 'flex'; // Mostrar la sección de registro
    } else {
        registroSection.style.display = 'none'; // Ocultar la sección de registro
    }

    var registroTeacher = document.querySelector('.registration-teacher');
    if(usuarioRegistrado()){
        registroTeacher.style.display='flex';
    }else{
        registroTeacher.style.display='none';
    }
}

// Función para manejar el clic en el botón de registro
function manejarRegistro() {
    console.log("Redirigir al usuario a la página de registro...");
}

// Agregar un event listener para el botón de registro
document.getElementById('registroBtn').addEventListener('click', manejarRegistro);

// Llamar a la función para actualizar el estado de la sección de registro cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    actualizarRegistro();
});