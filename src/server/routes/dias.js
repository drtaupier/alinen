const express = require('express');
const app = express();
const { verificaToken, verificaAdminRole } = require('../middlewares/authentication');
const Dias = require('../models/diaSchema');

app.get('/dias', verificaToken, (req, res) => {
    Dias.find({})
    .exec((err, dias) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
        }

        Dias.count({estado: true}, (err, conteo)=>{
            res.json({
                ok: true,
                dias,
                total: conteo
            })
        })
    });
})

app.post('/dias', verificaToken, (req, res)=>{
    let body = req.body;

    let dia = new Dias({
        dia: body.dia,
        usuario: req.usuario._id //Información viene por el token
    })
    //Guardando la información en la DB:
    dia.save((err, diaDB)=>{
        if (err) {
            res.status(500).json({
                ok: false,
                err
            })
        }
        if (!dia) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            dia: diaDB
        })
    })
})

module.exports = app;