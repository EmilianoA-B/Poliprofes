import { usuarioModule } from './modulov.js';

document.getElementById('guestBtn').addEventListener('click', () => {
    usuarioModule.handleRedirect('guest');
    console.log(usuarioModule.usuarioRegistrado());
});

document.getElementById('userBtn').addEventListener('click', () => {
    usuarioModule.handleRedirect('user');
    console.log(usuarioModule.usuarioRegistrado());
});

document.getElementById('adminBtn').addEventListener('click', () => {
    usuarioModule.handleRedirect('admin');
    console.log(usuarioModule.esAdmin());
});
