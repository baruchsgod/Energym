import React, { useState, useRef } from "react";
import Footer from "../../components/Footer"
import { Button, Alert, Label, Input, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import GymLogo from "../../public/img/gym-logo.png";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import swal from 'sweetalert';
import img1 from "../../public/img/Vector-1.svg";
import img2 from "../../public/img/Vector-2.svg";
import img3 from "../../public/img/Vector-3.svg";
import img4 from "../../public/img/Vector-4.svg";


library.add(faGoogle, faFacebookF)
function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  function setLogin(e) {
    e.preventDefault();
    setError("");
    const login = {
      username: emailRef.current.value,
      password: passwordRef.current.value
    };
    //console.log("https://energymproject.herokuapp.com/login");
    Axios.post("https://energymproject.herokuapp.com/login", login)
      .then(response => {
        if (response.data.message != null) {
          return setError(response.data.message);
        } else if (response.data === "No User Exists") {
          setError("Su contraseña o usuario estan incorrectos");

        } else if (response.data === "Su cuenta se encuentra INACTIVA!") {
          swal({
            title: "Su cuenta se encuentra Inactiva!",
            text: "Desea Activar su cuenta nuevamente?",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                Axios.post("https://energymproject.herokuapp.com/activarCliente", login)
                  .then(response => {
                    if (response.data.icon === 'success')
                      return swal("Su cuenta ha sido Activada", {
                        icon: "success"
                      });
                    localStorage.clear();
                  });
              }
            });
        } else {
          localStorage.setItem("isAuth", true);
          localStorage.setItem("tipoCuenta", response.data.TipoCuenta);/////guardo el tipo de la cuenta para que pueda acceder a ciertos lugares
          localStorage.setItem("userName", response.data.fName + " " + response.data.lName);
          localStorage.setItem("correo",response.data.email);
          if (response.data.TipoCuenta === 'Cliente') { window.location = "/" }
          else if (response.data.TipoCuenta === 'Empleado') { window.location = "/InicioEmpleado" }
          else if (response.data.TipoCuenta === 'Administrador') { window.location = "/InicioAdmin" }
        }
      })
      .then(error => {
        //console.log(error);//recoger el error
      });
  }

const setGoogle = () => {
  localStorage.setItem("isAuth", true);
  localStorage.setItem("tipoCuenta", "Cliente");
  window.open("https://energymproject.herokuapp.com/auth/google", "_self");
}

  return (<div>
    <section className="get-a-membership-area fade-in-card">
      <div className="section-overlay-login">
        <div className="offset-md-1 col-md-3 p-5" style={{ backgroundColor: "rgba(0,0,0,.5)", borderRadius: "20px", marginBottom: "55px" }}>
          <h3 className="mt mt-login" style={{ fontSize: 40 }}>
            <img src={GymLogo} alt="Energym-logo" />
          </h3>
          <p className="mt" style={{ color: "#D6D2C4" }}>Bienvenido! Favor ingrese a su cuenta</p>
          {error && <Alert variant="danger" className="mt" style={{ width: "20%" }}>{error}</Alert>}
          <form className="mt" style={{ width: "20%", color: "#D6D2C4" }} onSubmit={setLogin}>
            <div className="form-group">
              <Label for="search-input1" style={{ color: "#D6D2C4" }}>Correo electrónico:</Label>
              <input
                className="form-control"
                style={{ background: "transparent", borderRadius: "10px" }}
                defaultValue={""}
                ref={emailRef}
                required
                name="email"
                placeholder="Ingrese su correo electrónico"
              />
            </div>
            <div className="form-group mb-2">
              <Label for="search-input1" style={{ color: "#D6D2C4" }}>Contraseña:</Label>
              <input
                className="form-control"
                style={{ background: "transparent", borderRadius: "10px" }}
                defaultValue={""}
                ref={passwordRef}
                type="password"
                required
                name="password"
                placeholder="Ingrese su contraseña"
              />
            </div>
            <FormGroup className="checkbox abc-checkbox mb-4 d-flex" check>
              <Input
                id="checkbox1"
                type="checkbox"
              />
              <Label for="checkbox1" check className="mr-auto">
                Recordarme
              </Label>
            </FormGroup>
            <Button
              type="submit"
              color="warning"
              className="w-100 btn-warning"
              style={{ borderRadius: "10px" }}
              size="sm"
            >
              Ingresar
            </Button>
            <br></br>

            <br /><br />
            <div className="d-flex mb-4 mt-3">
              <p className="mb-0">Ingresar con</p>
              <button onClick={setGoogle}><img src={img1} alt="facebook" className="ml-3" /> </button>
              <button onClick={setGoogle}><img src={img2} alt="github" className="ml-3" /> </button>
              <button onClick={setGoogle}><img src={img3} alt="linkedin" className="ml-3" /> </button>
              <button onClick={setGoogle}><img src={img4} alt="facebook" className="ml-3" /> </button>
            </div>
            <div className="d-flex align-items-center mt-register">
              No tiene cuenta?
              <Link to="/Register" className="ml-1" style={{ color: "#D6D2C4", textDecoration: "none" }}>
                Registrarse
              </Link>
            </div>
            <Link to="ActivarCuenta" style={{ color: "#D6D2C4", textDecoration: "none" }}>Activar Cuenta</Link>
          </form>
        </div>
      </div>
    </section>
    <Footer />
  </div>);
}
export default Login;

