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
            h1="Menú general"
            backUrl="/InicioEmpleado"
            backName="Inicio"
            currentName="Menú general"
        />
        <div className="container mb-5 mt-5 fade-in-card">
            <div className="row">
                <div className="col-sm-12 text-center mt-4">
                    <h2 className="section-heading">Opciones del menú general de acciones</h2>
                    <h3 className="section-subheading wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">Un sitio que contiene acceso a creación, modificación y visualización del los eventos especiales, además de
                        la gestión de las cuentas de los clientes.</h3>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Eventos especiales</h4>
                        <p>Accede a la gestión de los eventos, creación, edición y un listado de clientes con reserva.</p>
                        <Link to="/ListEventsAdmin" ><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Lista de clientes</h4>
                        <p>Accede a la visualización de la lista de los clientes y gestiona el estado de su cuenta.</p>
                        <Link to="/cuentasClientes" ><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}
export default UserSettings
