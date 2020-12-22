const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let voluntariaSchema = new Schema({
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
		unique: true,
		required: [true, "El e-mail es requerido"],
	},
	dia: {
		type: Schema.Types.ObjectId,
		ref: "Dia",
		required: true,
	},
	estado: {
		type: Boolean,
		default: true,
	},
	fecha_alta: {
		type: Date,
		default: () => Date.now(),
	},
	img: {
		type: String,
		required: false,
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: "Usuario",
	},
});

module.exports = mongoose.model("Voluntaria", voluntariaSchema);
