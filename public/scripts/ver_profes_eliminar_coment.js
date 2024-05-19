
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

// Datos de ejemplo de profesores (simulación de una base de datos)
const profesores = [
    { nombre: "Profesor A", materias: ["Matemáticas", "Física"] },
    { nombre: "Profesor B", materias: ["Historia", "Literatura"] },
    { nombre: "Profesor C", materias: ["Biología", "Química"] }
];

// Función para renderizar la lista de profesores en la página
function renderizarProfesores() {
    const listaProfesores = document.getElementById("professors-list");

    // Limpiamos el contenido anterior
    listaProfesores.innerHTML = "";

    // Iteramos sobre cada profesor y creamos un elemento para mostrarlo
    profesores.forEach((profesor, index) => {
        const profesorElement = document.createElement("div");
        profesorElement.classList.add("verProfBorrarComment");

        // Creamos elementos para mostrar el nombre y las materias
        const nombreElement = document.createElement("a");
        nombreElement.classList.add("verTextoProf");
        nombreElement.textContent = profesor.nombre;
        nombreElement.href = 'profesor.html?nombre=${profesor.nombre}'; // Enlace a la página del profesor

        const materiasElement = document.createElement("div");
        materiasElement.textContent = `Materias: ${profesor.materias.join(", ")}`;

        // Añadimos los elementos al contenedor del profesor
        profesorElement.appendChild(nombreElement);
        profesorElement.appendChild(materiasElement);

        // Añadimos el profesor al contenedor principal
        listaProfesores.appendChild(profesorElement);

        // Evento de clic para el nombre del profesor (redirige a la página del profesor)
        nombreElement.addEventListener("click", (event) => {
            event.preventDefault(); // Evita la acción por defecto (navegar a otra página)
            window.location.href = `profesor.html?nombre=${profesor.nombre}`;
        });
    });
}

// Llamamos a la función para renderizar la lista de profesores al cargar la página
document.addEventListener("DOMContentLoaded", renderizarProfesores);
