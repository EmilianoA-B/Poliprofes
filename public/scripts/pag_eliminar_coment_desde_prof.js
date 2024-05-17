
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

let currentPage = 1;

function loadComments(page) {
    fetch(`/get-comments?page=${page}`)
        .then(response => response.json())
        .then(data => {
            if (data.comments.length > 0) {
                const commentsList = document.getElementById('comentarios-list');
                data.comments.forEach(comment => {
                    const commentItem = document.createElement('li');
                    commentItem.className = 'comentario';
                    commentItem.innerHTML = `
                        <div class="info-item"><strong>Nombre completo del alumno:</strong> ${comment.nombreAlumno}</div>
                        <div class="info-item"><strong>Materia:</strong> ${comment.materia}</div>
                        <div class="info-item"><strong>Carrera:</strong> ${comment.carrera}</div>
                        <div class="info-item"><strong>Calificación:</strong> ${comment.calificacion}</div>
                        <div class="info-item"><strong>Dificultad:</strong> ${comment.dificultad}</div>
                    `;
                    commentsList.appendChild(commentItem);
                });

                // Actualiza la página actual
                currentPage = page;
                updatePagination(data.totalPages);
            } else {
                // Oculta la paginación si no hay más comentarios
                document.getElementById('pagination').style.display = 'none';
            }
        });
}

function updatePagination(totalPages) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Limpia la paginación anterior

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.textContent = i;
        pageLink.href = '#';
        pageLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (i !== currentPage) {
                loadComments(i);
            }
        });
        paginationContainer.appendChild(pageLink);

        // Añadir espacio entre enlaces
        if (i < totalPages) {
            const spacer = document.createTextNode(' ');
            paginationContainer.appendChild(spacer);
        }
    }

    // Oculta la paginación si no hay más páginas
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
    } else {
        paginationContainer.style.display = 'block';
    }
}

// Inicialmente cargar la primera página de comentarios
loadComments(currentPage);





//INICIO DE SESION PRUEBA
document.addEventListener("DOMContentLoaded", function() {
    var loggedIn = false; // Simulación del estado de inicio de sesión

    var authButtons = document.getElementById("auth-buttons");
    var accountMenu = document.getElementById("account-menu");
    var accountButton = document.getElementById("account-button");
    var accountDropdown = document.getElementById("account-dropdown");
    var userNameElement = document.getElementById('user-name');
    var userEmailElement = document.getElementById('user-email');
    var userInfoContainer = document.querySelector('.user-info');

    if (loggedIn) {
        authButtons.style.display = "none";
        accountMenu.style.display = "flex"; // Mostrar el contenedor del menú de cuenta

        // Simular datos del usuario (debes reemplazar con datos reales)
        var userName = "Nombre del Usuario";
        var userEmail = "correo@example.com";

        // Mostrar la información del usuario en la barra de navegación
        userNameElement.textContent = userName;
        userEmailElement.textContent = userEmail;
        userInfoContainer.style.display = 'flex'; // Mostrar la información del usuario
    } else {
        authButtons.style.display = "flex";
        accountMenu.style.display = "none";
    }

    accountButton.addEventListener("click", function() {
        if (accountDropdown.style.display === "none") {
            accountDropdown.style.display = "block";
        } else {
            accountDropdown.style.display = "none";
        }
    });

    document.addEventListener("click", function(event) {
        if (!accountButton.contains(event.target) && !accountDropdown.contains(event.target)) {
            accountDropdown.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Obtén todos los botones "Eliminar"
    const eliminarButtons = document.querySelectorAll(".eliminar-btn");

    // Agrega un evento de clic a cada botón "Eliminar"
    eliminarButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Mostrar mensaje de confirmación
            const confirmacion = confirm("¿Está seguro de eliminar el comentario?");

            if (confirmacion) {
                // Lógica de eliminación (simulada aquí)
                // Aquí debes realizar la lógica para eliminar el comentario de la base de datos
                // Supongamos que aquí realizamos una acción de eliminación simulada
                console.log("Comentario eliminado");

                // Eliminar visualmente el comentario (puedes adaptar según tu lógica)
                const comentario = btn.closest(".comentario");
                comentario.remove(); // Elimina el comentario del DOM
            } else {
                // No hacer nada si el usuario cancela
                console.log("Cancelado");
            }
        });
    });
});
