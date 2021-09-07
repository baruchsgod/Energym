import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer";
import HeaderStatus from "../../components/HeaderStatus";
import Header from "../../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as moment from 'moment';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
export default function ListEvents() {
    const history = useHistory();
    const [dataEvents, setDataEvents] = useState([]);
    useEffect(() => {
        if (dataEvents.length === 0) {
            fetch('/listEvents')
                .then(response => response.json())
                .then(data => setDataEvents(data));
        }
    }, [dataEvents]);
    function toReservar(evento, e) {
        e.preventDefault();
        history.push({ pathname: '/reserveEvent', state: { _id: evento._id, Titulo: evento.Titulo, Detalle: evento.Detalle, Cupos: evento.Cupos, Fecha: evento.Fecha, Hora: evento.Hora } });
    }
    function eventoAgotado(e) {
        e.preventDefault();
        return swal("Evento sin cupos.", "El evento que quieres reservar no cuenta con cupos disponibles actualmente!", "info");
    }
    const datatable = {
        columns: [
            {
                label: "Nombre del evento",
                field: "Titulo",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Cupos',
                field: 'Cupos',
                width: 50,
            },
            {
                label: 'Fecha',
                field: 'Fecha',
                width: 50,
            },
            {
                label: 'Hora',
                field: 'Hora',
                width: 50,
            },
            {
                label: 'Reservar',
                field: 'Reserva',
                width: 200,
            }
        ],
        rows: dataEvents.map((item) => (
            {
                Titulo: item.Titulo,
                Cupos: item.Cupos,
                Fecha: moment(item.Fecha).format("DD/MM/YYYY"),
                Hora: item.Hora,
                Reserva: item.Cupos > 0 ?
                    <Button onClick={(e) => toReservar(item, e)} type="button" className="BotonesColorCrear"><FontAwesomeIcon icon={faCalendarPlus} /></Button>
                    :
                    <Button onClick={(e) => eventoAgotado(e)} type="button" className="BotonesColorCrearDis"><FontAwesomeIcon icon={faCalendarTimes} /></Button>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de eventos"
                backUrl="/"
                backName="Inicio"
                currentName="Lista de eventos"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Lista de eventos especiales disponibles</h2>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="col-sm-12 mt-4">
                                <div className="bmi-box">
                                    <MDBDataTableV5
                                        hover entriesOptions={[5, 20, 25]}
                                        entries={5}
                                        pagesAmount={4}
                                        data={datatable}
                                        searchTop
                                        searchBottom={false}
                                        infoLabel={["Mostrando de", "a", "de", "eventos"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No existen eventos para mostrar..."
                                        searchLabel="Buscar"
                                        entriesLabel="Filas por página"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    );
}


