import { UI } from './classes'
const ui = new UI();    

window.onload = function(){
    ui.footer();

    const formulario = document.querySelector('form');
    formulario.addEventListener('submit', e => {
        e.preventDefault();
        ui.deleteMsg();
        validaForm(); 
    });

    function validaForm(){
        const user = document.querySelector('#user').value.trim();
        const psw = document.querySelector('#psw').value.trim();
        const day = document.querySelector('select').value;

        if(user === '' && psw === ''){
            ui.msgError("Por favor, ingrese sus credenciales");
        }else if(user === ''){
            ui.msgError("Por favor, ingrese el usuario");
            return false;
        }else if(psw === ''){
            ui.msgError('Por favor, ingrese su contraseña');
            return false;
        }else if(day == 0){
            ui.msgError("Por favor, seleccione el día que le corresponde");
            return false;
        }else{
            console.log('I did login');
            postData('/mylogin', {'user': user, 'psw': psw, 'day': day, 'fecha': fecha });
        }
    }
}

const postData = async(url = '', data = {}) => {
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