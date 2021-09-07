const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const passport = require('passport');

const Customer = require(__dirname + "/../Model/cliente.js");

const app = express();

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

passport.use(Customer.createStrategy());

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});


router.post("/", (req, res, next) => {

  const user = new Customer({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function (err) {
    //console.log(err);
    if (err) {
      //console.log(err);
      res.json(err);
      //console.log("entre al error");
    } else {
      //console.log("entre al passport x alguna razon");
      passport.authenticate("local")(req, res, function () {

        res.json({ login: "success" });


      });
    }
  })
})

module.exports = router;
