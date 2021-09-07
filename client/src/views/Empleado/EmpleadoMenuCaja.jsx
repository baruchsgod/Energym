import React, { useEffect } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import WOW from 'wowjs';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const UserSettings = () => {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    return (<div>
        <Header />
        <HeaderStatus
            h1="Menú de caja"
            backUrl={localStorage.getItem("tipoCuenta") === "Administrador" ? "/AdminMenuPagos" : "/EmpleadoMenuRecepcionista"}
            backName={localStorage.getItem("tipoCuenta") === "Administrador" ? "Menú de pagos" : "Menú de recepcionista"}
            currentName="Menú de caja"
        />
        <div className="container mt-5 mb-5 fade-in-card">
            <div className="row">
                <div className="col-sm-12 text-center mt-4">
                    <h2 className="section-heading">Opciones del menú de caja</h2>
                    <h3 className="section-subheading wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">Un sitio que contiene acceso a apertura de la caja, realización de arqueo y ejecución del job de facturación. </h3>
                </div>
            </div>
            <div className="row mb-5">
                {localStorage.getItem("tipoCuenta") === "Administrador" &&
                    <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                        <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Establecer balance</h4>
                            <p>Accede a establecer el balance inicial de la caja.</p>
                            <Link to="/Cashier/InitialBalance" style={{ textDecoration: 'none' }}><Button type="button" style={{ marginLeft: "40px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>}
                <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Abrir caja</h4>
                        <p>Gestiona la configuración de la apertura de la caja.</p>
                        <Link to="/Payment/Open" style={{ textDecoration: 'none' }}><Button type="button" style={{ marginLeft: "40px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Arqueo de caja</h4>
                        <p>Accede a la configuración de la creación del arqueo de caja.</p>
                        <Link to="/Payment/Close" style={{ textDecoration: 'none' }}><Button type="button" style={{ marginLeft: "40px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Job de facturación</h4>
                        <p>Ejecuta el job de facturación manualmente.</p>
                        <Link to="/Payment/JobInvoice" style={{ textDecoration: 'none' }}><Button type="button" style={{ marginLeft: "40px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}
export default UserSettings
