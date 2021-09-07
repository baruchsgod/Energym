import React, { useState, useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css/';
import swal from 'sweetalert';
function Register() {
    const nombreRef = useRef();
    const lnameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const dateRef = useRef();
    const provinceRef = useRef();
    const postalRef = useRef();
    const detalleRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();
    const tipoCuentaRef = useRef();
    const [error, setError] = useState("");
    const [loading] = useState(false);
    function setValues(e) {
        e.preventDefault();
        setError("");
        var enteredValue = dateRef.current.value;
        var birthDate = new Date(enteredValue);
        var today = new Date();
        var enteredAge = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            enteredAge--;
        }
        const cliente = {
            nombre: nombreRef.current.value,
            apellido: lnameRef.current.value,
            telefono: phoneRef.current.value,
            email: emailRef.current.value,
            dateR: dateRef.current.value,
            province: provinceRef.current.value,
            postal: postalRef.current.value,
            detalleRef: detalleRef.current.value,
            password: passRef.current.value,
            tipoCuenta: tipoCuentaRef.current.value
        };
        if (passRef.current.value === confirmPassRef.current.value) {
            if (enteredAge >= 15 && cliente.tipoCuenta > 0) {
                Axios.post("/register", cliente)
                    .then(response => {
                        if (response.data.message === "success") {
                            return swal("Éxito!", "La cuenta fue creada exitosamente!", "success");

                        }
                        //  history.push("/");
                    })
            } else {
                if (cliente.tipoCuenta === 0) return setError("Debe seleccionar algún tipo de cuenta");
                else return setError("Debe ser mayor de 15 años para suscribirse en nuestros programas");
            }
        } else {
            return setError("Las contraseñas no coinciden favor intente de nuevo");
        }
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Creación de cuenta"
            backUrl="/AdminMenuUsuarios"
            backName="Menú de usuarios"
            currentName="Creación de cuenta"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row mb-3 mt-3">
                        <div className="col-sm-12">
                            <h2 className="para-color mb-3">Información requerida</h2>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-sm-12">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <div className="bmi-box">
                            <form onSubmit={setValues}>
                                <div className="row">
                                    <div className="col-sm-6 mt-3">
                                        <div className="form-group">
                                            <label>Nombre<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={nombreRef} id="nombre" name="nombre" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mt-3">
                                        <div className="form-group">
                                            <label >Apellido<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={lnameRef} name="apellido" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >Telefono<span>*</span></label>
                                            <input type="number" className="form-control" maxLength="8" placeholder="" ref={phoneRef} id="telefono" name="telefono" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >Correo electrónico<span>*</span></label>
                                            <input type="email" className="form-control" placeholder="" ref={emailRef} name="email" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label >Fecha de nacimiento<span>*</span></label>
                                            <input type="date" className="form-control" placeholder="" ref={dateRef} name="bDate" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label >Provincia<span>*</span></label>
                                            <select name="province" className="form-control custom-select" ref={provinceRef} required>
                                                <option>Selecciona la provincia</option>
                                                <option value="1">San Jose</option>
                                                <option value="2">Alajuela</option>
                                                <option value="3">Cartago</option>
                                                <option value="4">Heredia</option>
                                                <option value="5">Guanacaste</option>
                                                <option value="6">Puntarenas</option>
                                                <option value="7">Limon</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label >Codigo postal<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={postalRef} name="postalCode" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label >Tipo cuenta<span>*</span></label>
                                            <select name="tipoCuenta" className="form-control custom-select" ref={tipoCuentaRef} required>
                                                <option value="0">Selecciona tipo de cuenta</option>
                                                <option value="1">Administrador</option>
                                                <option value="2">Empleado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label >Direccion<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={detalleRef} name="address" />
                                        </div>

                                    </div>
                                    <div className="row mb-3 mt-4">
                                        <div className="col-sm-12">
                                            <h2 className="para-color mb-3">Datos de la contraseña</h2>
                                        </div>
                                        <hr />
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >Contraseña<span>*</span></label>
                                            <input type="password" className="form-control" placeholder="" ref={passRef} name="password" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >Confirme contraseña<span>*</span></label>
                                            <input type="password" className="form-control" placeholder="" ref={confirmPassRef} required />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="col-sm-12">
                                        <div className="contact-sub-btn w-100 text-center mt-5">
                                            <button type="submit" disabled={loading} className="btn btn-effect section-button">Crear cuenta</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>);
}
export default Register;