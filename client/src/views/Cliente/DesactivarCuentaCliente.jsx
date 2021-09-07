import React, { useState, useEffect, useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css/';
function Register() {
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [loading] = useState(false);
    const [dataAccounts, setDataAccounts] = useState([]);
    const history = useHistory();
    useEffect(() => {
        if (dataAccounts.length === 0) {
            fetch('/user')
                .then(response => response.json())
                .then(data => setDataAccounts(data));
        }
    });
    function setValues(e) {
        e.preventDefault();
        setError("");
        const cliente = {
            id: dataAccounts._id,
            email: emailRef.current.value,
            js: "true",
            nombre: dataAccounts.fName,
            apellido: dataAccounts.lName
        };
        if (emailRef.current.value === dataAccounts.email) {
            swal({
                title: "Estás seguro que deseas desactivar tu cuenta?",
                text: "Una vez desactivada la cuenta no podras ingresar al sistema hasta que esta sea activada!",
                icon: "warning",
                buttons: ["Cancelar", "Aceptar"],
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        Axios.post("/desactivarCliente", cliente)
                            .then(response => {
                                if (response.data.icon === 'success')
                                    setDataAccounts([]);
                                return swal("Su cuenta ha sido desactivada", {
                                    icon: "success"
                                });
                            });
                    }
                    Axios({
                        method: "GET",
                        withCredentials: true,
                        url: "/logout",
                    }).then((res) => {
                        if (res.data) {
                            localStorage.clear();
                            history.push("/Login");
                        }
                    }).then(error => {
                        //console.log(error); ******Evitar los console.log*****
                    });
                    // DESACTIVO MAILCHIMP      
                    Axios.post("/unsuscribed", cliente)
                        .then(response => {
                            if (response.data.icon === 'EXITO') {
                                return swal("Suscrito!!", {
                                    icon: "success"
                                });
                            }
                        })
                        .then(err => {
                            //console.log(err);
                        });
                    // Me desactivar en la DB el estado de suscrito de Mailchip.
                    Axios.post("/desactivarSuscripcionMailchip", cliente)
                        .then(response => {
                            if (response.data.icon === 'success') {
                                //console.log("ACTIVADO");******Evitar los console.log*****
                            }
                        });
                });
        } else {
            return setError("Correo Incorrecto");
        }
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Desactivar cuenta"
            backUrl="/UserMenuCuenta"
            backName="Menú de cuenta"
            currentName="Desactivar cuenta"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-md-3">
                        <h2 className="para-color mt-5 ">Ingrese su correo electrónico</h2>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-sm-12">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <div className="bmi-box">
                            <form onSubmit={setValues}>
                                <div className="row">
                                    <div className="col-sm-6 offset-md-3 mt-3">
                                        <div className="form-group">
                                            <label >Correo electrónico<span>*</span></label>
                                            <input type="email" className="form-control" placeholder="" ref={emailRef} name="password" required />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="col-sm-12">
                                        <div className="contact-sub-btn w-100 text-center mt-4 mb-5">
                                            <button type="submit" disabled={loading} className="btn btn-effect section-button">Desactivar cuenta</button>
                                        </div>
                                        <br />
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
