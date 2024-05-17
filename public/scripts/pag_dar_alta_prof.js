
document.addEventListener("DOMContentLoaded", function() {
    var adminButton = document.getElementById("admin-button");
    var adminDropdown = document.getElementById("admin-dropdown");

    // Ocultar el menú de cuenta al cargar la página
    hideAccountMenu();

    // Manejar clic en el botón de cuenta para mostrar/ocultar el menú desplegable
    adminButton.addEventListener("click", function() {
        if (adminDropdown.style.display === "none" || adminDropdown.style.display === "") {
            showAccountMenu();
        } else {
            hideAccountMenu();
        }
    });

    // Función para mostrar el menú de cuenta
    function showAccountMenu() {
        adminDropdown.style.display = "block";
    }

    // Función para ocultar el menú de cuenta
    function hideAccountMenu() {
        adminDropdown.style.display = "none";
    }

    // Manejar envío de formulario
    const professorForm = document.getElementById('professorForm');

    professorForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se envíe el formulario por defecto

        const nombre = document.getElementById('nombre').value;
        const materia = document.getElementById('materia').value;
        const carrera = document.getElementById('carrera').value;

        // Mostrar los valores en la consola (puedes realizar otra acción aquí)
        console.log('Nombre del profesor:', nombre);
        console.log('Materia:', materia);
        console.log('Carrera:', carrera);

        // Puedes realizar acciones adicionales, como enviar los datos a través de AJAX
    });

    // Mostrar el nombre y email del usuario simulado
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');

    userNameElement.textContent = "John Doe"; // Nombre simulado del usuario
    userEmailElement.textContent = "john@example.com"; // Email simulado del usuario
});

