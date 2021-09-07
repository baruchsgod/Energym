const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  "Titulo": {
    type: String,
    required: [true, 'El título es requerido'],
    maxLength: [50, 'El título es muy largo']
  },
  "Detalle": {
    type: String,
    required: [true, 'El detalle es requerido']
  },
  "Cupos": Number,
  "Imagen": String,
  "Fecha": {
    type: Date,
    required: [true, 'La fecha es requerida']
  },
  "Hora": String,
  "Clientes": [{
    "Id": Object(),
    "Email": String,
    "CuposReservados": Number,
    "FechaReserva": {
      type: Date,
      default: Date.now
    },
  }],
});
var Event = mongoose.model("Event", EventSchema);
module.exports = Event;