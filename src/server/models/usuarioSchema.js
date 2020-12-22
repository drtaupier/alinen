const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
	values: ["ADMIN_ROLE", "USER_ROLE"],
	message: "{VALUE} no es un role válido",
};
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es requerido"],
	},
	apellido: {
		type: String,
		required: [true, "El apellido es requerido"],
	},
	email: {
		type: String,
		unique: true, //esto hara que no se pueda repetir el email al momento de grabar un usuario en la DB
		required: [true, "El e-mail es requerido"],
	},
	password: {
		type: String,
		required: [true, "La contraseña es obligatoria"],
	},
	role: {
		type: String,
		default: "USER_ROLE",
		enum: rolesValidos,
	},
	fecha_alta: {
		type: Date,
		default: () => Date.now(),
	},
	img: {
		type: String,
		required: false,
	},
	estado: {
		type: Boolean,
		default: true,
	},
});

//De esta manera hacemos que en los datos devueltos, no figure el campo de la contraseña
usuarioSchema.methods.toJSON = function () {
	let user = this;
	let userObject = user.toObject(); //aquí es donde está toda la información que viene del Schema
	delete userObject.password; //Eliminamos el campo password
	return userObject; //Nos retorna el object sin el password
};

usuarioSchema.plugin(uniqueValidator, {
	message: " {PATH} debe de ser único ",
});

module.exports = mongoose.model("Usuario", usuarioSchema);
