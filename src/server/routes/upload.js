const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const Usuario = require("../models/usuarioSchema");
const fs = require("fs");
const path = require("path");
//default options
app.use(fileUpload());

app.put("/upload:tipo/:id", (req, res) => {
	let tipo = req.params.tipo;
	let id = req.params.id;
	if (!req.files) {
		return res.status(400).json({
			ok: false,
			err: {
				message: "No se ha seleccionado ningun archivo",
			},
		});
	}
	//Valida tipo
	let tiposValidos = ["usuarios", "voluntarias"];
	if (tiposValidos.indexOf(tipo) < 0) {
		return res.status(400).json({
			ok: false,
			err: {
				message: "Los tipos permitidos son: " + tipo.join(", "),
			},
		});
	}
	let archivo = req.files.archivo;
	let nombreCortado = archivo.name.split(".");
	let extension = nombreCortado[nombreCortado.lenght - 1];

	let extensionesPermitidas = ["png", "jpg", "jpeg", "gif"];

	if (extensionesPermitidas.indexOf(extension) < 0) {
		return res.status(400).json({
			ok: false,
			err: {
				message:
					"Las extensiones validas son: " + extensionesPermitidas.join(", "),
			},
		});
	}
	//Cambiar nombre al archivo.. Se agregan milisegundos para evitar el cache
	let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

	archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err,
			});
		}
		imagenUsuario(id, res);
	});
});

const imagenUsuario = (id, res, nombreArchivo) => {
	Usuario.findById(id, (err, usuarioDB) => {
		if (err) {
			borraArchivo(nombreArchivo, "usuarios");
			return res.status(500).json({
				ok: false,
				err,
			});
		}
		if (!usuarioDB) {
			borraArchivo(nombreArchivo, "usuarios");
			return res.status(400).json({
				ok: false,
				err: {
					message: "ID invalido",
				},
			});
		}
		usuarioDB.img = nombreArchivo;
		borraArchivo(usuarioDB.img, "usuarios");
		usuarioDB.save((err, usuarioGuardado) => {
			res.json({
				ok: true,
				usuario: usuarioGuardado,
				img: nombreArchivo,
			});
		});
	});
};
const imagenVoluntaria = () => {};

const borraArchivo = (nombreImagen, tipo) => {
	let pathImagen = path.resolve(
		__dirname,
		`../../uploads/${tipo}/${nombreImagen}`
	);
	if (fs.existsSync(pathImagen)) {
		fs.unlinkSync(pathImagen); //si el path existe borra la imagen, este es un metodo del File System
	}
};

module.exports = app;
