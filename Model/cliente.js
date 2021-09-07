const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const CustomerSchema = new mongoose.Schema({
  "email": {
    type: String,
    unique: [true, "Este correo electrónico ya existe en la base de datos"]
  },
  facebookId: String,
  "username": String,
  "googleId":String,
  "fName": String,
  "lName": String,
  "TipoCuenta": {
    type: String
  },
  // birthDate:Date,
  "Telefono": {
    type: Number,
    minlength: 8,
    maxlength: 8,
    "default": ""
  },

  fechaNacimiento: Date,
  "genero": {
    type: String,
    enum: ["Masculino", "Femenino"]
  },
  "Membresia": {
    type: String,
    enum: ["Anual", "Semestral", "Trimestral", "Mensual"]
  },
  "subscripcionMailchip":{
    type: String,
    default: "false"
  },
  "EstadoCuenta": {
    type: String,
    enum: ["Activo", "Inactivo"]
    // required:[true,"Debe actualizar el estado de su perfil"]
  },
  "Direccion": {
    "Detalle": {
      type: String,
      "default": ""
    },
    "Provincia": {
      type: String,
    //  enum: ["San Jose", "Cartago", "Heredia", "Alajuela", "Guanacaste", "Puntarenas", "Limón"]
      // required:[true, "Testing Province"]
    },
    "Canton": {
      type: String,
      "default": ""
    },
    "Distrito": {
      type: String,
      "default": ""
    },
    "CodigoPostal": {
      type: Number,
      maxlength: 5,
      "default": ""
    }
  },
  "Reservas": [{
    "id": Object(),
    "CuposReservados": Number,
    "EventoResumen": {
      "Titulo": String,
      "Detalle": String,
      "Fecha": Date,
      "Hora": String
    }
  }],
  "Rutinas": [Object()],
  "Retroalimentacion": [{
    "id": Object(),
    "Fecha": Date,
    "Descripcion": String,
    "Calificacion": Number
  }],
  "Dieta": [{
    "id": Object()
  }],
  "Metricas": [{
    "id": Object(),
    "Fecha": Date,
    "EdadActual": Number,
    "Peso": {
      type: String,
      min: [0, "El peso nunca puede ser un número negativo"]
    },
    "GrasaCorporal": {
      type: String,
      min: [0, "La Grasa Corporal nunca puede ser un número negativo"]
    },
    "Biceps": {
      type: String,
      min: [0, "Los Biceps nunca pueden ser un número negativo"]
    },
    "Cintura": {
      type: String,
      min: [0, "La cintura nunca puede ser un número negativo"]
    },
    "Piernas": {
      type: String,
      min: [0, "Las Piernas nunca pueden ser un número negativo"]
    },
    "Espalda": {
      type: String,
      min: [0, "La Espalda nunca puede ser un número negativo"]
    }
  }],
  "Facturacion": {
    type: Array,
    "default": []
  }
}, { timestamps: true });
CustomerSchema.plugin(passportLocalMongoose);
CustomerSchema.plugin(findOrCreate);
var Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
