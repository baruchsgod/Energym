const mongoose = require('mongoose');
const MetricSchema = new mongoose.Schema({
  ClienteId: Object(),
  Correo: {
    type: String,
    required: [true, 'El correo es requerido']
  },
  Metricas: [{
    Fecha: {
      type: Date,
      default: Date.now
    },
    Altura: {
      type: Number
    },
    Peso: {
      type: Number
    },
    GrasaCorporal: {
      type: Number
    },
    Biceps: {
      type: Number
    },
    Cintura: {
      type: Number
    },
    Piernas: {
      type: Number
    },
    Espalda: {
      type: Number
    }
  }]
});
var Metric = mongoose.model("Metric", MetricSchema);
module.exports = Metric;
