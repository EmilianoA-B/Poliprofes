// Define un módulo
const usuarioModule = (() => {
    // Variables para almacenar el estado del usuario
    let registrado = localStorage.getItem('userType') === 'user' || localStorage.getItem('userType') === 'admin';
    let admin = localStorage.getItem('userType') === 'admin';

    // Funciones para verificar el estado del usuario
    function usuarioRegistrado() {
        return registrado;
    }

    function esAdmin() {
        return admin;
    }

    // Función para redirigir y cambiar el estado del usuario
    function handleRedirect(userType) {
        switch (userType) {
            case 'guest':
                registrado = false;
                admin = false;
                break;
            case 'user':
                registrado = true;
                admin = false;
                break;
            case 'admin':
                registrado = true;
                admin = true;
                break;
        }
      localStorage.setItem('userType', userType);
      window.location.href = `index.html`;
    }

    // Devuelve las funciones y variables que deseas exponer
    return {
        usuarioRegistrado,
        esAdmin,
        handleRedirect
    };
})();

// Exporta el módulo para su uso en otros scripts
export {usuarioModule};
