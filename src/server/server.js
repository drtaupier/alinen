require('./config/config');
projectData = [];
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');

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
    //Definimos la ruta de nuestros partials (aquí se pondrán las plantillas de cada sección)
    //hbs.registerPartials('views/partials');
    //app.set('view engine', 'hbs');
    //Creamos rutas para mostrar archivos:
//     app.get('/', (req, res) => {
//         res.render('home',{
//        anio: new Date().getFullYear(),
//    });
// });

//Configuración global de rutas
app.use(require('./routes/index'))

mongoose.connect('mongodb://localhost:27017/alinen', (err, res)=>{
    if(err) throw err;
    console.log('Base de datos online');
});

//SERVER
app.listen(process.env.PORT, ()=>{
    console.log('Escuchando puerto: ', process.env.PORT);
});
