const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const passport = require('passport');
const Province = require("../Functions/provincia.js");
const Account = require("../Functions/CuentaTipo.js");
const Customer = require(__dirname + "/../Model/cliente.js");
const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
passport.use(Customer.createStrategy());
router.get("/", (req, res, next) => {
  res.status(200).render("register");
});
router.post("/", (req, res, next) => {
  const province = parseInt(req.body.province);
  const finalProvince = Province.getProvince(province);
  const cuenta = parseInt(req.body.tipoCuenta);
  const finalCuenta = Account.getCuenta(cuenta);
  var newCustomer = new Customer({
    username: req.body.email,
    email: req.body.email,
    fName: req.body.nombre,
    lName: req.body.apellido,
    Telefono: req.body.telefono,
    dateR: req.body.dateR,
    EstadoCuenta: "Activo",
    "Direccion.Detalle": req.body.detalleRef,
    "Direccion.CodigoPostal": req.body.postal,
    "Direccion.Provincia": finalProvince,
    TipoCuenta: finalCuenta,
    fechaNacimiento: req.body.fechaNacimiento
  });
  Customer.register(newCustomer, req.body.password, function (err, user) {
    if (!err) {
      passport.authenticate('local', {
        successRedirect: res.send({message: "success"}),
        failureRedirect: console.log("There is an error with passport"),
        failureFlash: true
      });
    }
  });
});


module.exports = router;
