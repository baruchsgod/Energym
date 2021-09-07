import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import swal from 'sweetalert'
import HeaderStatus from "../../components/HeaderStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MDBDataTableV5 } from 'mdbreact';
import { useHistory, useLocation } from "react-router-dom";
import * as moment from 'moment';
export default function FindMetrics() {
    const history = useHistory();
    const location = useLocation();
    const { correo } = (location && location.state) || '';
    const [email, setEmail] = useState(correo);
    const [emailState] = useState(correo);
    const [userMetrics, setUserMetrics] = useState([]);

    function findCustomerButton(e) {
        e.preventDefault();
        Axios.get("/getUserMetricsEmpleado", {
            params: { correoCliente: email }
        })
            .then((res) => {
                if (res.data.icon === "error") return swal("Error!", "El cliente no existe o su cuenta se encuentra inactiva.", "error");
                if (res.data.length > 0) {
                    setUserMetrics(res.data);
                } else {
                    return swal("Error", "El cliente aún no cuenta con métricas registradas.", "error");
                }
            })
    }
    function editMetric(item, e) {
        e.preventDefault();
        history.push({
            pathname: '/EditarMetricas', state: {
                Id: item._id, Fecha: item.Fecha, Biceps: item.Biceps, Cintura: item.Cintura, Piernas: item.Piernas,
                Espalda: item.Espalda, GrasaCorporal: item.GrasaCorporal, Altura: item.Altura, Correo: email
            }
        });
    }
    function toVerMetricas(correoCliente, e) {
        e.preventDefault();
        history.push({ pathname: '/ListUserMetricsEmpleado', state: { correo: correoCliente } });
    }
    const datatable = {
        columns: [
            {
                label: "Fecha",
                field: "Fecha",
                width: 200,
                sort: 'desc'
            },
            {
                label: "Bíceps",
                field: "Biceps",
                width: 100
            },
            {
                label: 'Cintura',
                field: 'Cintura',
                width: 100,
            },
            {
                label: 'Piernas',
                field: 'Piernas',
                width: 100,
            },
            {
                label: 'Espalda',
                field: 'Espalda',
                width: 100,
            },
            {
                label: 'Grasa Corporal',
                field: 'GrasaCorporal',
                width: 100,
            }, {
                label: 'Editar métricas',
                field: 'Editar',
                width: 100,
            }
        ],
        rows: userMetrics.map((item) => (
            {
                Fecha: moment(item.Fecha).format("DD/MM/YYYY"),
                Biceps: item.Biceps + " cms",
                Cintura: item.Cintura + " cms",
                Piernas: item.Piernas + " cms",
                Espalda: item.Espalda + " cms",
                GrasaCorporal: item.GrasaCorporal + " %",
                Editar: <Button onClick={(e) => editMetric(item, e)} type="button" className="BotonesColorModificar"><FontAwesomeIcon icon={faEdit} /></Button>,
            }))
    };
    return (<div>
        <Header />
        <HeaderStatus
            h1="Modificar métricas"
            backUrl="/EmpleadoMenuMetricas"
            backName="Menú de métricas"
            currentName="Modificar métricas"
        />
        <div className="section-overlay fade-in-card" style={{ marginBottom: "220px" }}>
            <div className="container">
                <div className="row mt-5">
                    <form onSubmit={findCustomerButton}>
                        <div className="col-md-12 p-3 mt-5 ml-4" >
                            <div className="offset-md-2 col-md-7 ">
                                <h3 className="fw-bold text-center para-color ">Buscar métricas del cliente</h3>
                            </div>
                            <div className="col-md-12 ml-4">
                                <div className="offset-md-2 col-md-6 float-left mr-0 pr-0">
                                    <input type="email" placeholder="Correo electrónico..." className="form-control mt-4 inputCenter" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="col-sm-1 float-left ml-3 pl-0">
                                    <div className="contact-sub-btn mt-4">
                                        <button type="submit" style={{ padding: "5px", width: "100px", backgroundColor: "#e98808" }} className="btn btn-effect section-button"><FontAwesomeIcon icon={faSearch} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {emailState ?
                        <div className="contact-sub-btn w-100 text-center mt-5 fade-in-card">
                            <Button onClick={(e) => toVerMetricas(email, e)} style={{ padding: "10px", minWidth: "280px", backgroundColor: "#044c92e6" }} type="button" className="btn  section-button mt-3">Ver avances de {email}</Button>
                        </div> : ""}
                    {userMetrics.length > 0 ?
                        <div >
                            <div className="row">
                                <div className="col-sm-12 mt-5 fade-in-card">
                                    <div className="row mb-4">
                                        <div className="col-sm-12">
                                            <h2 className="para-color mb-3">Resultado de la búsqueda</h2>
                                        </div>
                                        <hr />
                                    </div>
                                    <div className="col-sm-12 mt-4">
                                        <div className="bmi-box">
                                            <MDBDataTableV5
                                                hover entriesOptions={[3, 10, 15]}
                                                entries={3}
                                                pagesAmount={4}
                                                data={datatable}
                                                searchTop
                                                searchBottom={false}
                                                infoLabel={["Mostrando de", "a", "de", "métricas"]}
                                                paginationLabel={["Anterior", "Siguiente"]}
                                                noRecordsFoundLabel="No te han asigando ninguna métrica aún..."
                                                searchLabel="Buscar"
                                                entriesLabel="Filas por página"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div><br /><br /><br /><br /><br /></div>
                    }
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}