import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import swal from 'sweetalert';
const UserSettings = () => {
    const [loading] = useState(false);
    const location = useLocation();
    const [detalle] = useState('');
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const { ID, Email, Tipo, Nombre, Apellido, Direccion, Postal, Telefono, FechaNacimiento } = (location && location.state) || {};
    const [userId] = useState(ID);
    const [email, setEmail] = useState(Email);
    const [tipo, setTipo] = useState(Tipo);
    const [name, setName] = useState(Nombre);
    const [lname, setlname] = useState(Apellido);
    const [province, setProvince] = useState(Direccion);
    const [postal, setPostal] = useState(Postal);
    const [phone, setPhone] = useState(Telefono);
    const [date, setDate] = useState(FechaNacimiento);
    function updateUserSettings(e) {
        e.preventDefault();
        var enteredValue = date;
        var birthDate = new Date(enteredValue);
        var today = new Date();
        var enteredAge = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            enteredAge--;
        }
        if (enteredAge >= 15) {
            //Objeto obtiene los parametros para mandar al server.
            const cliente = { userId, name, lname, phone, email, date, province, postal, detalle, tipo };
            // Compara texto para que la funcion provincia.js asigne provincia correcta.
            if (cliente.province === "San Jose") {
                cliente.province = "1";
            } if (cliente.province === "Alajuela") {
                cliente.province = "2";
            } if (cliente.province === "Cartago") {
                cliente.province = "3";
            } if (cliente.province === "Heredia") {
                cliente.province = "4";
            } if (cliente.province === "Guanacaste") {
                cliente.province = "5";
            } if (cliente.province === "Puntarenas") {
                cliente.province = "6";
            } if (cliente.province === "Limón") {
                cliente.province = "7";
            }
            // Compara texto y asigna valor en numero para que la funcion CuentaTipo.js asigne tipo.
            if (cliente.tipo === "Administrador") {
                cliente.tipo = "1";
            } if (cliente.tipo === "Entrenador") {
                cliente.tipo = "2";
            }
            // Llamada a la ruta del index.js del server
            Axios.post("/userDataPost", cliente)
                .then(response => {
                    setEmail("");
                    return swal(response.data.title, response.data.message, response.data.icon);
                });
        } else {
            return swal("Restricción de Edad", "Debe ser mayor de 15 años para ingresar al sistema", "error");
        }
    }
    function updateUserPassword(e) {
        e.preventDefault();
        if (newPass === confirmPass) {
            const passData = { userId, pass, newPass };
            Axios.post("/userPasswordPost", passData)
                .then(response => {
                    return swal(response.data.title, response.data.message, response.data.icon);
                });
        } else {
            return swal("Hubo un error", "Las contraseñas no coinciden!", "error");
        }
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Edición de datos de cuenta"
            backUrl="/administrarcuentas"
            backName="Lista de cuentas"
            currentName="Edición de datos de cuenta"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-sm-8">
                            <h2 className="para-color mt-2">Cambio de Información personal del cliente</h2>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <div className="bmi-box">
                                <form onSubmit={updateUserSettings}>
                                    <div className="row">
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label>Nombre<span>*</span></label>
                                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label >Apellido<span>*</span></label>
                                                <input type="text" className="form-control" value={lname} onChange={(e) => setlname(e.target.value)} name="apellido" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label >Telefono<span>*</span></label>
                                                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} id="telefono" name="telefono" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Correo electrónico<span></span></label>
                                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required disabled />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Provincia<span>*</span></label>
                                                <input type="text" className="form-control" value={province} onChange={(e) => setProvince(e.target.value)} name="province" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label > Seleccione Provincia<span></span></label>
                                                <select name="provincia" className="form-control custom-select" value={province} onChange={(e) => setProvince(e.target.value)} >
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
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Codigo postal<span>*</span></label>
                                                <input type="text" className="form-control" value={postal} onChange={(e) => setPostal(e.target.value)} name="tipo" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Tipo Cuenta<span>*</span></label>
                                                <input type="text" className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)} name="address" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label > Tipo de Cuenta<span></span></label>
                                                <select name="tipo" className="form-control custom-select" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                                                    <option>Selecciona Estado</option>
                                                    <option value="1">Administrador</option>
                                                    <option value="2">Empleado</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Fecha Nacimiento<span>*</span></label>
                                                <input type="text" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} name="address" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Fecha Nacimiento<span>*</span></label>
                                                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} name="address" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-2">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} disabled={loading} className="btn btn-effect section-button">Cambiar datos personales</button>
                                            </div>
                                            <hr className="my-4" />
                                            <br />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2 className="para-color">Cambio de contraseña</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="bmi-box">
                                    <form onSubmit={updateUserPassword}>
                                        <div className="row mt-4">
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label >Contraseña actual<span>*</span></label>
                                                    <input type="password" className="form-control" value={pass} onChange={(e) => setPass(e.target.value)} name="password" required />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label >Contraseña nueva<span>*</span></label>
                                                    <input type="password" className="form-control" value={newPass} onChange={(e) => setNewPass(e.target.value)} name="password" required />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label >Confirme contraseña<span>*</span></label>
                                                    <input type="password" className="form-control" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="col-sm-12 mt-3">
                                                <div className="contact-sub-btn w-100 text-center mt-2">
                                                    <button type="submit" style={{ padding: "10px", width: "280px" }} disabled={loading} className="btn btn-effect section-button">Cambio de contraseña</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>);
}
export default UserSettings



