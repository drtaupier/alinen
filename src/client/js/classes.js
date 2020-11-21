export class UI{
    footer(){
        const footer = document.querySelector('footer');
        const today = new Date();
        const year = today.getFullYear();
        footer.innerHTML = `<h3>Copyright &copy ${year}</h3>`;
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

    cleanForm(){
        const form = document.querySelector('form');
        form.reset();
    }

    fechaActual(){
        const today = new Date();
        const hour = today.getUTCHours();
        const minutes = today.getMinutes();
        const seconds = today.getUTCSeconds()        
    }
}