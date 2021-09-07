import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import swal from 'sweetalert';
import { Button } from "react-bootstrap";
const CreateEvents = () => {
    const [loading] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const { correo } = (location && location.state) || '';
    const [email, setEmail] = useState(correo);
    const [emailToGraphics, setEmailToGraphics] = useState('');
    const [fecha, setFecha] = useState('');
    const [altura, setAltura,] = useState('');
    const [grasaCorporal, setGrasaCorporal] = useState('');
    const [biceps, setBiceps] = useState('');
    const [cintura, setCintura] = useState('');
    const [piernas, setPiernas] = useState('');
    const [espalda, setEspalda] = useState('');
    function createEvents(e) {
        e.preventDefault();
        const metrica = { email, fecha, altura, grasaCorporal, biceps, cintura, piernas, espalda };
        Axios.post("/crearMetrica", metrica)
            .then(response => {
                if (response.data.icon === "success") {
                    setEmailToGraphics(email);
                    setEmail("");
                    setFecha("");
                    setAltura("");
                    setGrasaCorporal("");
                    setBiceps("");
                    setCintura("");
                    setPiernas("");
                    setEspalda("");
                    return swal(response.data.title, response.data.message, response.data.icon);
                } else {
                    return swal(response.data.title, response.data.message, response.data.icon);
                }
            });
    }
    function toVerMetricas(correoCliente, e) {
        e.preventDefault();
        history.push({ pathname: '/ListUserMetricsEmpleado', state: { correo: correoCliente } });
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Creación de métricas"
            backUrl="/EmpleadoMenuMetricas"
            backName="Menú de métricas"
            currentName="Creación de métricas"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Asignación de valores corporales</h2>
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
                                        <div className="col-sm-8 mt-3">
                                            <div className="form-group">
                                                <label>Correo electrónico del cliente<span>*</span></label>
                                                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label >Fecha<span>*</span></label>
                                                <input type="date" className="form-control" value={fecha} placeholder="" onChange={(e) => setFecha(e.target.value)} name="fecha" required />
                                            </div>
                                        </div>

                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label >Altura (cms) <span>*</span></label>
                                                <input type="number" min="1" max="500" className="form-control" value={altura} onChange={(e) => setAltura(e.target.value)} id="altura" name="altura" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label >Grasa Corporal (%) <span>*</span></label>
                                                <input type="number" min="1" max="500" className="form-control" value={grasaCorporal} onChange={(e) => setGrasaCorporal(e.target.value)} id="grasaCorporal" name="grasaCorporal" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label >Bíceps (cms) <span>*</span></label>
                                                <input type="number" min="1" max="500" className="form-control" value={biceps} onChange={(e) => setBiceps(e.target.value)} id="biceps" name="biceps" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label >Cintura (cms) <span>*</span></label>
                                                <input type="number" min="1" max="500" className="form-control" value={cintura} onChange={(e) => setCintura(e.target.value)} id="cintura" name="cintura" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label >Piernas (cms) <span>*</span></label>
                                                <input type="number" min="1" max="500" className="form-control" value={piernas} onChange={(e) => setPiernas(e.target.value)} id="piernas" name="piernas" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label >Espalda (cms) <span>*</span></label>
                                                <input type="number" min="1" max="500" className="form-control" value={espalda} onChange={(e) => setEspalda(e.target.value)} id="espalda" name="espalda" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} disabled={loading} className="btn btn-effect section-button">Asignar valores</button>
                                            </div>
                                        </div>
                                        {emailToGraphics !== '' ? <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-3">
                                                <Button onClick={(e) => toVerMetricas(emailToGraphics, e)} style={{ padding: "10px", minWidth: "280px", backgroundColor: "#044c92e6" }} type="button" className="btn  section-button mt-3">Ver avances de {emailToGraphics}</Button>
                                            </div>
                                        </div> : ""}
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
