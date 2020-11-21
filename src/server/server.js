projectData = [];
const express = require('express');
const app = express();
/*Dependencies*/
const bodyParser = require('body-parser');

/*Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Cors
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));
app.use(express.static('public'));
//Express HBS engine
//app.set('view engine', 'hbs');
//Creamos rutas para mostrar archivos:
// app.get('/', (req, res) => {
//     res.render('home',{
//         nombre: 'David',
//         anio: new Date().getFullYear()
//     });
// })

app.post('/mylogin', (req, res) => {
    const body = req.body;
    let data = {
        user: body.user,
        psw: body.psw,
        day: body.day,
        fecha: body.fecha
    }
    projectData.push(data);
    res.send('Información enviada con éxito');
    console.log(projectData);
})

const port = 3000;

const listening = () => console.log(`Running on localhost: ${port}`);

const server = app.listen(port, listening);