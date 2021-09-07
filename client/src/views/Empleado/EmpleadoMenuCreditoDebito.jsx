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
            h1="Menú de crédito y débito"
            backUrl={localStorage.getItem("tipoCuenta") === "Administrador" ? "/AdminMenuPagos" : "/EmpleadoMenuRecepcionista"}
            backName={localStorage.getItem("tipoCuenta") === "Administrador" ? "Menú de pagos" : "Menú de recepcionista"}
            currentName="Menú de crédito y débito"
        />
        <div className="container mt-5 mb-5 fade-in-card">
            <div className="row">
                <div className="col-sm-12 text-center mt-4">
                    <h2 className="section-heading">Opciones del menú de crédito y débito</h2>
                    <h3 className="section-subheading wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">Un sitio que contiene acceso a la creación de las notas de crédito y de débito. </h3>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Crear nota de crédito</h4>
                        <p>Accede a la creación de las notas de crédito para el cliente.</p>
                        <Link to={{ pathname: "/CreditNote", state: { docType: "Crédito" } }} style={{ textDecoration: 'none' }}><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Crear nota de débito</h4>
                        <p>Accede a la creación de las notas de débito para el cliente.</p>
                        <Link to={{ pathname: "/DebitNote", state: { docType: "Débito" } }} style={{ textDecoration: 'none' }}><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}
export default UserSettings
