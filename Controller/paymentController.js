const express = require("express");
const bodyParser = require("body-parser");
//const router = express.Router();
const passport = require('passport');
const Balance = require(__dirname + "/../Model/balance.js");
const Billing = require(__dirname + "/../Model/facturacion.js");
const Arching = require(__dirname + "/../Model/arqueo.js");
const Job = require(__dirname + "/../Model/InvoiceJob.js");
const Customer = require(__dirname + "/../Model/cliente.js");
const JobAuto = require(__dirname + "/../Model/InvoiceJob.js");
//Require Membership function
const membership = require(__dirname + "/../Functions/getMembership.js");
const app = express();
app.use(bodyParser.json());

const paymentController = {
    createPayment: async function (req, res) {
        let docNumber = await Billing.find();
        let docSerial = 10000 + docNumber.length;
        let Monto = req.body.monto;
        let ivaCalc = req.body.monto - ((req.body.monto / 113) * 100);
        if (req.body.tipoDoc === "Crédito") {
            ivaCalc = 0;
            if (req.body.monto > 0) {
                Monto = req.body.monto * -1;
            }
        }
        if (req.body.tipoDoc === "Débito") {
            ivaCalc = 0;
            if (req.body.monto < 0) {
                Monto = req.body.monto * -1;
            }
        }
        if (req.body.tipoDoc === "Pago") {
            if (req.body.monto > 0) {
                Monto = req.body.monto * -1;
            }
        }
        const pago = new Billing({
            monto: Monto,
            numDocumento: docSerial,
            usuario: req.body.user,
            tipoDoc: req.body.tipoDoc,
            liquidez: req.body.liquidez,
            estado: "Abierto",
            iva: ivaCalc,
            cliente: req.body.cliente,
            email: req.body.email,
            fecha: new Date().toISOString()
        });
        await pago.save((err, pagoCreated) => {
            if (err) {
                //console.log(err);
                return res.status(200).send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ' + err, icon: 'error', payment: [] });
            }
            if (!pagoCreated) {
                res.send({ title: 'Hubo un error!', message: 'Error al actualizar el usuario: ', icon: 'error', payment: [] });
            }
            if (pagoCreated) {
                res.send([pagoCreated]);
            }
        })
    },
    postUnapply: async function (req, res) {
        const option = req.body.option;
        const _id = req.body._id;
        const total = req.body.total;
        const email = req.body.email;
        const id = req.body.id;
        const employee = req.body.employee;
        const origin = req.body.origin;
        let docNumber = await Billing.find();
        let docSerial = 10000 + docNumber.length;
        const dateEnd = new Date().toISOString();

        if (option === "Debit") {
            const debito = new Billing({
                monto: total * -1,
                numDocumento: docSerial,
                usuario: employee,
                tipoDoc: "Débito",
                liquidez: false,
                estado: "Abierto",
                iva: 0,
                cliente: _id,
                email: email,
                fecha: new Date().toISOString()
            });
            debito.save((err, debitoStored) => {
                if (err) {
                    res.send([err]);
                }
                if (!debitoStored) {
                    res.send(["err"])
                }
                Billing.findByIdAndUpdate(id, { $set: { estado: "Abierto", Cerrado: null, FechaCierre: null, FechaApertura: dateEnd, usuario: employee } }, (err) => {
                    if (err) {
                        res.send([err]);
                    } else {
                        res.send([debito, "success"])
                    }
                })

            })
        } else if (option === "Credit") {
            var credito = new Billing({
                monto: total * -1,
                numDocumento: docSerial,
                usuario: employee,
                tipoDoc: "Crédito",
                liquidez: false,
                estado: "Abierto",
                iva: 0,
                cliente: _id,
                email: email,
                fecha: new Date().toISOString()
            });
            credito.save((err, creditoStored) => {
                if (err) {
                    res.send([err]);
                }
                if (!creditoStored) {
                    res.send(["err"])
                }
                Billing.findByIdAndUpdate(id, { $set: { estado: "Abierto", Cerrado: null, FechaCierre: null, FechaApertura: dateEnd, usuario: employee } }, (err) => {
                    if (err) {
                        res.send([err]);
                    } else {
                        res.send([credito, "success"])
                    }
                })

            })
        }


    },
    getSubledgerClose: async function (req, res) {
        const option = req.body.option;
        const total = req.body.total;
        const email = req.body.email;
        const id = req.body.id;
        const employee = req.body.employee;
        let docNumber = await Billing.find();
        let docSerial = 10000 + docNumber.length;
        const ids = req.body.ids;
        const dateEnd = new Date().toISOString();

        if (option === "Balanced") {
            Billing.updateMany({ _id: { $in: ids } }, { $set: { estado: "Cerrado", Cerrado: employee, FechaCierre: dateEnd } }, (err) => {
                if (err) {
                    res.send([err]);
                } else {
                    res.send([employee, "success"])
                }
            });
        } else if (option === "Overpaid") {
            const debito = new Billing({
                monto: total,
                numDocumento: docSerial,
                usuario: employee,
                tipoDoc: "Débito",
                liquidez: false,
                estado: "Abierto",
                iva: 0,
                cliente: id,
                email: email,
                fecha: new Date().toISOString()
            });
            debito.save((err, debitoStored) => {
                if (err) {
                    res.send([err]);
                }
                if (!debitoStored) {
                    res.send(["err"])
                }
                Billing.updateMany({ _id: { $in: ids } }, { $set: { estado: "Cerrado", Cerrado: employee, FechaCierre: dateEnd } }, (err) => {
                    if (err) {
                        res.send([err]);
                    } else {
                        res.send([debito, "success"])
                    }
                })

            })
        } else if (option === "Underpaid") {
            var credito = new Billing({
                monto: total,
                numDocumento: docSerial,
                usuario: employee,
                tipoDoc: "Crédito",
                liquidez: false,
                estado: "Abierto",
                iva: 0,
                cliente: id,
                email: email,
                fecha: new Date().toISOString()
            });
            credito.save((err, creditoStored) => {
                if (err) {
                    res.send([err]);
                }
                if (!creditoStored) {
                    res.send(["err"]);
                }
                Billing.updateMany({ _id: { $in: ids } }, { $set: { estado: "Cerrado", Cerrado: employee, FechaCierre: dateEnd } }, (err) => {
                    if (err) {
                        res.send([err]);
                    } else {
                        res.send([credito, "success"])
                    }
                })

            })
        }
    },
    getSubledger: async function (req, res) {
        const email = req.query.email;
        let allItems = await Billing.find({ $and: [{ estado: "Abierto" }, { email: email }] });
        if (allItems.length > 0) {
            res.send(allItems);
        } else {
            res.send([]);
        }
    },
    getBilling: async function (req, res) {
        //console.log("estoy entrando");
        var report = [];
        const estado = req.body.estado;
        const email = req.body.username;
        const all = req.body.doc1;
        const invoice = req.body.doc2;
        const payment = req.body.doc3;
        const cn = req.body.doc4;
        const dn = req.body.doc5;
        const allDocuments = await Billing.find();

        if (estado === "Abierto") {
            let document = [];
            const documentArray = [invoice, payment, cn, dn];
            if (all) {
                let allItems = await Billing.find({ $and: [{ estado: estado }, { email: email }] });
                res.send(allItems);
            } else {
                await documentArray.forEach(async (element, index) => {
                    if (element) {
                        if (index === 0) {
                            if (!dn && !cn && !payment) {
                                document = await Billing.find({ $and: [{ estado: estado }, { email: email }, { tipoDoc: "Factura" }] });
                                report.push.apply(report, document);
                                res.send(report);
                            } else {
                                document = await Billing.find({ $and: [{ estado: estado }, { email: email }, { tipoDoc: "Factura" }] });
                                report.push.apply(report, document);
                            }
                        } else if (index === 1) {
                            if (!dn && !cn) {
                                document = await Billing.find({ $and: [{ estado: estado }, { email: email }, { tipoDoc: "Pago" }] });
                                report.push.apply(report, document);
                                res.send(report);
                            } else {
                                document = await Billing.find({ $and: [{ estado: estado }, { email: email }, { tipoDoc: "Pago" }] });
                                report.push.apply(report, document);
                            }
                        } else if (index === 2) {
                            if (!dn) {
                                document = await Billing.find({ $and: [{ estado: estado }, { email: email }, { tipoDoc: "Crédito" }] });
                                report.push.apply(report, document);
                                res.send(report);
                            } else {
                                document = await Billing.find({ $and: [{ estado: estado }, { email: email }, { tipoDoc: "Crédito" }] });
                                report.push.apply(report, document);
                            }
                        } else {
                            document = await Billing.find({ $and: [{ estado: estado }, { email: email }, { tipoDoc: "Débito" }] });
                            report.push.apply(report, document);
                            res.send(report);
                        }
                    }
                });
            }
        } else if (estado === "Rango") {
            let document = [];
            const documentArray = [invoice, payment, cn, dn];
            const dateBegin = new Date(req.body.date1).toISOString();
            const dateEnd = new Date(req.body.date2).toISOString();

            if (all) {
                let allItems = await Billing.find({ $and: [{ estado: "Abierto" }, { email: email }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                res.send(allItems);
            } else {
                await documentArray.forEach(async (element, index) => {
                    if (element) {
                        if (index === 0) {
                            if (!dn && !cn && !payment) {
                                document = await Billing.find({ $and: [{ estado: "Abierto" }, { email: email }, { tipoDoc: "Factura" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                                res.send(report);
                            } else {
                                document = await Billing.find({ $and: [{ estado: "Abierto" }, { email: email }, { tipoDoc: "Factura" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                            }
                        } else if (index === 1) {
                            if (!dn && !cn) {
                                document = await Billing.find({ $and: [{ estado: "Abierto" }, { email: email }, { tipoDoc: "Pago" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                                res.send(report);
                            } else {
                                document = await Billing.find({ $and: [{ estado: "Abierto" }, { email: email }, { tipoDoc: "Pago" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                            }
                        } else if (index === 2) {
                            if (!dn) {
                                document = await Billing.find({ $and: [{ estado: "Abierto" }, { email: email }, { tipoDoc: "Crédito" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                                res.send(report);
                            } else {
                                document = await Billing.find({ $and: [{ estado: "Abierto" }, { email: email }, { tipoDoc: "Crédito" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                            }
                        } else {
                            document = await Billing.find({ $and: [{ estado: "Abierto" }, { email: email }, { tipoDoc: "Débito" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                            report.push.apply(report, document);
                            res.send(report);
                        }

                    }


                });


            }
        } else if (estado === "Todo") {
            let document = [];
            const documentArray = [invoice, payment, cn, dn];
            const dateBegin = new Date(req.body.date1).toISOString();
            const dateEnd = new Date(req.body.date2).toISOString();

            if (all) {
                let allItems = await Billing.find({ $and: [{ email: email }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                res.send(allItems);
            } else {
                await documentArray.forEach(async (element, index) => {
                    if (element) {
                        if (index === 0) {
                            if (!dn && !cn && !payment) {
                                document = await Billing.find({ $and: [{ email: email }, { tipoDoc: "Factura" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                                res.send(report);
                            } else {
                                document = await Billing.find({ $and: [{ email: email }, { tipoDoc: "Factura" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                            }
                        } else if (index === 1) {
                            if (!dn && !cn) {
                                document = await Billing.find({ $and: [{ email: email }, { tipoDoc: "Pago" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                                res.send(report);
                            } else {
                                document = await Billing.find({ $and: [{ email: email }, { tipoDoc: "Pago" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                            }
                        } else if (index === 2) {
                            if (!dn) {
                                document = await Billing.find({ $and: [{ email: email }, { tipoDoc: "Crédito" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                                res.send(report);
                            } else {
                                document = await Billing.find({ $and: [{ email: email }, { tipoDoc: "Crédito" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                                report.push.apply(report, document);
                            }
                        } else {
                            document = await Billing.find({ $and: [{ email: email }, { tipoDoc: "Débito" }, { fecha: { $gte: new Date(dateBegin), $lte: new Date(dateEnd) } }] });
                            report.push.apply(report, document);
                            res.send(report);
                        }

                    }


                });


            }
        }


    },
    getDocument: async function (req, res) {
        const document = req.query.document;
        const documentFound = await Billing.find({ numDocumento: document });
        if (documentFound) {
            res.send(documentFound);
        } else {
            res.send([]);
        }
    },
    postBalance: async function (req, res) {
        const email = req.body.email;
        const monto = req.body.saldoInicial;
        const fecha = new Date();
        await Arching.deleteMany({estado:"Rechazado"});
        if (monto >= 0 && monto <= 20000) {
            var balance = new Balance({
                fecha: fecha,
                SaldoInicial: monto,
                Empleado: email
            });
            let foundBalance = await Balance.find();
            if (foundBalance.length > 0) {
                Balance.findByIdAndUpdate(foundBalance[0]._id, { SaldoInicial: monto, Empleado: email, fecha: fecha }, async (err) => {
                    if (err) {
                        //console.log(err);
                        res.send([]);

                    } else {
                        res.send(foundBalance);
                    }
                })
            } else {
                Balance.create(balance, async (err) => {
                    if (err) {
                        res.send([]);
                    } else {
                        res.send([balance]);
                    }
                })
            }
        } else {
            res.send([]);
        }

    },
    getInitial: async function (req, res) {
        let foundBalance = await Balance.find();
        if (foundBalance.length > 0) {
            res.send(foundBalance);
        } else {
            res.send([]);
        }
    }, getOpen: async function (req, res) {
        const email = req.query.email;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        var today1 = new Date(today);

        today1.setDate(today1.getDate() + 1);

        const date = new Date(Date.parse(today)).toISOString();
        const date1 = new Date(today1).toISOString();

        let open = await Arching.find({ $and: [{ fecha: { $gte: new Date(date) } }, { fecha: { $lte: new Date(date1) } }, { Empleado: email }, { $or: [{ estado: "Conciliado" }, { estado: "Discrepancia" }] }] })
        if (open.length > 0) {
            res.send(open);
        } else {
            res.send([]);
        }
    },
    getJob: async function (req, res) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        var today1 = new Date(today);

        today1.setDate(today1.getDate() + 1);

        const date = new Date(Date.parse(today)).toISOString();
        const date1 = new Date(today1).toISOString();

        let job = await Job.find({ $and: [{ fecha: { $gte: new Date(date) } }, { fecha: { $lte: new Date(date1) } }] });
        if (job.length > 0) {
            res.send(job);
        } else {
            res.send([]);
        }
    },
    getOverdue: async function (req, res) {
        var report = [];
        if (req.query.option === "Mensual") {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            firstDay.setDate(firstDay.getDate() - 1);
            const date1 = firstDay.toISOString();
            let overdue = await Billing.find({ $and: [{ fecha: { $lt: new Date(date1) } }, { estado: "Abierto" }, { tipoDoc: "Factura" }] });
            if (overdue.length > 0) {
                await overdue.forEach(async (item, index) => {
                    let type = await Customer.findById(item.cliente);
                    if (type.Membresia === "Mensual") {
                        report.push(item);
                    }
                    if (overdue.length - 1 === index) {
                        if (report.length > 0) {
                            res.send(report);
                        } else {
                            res.send([]);
                        }
                    }
                });
            } else {
                res.send([]);
            }
        } else if (req.query.option === "Trimestral") {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth() - 3, date.getDay());
            firstDay.setDate(firstDay.getDate() + 8);
            const date1 = firstDay.toISOString();
            //console.log(date1);
            let overdue = await Billing.find({ $and: [{ fecha: { $lt: new Date(date1) } }, { estado: "Abierto" }, { tipoDoc: "Factura" }] });
            if (overdue.length > 0) {
                await overdue.forEach(async (item, index) => {
                    let type = await Customer.findById(item.cliente);
                    if (type.Membresia === "Trimestral") {
                        report.push(item);
                    }
                    if (overdue.length - 1 === index) {
                        if (report.length > 0) {
                            res.send(report);
                        } else {
                            res.send([]);
                        }
                    }
                });
            } else {
                res.send([]);
            }
        } else if (req.query.option === "Semestral") {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth() - 6, date.getDay());
            firstDay.setDate(firstDay.getDate() + 8);
            const date1 = firstDay.toISOString();
            console.log(date1);
            let overdue = await Billing.find({ $and: [{ fecha: { $lt: new Date(date1) } }, { estado: "Abierto" }, { tipoDoc: "Factura" }] });
            if (overdue.length > 0) {
                await overdue.forEach(async (item, index) => {
                    let type = await Customer.findById(item.cliente);
                    if (type.Membresia === "Semestral") {
                        report.push(item);
                    }
                    if (overdue.length - 1 === index) {
                        if (report.length > 0) {
                            res.send(report);
                        } else {
                            res.send([]);
                        }
                    }
                });
            } else {
                res.send([]);
            }
        } else if (req.query.option === "Anual") {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth() - 12, date.getDay());
            firstDay.setDate(firstDay.getDate() + 8);
            const date1 = firstDay.toISOString();
            console.log(date1);
            let overdue = await Billing.find({ $and: [{ fecha: { $lt: new Date(date1) } }, { estado: "Abierto" }, { tipoDoc: "Factura" }] });
            if (overdue.length > 0) {
                await overdue.forEach(async (item, index) => {
                    let type = await Customer.findById(item.cliente);
                    if (type.Membresia === "Anual") {
                        report.push(item);
                    }
                    if (overdue.length - 1 === index) {
                        if (report.length > 0) {
                            res.send(report);
                        } else {
                            res.send([]);
                        }
                    }
                });
            } else {
                res.send([]);
            }
        }

    },
    postJob: async function (req, res) {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        lastDay.setDate(lastDay.getDate() + 1);

        const date1 = firstDay.toISOString();
        const date2 = lastDay.toISOString();

        let customers = await Customer.find({ EstadoCuenta: "Activo", TipoCuenta: "Cliente" });
        let docNumber = await Billing.find();
        let docSerial = 10000 + docNumber.length;
        let firstSerial = docSerial;
        let errCatch = "";
        let errStatement = false;

        customers.forEach(async (item, index) => {
            let itemExist = await Billing.find({ $and: [{ fecha: { $gte: date1 } }, { fecha: { $lte: date2 } }, { email: item.email }, { tipoDoc: "Factura" }] });
            if (itemExist.length === 0 && item.Membresia) {
                var membershipAmount = membership.getMembership(item.Membresia);
                const invoice = new Billing({
                    monto: membershipAmount,
                    numDocumento: docSerial,
                    usuario: req.user.email,
                    tipoDoc: "Factura",
                    liquidez: false,
                    estado: "Abierto",
                    iva: membershipAmount * 0.13,
                    cliente: item._id,
                    email: item.email,
                    fecha: new Date().toISOString()
                });
                await invoice.save((err, pagoCreated) => {
                    if (err) {
                        //Este error se debe guardar en el log de errores
                        console.log(err);
                        errStatement = true;
                        errCatch = err;
                    }
                    if (!pagoCreated) {
                        //Este error se debe guardar en el log de errores
                        console.log("Hubo un problema en el job automático al generar una factura");
                        errStatement = true;
                    }
                    if (pagoCreated) {
                        console.log("Registro exitoso de factura");

                    }
                });
                docSerial += 1;
            }
            if (index === customers.length - 1 && docSerial > firstSerial) {
                if (!errStatement) {
                    try {
                        const jobA = new JobAuto({
                            tipo: "System Job",
                            username: req.user.email,
                            fecha: new Date().toISOString(),
                            usuario: req.user.email
                        })

                        jobA.save();
                    } catch (err) {
                        //Agarrar error en consola
                        console(err);
                    }
                    res.send(["Success"]);
                } else {
                    res.send([]);
                }
            }
        });
    },
    postCash: async function (req, res) {
        const option = req.body.option;

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        var today1 = new Date(today);

        today1.setDate(today1.getDate() + 1);

        const date = new Date(Date.parse(today)).toISOString();
        const date1 = new Date(today1).toISOString();

        if (option === "1") {
            const efectivo = parseFloat(req.body.initial);
            const item = new Arching({
                efectivoInicial: efectivo,
                estado: "Discrepancia",
                discrepanciaInicial: req.body.monto,
                Empleado: req.body.email
            })

            let discrepancy = await Arching.find({ $and: [{ estado: "Discrepancia" }, { fecha: { $gte: new Date(date) } }, { fecha: { $lte: new Date(date1) } }] });

            if (discrepancy.length > 0) {
                res.send([]);
            } else {
                Arching.create(item, (err) => {
                    if (err) {
                        //console.log(err);
                        res.send([{ type: "error" }, { message: err }]);
                    } else {
                        res.send([item]);
                    }
                })
            }
        } else if (option === "2") {
            const item = new Arching({
                efectivoInicial: parseFloat(req.body.initial),
                estado: "Conciliado",
                discrepanciaInicial: 0,
                Empleado: req.body.email
            });

            Arching.create(item, (err) => {
                if (err) {
                    //console.log(err);
                    res.send([{ type: "error" }, { message: err }]);
                } else {
                    res.send([item]);
                }
            })
        } else if (option === "3") {
            const item = new Arching({
                efectivoInicial: 0,
                estado: "Rechazado",
                discrepanciaInicial: 0,
                Empleado: req.body.email
            });

            Arching.create(item, (err) => {
                if (err) {
                    //console.log(err);
                    res.send([{ type: "error" }, { message: err }]);
                } else {
                    Balance.findByIdAndRemove(req.body._id, (err) => {
                        if (err) {
                            //console.log(err);
                            res.send([{ type: "error" }, { message: err }]);
                        } else {
                            res.send([item]);
                        }
                    })
                }
            })

        }
    },
    getDocuments: async function (req, res) {
        const email = req.query.email;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        var today1 = new Date(today);

        today1.setDate(today1.getDate() + 1);

        const date = new Date(Date.parse(today)).toISOString();
        const date1 = new Date(today1).toISOString();

        let open = await Billing.find({ $and: [{ fecha: { $gte: new Date(date) } }, { fecha: { $lte: new Date(date1) } }, { usuario: email }] });

        if (open.length > 0) {
            res.send(open);
        } else {
            res.send([]);
        }
    },
    getClosure: async function (req, res) {

        const ventasEfectivo = req.body.ventasEfectivo;
        const ventasTarjeta = req.body.ventasTarjeta;
        const ventasTotal = req.body.ventasTotal;
        const gastosEfectivo = req.body.gastosEfectivo;
        const gastosTarjeta = req.body.gastosTarjeta;
        const gastosTotal = req.body.gastosTotal;
        const efectivoFinal = req.body.efectivoFinal;
        const discrepancia = req.body.discrepancia;


        Arching.findByIdAndUpdate(req.body._id, { ventasEfectivo: ventasEfectivo, ventasTarjeta: ventasTarjeta, ventasTotales: ventasTotal, gastosEfectivo: gastosEfectivo, gastosTarjeta: gastosTarjeta, gastosTotales: gastosTotal, efectivoRecibido: efectivoFinal, faltanteSobrante: discrepancia }, (err) => {
            if (err) {
                res.send([err]);
            } else {
                res.send([efectivoFinal, ventasEfectivo]);
            }
        })
    },
    getUserClosure: async function (req, res) {
        const email = req.query.email;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        var today1 = new Date(today);

        today1.setDate(today1.getDate() + 1);

        const date = new Date(Date.parse(today)).toISOString();
        const date1 = new Date(today1).toISOString();

        let open = await Arching.find({ $and: [{ fecha: { $gte: new Date(date) } }, { Empleado: email }, { fecha: { $lte: new Date(date1) } }] });

        if (open.length > 0) {
            res.send(open);
        } else {
            res.send([]);
        }
    },
    getReject: async function (req, res) {
        const user = req.query.userId;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        var today1 = new Date(today);

        today1.setDate(today1.getDate() + 1);

        const date = new Date(Date.parse(today)).toISOString();
        const date1 = new Date(today1).toISOString();

        let open = await Arching.find({ $and: [{ fecha: { $gte: new Date(date) } }, { Empleado: user }, { fecha: { $lte: new Date(date1) } }] });

        if (open.length > 0) {
            res.send(open);
        } else {
            res.send([]);
        }
    }

}

module.exports = paymentController;