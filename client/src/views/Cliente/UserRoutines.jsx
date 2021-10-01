import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import * as moment from 'moment';
export default function ListRoutines() {
    const [userRoutines, setUserRoutines] = useState([]);
    useEffect(() => {
        if (userRoutines.length === 0) {
            fetch('https://energymproject.herokuapp.com/listUserRoutines')
                .then(response => response.json())
                .then(data => setUserRoutines(data));
        }
    });
    const datatable = {
        columns: [
            {
                label: "Número de rutina",
                field: "Tipo",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Fecha de creación',
                field: 'Dia',
                width: 100,
            },
            {
                label: 'Detalle de la rutina',
                field: 'Detalle',
                width: 100,
            }
        ],
        rows: userRoutines.map((item, index) => (
            {
                Tipo: "Rutina " + (index + 1).toString(),
                Dia: moment(item.createdAt).format("DD/MM/YYYY"),
                Detalle: <Link to={{ pathname: "/Routine/Details", state: { _id: item._id, routines: item.Detalles, email: item.email, name: item.nombre, lname: item.apellido } }} style={{ textDecoration: 'none' }}><Button type="button" className="BotonesColor"><FontAwesomeIcon icon={faEye} /></Button></Link>,
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de rutinas"
                backUrl="/UserMenu"
                backName="Menú del gym"
                currentName="Lista de rutinas"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Lista de las rutinas que te han asignado</h2>
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
                                        infoLabel={["Mostrando de", "a", "de", "rutinas"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No te han asigando ninguna rutina aún..."
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


