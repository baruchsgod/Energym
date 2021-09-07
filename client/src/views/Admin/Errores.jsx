import React, { useState, useEffect } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as moment from 'moment';
export default function ListEvents() {
    const [dataAccounts, setDataAccounts] = useState([]);
    useEffect(() => {
        if (dataAccounts.length === 0) {
            fetch('/listaErrores')
                .then(response => response.json())
                .then(data => setDataAccounts(data));

        }
    });
    const datatable = {
        columns: [
            {
                label: "Ubicación del error",
                field: "Descripcion",
                width: 50,
                sort: 'desc',
            },
            {
                label: 'Responsable',
                field: 'Usuario',
                width: 100,
            },
            {
                label: 'Fecha de error',
                field: 'Fecha',
                width: 100,
            },
            {
                label: 'LogError',
                field: 'LogError',
                width: 50,
            }],
        rows: dataAccounts.map((item) => (
            {
                Descripcion: item.Descripcion,
                Usuario: item.Usuario,
                Fecha: moment(item.Fecha).format("DD/MM/YYYY HH:mm"),
                LogError: item.LogError

            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de errores del sistema"
                backUrl="/AdminMenuReporte"
                backName="Menú de reportes"
                currentName="Lista de errores del sistema"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container" style={{ marginRigth: "100px" }}>
                    <div className="row">
                        <div className="row">
                            <div className="row mb-3 mt-3">
                                <div className="col-sm-12">
                                    <h2 className="para-color mb-3">Lista de errores del sistema</h2>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="row fade-in-card">
                            <div className="col-sm-12 mt-4">
                                <div className="bmi-box">
                                    <MDBDataTableV5
                                        hover entriesOptions={[5, 20, 25]}
                                        entries={5}
                                        pagesAmount={4}
                                        data={datatable}
                                        searchTop
                                        searchBottom={false}
                                        infoLabel={["Mostrando de", "a", "de", "errores"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No existen errores para mostrar..."
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





