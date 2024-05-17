
document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordButton = document.getElementById('toggle-password');
    const passwordField = document.getElementById('contrasena');

    togglePasswordButton.addEventListener('click', function () {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        togglePasswordButton.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    });
});





document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registroForm');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío por defecto del formulario

        // Simulación de registro exitoso (aquí puedes agregar tu lógica real de registro)
        const registroExitoso = Math.random() < .001; // Simulación aleatoria de éxito

        if (registroExitoso) {
            mostrarMensaje('Registro exitoso');
        } else {
            mostrarMensaje('Registro erróneo');
        }
    });

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
});