const express = require("express");
const bodyParser = require("body-parser");
const User = require(__dirname + "/../Model/cliente.js");
const Metrica = require(__dirname + "/../Model/metricas.js");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
const controller = {
    createMetrica: async function (req, res) {
        //recuperacion de los datos del body
        const correoCliente = req.body.email;
        //creo el objeto de metrica para luego meterlo dentro del arreglo de las metricas del cliente
        var metricaDetalle = {
            "Altura": req.body.altura,
            "Peso": req.body.peso,
            "GrasaCorporal": req.body.grasaCorporal,
            "Biceps": req.body.biceps,
            "Cintura": req.body.cintura,
            "Piernas": req.body.piernas,
            "Espalda": req.body.espalda,
            "Fecha": req.body.fecha
        }
        //las siguientes 3 lineas recuperan el cliente pasando como parametro el correo
        const findCliente = (correoCliente) => { return User.find({ email: correoCliente, EstadoCuenta: "Activo" }).exec(); }
        const cliente = await findCliente(correoCliente);
        if (cliente.length === 0) return res.status(200).send({ title: 'Error!', message: 'El correo proporcionado no cuenta con una cuenta en el sistema!', icon: 'error' });
        const idCliente = cliente[0]._id;//se pueden sacar los demas atributos del cliente
        //las siguientes 2 lineas recuperan las metricas del cliente pasando como parametro el correo
        //este proceso sirve para crearle un cupo en la coleccion o simplemente recoger el id del cupo que ya le fue creado
        const findMetricas = (correoCliente) => { return Metrica.find({ Correo: correoCliente }).exec(); }
        const metricas = await findMetricas(correoCliente);
        //si al buscar en la coleccion de metricas las asignadas al correo del cliente y no hay se procede a crear el campo
        if (metricas.length === 0) {
            //se recogen los parametros del cliente
            var metrica = new Metrica({
                "ClienteId": idCliente,
                "Correo": correoCliente
            });
            //se guarda el cupo de informacion del cliente para llenarlo con el arreglo de metricas para su historial
            //el objeto de metrica tiene datos del id y del correo del cliente y dentro tiene un arreglo con sus multiples metricas
            metrica.save((err, metricaStored) => {
                if (err) {
                    return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar los datos ' + err, icon: 'error' });
                }
                if (!metricaStored) {
                    return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar los datos', icon: 'error' });
                }
                else {
                    //luego que se crea el campo del correo y del id del cliente se actualiza metiendole los datos de los numeros de las metricas
                    Metrica.findByIdAndUpdate(metricaStored._id, { $push: { Metricas: metricaDetalle } }, { setDefaultsOnInsert: true }, async (err, metricaUpdated) => {
                        if (err) {
                            return res.status(200).send({ title: 'Hubo un error!', message: 'Error al guardar: ' + err, icon: 'error' });
                        }
                        if (!metricaUpdated) {
                            return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar los datos', icon: 'error' });
                        }
                        //el cliente tiene sus metricas actualizadas
                        return res.status(200).send({ title: 'Exito!', message: 'Los datos fueron guardados correctamente!', icon: 'success' });
                    });
                }
            });
        }
        //si el arreglo metricas tiene datos quiere decir que ya el cupo del cliente estaba creado y solo qued actualizarlo con sus nuevas metricas
        else {
            //se recoge el id del evento en el cupo del cliente
            var idMetrica = metricas[0]._id;
            //se actualiza la informacion metiendo las nuevas metricas
            Metrica.findByIdAndUpdate(idMetrica, { $push: { Metricas: metricaDetalle } }, { setDefaultsOnInsert: true }, async (err, metricaUpdated) => {
                if (err) {
                    return res.status(200).send({ title: 'Hubo un error!', message: 'Error al guardar: ' + err, icon: 'error' });
                }
                if (!metricaUpdated) {
                    return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar los datos', icon: 'error' });
                }
                //Las metricas han sido actualizadas
                return res.status(200).send({ title: 'Exito!', message: 'Los datos fueron guardados correctamente!', icon: 'success' });
            });
        }
    },
    getUserMetrics: async function (req, res) {
        var correo = req.query.correoCliente;
        const findCliente = (correo) => { return User.find({ email: correo, EstadoCuenta: "Activo" }).exec(); }
        const cliente = await findCliente(correo);
        if (cliente.length === 0) return res.status(200).send({ title: 'Error!', message: 'El correo proporcionado no cuenta con una cuenta en el sistema!', icon: 'error' });
        Metrica.findOne({ "Correo": correo }, (err, metrics) => {
            if (err) {
                return res.status(200).send("No encontrado");
            } else {
                if (!metrics) return res.status(200).send("");
                else return res.status(200).send(metrics.Metricas);
            }
        });
    },
    verificaMetricas: function (req, res) {
        var correo = req.query.correoCliente;
        Metrica.findOne({ "Correo": correo }, (err, metrics) => {
            if (err) {
                return res.status(200).send("No encontrado");
            } else {
                if (!metrics) return res.status(200).send("");
                else return res.status(200).send({ message: true });
            }
        });
    },
    editMetric: async function (req, res) {
        //recuperacion de los datos del body
        const idMetrica = req.body.id;
        //creo el objeto de metrica para luego meterlo dentro del arreglo de las metricas del cliente
        var metricaDetalle = {
            "Altura": req.body.altura,
            "Peso": req.body.peso,
            "GrasaCorporal": req.body.grasaCorporal,
            "Biceps": req.body.biceps,
            "Cintura": req.body.cintura,
            "Piernas": req.body.piernas,
            "Espalda": req.body.espalda,
            "Fecha": req.body.fecha
        }
        //Castea las id para que mantengan formato
        const newCastMetricId = mongoose.Types.ObjectId(idMetrica);
        Metrica.updateOne({ "Metricas._id": newCastMetricId }, {
            $set: {
                "Metricas.$.Altura": metricaDetalle.Altura,
                "Metricas.$.GrasaCorporal": metricaDetalle.GrasaCorporal,
                "Metricas.$.Biceps": metricaDetalle.Biceps,
                "Metricas.$.Cintura": metricaDetalle.Cintura,
                "Metricas.$.Piernas": metricaDetalle.Piernas,
                "Metricas.$.Espalda": metricaDetalle.Espalda,
                "Metricas.$.Fecha": metricaDetalle.Fecha
            }
        }, (err, metricUpdated) => {
            if (err) return res.status(200).send({ title: 'Hubo un error!', message: 'Error al actualizar las métrica: ' + err, icon: 'error' });
            if (!metricUpdated) return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al actualizar las métricas', icon: 'error' });
            return res.status(200).send({ title: 'Exito!', message: 'Las métricas se han editado correctamente!', icon: 'success' });
        })
    }//fin del reserve event
}
module.exports = controller;