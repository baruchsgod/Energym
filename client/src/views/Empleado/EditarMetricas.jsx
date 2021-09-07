import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import swal from 'sweetalert';
const CreateEvents = () => {
    const [loading] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const { Id, Fecha, Biceps, Cintura, Piernas, Espalda, GrasaCorporal, Altura, Correo } = (location && location.state) || {};
    const [id] = useState(Id);
    const [email] = useState(Correo);
    const [fecha] = useState(Fecha);
    const [altura, setAltura,] = useState(Altura);
    const [grasaCorporal, setGrasaCorporal] = useState(GrasaCorporal);
    const [biceps, setBiceps] = useState(Biceps);
    const [cintura, setCintura] = useState(Cintura);
    const [piernas, setPiernas] = useState(Piernas);
    const [espalda, setEspalda] = useState(Espalda);
    function editarMetrica(e) {
        e.preventDefault();
        const metrica = { id, email, fecha, altura, grasaCorporal, biceps, cintura, piernas, espalda };
        Axios.post("/editarMetrica", metrica)
            .then(response => {
                if (response.data.icon === "success") {
                    swal(response.data.title, response.data.message, response.data.icon);
                    history.push({ pathname: '/FindMetrics', state: { correo: email } });
                } else {
                    return swal(response.data.title, response.data.message, response.data.icon);
                }
            });
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Editar métricas"
            backUrl="/FindMetrics"
            backName="Buscar métricas"
            currentName="Editar métricas"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3 mt-3">
                            <div className="col-sm-12">
                                <h2 className="para-color mb-3">Reasignación de valores corporales</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={editarMetrica}>
                                    <div className="row">
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
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} disabled={loading} className="btn btn-effect section-button">Reasignar valores</button>
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
