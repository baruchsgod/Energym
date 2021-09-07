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
import * as moment from 'moment';
import { useHistory } from "react-router-dom";
export default function ListDiets() {
    const history = useHistory();
    const [userDiets, setUserDiets] = useState([]);
    useEffect(() => {
        fetch('/listUserDiets')
            .then(response => response.json())
            .then(data => setUserDiets(data));
    }, []);
    function verDetalle(detalleDieta, tipoDieta, e) {
        e.preventDefault();
        history.push({ pathname: '/UserDietDetail', state: { detalleDieta: detalleDieta, tipoDieta: tipoDieta } });
    }
    const datatable = {
        columns: [
            {
                label: "Tipo de dieta",
                field: "Tipo",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Fecha de creación',
                field: 'Fecha',
                width: 100,
            },
            {
                label: 'Detalle de la dieta',
                field: 'Detalle',
                width: 100,
            }
        ],
        rows: userDiets.map((item) => (
            {
                Tipo: item.tipoDieta,
                Fecha: moment(item.createdAt).format("DD/MM/YYYY"),
                Detalle: <Button onClick={(e) => verDetalle(item.detalle, item.tipoDieta, e)} type="button" className="BotonesColor"><FontAwesomeIcon icon={faEye} /></Button>,
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de dietas"
                backUrl="/UserMenu"
                backName="Menú del gym"
                currentName="Lista de dietas"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Lista de las dietas que te han asignado</h2>
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
                                    infoLabel={["Mostrando de", "a", "de", "dietas"]}
                                    paginationLabel={["Anterior", "Siguiente"]}
                                    noRecordsFoundLabel="No te han asigando ninguna dieta aún..."
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


