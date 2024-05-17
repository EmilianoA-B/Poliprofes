document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registroForm');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío por defecto del formulario

        // Simulación de registro exitoso (aquí puedes agregar tu lógica real de registro)
        const registroExitoso = Math.random() < 5; // Probabilidad de éxito ajustada a 80%

        if (registroExitoso) {
            mostrarMensaje('Envío exitoso');
        } else {
            mostrarMensaje('Envío fallido');
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
