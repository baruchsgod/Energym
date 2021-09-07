import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as moment from 'moment';
import { Area } from '@ant-design/charts';
export default function ListMetrics() {
    const [userMetrics, setUserMetrics] = useState([]);
    const [graficaSelected, setgraficaSelected] = useState("");
    useEffect(() => {
        if (userMetrics.length === 0) {
            fetch('/listUserMetrics')
                .then(response => response.json())
                .then(data => setUserMetrics(data));
        }
    });
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
    function switchGrafica(grafica, e) {
        e.preventDefault();
        switch (grafica) {
            case 1:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de tu grasa corporal calculada en porcentaje</h4>
                        <Area {...configGrasa} />
                    </div>
                );
                break;
            case 2:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de tus bíceps en centímetros</h4>
                        <Area {...configBiceps} />
                    </div>
                );
                break;
            case 3:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de tu cintura en centímetros</h4>
                        <Area {...configCintura} />
                    </div>
                );
                break;
            case 4:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de tus piernas en centímetros</h4>
                        <Area {...configPiernas} />
                    </div>
                );
                break;
            case 5:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de tu espalda en centímetros</h4>
                        <Area {...configEspalda} />
                    </div>
                );
                break;
            case 6:
                setgraficaSelected(
                    <div style={{ height: "200px" }}>
                        <h4 className="para-color">Historial de tu altura calculada en centímetros</h4>
                        <Area {...configAltura} />
                    </div>
                );
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Historial de medidas corporales"
                backUrl="/UserMenu"
                backName="Menú del gym"
                currentName="Historial de medidas corporales"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Gráficas con el historial de las medidas que has logrado</h2>
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
                        <div className="col-sm-12 mt-4" >
                            {graficaSelected ? graficaSelected :
                                <div style={{ height: "200px" }}>
                                    <h4 className="para-color">Historial de tu grasa corporal calculada en porcentaje</h4>
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


