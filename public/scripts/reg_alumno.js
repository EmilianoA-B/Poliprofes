window.onload = function alCargar (){
    limpiarInput('registroForm');
}

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
        const response = await fetch('http://localhost:3000/endpoint/regAlumno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ nombre, apellidos, correo, contrasenia })
        });

        if (response.ok) {
            console.log('Se anadio al usuario');
            limpiarInput('registroForm');
        } else {
            console.error('Error adding user');
        }
    }catch (error) {
        console.error('Error:', error);
    }
});

function limpiarInput(input){
    document.getElementById(input).reset();
}
document.getElementById('buscarProf').addEventListener('click', function(event) {
    event.preventDefault();
  
    const inputBusqueda = document.getElementById('inputBusqueda').value;
    window.location.href = `/busqueda-visualizacion.html?profesor=${encodeURIComponent(inputBusqueda)}`;
  });
