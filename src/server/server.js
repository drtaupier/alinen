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

//GET
app.get('/panelControl', (req, res) => {
    res.render('dist/panelControl.html');
})

app.get('/usuario', (req, res)=>{
    res.json('get Usuario');
})

//POST
app.post('/mylogin', (req, res) => {
    const body = req.body;
    let data = {
        user: body.user,
        psw: body.psw,
        day: body.day,
        fecha: body.fecha,
    }
    projectData.push(data);
    res.send('Información enviada con éxito');
    console.log(projectData);
})

app.post('/usuario', (req, res)=>{
    const body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }else{
        res.json({
            persona: body
        });
    }
})

//PUT
app.put('/usuario/:id', (req, res)=>{
    let id = req.params.id
    res.json({
        id
    });
})

//DELETE
app.delete('/usuario', (req, res)=>{
    res.json('delete Ususario');
})

mongoose.connect('mongodb://localhost:27017/alinen', (err, res)=>{
    if(err) throw err;
    console.log('Base de datos online');
});

//SERVER

app.listen(process.env.PORT, ()=>{
    console.log('Escuchando puerto: ', process.env.PORT);
});
