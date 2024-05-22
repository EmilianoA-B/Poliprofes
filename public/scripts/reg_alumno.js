// Mostrar o Ocultar passwd
document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordButton = document.getElementById('toggle-password');
    const passwordField = document.getElementById('contrasena');

    togglePasswordButton.addEventListener('click', function () {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        togglePasswordButton.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    });
});

// Al mandar el registro manda los datos a la base de datos.
document.getElementById('registroForm').addEventListener('submit', async function(event){
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;
    const contrasenia = document.getElementById('contrasena').value;
    
    try{
        const response = await fetch('http://localhost:3000/regAlumno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ nombre, apellidos, correo, contrasenia })
        });

        if (response.ok) {
            console.log('Se anadio al usuario');
        } else {
            console.error('Error adding user');
        }
    }catch (error) {
        console.error('Error:', error);
    }
});
//Funcion para mostrar un mensaje 
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