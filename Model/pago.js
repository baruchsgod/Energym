const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
  cliente:Object(),
  detalle:{
    tipoTransaccion:String,
    nombreTarjeta:String,
    numeroTarjeta:String,
    expira:Date,
    cvv:String
  }
});
var Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
