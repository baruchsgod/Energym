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
            h1="Menú del gym"
            backUrl="/"
            backName="Inicio"
            currentName="Menú del gym"
        />
        <div className="container mt-5 mb-5 fade-in-card">
            <div className="row">
                <div className="col-sm-12 text-center mt-4">
                    <h2 className="section-heading">Opciones del menú del gym</h2>
                    <h3 className="section-subheading wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">Un sitio que contiene el acceso a las dietas asignadas, así como rutinas, avances, reservas y las valoraciones que has creado. </h3>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-sm-6 col-md-6 col-lg-4 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Dietas asignadas</h4>
                        <p>Accede a la visualización de las dietas que te han asignado.</p>
                        <Link to="/ListUserDiets" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Rutinas asignadas</h4>
                        <p>Accede a la visualización de las rutinas que te han asignado.</p>
                        <Link to="/ListUserRoutines" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Avances registrados</h4>
                        <p>Accede a la visualización de los avances que has conseguido.</p>
                        <Link to="/ListUserMetrics" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="offset-md-2 col-sm-6 col-md-6 col-lg-4 mb-5 fade-in-card float-left ">
                        <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Reservas a eventos</h4>
                            <p>Accede a las reservas de los eventos especiales.</p>
                            <Link to="/ListUserEvents" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4 mb-5 fade-in-card float-left">
                        <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Valoraciones</h4>
                            <p>Accede a las valoraciones que has enviado a Energym.</p>
                            <Link to="/ListUserFeedback" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}
export default UserSettings
