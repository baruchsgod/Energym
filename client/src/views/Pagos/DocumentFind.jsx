import React, { useState, useRef } from 'react'
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import HeaderStatus from "../../components/HeaderStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
export default function TextEditor() {
    const documentRef = useRef();
    // eslint-disable-next-line
    const [table, setTable] = useState([]);
    function findDocument(e) {
        e.preventDefault();
        setTable([]);
        const document = documentRef.current.value;
        Axios.get("/payments/find", {
            params: { document: document }
        })
            .then(async (res) => {
                if (res.data.length > 0) {
                    setTable(res.data);
                } else {
                    return await swal("No existe ningún documento asociado al número ingresado!", {
                        icon: "error"
                    });
                }
            })
    }
    const datatable = {
        columns: [
            {
                label: "Documento",
                field: "documento",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Creado Por',
                field: 'user',
                width: 270,
            },
            {
                label: 'Tipo Documento',
                field: 'tipoDoc',
                width: 200,
            },
            {
                label: 'Estado',
                field: 'estado',
                width: 200,
            },
            {
                label: 'Monto',
                field: 'monto',
                width: 200,
            },
            {
                label: 'IVA',
                field: 'iva',
                width: 200,
            },
            {
                label: 'Fecha',
                field: 'fecha',
                width: 200,
            },
            {
                label: 'Visualizar',
                field: 'visualizar',
                width: 200,
            }],
        rows: table.map((item) => (
            {
                documento: item.numDocumento,
                user: item.usuario,
                tipoDoc: item.tipoDoc,
                estado: item.estado,
                monto: item.monto.toFixed(2),
                iva: item.iva.toFixed(2),
                fecha: moment(item.fecha).format('l'),
                visualizar: <Link to={{ pathname: "/Document/Find/Print", state: { _id: item._id, monto: item.monto, numDocumento: item.numDocumento, usuario: item.usuario, tipoDoc: item.tipoDoc, iva: item.iva, cliente: item.email, fecha: moment(item.fecha).format('l') } }} style={{ textDecoration: 'none' }}><button type="button" className="BotonesColor p-1 rounded"><FontAwesomeIcon icon={faEye} /></button></Link>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Buscar Documento"
                backUrl="/EmpleadoMenuPagos"
                backName="Menú de pagos"
                currentName="Documento"
            />
            <div className="section-overlay fade-in-card" style={{ marginBottom: "220px" }}>
                <div className="container">
                    <div className="row mt-5">
                        <form onSubmit={findDocument}>
                            <div className="col-md-12 p-3 mt-5 ml-4" >
                                <div className="offset-md-2 col-md-7 ">
                                    <h3 className="fw-bold text-center para-color ">Buscar un documento para ver el detalle</h3>
                                </div>
                                <div className="col-md-12 ml-4">
                                    <div className="offset-md-2 col-md-6 float-left mr-0 pr-0">
                                        <input type="number" min="1" max="9999999999" placeholder="Número de documento..." className="form-control mt-4 inputCenter" ref={documentRef} required />
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
                                                    infoLabel={["Mostrando de", "a", "de", "documentos"]}
                                                    paginationLabel={["Anterior", "Siguiente"]}
                                                    noRecordsFoundLabel="No documentos para mostrar..."
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


