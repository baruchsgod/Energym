import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import * as moment from 'moment';
const UserSettings = () => {
    const [loading] = useState(false);
    const history = useHistory();
    const [userId, setId] = useState('');
    const [name, setNombre] = useState('');
    const [lname, setLname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [date, setDate] = useState('');
    const [province, setProvince] = useState('');
    const [postal, setPostal] = useState('');
    const [detalle, setDetalle] = useState('');
    const [tipoCuenta, setTipoCuenta] = useState('');
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [backName, setBackName] = useState('');
    const [backUrl, setBackUrl] = useState('');
    useEffect(() => {
        getHeaderData();
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/userData",
        }).then((res) => {
            if (res.data === "") {
                swal("Hubo un error!", "Debes iniciar sesion antes de cambiar tus datos.", "error");
                history.push("/Login");
            } else {
                setId(res.data._id);
                setNombre(res.data.fName);
                setLname(res.data.lName);
                setPhone(res.data.Telefono);
                setEmail(res.data.email);
                setTipoCuenta(res.data.TipoCuenta);
                setUserName(res.data.username);
                setPostal(res.data.Direccion.CodigoPostal);
                setDetalle(res.data.Direccion.Detalle);
                setDate(res.data.fechaNacimiento);
                setProvince(res.data.Direccion.Provincia);

            }
        });
    }, [history]);
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
        if (enteredAge >= 12) {
            const cliente = { userId, name, lname, phone, email, tipoCuenta, username, date, province, postal, detalle };
            Axios.post("/userDataPost", cliente)
                .then(response => {
                    localStorage.setItem("userName", name + " " + lname);
                    return swal(response.data.title, response.data.message, response.data.icon);
                });
        } else {
            return swal("Restricción de Edad", "Debe ser mayor de 12 años para ingresar al sistema", "error");
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
    function getHeaderData() {
        let tipoCuenta = localStorage.getItem("tipoCuenta");
        switch (tipoCuenta) {
            case "Administrador":
                setBackName("Inicio")
                setBackUrl("/InicioAdmin")
                break;
            case "Empleado":
                setBackName("Inicio")
                setBackUrl("/InicioEmpleado")
                break;
            case "Cliente":
                setBackUrl("/UserMenuCuenta")
                setBackName("Menú de cuenta")
                break;
            default:
                break;
        }
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Actualización de datos"
            backUrl={backUrl}
            backName={backName}
            currentName="Actualización de datos"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3 mt-3">
                            <div className="col-sm-12">
                                <h2 className="para-color mb-3">Cambio de Información personal</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={updateUserSettings}>
                                    <div className="row">
                                        <div className="col-sm-6 mt-3">
                                            <div className="form-group">
                                                <label>Nombre<span>*</span></label>
                                                <input type="text" className="form-control" value={name} onChange={(e) => setNombre(e.target.value)} id="nombre" name="nombre" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mt-3">
                                            <div className="form-group">
                                                <label >Apellido<span>*</span></label>
                                                <input type="text" className="form-control" value={lname} onChange={(e) => setLname(e.target.value)} name="apellido" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label >Teléfono<span>*</span></label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label >Correo electrónico<span>*</span></label>
                                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} name="email" disabled />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Fecha de nacimiento<span>*</span></label>
                                                <input type="date" className="form-control" value={moment(date).format("YYYY-MM-DD")} onChange={(e) => setDate(e.target.value)} name="date" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Provincia<span>*</span></label>
                                                <select name="province" className="form-control custom-select" value={province} onChange={(e) => setProvince(e.target.value)} >
                                                    <option>{province}</option>
                                                    <option value="San José">San José</option>
                                                    <option value="Alajuela">Alajuela</option>
                                                    <option value="Cartago">Cartago</option>
                                                    <option value="Heredia">Heredia</option>
                                                    <option value="Guanacaste">Guanacaste</option>
                                                    <option value="Puntarenas">Puntarenas</option>
                                                    <option value="Limón">Limón</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Código postal<span>*</span></label>
                                                <input type="text" className="form-control" value={postal} onChange={(e) => setPostal(e.target.value)} name="postalCode" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label >Dirección<span>*</span></label>
                                                <input type="text" className="form-control" value={detalle} onChange={(e) => setDetalle(e.target.value)} name="address" />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-4">
                                                <button type="submit" style={{ padding: "7px", width: "280px" }} disabled={loading} className="btn btn-effect section-button">Cambiar datos personales</button>
                                            </div>
                                            <br />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="row mb-3 mt-3">
                                <div className="col-sm-12">
                                    <h2 className="para-color mb-3">Cambio de contraseña</h2>
                                </div>
                                <hr />
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
                                                <div className="contact-sub-btn w-100 text-center mt-4">
                                                    <button type="submit" style={{ padding: "10px", width: "280px", marginLeft:"35px" }} disabled={loading} className="btn btn-effect section-button">Cambio de contraseña</button>
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
