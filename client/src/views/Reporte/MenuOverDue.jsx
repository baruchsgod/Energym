import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function MenuOverDue(){

    return(
        <div>
            <Header/>
            <HeaderStatus
            h1="Menú de reporte transacciones vencidas"
            backUrl="/AdminMenuReporte"
                backName="Menú de reportes"
            currentName="Menú de reporte transacciones vencidas"
            />
            <div className="container mt-5 mb-5 fade-in-card">
                <div className="row">
                    <div className="col-sm-12 text-center mt-4">
                        <h2 className="section-heading">Opciones del menú de reporte de facturas vencidas</h2>
                        <h3 className="section-subheading wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">Seleccione el tipo de reporte de facturas vencidas según el tipo membresía en uso</h3>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="row mb-5">
                        <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                            <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                                <span className="program-icon">
                                    <i className="flaticon-clipboard"></i>
                                </span>
                                <h4 className="programme-heading">Mensual</h4>
                                <p>Reporte de Facturas vencidas mensuales.</p>
                                <Link to="/Report/Overdue" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                            <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                                <span className="program-icon">
                                    <i className="flaticon-clipboard"></i>
                                </span>
                                <h4 className="programme-heading">Trimestral</h4>
                                <p>Reporte de Facturas vencidas trimestrales.</p>
                                <Link to="/Report/OverdueQuarter" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                            <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                                <span className="program-icon">
                                    <i className="flaticon-clipboard"></i>
                                </span>
                                <h4 className="programme-heading">Semestral</h4>
                                <p>Reporte de Facturas vencidas semestrales.</p>
                                <Link to="/Report/OverdueSemester" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3 mb-5 fade-in-card">
                            <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                                <span className="program-icon">
                                    <i className="flaticon-clipboard"></i>
                                </span>
                                <h4 className="programme-heading">Anual</h4>
                                <p>Reporte de Facturas vencidas anuales.</p>
                                <Link to="/Report/OverdueAnnual" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}