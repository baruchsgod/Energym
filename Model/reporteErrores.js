const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
  Descripcion: {
    type: String,
    required: true
  },
  Tipo: {
    type: String,
    required: true
  },
  Usuario: Object(),
  Fecha: {
    type: Date,
    default: Date.now
  },
});
var Log = mongoose.model("Log", LogSchema);
module.exports = Log;
