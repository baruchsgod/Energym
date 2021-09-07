const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const dietType = require("../Functions/dieta.js");
const mongoose = require('mongoose');
const Customer = require(__dirname + "/../Model/cliente.js");
const Diet = require(__dirname + "/../Model/dieta.js");
const Mailer = require("../Functions/NodeMailer");
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
router.get("/", async (req, res) => {
    const userEmail = req.query.userData;
    let foundCustomer = await Customer.find({ email: userEmail, EstadoCuenta:"Activo" });

    if (foundCustomer.length > 0) {
        return res.status(200).send(foundCustomer);
    } else {
        return res.send({ title: 'Hubo un error!', icon: 'error' });
    }
})
router.get("/getDetails", async (req, res) => {
    const userEmail = req.query.userData;
    let foundCustomer = await Diet.find({ email: userEmail });
    return res.status(200).send(foundCustomer);
});
router.get("/getDetailsbyId", async (req, res) => {
    const _id = req.query.userData;
    let foundDiet = await Diet.find({ _id: _id });
    if (foundDiet.length > 0) {
        return res.status(200).send(foundDiet);
    } else {
        return res.send(foundDiet);
    }
});
router.post("/", async (req, res, next) => {
    const option = req.body.option;
    const cliente = req.body.cliente;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const tipoDieta = dietType.getDiet(req.body.tipoDieta);
    const detalle = req.body.detalle;
    const _id = req.body._id;
    if (option) {
        const dieta = new Diet({
            cliente: cliente,
            nombre: nombre,
            apellido: apellido,
            email: email,
            tipoDieta: tipoDieta,
            detalle: detalle
        });
        dieta.save((err, dietaStored) => {
            if (err) {
                return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar el mensaje ' + err, icon: 'error' });
            }
            if (!dietaStored) {
                return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar el mensaje', icon: 'error' });
            }
            var dietaCliente = { "id": dietaStored._id };
            Customer.findByIdAndUpdate(cliente, { $push: { Dieta: dietaCliente } }, { upsert: true, setDefaultsOnInsert: true }, async (err, clientUpdated) => {
                if (err) {
                    return res.status(200).send({ title: 'Hubo un error!', message: 'Error al guardar la dieta en el cliente: ' + err, icon: 'error' });
                }
                if (!clientUpdated) {
                    return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al guardar la dieta en el cliente', icon: 'error' });
                }
                var mailOptions = {
                    from: '"Energym Fitness Center." <energymbot@gmail.com>',
                    to: email,
                    subject: "Te han asignado una nueva dieta.",
                    titulo: `<h2>Hola ${nombre}, te han asignado una nueva dieta!</h2>`,
                    detalle: `<p>Gracias por preferir utilizar los servicios de Energym, te han asignado una nueva dieta de tipo ${tipoDieta}, inicia sesión con tu cuenta para revisarla</p>`,
                    despedida: `<h3>Un saludo de parte del equipo Energym!</h3>`
                };
                Mailer.enviarCorreo(mailOptions);
                return res.status(200).send({ title: 'Exito!', message: 'La dieta fue creada exitosamente!', icon: 'success' });
            });
        });
    } else {
        const newId = mongoose.Types.ObjectId(_id);
        const newUser = mongoose.Types.ObjectId(cliente);
        Diet.findByIdAndUpdate(newId, { cliente: cliente, apellido: apellido, email: email, tipoDieta: tipoDieta, detalle: detalle }, { upsert: true, setDefaultsOnInsert: true }, async (err, userUpdated) => {
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error' });
            }
            let foundDiet = await Customer.find({ "Dieta.id": newId });
            if (foundDiet.length > 0) {
                var mailOptions = {
                    from: '"Energym Fitness Center." <energymbot@gmail.com>',
                    to: email,
                    subject: "Han editado tu dieta.",
                    titulo: `<h2>Hola ${nombre}, han editado tu dieta!</h2>`,
                    detalle: `<p>Gracias por preferir utilizar los servicios de Energym, han editado tu dieta de tipo ${tipoDieta}, inicia sesión con tu cuenta para revisarla</p>`,
                    despedida: `<h3>Un saludo de parte del equipo Energym!</h3>`
                };
                Mailer.enviarCorreo(mailOptions); 
                return res.status(200).send({ title: 'Cambio exitoso!', message: 'El usuario fue actualizado', _id: newId, icon: 'success', dieta: foundDiet });
            } else {
                Customer.findByIdAndUpdate(newUser, { $push: { Dieta: newId } }, (err) => {
                    if (err) {
                        return res.status(500).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error' });
                    }
                    return res.status(200).send({ title: 'Cambio exitoso!', message: 'El usuario fue actualizado', _id: newId, icon: 'success', dieta: foundDiet });
                })
            }
        });
    }
});
router.post("/deleteDiet", async (req, res) => {
    const _id = mongoose.Types.ObjectId(req.body.id);
    await Diet.findByIdAndDelete(_id, async (err) => {
        if (err) {
            return res.status(200).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error' });
        }
        let foundCustomer = await Customer.find({ "Dieta.id": _id });
        if (foundCustomer.length > 0) {
            // return res.status(200).send({ title: 'Cambio exitoso!', message: 'El usuario fue actualizado', _id:newId ,icon: 'success' });
            Customer.findByIdAndUpdate(foundCustomer[0]._id, { $pull: { Dieta: { id: _id } } }, (err) => {
                if (err) {
                    return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar la rutina: ' + err, icon: 'error' });
                }
                return res.status(200).send({ title: 'Cambio exitoso!', message: 'El usuario fue actualizado', _id: foundCustomer[0]._id, icon: 'success', email: foundCustomer[0].email });
            })
        } else {
            return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar rutina, no existe en la tabla cliente', icon: 'error' });
        }
    })
});

module.exports = router;