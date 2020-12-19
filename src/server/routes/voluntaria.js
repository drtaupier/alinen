const express = require("express");
const app = express();
const {
	verificaToken,
	verificaAdminRole,
} = require("../middlewares/authentication");
let Voluntaria = require("../models/voluntariaSchema");
const _ = require("underscore");

//Muestra a todas las voluntarias
app.get("/voluntarias", verificaToken, (req, res) => {
	let desde = req.query.desde || 0;
	let limite = req.query.limite || 5;
	desde = Number(desde);
	limite = Number(limite);
	Voluntaria.find({ estado: true })
		.sort("apellido")
		.populate("usuario", "nombre apellido")
		.populate("dia", "dia")
		.skip(desde)
		.limit(limite)
		.exec((err, voluntarias) => {
			if (err) {
				res.status(500).json({
					ok: false,
					err,
				});
			}

			Voluntaria.count({ estado: true }, (err, conteo) => {
				res.json({
					ok: true,
					voluntarias,
					total: conteo,
				});
			});
		});
});

//Muestra una voluntaria por ID
app.get("/voluntarias/:id", verificaToken, (req, res) => {
	let id = req.params.id;
	Voluntaria.findById(id)
		.populate("usuario", "nombre apellido")
		.populate("dia", "dia")
		.exec((err, voluntariaDB) => {
			if (err) {
				res.status(500).json({
					ok: false,
					err,
				});
			}
			if (!voluntariaDB) {
				res.status(500).json({
					ok: false,
					err: {
						message: "El ID no es correcto",
					},
				});
			}
			res.json({
				ok: true,
				voluntaria: voluntariaDB,
			});
		});
});

//Buscar voluntaria:
app.get("/voluntarias/buscar/:termino", verificaToken, (req, res) => {
	let termino = req.params.termino;
	let regex = new RegExp(termino, "i"); //este Object se usa para expresiones regulares y con la i le indicamos que sea insensible a mayusculas y minusculas
	Voluntaria.find({ email: regex })
		.populate("usuario", "nombre apellido")
		.populate("dia", "dia") //el primer campo es el nombre de la propiedad que se indico en el Schema
		.exec((err, voluntarias) => {
			if (err) {
				res.status(500).json({
					ok: false,
					err,
				});
			}
			res.json({
				ok: true,
				voluntarias,
			});
		});
});

app.post("/voluntarias", [verificaToken, verificaAdminRole], (req, res) => {
	let body = req.body;

	let voluntaria = new Voluntaria({
		nombre: body.nombre,
		apellido: body.apellido,
		email: body.email,
		dia: body.dia,
		usuario: req.usuario._id, //esta información viene en el token
	});
	//Guardando la información en la DB:
	voluntaria.save((err, voluntariaDB) => {
		if (err) {
			res.status(500).json({
				ok: false,
				err,
			});
		}
		if (!voluntariaDB) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}
		res.json({
			ok: true,
			voluntaria: voluntariaDB,
		});
	});
});

app.put("/voluntarias/:id", [verificaToken, verificaAdminRole], (req, res) => {
	let id = req.params.id;
	let body = req.body;

	let descVoluntaria = {
		nombre: body.nombre,
		apellido: body.apellido,
		email: body.email,
		dia: body.dia,
	};
	Voluntaria.findByIdAndUpdate(
		id,
		descVoluntaria,
		{ new: true, runValidators: true },
		(err, voluntariaDB) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				});
			}
			if (!voluntariaDB) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			res.json({
				ok: true,
				voluntaria: voluntariaDB,
			});
		}
	);
});

app.delete(
	"/voluntarias/:id",
	[verificaToken, verificaAdminRole],
	(req, res) => {
		let id = req.params.id;
		let cambioEstado = {
			estado: false,
		};

		Voluntaria.findByIdAndUpdate(
			id,
			cambioEstado,
			{ new: true },
			(err, voluntariaEliminada) => {
				if (err) {
					return res.status(500).json({
						ok: false,
						err,
					});
				}
				if (!voluntariaEliminada) {
					return res.status(400).json({
						ok: false,
						err: {
							message: "ID no existe",
						},
					});
				}
				res.json({
					ok: true,
					voluntaria: voluntariaEliminada,
				});
			}
		);
	}
);

module.exports = app;
