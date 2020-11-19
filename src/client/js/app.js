import { UI } from './classes'
const ui = new UI();    

window.onload = function(){
    ui.footer();

    const formulario = document.querySelector('form');
    formulario.addEventListener('click', e => {
        e.preventDefault();
        console.log('Hola');
        validaForm();
    });

    function validaForm(){
        const user = document.querySelector('#user').value.trim();
        const psw = document.querySelector('#psw').value.trim();
        const day = document.querySelector('select').value;

        if(user === ''){
            console.log('Usuario esta vacio');
            return false;
        }
        if(psw === ''){
            console.log('Ingrese su password');
            return false;
        }
    }
}