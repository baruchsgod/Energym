const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Mailer = require("../Functions/NodeMailer");


const Customer = require(__dirname + "/../Model/cliente.js");
const Routine = require(__dirname + "/../Model/rutina.js");

const app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

passport.use(Customer.createStrategy());

router.get("/", async (req, res) => {
    const userEmail = req.query.userData;

    let foundCustomer = await Customer.find({ email: userEmail, EstadoCuenta:"Activo" });

    if (foundCustomer.length > 0) {
        return res.status(200).send(foundCustomer);
    } else {
        return res.send({ title: 'Hubo un error!', icon: 'error' });
    }
});

router.get("/getDetails", async (req, res) => {
    const userEmail = req.query.userData;

    let foundCustomer = await Routine.find({ email: userEmail });

    if (foundCustomer.length > 0) {
        return res.status(200).send(foundCustomer);
    } else {
        return res.send({ title: 'Hubo un error!', icon: 'error' });
    }
});

router.get("/getDetailsbyId", async (req, res) => {
    const _id = req.query.userData;

    let foundCustomer = await Routine.find({ _id: _id });

    //console.log(foundCustomer);

    if (foundCustomer.length > 0) {
        return res.status(200).send(foundCustomer);
    } else {
        return res.send({ title: 'Hubo un error!', icon: 'error' });
    }
});

router.post("/", async (req, res, next) => {

    const option = req.body.option;

    if (option === "1") {
        const _id = req.body._id;
        const emails = req.body.email;
        const day = req.body.day;
        const routine = req.body.routine;
        const details = req.body.details;
        const name = req.body.name;
        const lName = req.body.lName;

        const newItem = {
            cliente: _id,
            nombre: name,
            apellido: lName,
            email: emails,
            Detalles: [{
                dia: day,
                tipo: routine,
                detalle: details
            }]
        };

        await Routine.create(newItem, async (err) => {
            //console.log("entre a crear");
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error' });
            }
            let foundRoutine = await Routine.findOne({ email: emails }).sort({ createdAt: -1 });

            Customer.findByIdAndUpdate(_id, { $push: { Rutinas: foundRoutine._id } }, (err) => {
                if (err) {
                    return res.status(200).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error' });
                }
                var mailOptions = {
                    from: '"Energym Fitness Center." <energymbot@gmail.com>',
                    to: emails,
                    subject: "Te han asignado una nueva rutina.",
                    titulo: `<h2>Hola ${name}, te han asignado una nueva rutina!</h2>`,
                    detalle: `<p>Gracias por preferir utilizar los servicios de Energym, te han asignado una nueva rutina, inicia sesión con tu cuenta para revisarla</p>`,
                    despedida: `<h3>Un saludo de parte del equipo Energym!</h3>`
                };
                Mailer.enviarCorreo(mailOptions);
                return res.status(200).send({ title: 'Cambio exitoso!', message: 'El usuario fue actualizado', _id: foundRoutine._id, icon: 'success' });
            })
        });

    } else {
        const _id = req.body._id;
        const idUser = req.body.id;
        const emails = req.body.email;
        const day = req.body.day;
        const routine = req.body.routine;
        const details = req.body.details;

        const array = {
            dia: day,
            tipo: routine,
            detalle: details
        }

        const newId = mongoose.Types.ObjectId(_id);
        const newUser = mongoose.Types.ObjectId(idUser);


        Routine.findByIdAndUpdate(newId, { $push: { Detalles: array }, cliente: newUser, email: emails }, { upsert: true, setDefaultsOnInsert: true }, async (err, userUpdated) => {
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error' });
            }

            let foundRoutine = await Customer.find({ Rutinas: newId });

            if (foundRoutine.length > 0) {
                return res.status(200).send({ title: 'Cambio exitoso!', message: 'El usuario fue actualizado', _id: newId, icon: 'success' });
            } else {
                Customer.findByIdAndUpdate(newUser, { $push: { Rutinas: newId } }, (err) => {
                    if (err) {
                        return res.status(500).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error' });
                    }
                    return res.status(200).send({ title: 'Cambio exitoso!', message: 'El usuario fue actualizado', _id: newId, icon: 'success' });
                })

            }

        });
    }







});

router.post("/deleteRoutine", async (req, res) => {
    const _id = mongoose.Types.ObjectId(req.body.id);

    await Routine.findByIdAndDelete(_id, async (err) => {
        if (err) {
            return res.status(200).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error' });
        }

        let foundCustomer = await Customer.find({ Rutinas: _id });

        if (foundCustomer.length > 0) {
            // return res.status(200).send({ title: 'Cambio exitoso!', message: 'El usuario fue actualizado', _id:newId ,icon: 'success' });
            Customer.findByIdAndUpdate(foundCustomer[0]._id, { $pull: { Rutinas: _id } }, (err) => {
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

router.post("/deleteOneRoutine", async (req,res) => {
    const _id = req.body.id;

    await Routine.updateOne({"Detalles._id":_id}, {$pull:{Detalles:{_id:_id}}}, (err) => {
        if(err){
            res.send([err]);
        }else{
            res.send([_id,"success"]);
        }
    })
})

router.post("/modifyOneRoutine", async (req,res) => {
    const _id = req.body._id;
    const details = req.body.details;
    
    await Routine.updateOne({"Detalles._id":_id}, {$set:{"Detalles.$.detalle":details}}, (err) => {
        if(err){
            res.send([err]);
            //console.log(err);
        }else{
            res.send([_id,"success"]);
        }
    })

})

module.exports = router;