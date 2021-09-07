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
            h1="Menú de recepcionista"
            backUrl="/InicioEmpleado"
            backName="Inicio"
            currentName="Menú de recepcionista"
        />
        <div className="container mt-5 mb-5 fade-in-card">
            <div className="row">
                <div className="col-sm-12 text-center mt-4">
                    <h2 className="section-heading">Opciones del menú de acciones de recepcionista</h2>
                    <h3 className="section-subheading wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">Un sitio que contiene acceso a la asignación de las membresías, la gestión completa de los pagos, creación de notas de 
                    crédito y débito, además de la gestión de la caja.</h3>
                </div>
            </div>
            <div className="row mb-5">
                <div className="row mb-5">
                    <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                        <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Asignar membresía</h4>
                            <p>Asigna un tipo de membresía disponible al cliente.</p>
                            <Link to="/Membership" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                        <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Gestión de pagos</h4>
                            <p>Busca documentos, crea, aplica y desaplica pagos.</p>
                            <Link to="/EmpleadoMenuPagos" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                        <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Crédito y débito</h4>
                            <p>Crea notas de crédito y de débito a los clientes.</p>
                            <Link to="/EmpleadoMenuCreditoDebito" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                        <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Gestión de caja</h4>
                            <p>Abre la caja, realiza el arqueo o gestiona la facturación.</p>
                            <Link to="/EmpleadoMenuCaja" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}
export default UserSettings
