const mongoose = require('mongoose');
const BalanceSchema = new mongoose.Schema({
  "efectivoInicial":{
    type:Number,
    min:[0,"Efectivo inicial nunca puede ser menor a cero. Usted ingreso {VALUE}"],
    max:[25000, "Efectivo inicial nunca sera mayor a 25000 ya que es una políticia del gimnasio."]
  },
  "estado":{
    type:String,
    enum:{
      values:["Conciliado", "Discrepancia", "Rechazado"],
      message:"{VALUE} es incorrecto"
    }
  },
  "fecha":{
    type:Date,
    default:Date.now
  },
  "discrepanciaInicial":Number,
  "ventasEfectivo":Number,
  "ventasTarjeta":Number,
  "ventasTotales":Number,
  "gastosEfectivo":Number,
  "gastosTarjeta":Number,
  "gastosTotales":Number,
  "efectivoRecibido":Number,
  "faltanteSobrante":Number,
  "Empleado":String

}, {timestamps: true});
var Balance = mongoose.model("Balance", BalanceSchema);
module.exports = Balance;
