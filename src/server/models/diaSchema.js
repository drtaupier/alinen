const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let diaSchema = new Schema({
    dia: {
        type: String,
        required: [true, 'El día es requerido']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

module.exports = mongoose.model('Dia', diaSchema);