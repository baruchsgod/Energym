import React, { useState, useEffect } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as moment from 'moment';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
export default function ListEvents() {
    const [userEvents, setUserEvents] = useState([]);
    useEffect(() => {
        if (userEvents.length === 0) {
            fetch('/listUserDocuments')
                .then(response => response.json())
                .then(data => setUserEvents(data));
        }
    });
    const datatable = {
        columns: [
            {
                label: "# Documento",
                field: "NumDoc",
                width: 50,
                sort: 'desc'
            },
            {
                label: 'Tipo',
                field: 'Tipo',
                width: 50,
            },
            {
                label: 'Fecha',
                field: 'Fecha',
                width: 50,
            },
            {
                label: 'Estado',
                field: 'Estado',
                width: 50,
            },
            {
                label: 'Monto',
                field: 'Monto',
                width: 50,
            },
            {
                label: 'IVA',
                field: 'IVA',
                width: 50,
            },
            {
                label: 'Detalle del documento',
                field: 'Detalle',
                width: 50,
            },
        ],
        rows: userEvents.map((item) => (
            {
                NumDoc: item.numDocumento,
                Tipo: item.tipoDoc,
                Fecha: moment(item.Fecha).format("DD/MM/YYYY"),
                Estado: item.estado,
                Monto: item.monto.toFixed(0),
                IVA: item.iva.toFixed(0),
                Detalle: <Link to={{ pathname: "/Document/Find/Print", state: { _id: item._id, monto: item.monto, numDocumento: item.numDocumento, usuario: item.usuario, tipoDoc: item.tipoDoc, iva: item.iva, cliente: item.email, fecha: moment(item.fecha).format('l') } }} ><button type="button" className="BotonesColor p-1 rounded"><FontAwesomeIcon icon={faEye}/></button></Link>,
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de facturas"
                backUrl="/UserMenuCuenta"
                backName="Menú de cuenta"
                currentName="Lista de facturas"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Lista de facturas</h2>
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
                                    infoLabel={["Mostrando de", "a", "de", "facturas"]}
                                    paginationLabel={["Anterior", "Siguiente"]}
                                    noRecordsFoundLabel="Aún no tienes ninguna factura..."
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


