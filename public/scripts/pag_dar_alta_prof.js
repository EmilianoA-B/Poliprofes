
document.addEventListener("DOMContentLoaded", function() {
    var adminButton = document.getElementById("admin-button");
    var adminDropdown = document.getElementById("admin-dropdown");

    //Carga carreras y materiasdesde la base de datos
    cargarCarreras();

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

    // Mostrar el nombre y email del usuario simulado
    /*const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');

    userNameElement.textContent = "John Doe"; // Nombre simulado del usuario
    userEmailElement.textContent = "john@example.com"; // Email simulado del usuario*/
});



document.getElementById("materia").addEventListener("toggle", function(){
    console.log("HOLA CARA BOLA");
});

async function cargarCarreras(){
        fetch('http://localhost:3000/api/carreras')
            .then(response => response.json())
            .then(data => {
                const carreraList = document.getElementById('carrera');
                data.forEach(carrera => {
                    const newCarrera = document.createElement('option');
                    newCarrera.textContent = `${carrera.carrera}`;
                    carreraList.appendChild(newCarrera);
                });
            })
            .catch(error => console.error('Error al cargar carreras:', error));
}

async function cargarMaterias(){

}