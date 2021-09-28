require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const middleware = require("./middleware");
const mongoose = require('./database');
const cron = require("node-cron");
const session = require('express-session');
const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require(__dirname + "/Model/cliente.js");
const ErrorController = require("./Controller/Errors");
const cors = require("cors");
const app = express();
const FacebookStrategy = require("passport-facebook").Strategy;
//TESTEANDO SCHEDULE JOB IN INDEX
const Billing = require(__dirname + "/Model/facturacion.js");
const Customer = require(__dirname + "/Model/cliente.js");
//Require Membership function
const membership = require(__dirname + "/Functions/getMembership.js");
//Function para insertar job Automatico historico
const JobA = require(__dirname + "/Functions/InsertJob.js");
// MAIL CHIMP 
const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({
    apiKey: "9c27e04f4b7262eec97a84525a56b576-us6",
    server: "us6",
});

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.json());
app.set("trust proxy", 1);
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: "https://energym-project.herokuapp.com", credentials: true })); //testing CORS
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://energym-project.herokuapp.com');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
*/
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // callbackURL: "http://localhost:3000/auth/google/home"
    callbackURL: "https://energym-project.herokuapp.com//auth/google/home"
    // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {

        users = { ...profile };
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            User.findByIdAndUpdate(user._id, { email: profile._json.email, googleId: profile.id, fName: profile._json.given_name, lName: profile._json.family_name, TipoCuenta: "Cliente" }, { upsert: true }, (err, userUpdated) => {
            });
            return cb(err, user);
        });
    }
));
//NODE CRON PARA AUTOMATIZAR LA CREACION DE FACTURAS
cron.schedule("1 7 * * *", async function () {
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
    customers.forEach(async (item, index) => {
        let itemExist = await Billing.find({ $and: [{ fecha: { $gte: date1 } }, { fecha: { $lte: date2 } }, { email: item.email }, { tipoDoc: "Factura" }] });
        if (itemExist.length === 0 && item.Membresia) {
            var membershipAmount = membership.getMembership(item.Membresia);
            const invoice = new Billing({
                monto: membershipAmount,
                numDocumento: docSerial,
                usuario: "SYSTEM",
                username: docSerial,
                tipoDoc: "Factura",
                liquidez: false,
                estado: "Abierto",
                iva: membershipAmount * 0.13,
                cliente: item._id,
                email: item.email,
                fecha: new Date().toISOString()
            });
            try {
                await invoice.save((err, pagoCreated) => {
                    if (err) {
                        //Este error se debe guardar en el log de errores
                        console.log(err);
                    }
                    if (!pagoCreated) {
                        //Este error se debe guardar en el log de errores
                        console.log("Hubo un problema en el job automático al generar una factura");
                    }
                    if (pagoCreated) {
                        console.log("Registro exitoso de factura");
                    }
                });
                docSerial += 1;
            } catch (error) {

                var errorOptions = {
                    Descripcion: "error",
                    Usuario: req.user.email,
                    Fecha: new Date().toISOString(),
                    Modulo: "Admin",
                    LogError: error,
                };
                ErrorController.guardarErrores(errorOptions);
            }

        }
        if (index === customers.length - 1 && docSerial > firstSerial) {
            try {
                JobA.postJob(docSerial);
            } catch (err) {
                //Agarrar error en consola
                //console.log("error de post job");
                //console(err);
                var errorOptions = {
                    Descripcion: "error",
                    Usuario: req.user.email,
                    Fecha: new Date().toISOString(),
                    Modulo: "Admin",
                    LogError: err,
                };
                ErrorController.guardarErrores(errorOptions);
            }

        }
    });

}, {
    scheduled: true
});
// MAILCHIMP
app.post('/subscribe', (req, res, next) => {

    const { email, nombre, apellido } = req.body;
    try {
        async function addMembers() {
            const response = await client.lists.addListMember("3fcd78174b", {
                email_address: email,
                status: "pending",
                merge_fields: {
                    FNAME: nombre,
                    LNAME: apellido
                }
            });
            //console.log(response); ----> ******Evitar los console.log y guardarlos en el log de errores
        };

        addMembers();


        return res.status(200).send({ icon: 'EXITO' });
    } catch (err) {
        var errorOptions = {
            Descripcion: "Error en el controlador /subscribe",
            Usuario: req.user.email,
            Fecha: new Date().toISOString(),
            Modulo: "Admin",
            LogError: err,
        };
        ErrorController.guardarErrores(errorOptions);

        //console.log(err); ----> ******Evitar los console.log y guardarlos en el log de errores
    }
})
// DESACTIVAR MAILCHIMP
app.post('/unsuscribed', (req, res, next) => {
    const { email } = req.body;
    const listId = "3fcd78174b";
    const subscriberHash = (email.toLowerCase());
    try {
        async function addMembers() {
            const response = await client.lists.updateListMember(
                listId,
                subscriberHash,
                {
                    status: "unsubscribed"
                }
            );
            //console.log(response); ----> ******Evitar los console.log y guardarlos en el log de errores*****
        };
        addMembers();
        return res.status(200).send({ icon: 'EXITO' });
    } catch (err) {
        var errorOptions = {
            Descripcion: "error",
            Usuario: req.user.email,
            Fecha: new Date().toISOString(),
            Modulo: "Admin",
            LogError: err,
        };
        ErrorController.guardarErrores(errorOptions);
        //console.log(err); ----> ******Evitar los console.log y guardarlos en el log de errores
    }
})
app.post('/reactivarSubscripcion', (req, res, next) => {
    const { email } = req.body;
    const listId = "3fcd78174b";
    const subscriberHash = (email.toLowerCase());
    try {
        async function addMembers() {
            const response = await client.lists.updateListMember(
                listId,
                subscriberHash,
                {
                    status: "subscribed"

                }
            );
            // console.log(response);
        };
        addMembers();

        return res.status(200).send({ icon: 'EXITO' });
    } catch (err) {
        var errorOptions = {
            Descripcion: "Error en el controlador /reactivarSubscripcion",
            Usuario: req.user.email,
            Fecha: new Date().toISOString(),
            Modulo: " ",
            LogError: err,
        };
        ErrorController.guardarErrores(errorOptions);
        //  console.log(err);
    }
})
passport.use(new FacebookStrategy({
    clientID: process.env.CLIEND_ID_FB,
    clientSecret: process.env.SECRET_ID_FB,
    callbackURL: "http://localhost:3001/auth/facebook/home"
},
    (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) { return cb(null, user); });
    }));
// app.use(cors());
//Routes
// const loginRoute = require("./Controller/loginRoute");
const registerRoute = require("./Controller/registerRoute");
const userSettings = require("./Controller/userDataController");
const events = require("./Controller/eventsController");
const routine = require("./Controller/routineController");
const accounts = require("./Controller/AdminAccounts");
const errors = require("./Controller/Errors");
const diet = require("./Controller/dietController");
const retroalimentacion = require("./Controller/retroalimentacionController");
const metricas = require("./Controller/metricasController");
const billing = require("./Controller/paymentController");
const report = require("./Controller/ReportController");

// app.use("/login", loginRoute);
app.use("/register", registerRoute);
//-------User settings
app.use("/userData", userSettings.getUser);
app.use("/userDetails", userSettings.getUserDetails);
app.use("/membership/assign", userSettings.assignMembership);
app.use("/userDataPost", userSettings.updateUserInfo);
app.use("/userPasswordPost", userSettings.updateUserPassword);
app.use("/listUserEvents", userSettings.getUserEvents);
app.use("/listUserDiets", userSettings.getUserDiets);
app.use("/listUserRoutines", userSettings.getUserRoutines);
app.use("/listUserDocuments", userSettings.getUserDocuments);
app.use("/listUserMetrics", userSettings.getUserMetrics);
//-------Events
app.use("/createEvent", events.createEvent);
app.use("/editEvent", events.editEvent);
app.use("/listEvents", events.getEvents);
app.use("/getRecentEvents", events.getRecentEvents);
app.use("/getClientesEvento", events.getClientsEvents);
app.use("/reservaEventoPost", events.reserveEvent);
app.use("/borrarReserva", events.borrarReserva);
//-------Retroalimentacion
app.use("/feedback", retroalimentacion);
app.use("/feedback/getRetroalimentacionAdmin", retroalimentacion);
app.use("/feedback/getRetroalimentacionCliente", retroalimentacion);
//-------Metricas
app.use("/crearMetrica", metricas.createMetrica);
app.use("/getUserMetricsEmpleado", metricas.getUserMetrics);
app.use("/verificaMetricas", metricas.verificaMetricas);
app.use("/editarMetrica", metricas.editMetric);
//-------
app.use("/adminAccounts", accounts.getAccounts);
app.use("/listaErrores", errors.getErrores);
app.use("/adminAccountsClient", accounts.getAccountClient);
app.use("/estadoCuenta", accounts.estadoCuenta);
app.use("/desactivarCliente", accounts.estadoCuentaCliente);
app.use("/activarCliente", accounts.ActivarCuentaCliente);
app.use("/validarSuscripcionMailchip", accounts.activarMailchip);
app.use("/desactivarSuscripcionMailchip", accounts.desactivarMailchip);
app.use("/reactivarSubscripcion", accounts.reactivarMailchip);
app.use("/routine", routine);
app.use("/userRoutine", routine);
app.use("/userRoutine/getDetails", routine);
app.use("/userRoutine/getDetailsbyId", routine);
app.use("/userRoutine/deleteRoutine", routine);
app.use("/userRoutine/deleteOneRoutine", routine);
app.use("/userRoutine/modifyOneRoutine", routine);
app.use("/diet", diet);
app.use("/userDiet", diet);
app.use("/userDiet/getDetails", diet);
app.use("/userDiet/getDetailsbyId", diet)
app.use("/userDiet/deleteDiet", diet);
//------Pagos
app.use("/payments/creates", billing.createPayment);
app.use("/report/billing", billing.getBilling);
app.use("/payment/application", billing.getSubledger);
app.use("/payment/clearing", billing.getSubledgerClose)
app.use("/payments/find", billing.getDocument);
app.use("/balance/asignar", billing.postBalance);
app.use("/payment/arching", billing.postCash);
app.use("/payment/setBalance", billing.getInitial);
app.use("/Payment/Open", billing.getOpen);
app.use("/payment/documents", billing.getDocuments);
app.use("/payment/closure", billing.getClosure);
app.use("/Payment/getClosure", billing.getUserClosure)
app.use("/payment/unapply", billing.postUnapply)
app.use("/payment/getJob", billing.getJob);
app.use("/payment/postJob", billing.postJob);
app.use("/payment/overdue", billing.getOverdue);
app.use("/payment/reject", billing.getReject);
// app.use("/buscarUser", accounts.getUser);

//-----Reporte
app.use("/report/close/billing", report.getDayReport);

//URL Directions
app.get("/", middleware.requireLogin, function (req, res, next) { res.status(200).render("home"); });
app.get("/auth/google", cors(), passport.authenticate("google", { scope: ['profile', 'email'] }));
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/google/home", passport.authenticate("google", { failureRedirect: function (req, res) { res.redirect("/Login") } }), function (req, res) { res.redirect("/GoogleLogin") })
app.get("/auth/facebook/home", passport.authenticate("facebook"), (req, res) => { res.redirect("/"); });

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        try {
            if (err) throw err;
            if (!user) res.send("No User Exists");
            user.EstadoCuenta === "Inactivo" ? res.send("Su cuenta se encuentra INACTIVA!") : req.logIn(user, (err) => { if (!err) res.send(req.user) });

        } catch (err) {
            //Enviar el error capturado al log que se hizo en la base de datos
            //  console.log(err);
            var errorOptions = {
                Descripcion: "Error en el controlador /login",
                Usuario: user.email,
                Fecha: new Date().toISOString(),
                Modulo: "",
                LogError: err,
            };
            ErrorController.guardarErrores(errorOptions);

        }
    })(req, res, next);
})
app.post("/activar", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        try {
            if (err) throw err;
            if (!user) res.send("No User Exists");
            else user.EstadoCuenta === "Inactivo" ? res.send("Su cuenta se encuentra INACTIVA!") : res.send("Su cuenta se encuentra Activa!");
            req.logIn(user, (err) => { if (!err) res.send(req.user) });

        } catch (err) {
            //Enviar el error capturado al log que se hizo en la base de datos
            var errorOptions = {
                Descripcion: "Error en el controlador /activar",
                Usuario: req.user.email,
                Fecha: new Date().toISOString(),
                Modulo: "Admin",
                LogError: err,
            };
            ErrorController.guardarErrores(errorOptions);
            console.log(error);
        }
    })(req, res, next);
})
app.get("/home", middleware.requireLogin, function (req, res, next) { res.redirect("/"); });
app.get("/user", (req, res) => { res.send(req.user); });
app.get("/isauth", (req, res) => { req.isAuthenticated() ? res.status(200).send(true) : res.status(200).send(false); })
app.get("/logout", function (req, res) {
    req.logOut();
    res.send({ information: "test" });
});
//Testing the session
//Port Number to host app
app.listen(process.env.PORT || "3001", function (req, res) {
    console.log("Listening to port 3001");
});