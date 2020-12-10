const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario');
const _ = require('underscore');
const usuario = require('../models/usuario');

//GET (obtener)
app.get('/panelControl', (req, res) => {
    res.render('dist/panelControl.html');
})

app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;
    desde = Number(desde);
    limite = Number(limite);
    Usuario.find({})
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
        if(err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuarios //nombre de la colección
        })
    })
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

app.post('/usuario', (req, res) => {
    const body = req.body;
    //instanciando el Schema
    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    });
    //guardando la información en la BD:
    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
});


//PUT (actualizar)
app.put('/usuario/:email', (req, res) => {
    let email = req.params.email;
    let body = _.pick(req.body, ['nombre', 'apellido', 'estado']); //Como segundo argumento, recibe todos los campos que si se podrán actualizar. Hacemos que el psw no pueda ser actualizado de esta manera
    Usuario.findByIdAndUpdate(email, body, { new: true, runValidators: true }, (err, usuarioDB));
    if (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
    res.json({
        id
    });
})

//DELETE (eliminar)
app.delete('/usuario', (req, res) => {
    res.json('delete Ususario');
});

module.exports = app;