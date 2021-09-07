import React, { useState, useEffect } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as moment from 'moment';
import { useLocation } from "react-router-dom";
import Axios from "axios";
export default function ClientesEvento() {
    const location = useLocation();
    const [dataClientes, setdataClientes] = useState([]);
    const { _id, Titulo } = (location && location.state) || {};
    const [idEvent] = useState(_id);
    const [nombreevento] = useState(Titulo);
    useEffect(() => {
        Axios.get('/getClientesEvento', { params: { id: idEvent } })
            .then(response => setdataClientes(response.data));
    }, [idEvent]);
    const datatable = {
        columns: [
            {
                label: "Correo electrónico del cliente",
                field: "Email",
                width: 400,
                sort: 'desc'
            },
            {
                label: 'Cupos Reservados',
                field: 'Cupos',
                width: 50,
            },
            {
                label: 'Fecha reserva',
                field: 'Fecha',
                width: 50,
            }
        ],
        rows: dataClientes.map((item) => (
            {
                Email: item.Email,
                Cupos: item.CuposReservados,
                Fecha: moment(item.Fecha).format("DD/MM/YYYY")
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de clientes con reserva"
                backUrl="/ListEventsAdmin"
                backName="Lista de eventos"
                currentName="Lista de clientes con reserva"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-12">
                                <h2 className="para-color">Lista clientes con reserva en {nombreevento}</h2>
                            </div>
                            <div className="col-sm-12 mt-4">
                                <MDBDataTableV5
                                    hover entriesOptions={[5, 15, 25]}
                                    entries={5}
                                    pagesAmount={4}
                                    data={datatable}
                                    searchTop
                                    searchBottom={false}
                                    infoLabel={["Mostrando de", "a", "de", "clientes"]}
                                    paginationLabel={["Anterior", "Siguiente"]}
                                    noRecordsFoundLabel="No existen clientes registrados en este evento aún..."
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


