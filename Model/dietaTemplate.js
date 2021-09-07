const mongoose = require('mongoose');
const DietTemplateSchema = new mongoose.Schema({
    TipoDieta: {
        type: String,
        required: [true, 'El tipo de dieta es requerido']
    },
    Detalle: {
        type: String,
        required: [true, 'El detalle es requerido'],
        minLength: [10, 'El detalle es muy corto']
    },
});
var Diet = mongoose.model("DietTemplate", DietTemplateSchema);
module.exports = Diet;