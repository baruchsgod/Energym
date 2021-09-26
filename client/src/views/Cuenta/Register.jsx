import React, { useState, useRef } from "react";
import Footer from "../../components/Footer";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
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
    const [error, setError] = useState("");
    const [loading] = useState(false);
    const history = useHistory();
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
            fechaNacimiento: dateRef.current.value
        };
        if (passRef.current.value === confirmPassRef.current.value) {
            if (enteredAge >= 12) {
                Axios.post("https://energymproject.herokuapp.com/register", cliente)
                    .then(response => {
                        if (response.data.message === "success") {
                            swal("Cuenta creada correctamente, puedes iniciar sesión!", {
                                icon: "success"
                            });
                            history.push("/Login");

                        } else {
                            return setError("Hubo un error al crear la cuenta");
                        }
                    })
                    .then(error => {
                        //console.log(error);//recoger el error
                    });
            } else {
                return setError("Debe ser mayor de 12 años para suscribirse en nuestros programas");
            }
        } else {
            return setError("Las contraseñas no coinciden favor intente de nuevo");
        }
    }
    return (<div>
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="para-color mt-5">Registro de cliente</h2>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-sm-8">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <h4 className="para-color mt-4">Información requerida</h4>
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
                                            <label >Teléfono<span>*</span></label>
                                            <input type="text" className="form-control" pattern="[0-9]+" maxlength="8"  placeholder="" ref={phoneRef} id="telefono" name="telefono" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >Correo electrónico<span>*</span></label>
                                            <input type="email" className="form-control" placeholder="" ref={emailRef} name="email" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Fecha de nacimiento<span>*</span></label>
                                            <input type="date" className="form-control" placeholder="" ref={dateRef} name="bDate" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Provincia<span>*</span></label>
                                            <select name="province" className="form-control custom-select" ref={provinceRef} required>
                                                <option>Selecciona la provincia</option>
                                                <option value="1">San José</option>
                                                <option value="2">Alajuela</option>
                                                <option value="3">Cartago</option>
                                                <option value="4">Heredia</option>
                                                <option value="5">Guanacaste</option>
                                                <option value="6">Puntarenas</option>
                                                <option value="7">Limón</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Código postal<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={postalRef} name="postalCode" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label >Dirección<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={detalleRef} name="address" />
                                        </div>
                                        <hr className="my-4" />
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
                                        <div className="contact-sub-btn w-100 text-center mt-2">
                                            <button type="submit" disabled={loading} className="btn btn-effect section-button">Registrar</button>

                                        </div>
                                        <br />
                                        <div className="w-100 text-center mt-2">
                                            <Link to="/login" style={{ color: "gray" }}>Ya tengo cuenta, Ingresar</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <h4 className="para-color mt-4 mb-4">Códigos promocionales</h4>
                        <div className="bmi-box">
                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between bg-light mt-3">
                                    <div className="text-success">
                                        <h6 className="my-0">Promo code</h6>
                                        <small>EXAMPLECODE</small>
                                    </div>
                                    <span className="text-success">−₡5000</span>
                                </li>
                            </ul>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code" />
                                <button type="submit" className="btn btn-secondary">Redimir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>);
}
export default Register;