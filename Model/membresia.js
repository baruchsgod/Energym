const mongoose = require('mongoose');
const MembershipSchema = new mongoose.Schema({
  tipo:String,
  descripcion:String,
  costo:Number,
  clientes:Object()
});
var Membership = mongoose.model("Membership", MembershipSchema);
module.exports = Membership;
