import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import swal from 'sweetalert';
import * as moment from 'moment';
const ReserveEvent = () => {
    const history = useHistory();
    const location = useLocation();
    const { _id, Titulo, Detalle, Cupos, Fecha, Hora } = (location && location.state) || {};
    const [titulo] = useState(Titulo);
    const [detalle] = useState(Detalle);
    const [cupos] = useState(Cupos);
    const [cuposReserva, setCuposReserva] = useState('');
    const [fecha] = useState(Fecha);
    const [hora] = useState(Hora);
    const [idEvent] = useState(_id);
    function crearReserva(e) {
        e.preventDefault();
        const reserva = { idEvent, cuposReserva };
        if (cuposReserva >= 1 && cuposReserva <= 5) {
            Axios.post("/reservaEventoPost", reserva)
                .then(response => {
                    if (response.data.icon === 'success') history.push("/ListUserEvents");
                    return swal(response.data.title, response.data.message, response.data.icon);
                });
        } else {
            return swal("Error", "Revisa la cantidad de cupos que ingresaste.", "error");
        }
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Reserva de evento"
            backUrl="/"
            backName="Inicio"
            currentName="Reserva de evento"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row bmi-wrapper ">
                    <div className="col-sm-6">
                        <div className="bmi-box">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Información del evento</h2>
                                    </div>
                                    <hr style={{width: "80%"}}/>
                                </div>
                            </div>
                            <div className="col-sm-12 mt-3">
                                <h5>Nombre del evento</h5>
                                <p style={{ margin: 0, padding: 0 }}>{titulo}</p>
                            </div>
                            <div className="col-sm-3 mt-2">
                                <h5>Fecha</h5>
                                <p style={{ margin: 0, padding: 0 }}>{moment(fecha).format("DD/MM/YYYY")}</p>
                            </div>
                            <div className="col-sm-3 mt-2">
                                <h5>Hora</h5>
                                <p style={{ margin: 0, padding: 0 }}>{hora}</p>
                            </div>
                            <div className="col-12 mt-2">
                                <h5>Descripción del evento</h5>
                                <p style={{ margin: 0, padding: 0, textAlign: 'justify' }}>{detalle}</p>
                            </div>
                            <div className="col-sm-12 mt-2">
                                <h5>Cantidad de cupos disponibles</h5>
                                <p style={{ margin: 0, padding: 0 }}>{cupos} cupos</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="bmi-box">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Cantidad de cupos por reservar</h2>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <form onSubmit={crearReserva}>
                                <div className="row">
                                    <div className="col-sm-12 mt-3">
                                        <div className="form-group">
                                            <label htmlFor="cus_name">Cupos<span> *</span></label>
                                            <select className="form-control custom-select" onChange={(e) => setCuposReserva(e.target.value)} required>
                                                <option value="0">Selecciona la cantidad:</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div className="contact-sub-btn">
                                            <button type="submit" style={{ padding: "7px", width: "180px" }} className="btn btn-effect section-button">Reservar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>);
}
export default ReserveEvent
