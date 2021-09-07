import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css/';
import Footer from "../components/Footer";
import Header from "../components/Header";
import '../public/css/style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faSignOutAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import WOW from 'wowjs';
import Typewriter from 'typewriter-effect';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import Axios from "axios";
library.add(faCoffee, faSignOutAlt);
export default function Home() {
    const history = useHistory();
    const [dataEvents, setDataEvents] = useState('');
    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/userData",
        }).then((res) => {
            if (res.data === "") {
                localStorage.clear();
                history.push("/Login");
            }
        });
    }, [history]);
    useEffect(() => {
        try {
            new WOW.WOW({
                live: false
            }).init();
            window.FB.XFBML.parse();
        } catch (error) { }
    }, []);
    useEffect(() => {
        try {
            if (dataEvents.length === 0) {
                fetch('/getRecentEvents')
                    .then(response => response.json())
                    .then(data => setDataEvents(data));
            }
        } catch (error) { }
    }, [dataEvents]);
    function toReservar(evento, e) {
        e.preventDefault();
        history.push({ pathname: '/reserveEvent', state: { _id: evento._id, Titulo: evento.Titulo, Detalle: evento.Detalle, Cupos: evento.Cupos, Fecha: evento.Fecha, Hora: evento.Hora } });
    }
    function eventoAgotado(e) {
        e.preventDefault();
        return swal("Evento sin cupos.", "El evento que quieres reservar no cuenta con cupos disponibles actualmente!", "info");
    }
    return (
        <div>
            <Header />
            <header className="home-banner-area fade-in-card">
                <div id="planet-2" className="planet layer-2"></div>
                <div className="container ">
                    <div className="header-caption text-left">
                        <h1 style={{ marginTop: "130px", fontSize: "70px" }} className="header-caption-heading cd-headline clip is-full-width wow fadeIn rounded" data-wow-duration=".4s" data-wow-delay=".2s">Prepárate para mejorar tu
                            <Typewriter
                                options={{
                                    strings: ['fuerza...', 'flexibilidad...', 'resistencia...', 'salud.'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h1>
                        <p className="wow fadeInUp" data-wow-duration="1.0s" data-wow-delay=".4s">Energym usa un sistema de entrenamiento funcional basado en el acondicionamiento físico general que busca hacer personas fuertes, flexibles y resistentes.</p>
                    </div>
                </div>
            </header>
            <div className="container fade-in-card" style={{ marginTop: "80px", marginBottom: "10px" }}>
                <div className="row">
                    <div className="row mb-3 mt-3">
                        <div className="col-sm-12">
                            <h2 className="para-color mb-3">Accesos directos</h2>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-4 fade-in-card">
                        <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Rutinas asignadas</h4>
                            <p>Accede a la visualización de las rutinas que te han asignado.</p>
                            <Link to="/ListUserRoutines" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4  fade-in-card">
                        <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Avances registrados</h4>
                            <p>Accede a la visualización de los avances que has conseguido.</p>
                            <Link to="/ListUserMetrics" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-4  fade-in-card">
                        <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                            <span className="program-icon">
                                <i className="flaticon-clipboard"></i>
                            </span>
                            <h4 className="programme-heading">Dietas asignadas</h4>
                            <p>Accede a la visualización de las dietas que te han asignado.</p>
                            <Link to="/ListUserDiets" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container fade-in-card" style={{ marginTop: "60px", marginBottom: "10px" }}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row ">
                            <div className="col-sm-12">
                                <h2 className="para-color mb-3">Eventos agregados recientemente</h2>
                            </div>
                            <hr style={{ width: "450px" }} />
                        </div>
                        <div className="row mb-5">
                            {dataEvents.length > 0 ? dataEvents.map((item) => {
                                return <div className="col-sm-10 col-md-10 col-lg-10 fade-in-card mt-4">
                                    <div className="single-program wow fadeIn" data-wow-duration=".5s" data-wow-delay=".1s" style={{ marginBottom: "14px" }}>
                                        <span className="program-icon">
                                            <i className="flaticon-clipboard"></i>
                                        </span>
                                        <h4 className="programme-heading mt-0">{item.Titulo}</h4>
                                        <h6 className="programme-heading mt-0">Cupos disponibles: {item.Cupos}</h6>
                                        <p style={{ marginBottom: "40px" }}>{item.Detalle}</p>
                                        {item.Cupos > 0 ?
                                            <Button onClick={(e) => toReservar(item, e)} type="button" style={{ marginLeft: "95px" }} className="w-50 btn BotonesColor mb-3"><FontAwesomeIcon icon={faArrowRight} /></Button>
                                            :
                                            <Button onClick={(e) => eventoAgotado(e)} type="button" style={{ marginLeft: "95px", backgroundColor: "gray" }} className="w-50 btn BotonesColor mb-3"><FontAwesomeIcon icon={faArrowRight} /></Button>
                                        }
                                    </div>
                                </div>
                            }) : <div className="col-md-10">
                                <h4 className="para-color mt-5">No existen eventos creados actualmente...</h4>
                                <br />
                                <h5 className="para-color mt-1">Visita esta sección frecuentemente para estar al tanto de las novedades en los eventos.</h5>
                            </div>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row mb-4">
                            <div className="col-sm-12">
                                <h2 className="para-color mb-3">Post recientes en Facebook</h2>
                            </div>
                            <hr style={{ width: "470px", marginLeft: "20px" }} />
                        </div>
                        <div className="fb-page" data-href="https://www.facebook.com/energym15" data-tabs="timeline" data-width="500" data-height="560" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/energym15" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/energym15">Energym Fitness Center</a></blockquote></div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Footer />
        </div>
    )
};

