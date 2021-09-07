const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
  "monto":{
    type:Number,
    required:[true,"Debe ingresar un monto al documento."]
  },
  "numDocumento":{
    type:Number,
    required:[true, "Todo documento debe contener un identificador."]
  },
  "fecha":{
    type:Date,
    default:Date.now
  },
  "usuario":{
    type:String
  },
  "tipoDoc":String,
  "liquidez":Boolean,
  "estado":String,
  "iva":Number,
  "cliente":Object(),
  "email":String,
  "Cerrado":String,
  "FechaCierre":Date,
  "FechaApertura":Date
}, {timestamps: true});
var Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
