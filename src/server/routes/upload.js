const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const Usuario = require("../models/usuarioSchema");
const Voluntaria = require("../models/voluntariaSchema");
const fs = require("fs");
const path = require("path");
//default options
app.use(fileUpload());

app.put("/upload/:tipo/:id", (req, res) => {
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
	let archivo = req.files.archivo; //nombre completo del archivo con su extension
	let nombreCortado = archivo.name.split("."); //corta el nombre en 2 partes, antes del punto y despues del punto
	let extension = nombreCortado[nombreCortado.length - 1];

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
	//Propiedad que sube el archivo a la carpeta
	archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err,
			});
		}
		//Hacemos esta validacion para saber cual debe de utilizar, si existieran mas rutas usariamos un switch
		if (tipo === "usuarios") {
			imagenUsuario(id, res, nombreArchivo);
		} else {
			imagenVoluntaria(id, res, nombreArchivo);
		}
	});
});

//Subir imagen a usuarios
function imagenUsuario(id, res, nombreArchivo) {
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
			return res.status(500).json({
				ok: false,
				err: {
					message: "Usuario no existe",
				},
			});
		}
		borraArchivo(usuarioDB.img, "usuarios");
		usuarioDB.img = nombreArchivo;
		usuarioDB.save((err, usuarioGuardado) => {
			res.json({
				ok: true,
				usuario: usuarioGuardado,
				img: nombreArchivo,
			});
		});
	});
}
function imagenVoluntaria(id, res, nombreArchivo) {
	Voluntaria.findById(id, (err, voluntariaDB) => {
		if (err) {
			borraArchivo(nombreArchivo, "voluntarias");
			return res.status(500).json({
				ok: false,
				err,
			});
		}
		if (!voluntariaDB) {
			borraArchivo(nombreArchivo, "voluntarias");
			return res.status(500).json({
				ok: false,
				err: {
					message: "Voluntaria no existe",
				},
			});
		}
		borraArchivo(voluntariaDB.img, "voluntaria");
		voluntariaDB.img = nombreArchivo;

		voluntariaDB.save((err, voluntariaGuardada) => {
			res.json({
				ok: true,
				voluntaria: voluntariaGuardada,
				img: nombreArchivo,
			});
		});
	});
}

const borraArchivo = (nombreImagen, tipo) => {
	let pathImagen = path.resolve(
		__dirname,
		`../../../uploads/${tipo}/${nombreImagen}`
	);
	if (fs.existsSync(pathImagen)) {
		fs.unlinkSync(pathImagen); //si el path existe borra la imagen, este es un metodo del File System
	}
};

module.exports = app;
