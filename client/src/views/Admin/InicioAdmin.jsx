import React, { useEffect } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import WOW from 'wowjs';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Typewriter from 'typewriter-effect';
const UserSettings = () => {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    return (<div>
        <Header />
        <header className="page-banner-area about-page-banner fade-in-card">
            <div className="section-overlay d-flex">
                <h1 className="m-auto pt-5 wow fadeInUp" style={{ fontSize: "50px", opacity: ".9" }}><Typewriter
                    options={{
                        strings: ['Energym Fitness Center', 'Creando personas fuertes', 'Flexibles y resistentes.'],
                        autoStart: true,
                        loop: true,
                    }}
                /></h1>
            </div>
        </header>
        <div className="container fade-in-card" style={{ marginTop: "120px", marginBottom: "140px" }}>
            <div className="row">
                <div className="row mb-3 mt-3">
                    <div className="col-sm-12">
                        <h2 className="para-color mb-3">Accesos directos</h2>
                    </div>
                    <hr />
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Menú general</h4>
                        <p>Accede a la opción del menú general, la visualización de las valoraciones y comentarios del los clientes.</p>
                        <Link to="/AdminMenuGeneral" ><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Gestión de finanzas</h4>
                        <p>Gestiona las finanzas, con manejo de membresías, de pagos, notas de crédito y débito, además de la gestión de caja.</p>
                        <Link to="/AdminMenuPagos" ><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Gestión de usuarios</h4>
                        <p>Accede a las opciones de la gestión de los usuarios, creando cuentas de administradores y empleados, además de cambiar el estado de estas.</p>
                        <Link to="/AdminMenuUsuarios" ><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Reportes</h4>
                        <p>Accede a las opciones de la visualización de reportes de facturación, facturas vencidas y de caja chica.</p>
                        <Link to="/AdminMenuReporte" ><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
            </div>

        </div>
        <Footer />
    </div>);
}
export default UserSettings
