import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
const CreateEvents = () => {
    const [loading] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [detalle, setDetalle] = useState('');
    const [cupos, setCupos] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    function createEvents(e) {
        e.preventDefault();
        const evento = { titulo, detalle, cupos, fecha, hora };
        Axios.post("/createEvent", evento)
            .then(response => {
                if (response.data.icon === "success") {
                    setTitulo("");
                    setDetalle("");
                    setFecha("");
                    setCupos("");
                    setHora("");
                }
                return swal(response.data.title, response.data.message, response.data.icon);
            });
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Creación de eventos"
            backUrl="/ListEventsAdmin"
            backName="Lista de eventos"
            currentName="Creación de eventos"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Creación de eventos especiales para los clientes</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={createEvents}>
                                    <div className="row">
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label>Título<span>*</span></label>
                                                <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} id="titulo" name="titulo" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label >Cupos<span>*</span></label>
                                                <input type="number" min="1" max="250" className="form-control" value={cupos} onChange={(e) => setCupos(e.target.value)} id="cupos" name="cupos" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label >Fecha<span>*</span></label>
                                                <input type="date" className="form-control" value={fecha} placeholder="" onChange={(e) => setFecha(e.target.value)} name="fecha" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label >Hora<span></span></label>
                                                <select name="hora" className="form-control custom-select" value={hora} onChange={(e) => setHora(e.target.value)} required>
                                                    <option value="">Selecciona la hora</option>
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
                                                <input type="text" className="form-control" value={detalle} onChange={(e) => setDetalle(e.target.value)} name="detalle" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} disabled={loading} className="btn btn-effect section-button">Crear evento</button>
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
export default CreateEvents
