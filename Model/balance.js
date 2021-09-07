const mongoose = require('mongoose');
const InitialSchema = new mongoose.Schema({
  "fecha":{
    type:Date
  },
  "SaldoInicial":Number,
  "Empleado":String

}, {timestamps: true});
var Initial = mongoose.model("Cashier", InitialSchema);
module.exports = Initial;
