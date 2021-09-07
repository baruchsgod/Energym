import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
export default function OverDue() {
    const [details, setDetails] = useState([]);
    useEffect(() => {
        Axios.get("/payment/overdue", {
            params:{option:"Anual"}
        })
            .then((res) => {
                if (res.data.length > 0) {
                    setDetails(res.data);
                }
            });
    }, [])
    const datable = {
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
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Facturas vencidas anuales"
            backUrl="/Report/Menu"
            backName="Menú de reportes de transacciones vencidas"
            currentName="Facturas vencidas anuales"
        />
        {details.length > 0 ?
            <div className="container mt-5 mb-5  fade-in-card">
                <div className="row">
                    <div className="row mb-3 mt-3">
                        <div className="col-sm-12">
                            <h2 className="para-color mb-3">Reporte de facturas vencidas anuales</h2>
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
                                data={datable}
                                style={{ color: "#2B2B2B" }}
                                searchTop
                                searchBottom={false}
                                infoLabel={["Mostrando de", "a", "de", "facturas"]}
                                paginationLabel={["Anterior", "Siguiente"]}
                                noRecordsFoundLabel="No existen facturas para mostrar..."
                                searchLabel="Buscar"
                                entriesLabel="Filas por página"
                            />
                        </div>
                    </div>
                </div>
            </div> :
            <div className="container py-4 text-center  fade-in-card" style={{ margin: "6% auto" }}>
                <div className="row text-center">
                    <div className="col-12">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <h2>No existen facturas vencidas</h2>
                            <p>Al momento de generarse este reporte, no existen facturas abiertas para ninguno de los asociados al gimnasio Energym, el reporte se ha generado con una fecha de
                                {" " + moment(new Date()).format("l")}, por lo cual su criterio de búsqueda son los items de meses anteriores cuyo estado sea "Abierto".</p>

                        </div>
                    </div>
                </div>
            </div>}
        <Footer />
    </div>);
}