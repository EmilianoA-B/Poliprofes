document.addEventListener("DOMContentLoaded", function () {
  // Función para simular la respuesta del backend
  function getUserInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Alejandro Magno",
          email: "Ale7126@example.com",
        });
      }, 1000); // Simula un retraso de 1 segundo
    });
  }

  // Verifica si el usuario está registrado
  function usuarioRegistrado() {
    return true;
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

    // Obtener el elemento UL del menú
    const menuList = document.getElementById("menu-list");

    // Función para agregar el elemento al menú
    function agregarAlMenu() {
      const liElement = document.createElement("li");
      const aElement = document.createElement("a");
      aElement.href = "#";
      aElement.textContent = "Añade a tu profesor";
      liElement.appendChild(aElement);
      menuList.insertBefore(liElement, menuList.firstChild);
    }

    if (admin) {
      // Si es admin, mostrar solo el menú de administrador y ocultar el resto.
      document.querySelector(".menu-admin").style.display = "block";
      document.querySelector(".auth-buttons").style.display = "none";
      document.querySelector(".user-menu").style.display = "none";
    } else if (registrado) {
      // Si está registrado pero no es admin, mostrar el menú de usuario registrado.
      document.querySelector(".auth-buttons").style.display = "none";
      document.querySelector(".user-menu").style.display = "flex";
      document.querySelector(".menu-admin").style.display = "none";
      agregarAlMenu();

      // Obtener y mostrar la información del usuario
      getUserInfo()
        .then((data) => {
          // Verifica si se recibieron los datos correctamente
          if (data && data.name && data.email) {
            // Selecciona el elemento con el ID user-info
            const userInfoDiv = document.getElementById("user-info");

            // Inserta el nombre y el correo del usuario en el elemento
            userInfoDiv.innerHTML = `
                        <p>${data.name}</p>
                        <p>${data.email}</p>
                    `;
          } else {
            // Manejo de error si no se reciben los datos correctos
            console.error("Datos del usuario no válidos", data);
          }
        })
        .catch((error) => {
          // Manejo de error en caso de que falle la solicitud
          console.error("Error al obtener la información del usuario:", error);
        });
    } else {
      // Si no está registrado ni es admin, mostrar los botones de autenticación.
      document.querySelector(".auth-buttons").style.display = "flex";
      document.querySelector(".user-menu").style.display = "none";
      document.querySelector(".menu-admin").style.display = "none";
    }
  }

  // Llama a la función para mostrar la interfaz
  mostrarInterfaz();
});
