import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTableV5 } from 'mdbreact';
import 'bootstrap-css-only/css/bootstrap.min.css';
import HeaderStatus from "../../components/HeaderStatus";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
export default function BillingDetails(props) {
    const { details, username } = (props.location && props.location.state) || {};
    const [report, setReport] = useState();
    useEffect(() => {
        setReport({
            columns: [
                {
                    label: "# Documento",
                    field: "docNumber",
                    width: 200,
                    sort: 'desc'
                },
                {
                    label: 'Monto',
                    field: 'monto',
                    width: 270,
                },
                {
                    label: 'IVA',
                    field: 'iva',
                    width: 200,
                },
                {
                    label: 'Tipo',
                    field: 'tipo',
                    width: 200,
                },
                {
                    label: 'Creado por',
                    field: 'creado',
                    width: 200,
                },
                {
                    label: 'Fecha',
                    field: 'fecha',
                    width: 200,
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    width: 200,
                },
                {
                    label: 'Detalles',
                    field: 'detalles',
                    width: 200,
                }],
            rows: details.map((item) => (
                {
                    docNumber: item.numDocumento ? item.numDocumento : "Error",
                    monto: item.monto ? item.monto.toFixed(2) : "Error",
                    iva: item.iva ? item.iva.toFixed(2) : "Sin IVA",
                    tipo: item.tipoDoc ? item.tipoDoc : "Error",
                    creado: item.usuario ? item.usuario : "Error",
                    fecha: item.fecha ? moment(item.fecha).format("l") : "Error",
                    estado: item.estado ? item.estado : "Error",
                    detalles: <Link to={{ pathname: "/Document/Find/Print", state: { _id: item._id, monto: item.monto, numDocumento: item.numDocumento, usuario: item.usuario, tipoDoc: item.tipoDoc, iva: item.iva, cliente: item.email, fecha: moment(item.fecha).format('l') } }} style={{ textDecoration: 'none' }}><button type="button" className="p-1 rounded BotonesColor"><FontAwesomeIcon icon={faEye} /></button></Link>
                }))
        });
    }, [details])
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Detalles de facturación"
                backUrl="/Report/Billing"
                backName="Parámetros del reporte"
                currentName="Detalles de facturación"
            />
            <div className="container mt-5 mb-5  fade-in-card">
                <div className="row">
                    <div className="row mb-3 mt-3">
                        <div className="col-sm-12">
                            <h2 className="para-color mb-3">Documentos abiertos del usuario {username}</h2>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="row ">
                    <div className="col-sm-12 mt-4 mb-5">
                        <div className="bmi-box">
                            <MDBDataTableV5
                                hover entriesOptions={[5, 20, 25]}
                                entries={5}
                                pagesAmount={4}
                                data={report}
                                style={{ color: "#2B2B2B" }}
                                searchTop
                                searchBottom={false}
                                infoLabel={["Mostrando de", "a", "de", "documentos"]}
                                paginationLabel={["Anterior", "Siguiente"]}
                                noRecordsFoundLabel="No existen documentos para mostrar..."
                                searchLabel="Buscar"
                                entriesLabel="Filas por página"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}