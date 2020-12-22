const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const Usuario = require("../models/usuarioSchema");
const _ = require("underscore");
const { json } = require("body-parser");
const {
	verificaToken,
	verificaAdminRole,
} = require("../middlewares/authentication");

//Esta consulta trae unicamente usuarios activos
app.get("/usuario", verificaToken, (req, res) => {
	let desde = req.query.desde || 0;
	let limite = req.query.limite || 5;
	desde = Number(desde);
	limite = Number(limite);
	Usuario.find({ estado: true, role: "USER_ROLE" }, "nombre apellido estado") //El segundo argumento es para decirle que campos quiero que me muestre al momento de hacer la consulta
		.sort("role, fecha_alta")
		.skip(desde)
		.limit(limite)
		.exec((err, usuarios) => {
			if (err) {
				res.status(400).json({
					ok: false,
					err,
				});
			}

			Usuario.count({ estado: true, role: "USER_ROLE" }, (err, conteo) => {
				res.json({
					ok: true,
					usuarios,
					total: conteo,
				});
			});
		});
});

//POST
app.post("/usuario", [verificaToken, verificaAdminRole], (req, res) => {
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
				err,
			});
		}
		res.json({
			ok: true,
			usuario: usuarioDB,
		});
	});
});

app.post("/usuario/admin", (req, res) => {
	let body = req.body;
	//Instanciando el Schema:
	let usuario = new Usuario({
		nombre: body.nombre,
		apellido: body.apellido,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		role: "ADMIN_ROLE",
	});
	//Guardando la informacion en la DB
	usuario.save((err, usuarioDB) => {
		if (err) {
			res.status(400).json({
				ok: false,
				err,
			});
		}
		res.json({
			ok: true,
			usuario: usuarioDB,
		});
	});
});

//PUT (actualizar)
app.put("/usuario/:id", [verificaToken, verificaAdminRole], (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ["nombre", "apellido", "estado"]); //Como segundo argumento, recibe todos los campos que si se podrán actualizar. Hacemos que el psw no pueda ser actualizado de esta manera
	Usuario.findByIdAndUpdate(
		id,
		body,
		{ new: true, runValidators: true },
		(err, usuarioDB) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			res.json({
				usuarioDB,
			});
		}
	);
});

//DELETE (eliminar)
// app.delete('/usuario/:id', (req, res) => {
//     let id = req.params.id;
//     Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         };

//         if (!usuarioEliminado) {
//             return res.status(400).json({
//                 ok: false,
//                 error: {
//                     message: 'Usuario no encontrado'
//                 }
//             });
//         }

//         res.json({
//             ok: true,
//             usuario: usuarioEliminado
//         })
//     })
// });

app.delete("/usuario/:id", [verificaToken, verificaAdminRole], (req, res) => {
	let id = req.params.id;
	let cambioEstado = {
		estado: false,
	};
	Usuario.findByIdAndUpdate(
		id,
		cambioEstado,
		{ new: true },
		(err, usuarioEliminado) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err,
				});
			}
			if (!usuarioEliminado) {
				return res.status(400).json({
					ok: false,
					error: {
						message: "Usuario no encontrado",
					},
				});
			}

			res.json({
				ok: true,
				usuario: usuarioEliminado,
			});
		}
	);
});

module.exports = app;
