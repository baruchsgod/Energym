const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const AcountSchema = new mongoose.Schema({
  "email": {
    type: String,
    unique: [true, "Este correo electrónico ya existe en la base de datos"]
  },
  "tipoCuenta": String,
  googleId: String,
  facebookId: String,
  "username": String,
  "fName": String,
  "lName": String,
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
      enum: ["San Jose", "Cartago", "Heredia", "Alajuela", "Guanacaste", "Puntarenas", "Limón"]
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
    "Evento": {
      "Titulo": {
        type: String
      },
      "Detalle": {
        type: String
      },
      "FechaHora": {
        type: Date
      },
      "Estado": {
        type: String,
        enum: ["Activo", "Inactivo"]
      }
    }
  }],
  "Rutinas": [{
    "id": Object(),
    "TipoRutina": {
      type: String
    },
    "Peso": Number,
    "Repeticion": {
      type: String
    },
    "Maquina": {
      type: String
    },
    "Duracion": {
      type: String
    }
  }],
  "Retroalimentacion": [{
    "id": Object(),
    "Fecha": Date,
    "Descripcion": String,
    "Calificacion": Number
  }],
  "Dieta": [{
    "id": Object(),
    "TipoDieta": String,
    "Detalle": String
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
AcountSchema.plugin(passportLocalMongoose);
AcountSchema.plugin(findOrCreate);
var Acount = mongoose.model("Acounts", AcountSchema);
module.exports = Acount;
