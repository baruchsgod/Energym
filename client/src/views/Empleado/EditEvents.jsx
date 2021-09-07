import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import swal from 'sweetalert';
import * as moment from 'moment';
const EditEvents = () => {
    const [loading] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const { _id, Titulo, Detalle, Cupos, Fecha, Hora } = (location && location.state) || {};
    const [id] = useState(_id);
    const [TituloE, setTituloE] = useState(Titulo);
    const [DetalleE, setDetalle] = useState(Detalle);
    const [CuposE, setCupos] = useState(Cupos);
    const [FechaE, setFecha] = useState(moment(Fecha).format("YYYY-MM-DD")); 
    const [HoraE, setHora] = useState(Hora);
    function editEvents(e) {
        e.preventDefault();
        const evento = { id, TituloE, DetalleE, CuposE, FechaE, HoraE };
        Axios.post("/editEvent", evento)
            .then(response => {
                if (response.data.icon === "success") {
                    swal(response.data.title, response.data.message, response.data.icon);
                    return history.push("/ListEventsAdmin");
                } else {
                    return swal(response.data.title, response.data.message, response.data.icon);
                }
            });
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Edición de eventos"
            backUrl="/ListEventsAdmin"
            backName="Lista de eventos"
            currentName="Edición de eventos"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2 className="para-color">Edición del de evento especial {TituloE}</h2>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={editEvents}>
                                    <div className="row">
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label>Título<span>*</span></label>
                                                <input type="text" className="form-control" value={TituloE} onChange={(e) => setTituloE(e.target.value)} id="TituloE" name="TituloE" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label >Cupos<span>*</span></label>
                                                <input type="number" min="1" max="500" className="form-control" value={CuposE} onChange={(e) => setCupos(e.target.value)} id="CuposE" name="CuposE" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label >Fecha<span>*</span></label>
                                                <input type="date" className="form-control" value={FechaE} placeholder="" onChange={(e) => setFecha(e.target.value)} name="FechaE" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label >Hora<span></span></label>
                                                <select name="HoraE" className="form-control custom-select" value={HoraE} onChange={(e) => setHora(e.target.value)} required>
                                                    <option value="">Selecciona la HoraE</option>
                                                    <option value="7:00AM">7:00AM</option>
                                                    <option value="8:00AM">8:00AM</option>
                                                    <option value="9:00AM">9:00AM</option>
                                                    <option value="10:00AM">10:00AM</option>
                                                    <option value="11:00AM">11:00AM</option>
                                                    <option value="12:00MD">12:00MD</option>
                                                    <option value="1:00PM">1:00PM</option>
                                                    <option value="2:00PM">2:00PM</option>
                                                    <option value="3:00PM">3:00PM</option>
                                                    <option value="4:00PM">4:00PM</option>
                                                    <option value="5:00PM">5:00PM</option>
                                                    <option value="6:00PM">6:00PM</option>
                                                    <option value="7:00PM">7:00PM</option>
                                                    <option value="8:00PM">8:00PM</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 mt-3">
                                            <div className="form-group">
                                                <label >Detalle<span>*</span></label>
                                                <input type="text" className="form-control" value={DetalleE} onChange={(e) => setDetalle(e.target.value)} name="Detalle" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} disabled={loading} className="btn btn-effect section-button">Editar evento</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>);
}
export default EditEvents
