import React, { useRef, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import swal from "sweetalert";
import { MDBDataTableV5 } from 'mdbreact';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
export default function BillingClose(e) {

    const dateRef = useRef();
    const [table, setTable] = useState([]);

    function findReport(e) {
        e.preventDefault();
        const dateReport = dateRef.current.value;

        Axios.get("/report/close/billing", {
            params: { date: dateReport }
        })
            .then(async (res) => {
                if (res.data.length > 0) {
                    setTable(res.data);
                } else {
                    return await swal("No existen reportes de caja chica para la fecha seleccionada!", {
                        icon: "error"
                    });
                }
            })
    };

    const datatable = {
        columns: [
            {
                label: "Estado",
                field: "estado",
                width: 200,
                sort: 'desc'
            },
            {
                label: "Creado por",
                field: "user",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Efectivo Inicial',
                field: 'inicial',
                width: 50,
            },
            {
                label: 'Discrepancia Inicial',
                field: 'discrepancia',
                width: 50,
            },
            {
                label: 'Efectivo Recibido',
                field: 'efectivo',
                width: 200,
            },
            {
                label: 'Faltante/Sobrante',
                field: 'disc',
                width: 200,
            },
            {
                label: 'Ver detalle',
                field: 'ver',
                width: 200,
            },
        ],
        rows: table.map((item) => (
            {
                estado: item.estado,
                user: item.Empleado,
                inicial: item.efectivoInicial,
                discrepancia: item.discrepanciaInicial,
                efectivo: item.efectivoRecibido,
                disc: item.faltanteSobrante,
                ver:
                    <Link to={{ pathname: "/Report/Close/Details", state: { id: item } }} style={{ textDecoration: 'none' }}><button type="button" className="btn btn-primary BotonesColor"><FontAwesomeIcon icon={faEye} /></button></Link>
            }))
    };


    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Reporte de caja chica"
                backUrl="/AdminMenuReporte"
                backName="Menú de reportes"
                currentName="Reporte de caja chica"
            />
            <div className="section-overlay fade-in-card" style={{ marginBottom: "290px" }}>
                <div className="container">
                    <div className="row mt-5 mb-5">
                        <form id="billingReport" onSubmit={findReport}>
                            <div className="col-md-12 p-3 mt-5 ml-4" >
                                <div className="offset-md-2 col-md-7 ">
                                    <h3 className="fw-bold text-center para-color ">Buscar reporte de caja chica por fecha</h3>
                                </div>
                                <div className="col-md-12 ml-4">
                                    <div className="offset-md-2 col-md-6 float-left mr-0 pr-0">
                                        <input type="date" className="form-control mt-4 inputCenter" ref={dateRef} required />
                                    </div>
                                    <div className="col-sm-1 float-left ml-3 pl-0">
                                        <div className="contact-sub-btn mt-4">
                                            <button type="submit" style={{ padding: "5px", width: "100px", backgroundColor: "#e98808" }} className="btn btn-effect section-button"><FontAwesomeIcon icon={faSearch} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {table.length > 0 ?
                        <div className="row ">
                            <div className="col-sm-12 mt-4  fade-in-card">
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
                                        infoLabel={["Mostrando de", "a", "de", "reportes"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No existen reportes para mostrar..."
                                        searchLabel="Buscar"
                                        entriesLabel="Filas por página"
                                    />
                                </div>
                            </div>
                        </div>
                        :
                        <div>

                        </div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};