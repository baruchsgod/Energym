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
            h1="Menú de rutinas"
            backUrl="/EmpleadoMenuEntrenador"
            backName="Menú de entrenador"
            currentName="Menú de rutinas"
        />
        <div className="container mt-5 mb-5 fade-in-card">
            <div className="row">
                <div className="col-sm-12 text-center mt-4">
                    <h2 className="section-heading">Opciones del menú de rutinas</h2>
                    <h3 className="section-subheading wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">Un sitio que contiene acceso a la visualización de las rutinas de los clientes, además de su modificación. </h3>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Visualizar rutina</h4>
                        <p>Busca las rutinas que se le han asignado al cliente para visualizarlas.</p>
                        <Link to="/findroutine" ><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Crear/Modificar rutina</h4>
                        <p>Accede a la creación o modificación de las rutinas de los clientes.</p>
                        <Link to="/findcustomer" ><Button type="button" style={{ marginLeft: "120px" }} className="w-50 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}
export default UserSettings
