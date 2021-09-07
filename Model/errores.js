const mongoose = require('mongoose');
const ErrorSchema = new mongoose.Schema({
    "Descripcion": {
        type: String,
        default: ""
    },
    "Usuario": {
        type: String,
        default: ""
    },
    "Fecha": {
        type: Date
    },
    "Modulo": {
        type: String
    },
    "LogError": {
        type: String
    }
}, { timestamps: true });
var Error = mongoose.model("Error", ErrorSchema);
module.exports = Error;