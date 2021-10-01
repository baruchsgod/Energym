import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
const CreateEvents = () => {
    const [loading] = useState(false);
    const history = useHistory();
    const [descripcion, setDescripcion] = useState('');
    const [calificacion, setCalificacion] = useState(0);
    const [userId] = useState(localStorage.getItem('userId') || false);
    const [correo] = useState(localStorage.getItem('correo') || false);
    function crearRetroalimentacion(e) {
        e.preventDefault();
        if (calificacion >= 1 && calificacion <= 5 && userId && correo) {
            const datoRetroalimentacion = { userId, correo, descripcion, calificacion };
            Axios.post("https://energymproject.herokuapp.com/feedback", datoRetroalimentacion)
                .then(response => {
                    if (response.data.icon === "success") history.push("/ListUserFeedback");
                    return swal(response.data.title, response.data.message, response.data.icon);
                });
        } else {
            swal("Error", "Verifica la calificación que ingresaste", "error");
        }
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Creación de retroalimentación"
            backUrl="/"
            backName="Inicio"
            currentName="Creación de retroalimentación"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row">
                            <div className="row mb-3 mt-3">
                                <div className="col-sm-12">
                                    <h2 className="para-color mb-3">Creación de comentarios de retroalimentación</h2>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={crearRetroalimentacion}>
                                    <div className="row">
                                        <div className="col-sm-12 mt-3">
                                            <div className="form-group">
                                                <label>Descripción de la retroalimentación<span>*</span></label>
                                                <textarea type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} id="descripcion" name="descripcion" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 mt-3">
                                            <div className="form-group">
                                                <label >Calificación<span>*</span></label>
                                                <select name="hora" className="form-control custom-select" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} required>
                                                    <option value="0">Selecciona la calificación</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} disabled={loading} className="btn btn-effect section-button">Crear retroalimentación</button>
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
