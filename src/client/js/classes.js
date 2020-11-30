export class UI{
    footer(){
        const footer = document.querySelector('footer');
        const today = new Date();
        const year = today.getFullYear();
        footer.innerHTML = `<h3>Derechos Reservados &copy ${year}</h3>`;
    }
}

export class Formularios{
    cleanForm(){
        const form = document.querySelector('form');
        form.reset();
    }

    msgError(mensaje){
        const section = document.querySelector('section');
        const element = document.createElement('div');
        element.setAttribute('id', 'errorMsg');
        element.innerHTML = `<h2>${mensaje}</h2>`;
        section.appendChild(element);
        setTimeout( ()=> { document.querySelector('#errorMsg').remove() }, 3000 );
    }

    deleteMsg(){
        //Este metodo es para que el mensaje no se pueda repetir al presionar varias veces Ingresar.
        const send = document.querySelector('#enviar');
        send.addEventListener('click', ()=>{
            const mensaje = send.parentElement.parentElement.nextElementSibling;
            if(mensaje){
                mensaje.remove();
            }
        })
    }

    fechaActual(){
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const hour = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
        const now = `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
        return now;
    }
}

class Usuarios{

}