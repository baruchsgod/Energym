import React, { useState, useRef, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css/';
import swal from 'sweetalert';
function Register() {
    const emailRef = useRef();
    const [error, setError] = useState("");
    const [loading] = useState(false);
    const [dataAccounts, setDataAccounts] = useState([]);
    // Obtiene datos del usuario conectado. 
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
        if (emailRef.current.value === dataAccounts.email || !dataAccounts.subscripcionMailchip === "true") {
            if (dataAccounts.subscripcionMailchip === "false") {
                Axios.post("/validarSuscripcionMailchip", cliente)
                    .then(response => {
                        if (response.data.icon === 'success') {
                            //console.log("ACTIVADO");
                        }

                    });
                Axios.post("/subscribe", cliente)
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
            } if (dataAccounts.subscripcionMailchip === "subscrito") {
                Axios.post("/reactivarSubscripcion", cliente)
                    .then(response => {
                        if (response.data.icon === 'EXITO') {
                            return swal("Suscrito!!!", {
                                icon: "success"
                            });
                        }
                    });
            } else {
                return swal("Suscrito!!!", {
                    icon: "success"
                });
            }
        } else {
            return swal("Correo invalido!", {
                icon: "error"
            });
        }
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Suscripción a promociones"
            backUrl="/UserMenuCuenta"
            backName="Menú de cuenta"
            currentName="Suscripción a promociones"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-md-3 mt-2">
                        <h2 className="para-color">Suscripción a promociones</h2>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-sm-12 mt-4">
                        {error && <Alert variant="danger">{error}</Alert>}
                        <div className="bmi-box">
                            <form onSubmit={setValues} method="POST">
                                <div className="row">
                                    <div className="col-sm-6 offset-md-3">
                                        <div className="form-group">
                                            <label >Correo electrónico<span>*</span></label>
                                            <input type="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form-control" placeholder="" ref={emailRef} name="email" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mt-2">
                                        <div className="contact-sub-btn w-100 text-center mt-4 mb-5">
                                            <button type="submit" disabled={loading} className="btn btn-effect section-button mb-3">Subscribirse</button>
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