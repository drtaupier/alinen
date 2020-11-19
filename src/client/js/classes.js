export class UI{
    footer(){
        const footer = document.querySelector('footer');
        const today = new Date();
        const year = today.getFullYear();
        footer.innerHTML = `<h3>Copyright &copy ${year}</h3>`;
    }
}