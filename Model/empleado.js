const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
// mongoose.set('useCreateIndex', true);

const EmployeeSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        minLength: [4, 'El nombre es muy corto'],
        maxLength: [20, 'El nombre es muy largo']
    },
    Apellido: {
        type: String,
        required: [true, 'El apellido es requerido'],
        minLength: [6, 'El apellido es muy corto'],
        maxLength: [20, 'apellido es muy largo']
    },
    Direccion: {
        DetalleDireccion: {
            type: String,
            enum: ["San Jose", "Cartago", "Heredia", "Alajuela", "Guanacaste", "Puntarenas", "Limón"],
            required: [true, 'El detalle de la dirección es requerido']
        },
        Provincia: {
            type: String,
            required: [true, 'La provincia es requerida']
        },
        CodigoPostal: {
            type: String,
            maxlength: 5
        }
    },
    TipoCuenta: {
        type: String,
        required: [true, 'El tipo de cuenta es requerido']
    },
    FechaIngreso: {
        type: Date,
        default: Date.now
    },
    Turno: [{
        DescripcionTurno: String,
        Horario: String
    }],
    Email: {
        type: String,
        required: [true, 'El correo es requerido'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Formato de correo inválido'],
        validate: {
            validator: function (v) {
                return this.model('Empleado').findOne({ Email: v }).then(user => !user)
            },
            message: props => `El correo ${props.value} está siendo utilizado por otro usuario`
        }
    },
    Password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minLength: [6, 'La contraseña es muy corta'],
        maxLength: [30, 'La contraseña es muy larga']
    }
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

var User = mongoose.model("Employee", EmployeeSchema);

module.exports = User;