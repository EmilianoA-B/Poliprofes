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

/*
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;
    const contrasenia = document.getElementById('contrasena').value;
   */ 

    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contrasenia = document.getElementById('contrasena').value.trim();

    // Validación de nombre
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        swal({
            text: "El nombre solo debe contener caracteres alfabéticos en español y espacios.",
            button: "Vale",
            dangerMode: true,
            className: "alerta"
        });
      return;
    }

    // Validación de apellidos
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellidos)) {
        swal({
            text: "Los apellidos solo deben contener caracteres alfabéticos en español y espacios.",
            button: "Vale",
            dangerMode: true,
            className: "alerta"
        });
      return;
    }

    // Validación de correo
    if (!/^[a-zA-Z0-9._%+-]+@alumno\.ipn\.mx$/.test(correo)) {
        swal({
            text: "El correo debe pertenecer al dominio 'alumno.ipn.mx'.",
            button: "Vale",
            dangerMode: true,
            className: "alerta"
        });
        return;
    }

    // Validación de contraseña
    if (contrasenia.length < 4 || contrasenia.length > 8 || !/^[a-zA-Z0-9!@#$%^&*]+$/.test(contrasenia)) {
        swal({
            text: "La contraseña debe tener entre 4 y 8 caracteres y puede incluir caracteres alfanuméricos y especiales.",
            button: "Vale",
            dangerMode: true,
            className: "alerta"
        });
      return;
    }
    
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
            swal({
                text: "Registro exitoso.",
                button: "Vale",
                dangerMode: true,
                className: "alerta"
            });
        } else {
            swal({
                text: "Registro erroneo.",
                button: "Vale",
                dangerMode: true,
                className: "alerta"
            });
            console.error('Error adding user');
        }
    }catch (error) {
        alert('Registro erróneo');
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
