const mongoose = require('mongoose');
const RoutineSchema = new mongoose.Schema(
  {
    "cliente":Object(),
    "nombre":String,
    "apellido":String,
    "email":String,
    "Detalles":[{
      "dia":String,
      "tipo":String,
      "detalle":String
    }]
    
  }, {timestamps:true}
);
var Routine = mongoose.model("Routine", RoutineSchema);
module.exports = Routine;
