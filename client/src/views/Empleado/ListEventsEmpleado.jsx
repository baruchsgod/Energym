import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { useHistory } from "react-router-dom";
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
    function toClientes(eventId, nombreEvento, e) {
        e.preventDefault();
        history.push({ pathname: '/ClientesEvento', state: { _id: eventId, Titulo: nombreEvento } });
    }
    function toEdit(evento, e) {
        e.preventDefault();
        history.push({ pathname: '/EditEvents', state: { _id: evento._id, Titulo: evento.Titulo, Detalle: evento.Detalle, Cupos: evento.Cupos, Fecha: evento.Fecha, Hora: evento.Hora } });
    }
    function toCreate(e) {
        e.preventDefault();
        history.push({ pathname: '/CreateEvents' });
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
                width: 200,
            },
            {
                label: 'Fecha',
                field: 'Fecha',
                width: 200,
            },
            {
                label: 'Hora',
                field: 'Hora',
                width: 200,
            },
            {
                label: 'Editar',
                field: 'Editar',
                width: 200,
            },
            {
                label: 'Clientes registrados',
                field: 'Clientes',
                width: 200,
            }],
        rows: dataEvents.map((item) => (
            {
                Titulo: item.Titulo,
                Cupos: item.Cupos,
                Fecha: moment(item.Fecha).format("DD/MM/YYYY"),
                Hora: item.Hora,
                Editar: <Button onClick={(e) => toEdit(item, e)} className="BotonesColorModificar" type="button" ><FontAwesomeIcon icon={faEdit} /></Button>,
                Clientes: <Button onClick={(e) => toClientes(item._id, item.Titulo, e)} className="BotonesColor" type="button"><FontAwesomeIcon icon={faUserFriends} /></Button>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de eventos"
                backUrl="/EmpleadoMenuGeneral"
                backName="Menú general"
                currentName="Lista de eventos"
            />
            <section className="calculate-bmi-area fade-in-card" style={{marginBottom: "100px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <h2 className="para-color">Lista de eventos vigentes creados</h2>
                        </div>
                        <div className="col-sm-3 ml-5">
                            <Button className="BotonesColorCrear" onClick={(e) => toCreate(e)} type="button" ><FontAwesomeIcon icon={faPlus} /> Crear evento</Button>
                        </div>
                        <div className="col-sm-12">
                            <hr/>
                            <div className="col-sm-12 mt-5">
                                <MDBDataTableV5
                                    hover entriesOptions={[5, 15, 25]}
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
            </section>
            <Footer />
        </div >
    );
}


