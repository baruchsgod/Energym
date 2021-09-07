import React, { useState, useRef } from 'react'
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import HeaderStatus from "../../components/HeaderStatus";
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
export default function TextEditor() {
    const userRef = useRef();
    const [table, setTable] = useState([]);
    function findCustomer(e) {
        e.preventDefault();
        setTable([]);
        const user = userRef.current.value;
        Axios.get("/userRoutine", {
            params: { userData: user }
        })
            .then((res) => {
                if (res.data.length > 0) {
                    Axios.get("/userRoutine/getDetails", {
                        params: { userData: user }
                    })
                        .then((respond) => {
                            if (respond.data.length > 0) {
                                setTable(respond.data);
                            } else {
                                return swal("Usuario no tiene rutinas, favor proceda a crear una!", {
                                    icon: "warning"
                                });
                            }
                        })
                } else {
                    return swal("No existe ningún usuario asociado al correo electrónico ingresado!", {
                        icon: "error"
                    });
                }
            })
    }
    const datatable = {
        columns: [
            {
                label: "Rutina",
                field: "Rutina",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Fecha de creación',
                field: 'Dia',
                width: 270,
            },
            {
                label: 'Nombre del cliente',
                field: 'Nombre',
                width: 270,
            },
            {
                label: 'Correo electrónico',
                field: 'Email',
                width: 200,
            },
            {
                label: 'Visualizar rutina',
                field: 'Visualizar',
                width: 200,
            }],
        rows: table.map((item, index) => (
            {
                Rutina: index + 1,
                Dia: moment(item.createdAt).format("DD/MM/YYYY"),
                Nombre: (item.nombre + " " + item.apellido),
                Email: item.email,
                Visualizar: <Link to={{ pathname: "/Routine/Details", state: { _id: item._id, routines: item.Detalles, email: item.email, name: item.nombre, lname: item.apellido } }} style={{ textDecoration: 'none' }}><button type="button" className="btn btn-primary BotonesColor"><FontAwesomeIcon icon={faEye} /></button></Link>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Buscar rutinas"
                backUrl="/EmpleadoMenuRutinas"
                backName="Menú de rutinas"
                currentName="Buscar rutinas"
            />
            <div className="section-overlay fade-in-card" style={{ marginBottom: "220px" }}>
                <div className="container">
                    <div className="row mt-5">
                        <form onSubmit={findCustomer}>
                            <div className="col-md-12 p-3 mt-5 ml-4" >
                                <div className="offset-md-2 col-md-7 ">
                                    <h3 className="fw-bold text-center para-color ">Buscar las rutinas del cliente</h3>
                                </div>
                                <div className="col-md-12 ml-4">
                                    <div className="offset-md-2 col-md-6 float-left mr-0 pr-0">
                                        <input type="email" placeholder="Correo electrónico..." className="form-control mt-4 inputCenter" ref={userRef} required />
                                    </div>
                                    <div className="col-sm-1 float-left ml-3 pl-0">
                                        <div className="contact-sub-btn mt-4">
                                            <button type="submit" style={{ padding: "5px", width: "100px", backgroundColor: "#e98808" }} className="btn btn-effect section-button"><FontAwesomeIcon icon={faSearch} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div style={{ marginTop: "5%" }}>
                            {table.length > 0 &&
                                <div>
                                    <div className="row fade-in-card">
                                        <div className="col-sm-12 mt-5">
                                            <div className="row mb-4">
                                                <div className="col-sm-12">
                                                    <h2 className="para-color mb-3">Resultado de la búsqueda</h2>
                                                </div>
                                                <hr />
                                            </div>
                                            <div className="bmi-box">
                                                <MDBDataTableV5
                                                    hover entriesOptions={[5, 20, 25]}
                                                    entries={5}
                                                    pagesAmount={4}
                                                    data={datatable}
                                                    style={{ color: "#2B2B2B" }}
                                                    searchTop
                                                    searchBottom={false}
                                                    infoLabel={["Mostrando de", "a", "de", "rutinas"]}
                                                    paginationLabel={["Anterior", "Siguiente"]}
                                                    noRecordsFoundLabel="No existen rutinas para mostrar..."
                                                    searchLabel="Buscar"
                                                    entriesLabel="Filas por página"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


