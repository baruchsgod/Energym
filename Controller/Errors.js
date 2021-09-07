const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require('mongoose');
const ErrorModel = require(__dirname + "/../Model/errores.js");


const test = {
   
    
          
    
    guardarErrores: async function(req, res){
        var des = "Prueba";
        var user = "Eddison";
        var fechas = "sysdate";
        var modul = "Admin";
        var error = "Prueba";

        const errorGuardar = new ErrorModel ({
            "Descripcion": req.Descripcion,
            "Usuario": req.Usuario,
            "Fecha": req.Fecha,
            "Modulo": req.Modulo,
            "LogError": req.LogError,
        });

        errorGuardar.save((err, errorStored) => {
            if (err) {
             //   return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar el evento ' + err, icon: 'error' });
             console.log(err+ "Error detectado")
            }
            if (!errorStored) {
                // res.status(404).send({ title: 'Error!', message: 'Hubo un problema al guardar el evento', icon: 'error' });
            }
           // return res.status(200).send({ title: 'Exito!', message: 'El evento ' + errorStored.Titulo + ' fue creado correctamente!', icon: 'success' });
        });

        },

        getErrores: function (req, res) {
            //return res.status(200).send("data");
            ErrorModel.find((err, data) => {
                if (err) {
                    return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al cargar los datos: ' + err, icon: 'error' });
                }
                if (!data) {
                    return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al cargar los datos!', icon: 'error' });
                }
                return res.status(200).send(data);
            });
        },
        
}
module.exports = test;



