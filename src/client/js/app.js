import { UI, Formularios } from './classes'
const ui = new UI();
const formulario = new Formularios();

window.onload = function () {
    ui.footer();

    const form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        formulario.deleteMsg();
        validaForm();
    });

    function validaForm() {
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#psw').value.trim();
        const day = document.querySelector('select').value;
        const fecha = formulario.fechaActual();

        if (email === '' && password === '') {
            formulario.msgError("Por favor, ingrese sus credenciales");
        } else if (email === '') {
            formulario.msgError("Por favor, ingrese el usuario");
            return false;
        } else if (password === '') {
            formulario.msgError('Por favor, ingrese su contraseña');
            return false;
        } else if (day == 0) {
            formulario.msgError("Por favor, seleccione el día que le corresponde");
            return false;
        } else {
            console.log('I did login');
            console.table({ email, password, day, fecha });
            postData('/mylogin', { 'email': email, 'password': password, 'day': day, 'fecha': fecha });
        }
    }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', //*GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('Error: ', error);
    }
}