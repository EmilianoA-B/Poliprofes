document.addEventListener("DOMContentLoaded", function() {
    // Función para simular la respuesta del backend
    function getUserInfo() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: 'Alejandro Magno',
                    email: 'Ale7126@example.com'
                });
            }, 1000); // Simula un retraso de 1 segundo
        });
    }


    // Verifica si el usuario está registrado
     function usuarioRegistrado(){
        return false;
     }
    // Verifica si el usuario es administrador
    function esAdmin() {
        return false;
    }


    // Agregar un event listener para el botón de registro
  //  document.getElementById('registroBtn').addEventListener('click', manejarRegistro);

    // Muestra la interfaz basada en el estado del usuario
    function mostrarInterfaz() {
        const registrado = usuarioRegistrado();
        const admin = esAdmin();

        if (admin) {
            // Si es admin, mostrar solo el menú de administrador y ocultar el resto.
            document.querySelector('.menu-admin').style.display = 'block';
            document.querySelector('.auth-buttons').style.display = 'none';
            document.querySelector('.user-menu').style.display = 'none';
        } else if (registrado) {
            // Si está registrado pero no es admin, mostrar el menú de usuario registrado.
            document.querySelector('.auth-buttons').style.display = 'none';
            document.querySelector('.user-menu').style.display = 'flex';
            document.querySelector('.menu-admin').style.display = 'none';

            // Obtener y mostrar la información del usuario
            getUserInfo().then(data => {
                // Verifica si se recibieron los datos correctamente
                if (data && data.name && data.email) {
                    // Selecciona el elemento con el ID user-info
                    const userInfoDiv = document.getElementById('user-info');

                    // Inserta el nombre y el correo del usuario en el elemento
                    userInfoDiv.innerHTML = `
                        <p>${data.name}</p>
                        <p>${data.email}</p>
                    `;
                } else {
                    // Manejo de error si no se reciben los datos correctos
                    console.error("Datos del usuario no válidos", data);
                }
            }).catch(error => {
                // Manejo de error en caso de que falle la solicitud
                console.error('Error al obtener la información del usuario:', error);
            });

        } else {
            // Si no está registrado ni es admin, mostrar los botones de autenticación.
            document.querySelector('.auth-buttons').style.display = 'flex';
            document.querySelector('.user-menu').style.display = 'none';
            document.querySelector('.menu-admin').style.display = 'none';
        }
    }

    // Llama a la función para mostrar la interfaz
    mostrarInterfaz();


    // Obtener el elemento UL del menú
    const menuList = document.getElementById('menu-list');

    // Función para agregar el elemento al menú
    function agregarChangeAlMenu() {
        const liChange = document.createElement('li');
        const aChange = document.createElement('a');
        aChange.href = '#';
        aChange.textContent = 'Añade a tu profesor';
        liChange.appendChild(aChange);
        menuList.insertBefore(liChange, menuList.firstChild);
    }

    // Verificar si el usuario está autenticado y agregar el elemento "change" al menú si lo está
    if (usuarioRegistrado()) {
        agregarChangeAlMenu();
    }
});