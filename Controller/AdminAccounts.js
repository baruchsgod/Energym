
const express = require("express");
const bodyParser = require("body-parser");
const Account = require(__dirname + "/../Model/cliente.js");
const User = require(__dirname + "/../Model/cliente.js");
const mongoose = require('mongoose');
const ErrorController = require("./Errors");
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

const controller = {
    getAccounts: function (req, res) {
        //return res.status(200).send("data");
        Account.find((err, data) => {
            if (err) {
                return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al cargar los datos: ' + err, icon: 'error' });
            }
            if (!data) {
                return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al cargar los datos!', icon: 'error' });
            }
            return res.status(200).send(data);
        });
    },
    getAccountClient: function (req, res) {
        var tipo = "Cliente";
        Account.find({ "TipoCuenta": tipo }, (err, cuentas) => {
            if (err) {
                return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al cargar los datos: ' + err, icon: 'error' });
            } else {
                if (cuentas) return res.status(200).send(cuentas);
            }
        });
    },

    estadoCuenta: async function (req, res) {
        //recogo los parametros que vienen del request     
        var cuentaId = req.body.idUser;
        var tipo = req.body.estado;
        const newCastId = mongoose.Types.ObjectId(cuentaId);
        User.updateOne({ _id: newCastId }, { EstadoCuenta: tipo === "Activo" ? "Inactivo" : "Activo" }, { safe: true, multi: true }, function (err) {
            if (err) return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar: ' + err, icon: 'error' });
            else return res.status(200).send({ icon: 'success' });
        });
    },
    estadoCuentaCliente:  async function(req,res){
    
        var id = req.body.id;
        var estado = "Inactivo";

        const newid = mongoose.Types.ObjectId(id);

        const findEvento = (id) => { return User.find({ _id: id }).exec(); }
        const evento = await findEvento(id);
      
        User.updateOne({ _id: id }, { EstadoCuenta: estado,  }, { safe: true, multi: true }, function (err, eventoUpdated) {
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar: ' + err, icon: 'error' });
            }
            return res.status(200).send({icon: 'success'});
          
        });
    },
    ActivarCuentaCliente:  async function(req,res){

        var correo = req.body.username;
        var estado = "Activo";
        
        const findEvento = (correo) => { return User.find({ email: correo }).exec(); }
        const evento = await findEvento(correo);

        User.updateOne({ email: correo }, { EstadoCuenta: estado,  }, { safe: true, multi: true }, function (err, eventoUpdated) {
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar: ' + err, icon: 'error' });
            }
            return res.status(200).send({icon: 'success'});
          
        });
      
      //  console.log(correo);
    },
    activarMailchip:  async function(req,res){
    
        var id = req.body.id;
        var estado = "subscrito";

        const newid = mongoose.Types.ObjectId(id);

        const findEvento = (id) => { return User.find({ _id: id }).exec(); }
        const evento = await findEvento(id);
      
        User.updateOne({ _id: id }, { subscripcionMailchip: estado,  }, { safe: true, multi: true }, function (err, eventoUpdated) {
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar: ' + err, icon: 'error' });
            }
            return res.status(200).send({icon: 'success'});
          
        });
    },
    desactivarMailchip:  async function(req,res){
    
        var id = req.body.id;
        var estado = "false";

        const newid = mongoose.Types.ObjectId(id);

        const findEvento = (id) => { return User.find({ _id: id }).exec(); }
        const evento = await findEvento(id);
      
        User.updateOne({ _id: id }, { subscripcionMailchip: estado,  }, { safe: true, multi: true }, function (err, eventoUpdated) {
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar: ' + err, icon: 'error' });
            }
            return res.status(200).send({icon: 'success'});
          
        });
    },
    reactivarMailchip:  async function(req,res){
    
        var id = req.body.id;
        var estado = "subscrito";

        const newid = mongoose.Types.ObjectId(id);

        const findEvento = (id) => { return User.find({ _id: id }).exec(); }
        const evento = await findEvento(id);
      
        User.updateOne({ _id: id }, { subscripcionMailchip: estado,  }, { safe: true, multi: true }, function (err, eventoUpdated) {
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar: ' + err, icon: 'error' });
            }
            return res.status(200).send({icon: 'success'});
          
        });
    }
  


}
    

module.exports = controller;



