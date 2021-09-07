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
                <div className="col-sm-6 col-md-6 col-lg-4 mb-2 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Menú general</h4>
                        <p>Accede a las opciones del menú general que posee gestión de eventos y de clientes.</p>
                        <Link to="/EmpleadoMenuGeneral" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 mb-2 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Menú de entrenador</h4>
                        <p>Gestiona las rutinas, dietas y las métricas con los avances de los clientes.</p>
                        <Link to="/EmpleadoMenuEntrenador" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 mb-2 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Menú de recepcionista</h4>
                        <p>Accede a las opciones de membresía, pagos, crédito/débito y gestión de caja.</p>
                        <Link to="/EmpleadoMenuRecepcionista" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
            </div>

        </div>
        <Footer />
    </div>);
}
export default UserSettings
