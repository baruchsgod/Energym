const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const Customer = require(__dirname + "/../Model/cliente.js");
const Diet = require(__dirname + "/../Model/dieta.js");
const Routine = require(__dirname + "/../Model/rutina.js");
const Metrics = require(__dirname + "/../Model/metricas.js");
const Billing = require(__dirname + "/../Model/facturacion.js");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
passport.use(Customer.createStrategy());

const controller = {
    getUser: function (req, res) {
        res.send(req.user);
    },
    updateUserInfo: function (req, res) {
        var userId = req.body.userId;
        var newCustomer = new Customer({
            _id: userId,
            username: req.body.username,
            email: req.body.email,
            TipoCuenta: req.body.tipoCuenta,
            fName: req.body.name,
            lName: req.body.lname,
            Telefono: req.body.phone,
            fechaNacimiento: req.body.date,
            "Direccion.Detalle": req.body.detalle,
            "Direccion.CodigoPostal": req.body.postal,
            "Direccion.Provincia": req.body.province,
            EstadoCuenta: req.body.EstadoCuenta
        });
        Customer.findByIdAndUpdate(userId, newCustomer, { upsert: true, setDefaultsOnInsert: true }, (err) => {
            if (err) {
                return res.status(500).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error' });
            }
            return res.status(200).send({ title: 'Cambio exitoso!', message: 'El usuario fue actualizado correctamente!', icon: 'success' });
        });
    },
    updateUserPassword: function (req, res) {
        var userId = req.body.userId;
        Customer.findOne({ _id: userId }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                } else {
                    user.changePassword(req.body.pass, req.body.newPass, function (err) {
                        if (err) {
                            if (err.name === 'IncorrectPasswordError') {
                                return res.status(200).send({ title: 'Hubo un errror!', message: 'Tu contraseña actual no es correcta', icon: 'error' });
                            } else {
                                return res.status(500).send({ title: 'Hubo un error!', message: 'Intenta de nuevo más tarde!', icon: 'error' });
                            }
                        } else {
                            return res.status(200).send({ title: 'Cambio exitoso!', message: 'Tu contraseña se ha cambiado exitosamente!', icon: 'success' });
                        }
                    })
                }
            }
        });
    },
    getUserEvents: function (req, res) {
        var userId = req.user._id;
        Customer.findOne({ _id: userId }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (user) return res.status(200).send(user.Reservas);
            }
        });
    },
    getUserDiets: function (req, res) {
        var email = req.user.email;
        Diet.find({ "email": email }, (err, diets) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (diets) return res.status(200).send(diets);
            }
        });
    },
    getUserDocuments: function (req, res) {
        var email = req.user.email;
        Billing.find({ "email": email }, (err, docs) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (docs) return res.status(200).send(docs);
            }
        });
    },
    getUserRoutines: function (req, res) {
        var email = req.user.email;
        Routine.find({ "email": email }, (err, routine) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (routine) return res.status(200).send(routine);
            }
        });
    },
    getUserFeedback: function (req, res) {
        var userId = req.user._id;
        Customer.findOne({ _id: userId }, (err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (user) return res.status(200).send(user.Retroalimentacion);
            }
        });
    },
    getUserMetrics: function (req, res) {
        var correo = req.user.email;
        Metrics.findOne({ "Correo": correo }, (err, metrics) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (metrics) return res.status(200).send(metrics.Metricas);
            }
        });
    },
    getUserDetails: function (req, res) {
        var email = req.query.idUser;
        Customer.find({ "email": email, "EstadoCuenta":"Activo" }, (err, client) => {
            if (err) {
                res.send([])
            } else {
                if (client) {
                    return res.send(client);
                } else {
                    return res.send([]);
                }
            }
        })
    },
    assignMembership: function (req, res) {
        var emailClient = req.body.email;
        var membership = req.body.membership;
        const query = { email: emailClient }
        //console.log("es el query lo q esta mal" + emailClient +" "+membership);
        Customer.findOneAndUpdate(query, { $set: { Membresia: membership } }, (err) => {
            //console.log("entre al query");
            if (err) {
                //console.log(err);
                res.send([])
            } else {
                Customer.find({ email: emailClient }, (err, client) => {
                    if (err) {
                        res.json({ success: false, message: err })
                    } else {
                        if (client) return res.send(client);
                    }

                });
            }
        });
    }
}

module.exports = controller;



