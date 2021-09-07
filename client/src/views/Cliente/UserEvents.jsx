import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as moment from 'moment';
import swal from 'sweetalert';
import Axios from "axios";
export default function ListEvents() {
    const [userEvents, setUserEvents] = useState([]);
    useEffect(() => {
        if (userEvents.length === 0) {
            fetch('/listUserEvents')
                .then(response => response.json())
                .then(data => setUserEvents(data));
        }
    });
    function eliminar(idEvent, cuposReservados, e) {
        e.preventDefault();
        const reserva = { idEvent, cuposReservados };
        swal({
            title: "Estás seguro?",
            text: "Una vez eliminado tus cupos pueden perderse para siempre!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.post("/borrarReserva", reserva)
                        .then(response => {
                            if (response.data.icon === 'success')
                                setUserEvents([]);
                            return swal("La reserva al evento fue eliminada correctamente!", {
                                icon: "success"
                            });
                        });
                } else {

                }
            });
    }
    function verDetalle(titulo, detalleEvento, e) {
        e.preventDefault();
        return swal(`Detalle del evento: ${titulo}`, detalleEvento);
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
                label: 'Fecha',
                field: 'Fecha',
                width: 50,
            },
            {
                label: 'Cupos reservados',
                field: 'Cupos',
                width: 50,
            },

            {
                label: 'Hora',
                field: 'Hora',
                width: 50,
            },
            {
                label: 'Detalle del evento',
                field: 'Detalle',
                width: 50,
            },
            {
                label: 'Eliminar reserva',
                field: 'Eliminar',
                width: 50,
            }
        ],
        rows: userEvents.map((item) => (
            {
                Titulo: item.EventoResumen.Titulo,
                Fecha: moment(item.EventoResumen.Fecha).format("DD/MM/YYYY"),
                Cupos: item.CuposReservados,
                Hora: item.EventoResumen.Hora,
                Detalle: <Button onClick={(e) => verDetalle(item.EventoResumen.Titulo, item.EventoResumen.Detalle, e)} type="button" className="BotonesColor"><FontAwesomeIcon icon={faEye} /></Button>,
                Eliminar: <Button onClick={(e) => eliminar(item.id, item.CuposReservados, e)} type="button" className="BotonesColorEliminar"><FontAwesomeIcon icon={faTrashAlt} /></Button>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de reservas"
                backUrl="/UserMenu"
                backName="Menú del gym"
                currentName="Lista de reservas"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Lista de las reservas que has realizado</h2>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="col-sm-12 mt-4">
                                <MDBDataTableV5
                                    hover entriesOptions={[5, 15, 25]}
                                    entries={5}
                                    pagesAmount={4}
                                    data={datatable}
                                    searchTop
                                    searchBottom={false}
                                    infoLabel={["Mostrando de", "a", "de", "reservas"]}
                                    paginationLabel={["Anterior", "Siguiente"]}
                                    noRecordsFoundLabel="No has realizado ninguna reserva..."
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


