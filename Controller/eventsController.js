const express = require("express");
const bodyParser = require("body-parser");
const Evento = require(__dirname + "/../Model/evento.js");
const User = require(__dirname + "/../Model/cliente.js");
const mongoose = require('mongoose');
const moment = require('moment');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
const Mailer = require("../Functions/NodeMailer");

const controller = {
    //Esta funcion recoje todos los eventos que existen a nivel general para crear la reserva
    getEvents: function (req, res) {
        var today = new Date().setDate(new Date().getDate() - 1);
        Evento.find({ "Fecha": { "$gt": new Date(today) } }, (err, data) => {
            if (err) {
                return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al cargar los datos.', icon: 'error' });
            }
            if (data) return res.status(200).send(data);
        });
    },
    getRecentEvents: function (req, res) {
        var today = new Date().setDate(new Date().getDate() - 1);
        Evento.find({ "Fecha": { "$gt": new Date(today) } }).limit(2).sort({ $natural: -1 }).then(r => {
            r.length > 0 ? res.status(200).send(r) : res.status(200).send("");
        });
    },
    createEvent: function (req, res) {
        //Esta funcion agrega un evento a la coleccion
        var evento = new Evento({
            "Titulo": req.body.titulo,
            "Detalle": req.body.detalle,
            "Cupos": req.body.cupos,
            "Fecha": req.body.fecha,
            "Hora": req.body.hora,
            "Imagen": null
        });
        //Guardo el evento, la variable eventoStored trae el evento recientemente guardado para decirle al empleado que ese evento .Titulo se creo
        //asi es un poco mas personalizado
        evento.save((err, eventoStored) => {
            if (err) {
                return res.status(200).send({ title: 'Error!', message: 'Hubo un problema al guardar el evento ' + err, icon: 'error' });
            }
            if (!eventoStored) {
                return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al guardar el evento', icon: 'error' });
            }
            return res.status(200).send({ title: 'Exito!', message: 'El evento ' + eventoStored.Titulo + ' fue creado correctamente!', icon: 'success' });
        });
    },
    reserveEvent: async function (req, res) {
        //recogo los parametros que vienen del request
        var eventoId = req.body.idEvent;
        var userId = req.user._id;
        var userEmail = req.user.email;
        var nombreCliente = req.user.fName;
        var cuposSolicitados = req.body.cuposReserva;
        //Castea las id para que mantengan formato
        const newCastEventId = mongoose.Types.ObjectId(eventoId);
        const newCastUserId = mongoose.Types.ObjectId(userId);
        //Las siguientes tres lineas traen el evento en cuestion para validar si hay cupos disponibles de una forma mas facil
        const findEvento = (newCastEventId) => { return Evento.find({ _id: newCastEventId }).exec(); }
        const evento = await findEvento(newCastEventId);
        const cuposActuales = evento[0].Cupos;
        //Las siguientes dos lineas traen el evento solamente si el cliente tiene una reserva, para validar que no haga mas de una reserva
        const findClienteEnEvento = (newCastEventId, newCastUserId) => { return Evento.find({ _id: newCastEventId, "Clientes.Id": newCastUserId }).exec() }
        const userEnEvento = await findClienteEnEvento(newCastEventId, newCastUserId);
        //Valido si el cliente ya tiene una reserva para no dejarlo duplicarla
        if (userEnEvento.length === 0 && cuposActuales >= cuposSolicitados) {
            //Guarda los datos del cliente y de los cupos para hacerle push a la coleccion de evento
            var reservaEventCollection = {
                Id: newCastUserId,
                Email: userEmail,
                CuposReservados: cuposSolicitados
            }
            //resta los cupos disponibles con los solicitados por el usuario para actualizarlos en el evento
            var cuposActualizado = cuposActuales - cuposSolicitados;
            //Empieza el guardado del cliente en evento y la actualizacion de los cupos del evento
            Evento.findByIdAndUpdate(newCastEventId, { Cupos: cuposActualizado, $push: { Clientes: reservaEventCollection } }, { upsert: true, setDefaultsOnInsert: true }, async (err, eventoUpdated) => {
                if (err) {
                    return res.status(200).send({ title: 'Hubo un error!', message: 'Error al reservar: ' + err, icon: 'error' });
                }
                if (!eventoUpdated) {
                    return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al guardar la reserva', icon: 'error' });
                }
                //si no hay error al encontrar y guardar la reserva en la coleccion de eventos se guardan los datos para 
                //guardar el registro en la coleccion del cliente
                var reservaClientCollection = {
                    id: newCastEventId,
                    CuposReservados: cuposSolicitados,
                    EventoResumen: {
                        Titulo: eventoUpdated.Titulo,
                        Detalle: eventoUpdated.Detalle,
                        Fecha: eventoUpdated.Fecha,
                        Hora: eventoUpdated.Hora
                    }
                }
                //creo las opciones para pasarle a NodeMailer el detalle del correo
                var mailOptions = {
                    from: '"Energym Fitness Center." <energymbot@gmail.com>',
                    to: userEmail,
                    subject: "Confirmación de reserva.",
                    titulo: `<h2>Hola ${nombreCliente}, la reserva al evento ${eventoUpdated.Titulo} fue realizada correctamente!</h2>`,
                    detalle: `<p>Gracias por preferir utilizar los servicios de Energym, acá tienes el detalle de tu reserva:</p>
                    <p>${cuposSolicitados > 1 ? `Los cupos reservados son ${cuposSolicitados}` : `Tienes un cupo`} para el evento ${eventoUpdated.Titulo} del día ${moment(eventoUpdated.Fecha).format("DD/MM/YYYY")} a las ${eventoUpdated.Hora}.</p>`,
                    despedida: `<h3>Te esperamos en Energym!</h3>`
                };
                //Se hace push en en arreglo Reservas de la coleccion del cliente
                User.findByIdAndUpdate(newCastUserId, { $push: { Reservas: reservaClientCollection } }, { upsert: true, setDefaultsOnInsert: true }, async (err, clientUpdated) => {
                    if (err) {
                        return res.status(200).send({ title: 'Hubo un error!', message: 'Error al guardar la reserva en el cliente: ' + err, icon: 'error' });
                    }
                    if (!clientUpdated) {
                        return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al guardar la reserva en el cliente', icon: 'error' });
                    }
                    //Hago un llamado a la funcion que envia los correos, con las opciones
                    Mailer.enviarCorreo(mailOptions);
                    //Si no hay errores se retorna el exito de la operacion con el registro de la reserva en la coleccion evento.Clientes y customers.Reservas
                    return res.status(200).send({ title: 'Exito!', message: 'La reserva en ' + eventoUpdated.Titulo + ' fue creada correctamente!', icon: 'success' });
                });
            });//fin del evento.findbyandupdate
        } else {
            //respondo con base en las dos condiciones del if
            if (userEnEvento.length !== 0) return res.status(200).send({ title: 'Advertencia!', message: 'Ya te encuentras registrado en este evento.', icon: 'info' });
            else return res.status(200).send({ title: 'Advertencia!', message: 'No hay cupos en este evento actualmente, la cantidad disponible es de ' + cuposActuales + ".", icon: 'info' });
        }//fin del else if de sin cupos y ya el cliente ha reservado
    },//fin del reserve event
    borrarReserva: async function (req, res) {
        //recogo los parametros que vienen del request
        var eventoId = req.body.idEvent;
        var cuposReservados = req.body.cuposReservados;
        var userId = req.user._id;
        var userEmail = req.user.email;
        var nombreCliente = req.user.fName;
        //Castea las id para que mantengan formato
        const newCastEventId = mongoose.Types.ObjectId(eventoId);
        const newCastUserId = mongoose.Types.ObjectId(userId);
        //Las siguientes tres lineas traen el evento en cuestion para manipular los cupos
        const findEvento = (newCastEventId) => { return Evento.find({ _id: newCastEventId }).exec(); }
        const evento = await findEvento(newCastEventId);
        const cuposActuales = evento[0].Cupos;
        //sumo los cupos para la actualizacion
        const cuposActualizado = cuposActuales + cuposReservados;
        //Actualizo el evento con los nuevos cupos disponibles y la eliminacion del cliente y su reserva 
        Evento.updateOne({ _id: newCastEventId }, { Cupos: cuposActualizado, $pull: { "Clientes": { "Id": newCastUserId } } }, { safe: true, multi: true }, function (err, eventoUpdated) {
            if (err) {
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar: ' + err, icon: 'error' });
            }
            if (!eventoUpdated) {
                return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al eliminar la reserva', icon: 'error' });
            }
            //creo las opciones para pasarle a NodeMailer el detalle del correo
            var mailOptions = {
                from: '"Energym Fitness Center." <energymbot@gmail.com>',
                to: userEmail,
                subject: "Confirmación de eliminacion de cupos.",
                titulo: `<h2>Hola ${nombreCliente}, la reserva al evento ${evento[0].Titulo} fue eliminada correctamente!</h2>`,
                detalle: `<p>Gracias por preferir utilizar los servicios de Energym, acá tienes el detalle de la eliminación de tu reserva:</p>
                <p>${cuposReservados > 1 ? `Tus ${cuposReservados} cupos` : `Tu cupo`} para el evento ${evento[0].Titulo} del día ${moment(evento[0].Fecha).format("DD/MM/YYYY")} a las ${evento[0].Hora} ${cuposReservados > 1 ? `han sido liberados` : `ha sido liberado`}.</p>`,
                despedida: `<h3>Un saludo de parte del equipo Energym!</h3>`
            };
            //si se elimino la reserva del cliente en la coleccion de evento se procede a eliminar de la coleccion del cliente
            User.updateOne({ _id: newCastUserId }, { $pull: { "Reservas": { "id": newCastEventId } } }, { safe: true, multi: true }, function (err, userUpdated) {
                if (err) {
                    return res.status(200).send({ title: 'Hubo un error!', message: 'Error al eliminar en el cliente: ' + err, icon: 'error' });
                }
                if (!userUpdated) {
                    return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al eliminar la reserva', icon: 'error' });
                }
                //Hago un llamado a la funcion que envia los correos, con las opciones
                Mailer.enviarCorreo(mailOptions);
                //Si no hay errores se retorna el exito de la operacion con la eliminacion de la reserva en la coleccion evento.Clientes y customers.Reservas                 
                return res.status(200).send({ title: 'Exito!', message: 'La reserva fue eliminada correctamente!', icon: 'success' });
            });
        });

    },
    getClientsEvents: function (req, res) {
        //recogo el id del evento
        var eventoId = req.query.id;
        //Castea las id para que mantengan formato
        const newCastEventId = mongoose.Types.ObjectId(eventoId);
        //empieza la busqueda del array de clientes dentro del evento
        Evento.findOne({ _id: newCastEventId }, (err, evento) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (evento) return res.status(200).send(evento.Clientes);
            }
        });
    },
    editEvent: async function (req, res) {
        let fechaActualizado = new Date(req.body.FechaE);
        fechaActualizado.setDate(fechaActualizado.getDate() + 1);
        //recogo los parametros que vienen del request
        var newTitulo = req.body.TituloE;
        var newDetalle = req.body.DetalleE;
        var newCupos = req.body.CuposE;
        var newFecha = fechaActualizado;
        var newHora = req.body.HoraE;
        var id = req.body.id;
        //Castea las id para que mantengan formato
        const newCastEventId = mongoose.Types.ObjectId(id);
        //Las siguientes tres lineas traen el evento en cuestion para validar si hay cupos disponibles de una forma mas facil
        const findEvento = (newCastEventId) => { return Evento.find({ _id: newCastEventId }).exec(); }
        const evento = await findEvento(newCastEventId);
        const cuposActuales = evento[0].Cupos;
        //Valido si los cupos actualizados son mas de los reservados
        if (newCupos >= 0 && cuposActuales >= 0) {
            //Empieza la actualizacion del evento
            Evento.findByIdAndUpdate(newCastEventId, { Titulo: newTitulo, Detalle: newDetalle, Cupos: newCupos, Fecha: newFecha, Hora: newHora }, { upsert: true, setDefaultsOnInsert: true }, async (err, eventoUpdated) => {
                if (err) {
                    return res.status(200).send({ title: 'Hubo un error!', message: 'Error al reservar: ' + err, icon: 'error' });
                }
                if (!eventoUpdated) {
                    return res.status(404).send({ title: 'Error!', message: 'Hubo un problema al guardar la reserva', icon: 'error' });
                }
                return res.status(200).send({ title: 'Exito!', message: 'El evento ' + eventoUpdated.Titulo + ' se ha editado correctamente!', icon: 'success' });
            });//fin del evento.findbyandupdate
        } else {
            //respondo con base en las dos condiciones del if
            return res.status(200).send({ title: 'Advertencia!', message: 'La cantidad de cupos reservados actualmente (' + cuposActuales + ') impide la actualización que deseas realizar.', icon: 'error' });
        }//fin del else if de sin cupos y ya el cliente ha reservado
    }//fin del reserve event
}//fin del controlador

module.exports = controller;


