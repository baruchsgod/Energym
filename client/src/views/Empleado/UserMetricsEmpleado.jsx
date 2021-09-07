import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as moment from 'moment';
import { Area } from '@ant-design/charts';
import swal from 'sweetalert';
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from "react-router-dom";
export default function ListMetrics() {
    const location = useLocation();
    const { correo } = (location && location.state) || '';
    const [userMetrics, setUserMetrics] = useState([]);
    const [graficaSelected, setgraficaSelected] = useState("");
    const [correoCliente, setCorreoCliente] = useState(correo || '');
    const [correoActual, setCorreoActual] = useState("");
    const history = useHistory();
    function findCustomer(e) {
        e.preventDefault();
        if (correoCliente !== "") {
            Axios.get("/getUserMetricsEmpleado", {
                params: { correoCliente: correoCliente }
            })
                .then(response => response.data.length > 0 ? actualizarGrafica(response.data) : clienteInexistente());
        }
    }
    const estiloPunto = {
        visible: true,
        size: 5,
        shape: 'circle',
        style: {
            fill: 'white',
            stroke: '#2593fc',
            lineWigth: 2
        }
    }
    const estiloLabel = {
        style: {
            fill: '#aaa'
        }
    }
    const data = userMetrics.map((item) => ({
        Fecha: moment(item.Fecha).format("DD/MM/YYYY"),
        GrasaCorporal: item.GrasaCorporal,
        Biceps: item.Biceps,
        Cintura: item.Cintura,
        Piernas: item.Piernas,
        Espalda: item.Espalda,
        Altura: item.Altura
    }))
    const configGrasa = {
        data,
        xField: 'Fecha',
        yField: 'GrasaCorporal',
        color: '#2593fc',
        point: estiloPunto,
        label: estiloLabel,
        xAxis: { range: [0, 1] }
    }
    const configBiceps = {
        data,
        xField: 'Fecha',
        yField: 'Biceps',
        color: '#2593fc',
        point: estiloPunto,
        label: estiloLabel,
        xAxis: { range: [0, 1] }
    }
    const configCintura = {
        data,
        xField: 'Fecha',
        yField: 'Cintura',
        color: '#2593fc',
        point: estiloPunto,
        label: estiloLabel,
        xAxis: { range: [0, 1] }
    }
    const configPiernas = {
        data,
        xField: 'Fecha',
        yField: 'Piernas',
        color: '#2593fc',
        point: estiloPunto,
        label: estiloLabel,
        xAxis: { range: [0, 1] }
    }
    const configEspalda = {
        data,
        xField: 'Fecha',
        yField: 'Espalda',
        color: '#2593fc',
        point: estiloPunto,
        label: estiloLabel,
        xAxis: { range: [0, 1] }
    }
    const configAltura = {
        data,
        xField: 'Fecha',
        yField: 'Altura',
        color: '#2593fc',
        point: estiloPunto,
        label: estiloLabel,
        xAxis: { range: [0, 1] }
    }
    function actualizarGrafica(datosMetricas) {
        setUserMetrics([]);
        setgraficaSelected("");
        if (datosMetricas.length > 0) {
            setUserMetrics(datosMetricas);
            setCorreoActual(correoCliente);
        }
    }
    function clienteInexistente() {
        setUserMetrics([]);
        setCorreoActual("");
        setCorreoCliente("");
        setgraficaSelected("");
        swal("No se puede encontrar los datos solicitados",
            "El cliente que buscas no existe o no cuenta con métricas registradas actualmente.", "error");
    }
    function switchGrafica(grafica, e) {
        e.preventDefault();
        switch (grafica) {
            case 1:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de la grasa corporal calculada en porcentaje</h4>
                        <Area {...configGrasa} />
                    </div>
                );
                break;
            case 2:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de los bíceps en centímetros</h4>
                        <Area {...configBiceps} />
                    </div>
                );
                break;
            case 3:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de la cintura en centímetros</h4>
                        <Area {...configCintura} />
                    </div>
                );
                break;
            case 4:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de las piernas en centímetros</h4>
                        <Area {...configPiernas} />
                    </div>
                );
                break;
            case 5:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de la espalda en centímetros</h4>
                        <Area {...configEspalda} />
                    </div>
                );
                break;
            case 6:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de la altura calculada en centímetros</h4>
                        <Area {...configAltura} />
                    </div>
                );
                break;
            default:
                break;
        }
    }
    function toAsignarMetricas(correoCliente, e) {
        e.preventDefault();
        history.push({ pathname: '/CrearMetricas', state: { correo: correoCliente } });
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Historial de medidas corporales"
                backUrl="/EmpleadoMenuMetricas"
                backName="Menú de métricas"
                currentName="Historial de medidas corporales"
            />
            <section className="busqueda-caja-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <form onSubmit={findCustomer}>
                                <div className="col-md-12 p-3 ml-4" >
                                    <div className="col-md-12">
                                        <h3 className="fw-bold text-center para-color ">Ingrese el correo electrónico del cliente</h3>
                                    </div>
                                    <div className="col-md-12 ml-4">
                                        <div className="col-md-7 float-left mr-0 pr-0">
                                            <input type="email" placeholder="Correo electrónico..." className="form-control mt-4 inputCenter" value={correoCliente} onChange={(e) => setCorreoCliente(e.target.value)} required />
                                        </div>
                                        <div className="col-sm-1 float-left ml-3 pl-0">
                                            <div className="contact-sub-btn mt-4">
                                                <button type="submit" style={{ padding: "5px", width: "100px", backgroundColor: "#e98808" }} className="btn btn-effect section-button"><FontAwesomeIcon icon={faSearch} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-6 ">
                            <h3 className="para-color mb-5 mt-2 fade-in-card">Historial de las medidas que se han registrado {correoActual !== "" ? "para el cliente " + correoActual + "." : " en los clientes."}</h3>
                            {correoActual !== "" ? <h4 className="para-color mt-4 fade-in-card">Deseas ingresar sus nuevos avances?</h4> : <h5 className="para-color mt-4">Busca algún cliente en la caja de texto para ver sus avances.</h5>}
                            {correoActual !== "" ? <Button onClick={(e) => toAsignarMetricas(correoActual, e)} type="button" className="btn BotonesColorCrear mt-2 fade-in-card">Presiona aquí</Button> : ""}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 mt-5 fade-in-card">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Tabla con los valores de las métricas registradas</h2>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <Button onClick={(e) => switchGrafica(1, e)} type="button" className="BotonesGraficas">Grasa Corporal</Button>
                            <Button onClick={(e) => switchGrafica(2, e)} type="button" className="BotonesGraficas">Bíceps</Button>
                            <Button onClick={(e) => switchGrafica(3, e)} type="button" className="BotonesGraficas">Cintura</Button>
                            <Button onClick={(e) => switchGrafica(4, e)} type="button" className="BotonesGraficas">Piernas</Button>
                            <Button onClick={(e) => switchGrafica(5, e)} type="button" className="BotonesGraficas">Espalda</Button>
                            <Button onClick={(e) => switchGrafica(6, e)} type="button" className="BotonesGraficas">Altura</Button>
                        </div>
                        <div className="col-sm-12 mt-4 fade-in-card" >
                            {graficaSelected ? graficaSelected :
                                <div style={{ height: "200px" }}>
                                    <h4 className="para-color">Historial de la grasa corporal calculada en porcentaje</h4>
                                    <Area {...configGrasa} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    );
}


