const express = require("express");
const bodyParser = require("body-parser");
const User = require(__dirname + "/../Model/cliente.js");
const Retroalimentacion = require(__dirname + "/../Model/retroalimentacion.js");
const Customer = require(__dirname + "/../Model/cliente.js");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
const router = express.Router();

router.get("/getRetroalimentacionAdmin", async (req, res, next) => {
    Retroalimentacion.find((err, data) => {
        if (err) {
            return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al cargar los datos: ' + err, icon: 'error' });
        }
        if (data) return res.status(200).send(data);
    });
});

router.get("/", async (req, res, next) => {
    var userId = req.user._id;
    Customer.findOne({ _id: userId }, (err, user) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (user) return res.status(200).send(user.Retroalimentacion);
        }
    });
});

router.post("/", async (req, res, next) => {
    //Esta funcion agrega un Mensaje a la coleccion
    var retroalimentacion = new Retroalimentacion({
        "Cliente.Id": req.user._id,
        "Cliente.Correo": req.user._id,
        "Descripcion": req.body.descripcion,
        "Calificacion": req.body.calificacion
    });
    retroalimentacion.save((err, retroalimentacionStored) => {
        if (err) {
            return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar el mensaje ' + err, icon: 'error' });
        }
        if (!retroalimentacionStored) {
            return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar el mensaje', icon: 'error' });
        }
        var retroalimentacionCliente = {
            "id": retroalimentacionStored._id,
            "Fecha": retroalimentacionStored.Fecha,
            "Descripcion": retroalimentacionStored.Descripcion,
            "Calificacion": retroalimentacionStored.Calificacion
        };
        User.findByIdAndUpdate(req.user._id, { $push: { Retroalimentacion: retroalimentacionCliente } }, { upsert: true, setDefaultsOnInsert: true }, async (err, clientUpdated) => {
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al guardar la retroalimentación en el cliente: ' + err, icon: 'error' });
            }
            if (!clientUpdated) {
                return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al guardar la retroalimentación en el cliente', icon: 'error' });
            }
            //Si no hay errores se retorna el exito de la operacion con el registro de la reserva en la coleccion Retroalimentacion y customers.retroalimentacion
            return res.status(200).send({ title: 'Exito!', message: 'El Mensaje fue creado correctamente!', icon: 'success' });
        });
    });
})

module.exports = router;