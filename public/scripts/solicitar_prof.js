window.onload = function alCargar (){
    limpiarInput('professorForm');
    cargarCarreras();
}

document.addEventListener("DOMContentLoaded", function() {
    var accountButton = document.getElementById("account-button");
    var accountDropdown = document.getElementById("account-dropdown");

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

    // Manejar envío de formulario
    const form = document.getElementById('professorForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se envíe el formulario por defecto

        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const carrera = document.getElementById('carrera').value;

        // Mostrar un mensaje de confirmación
        const mensaje = `Enviado`;
        mostrarMensaje(mensaje);

        // Resetear el formulario
        form.reset();
    });
});

async function cargarCarreras(){
        fetch('http://localhost:3000/api/getCarreras')
            .then(response => response.json())
            .then(data => {
                const carreraList = document.getElementById('carrera');
                data.forEach(carrera => {
                    const newCarrera = document.createElement('option');
                    newCarrera.textContent = `${carrera.carrera}`;
                    carreraList.appendChild(newCarrera);
                });
            })
            .catch(error => console.error('Error fetching user data:', error));
}

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


// Obtener referencias a los elementos del DOM
const userNameElement = document.getElementById('user-name');
const userEmailElement = document.getElementById('user-email');

// Simular datos de usuario (esto puede venir de una fuente dinámica en tu aplicación)
const userInfo = {
    name: 'Juan Pérez   ' ,
    email: ' juan@example.com'
};

// Actualizar el contenido del DOM con los datos del usuario
userNameElement.textContent = userInfo.name;
userEmailElement.textContent = userInfo.email;

// Para limpiar el formulario
function limpiarInput(input){
    document.getElementById(input).reset();
}