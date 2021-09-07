import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import swal from 'sweetalert';
import * as moment from 'moment';
export default function ListFeedback() {
    const [userFeedback, setUserFeedback] = useState([]);
    useEffect(() => {
        if (userFeedback.length === 0) {
            fetch('/listUserFeedback')
                .then(response => response.json())
                .then(data => setUserFeedback(data));
        }
    });
    function verDetalle(descripcion, calificacion, fecha, e) {
        e.preventDefault();
        return swal(`Calificación de ${calificacion}/5 el día ${fecha}`, descripcion);
    }
    function estrellas(calificacion) {
        var estrellas = "";
        for (let index = 0; index < calificacion; index++) {
            estrellas += "★"
        }
        return estrellas;
    }
    const datatable = {
        columns: [
            {
                label: "Fecha de creación",
                field: "Fecha",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Calificación',
                field: 'Calificacion',
                width: 100,
            },
            {
                label: 'Detalle del comentario',
                field: 'Detalle',
                width: 100,
            }
        ],
        rows: userFeedback.map((item) => (
            {
                Fecha: moment(item.Fecha).format("DD/MM/YYYY"),
                Calificacion: estrellas(item.Calificacion),
                Detalle: <Button onClick={(e) => verDetalle(item.Descripcion, item.Calificacion, moment(item.Fecha).format("DD/MM/YYYY"), e)} type="button" className="BotonesColor"><FontAwesomeIcon icon={faEye} /></Button>,
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de retroalimentación"
                backUrl="/UserMenu"
                backName="Menú del gym"
                currentName="Lista de retroalimentación"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Lista de los comentarios de retroalimentación enviada</h2>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="col-sm-12 mt-4">
                                <div className="bmi-box">
                                    <MDBDataTableV5
                                        hover entriesOptions={[5, 15, 25]}
                                        entries={5}
                                        pagesAmount={4}
                                        data={datatable}
                                        searchTop
                                        searchBottom={false}
                                        infoLabel={["Mostrando de", "a", "de", "valoraciones"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No has realizado comentarios de retroalimentación aún..."
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


