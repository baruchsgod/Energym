const mongoose = require('mongoose');
const DietSchema = new mongoose.Schema({
  "cliente": Object(),
  "nombre": String,
  "apellido": String,
  "email": String,
  "tipoDieta": String,
  "detalle": String
}, { timestamps: true });
var Diet = mongoose.model("Diet", DietSchema);
module.exports = Diet;
