const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
  Cliente: {
    "Id": Object(),
    "Correo": String
  },
  Fecha: {
    type: Date,
    default: Date.now
  },
  Descripcion: {
    type: String,
    required: [true, 'La descripción es requerida'],
    minLength: [6, 'La descripción es muy corta']
  },
  Calificacion: {
    type: Number,
    min: [1, 'La calificacion mínima es 1'],
    max: [5, 'La calificacion máxima es 5']
  }
});
var Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
