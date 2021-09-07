import React, { useState, useRef, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import moment from "moment";
import { MDBDataTableV5 } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMinus } from '@fortawesome/free-solid-svg-icons';
export default function UnapplyPayment() {
    const documentRef = useRef();
    const [table, setTable] = useState([]);
    const [employee, setEmployee] = useState();
    const [origin, setOrigin] = useState();
    useEffect(() => {
        Axios.get("/userData")
            .then((res) => {
                setEmployee(res.data.email);
            })
    }, []);
    function findDocument(e) {
        e.preventDefault();
        setTable([]);
        const document = documentRef.current.value;
        Axios.get("/payments/find", {
            params: { document: document }
        })
            .then(async (res) => {
                if (res.data.length > 0 && res.data[0].estado === "Cerrado") {
                    setTable(res.data);
                    setOrigin(res.data.email);
                } else if (res.data.length > 0 && res.data[0].estado === "Abierto") {
                    return await swal("El documento seleccionado esta abierto, intente de nuevo!", {
                        icon: "error"
                    });
                }
                else {
                    return await swal("No existe ningún documento con el número ingresado, intente de nuevo!", {
                        icon: "error"
                    });
                }
            })
    }
    async function unapplyDocument(e, monto, id) {
        if (monto > 0) {
            swal({
                title: "Ingresar Crédito",
                text: "Se creará un crédito al desaplicar el debito seleccionado, favor ingresar la cuenta de correo a la cual desea aplicarlo:",
                icon: "warning",
                content: "input",
                dangerMode: true,
            })
                .then(async (value) => {
                    Axios.get("/userDetails", {
                        params: { idUser: value }
                    })
                        .then(async (res) => {
                            if (res.data.length > 0) {
                                Axios.post("/payment/unapply", {
                                    total: monto,
                                    email: res.data[0].email,
                                    option: "Credit",
                                    id: id,
                                    _id: res.data[0]._id,
                                    employee: employee,
                                    origin: origin
                                })
                                    .then(async (res) => {
                                        if (res.data.length === 2) {
                                            await swal("El documento ha sido desaplicado correctamente!", {
                                                icon: "success"
                                            });
                                            window.location.reload();
                                        } else if (res.data.length === 1) {
                                            return await swal("Se ha generado un error en el proceso de desaplicación!", {
                                                icon: "error"
                                            });
                                        }
                                    })
                            } else {
                                return await swal("No existe ningun usuario con el correo electrónico ingresado!", {
                                    icon: "error"
                                });
                            }
                        })
                })
        } else if (monto < 0) {
            swal({
                title: "Ingresar Débito",
                text: "Se creará un débito al desaplicar el debito seleccionado, favor ingresar la cuenta de correo a la cual desea aplicarlo:",
                icon: "warning",
                content: "input",
                dangerMode: true,
            })
                .then(async (value) => {
                    Axios.get("/userDetails", {
                        params: { idUser: value }
                    })
                        .then(async (res) => {
                            if (res.data.length > 0) {
                                Axios.post("/payment/unapply", {
                                    total: monto,
                                    email: res.data[0].email,
                                    option: "Debit",
                                    id: id,
                                    _id: res.data[0]._id,
                                    employee: employee,
                                    origin: origin
                                })
                                    .then(async (res) => {
                                        if (res.data.length === 2) {
                                            await swal("El documento ha sido desaplicado correctamente!", {
                                                icon: "success"
                                            });
                                            window.location.reload();
                                        } else if (res.data.length === 1) {
                                            return await swal("Se ha generado un error en el proceso de desaplicación!", {
                                                icon: "error"
                                            });
                                        }
                                    })
                            } else {
                                return await swal("No existe ningun usuario con el correo electrónico ingresado!", {
                                    icon: "error"
                                });
                            }
                        })
                })
        } else {
            return await swal("No es posible desaplicar montos que tengan balance cero, intente de nuevo!", {
                icon: "error"
            });
        }
    }

    const datatable = {
        columns: [
            {
                label: "Número de documento",
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
                label: 'Desaplicar pago',
                field: 'aplicar',
                width: 200,
            }],
        rows: table.map((item) => (
            {
                docNumber: item.numDocumento ? item.numDocumento : "Error",
                monto: item.monto ? item.monto.toFixed(2) : "Error",
                iva: item.iva ? item.iva.toFixed(2) : "Sin IVA",
                tipo: item.tipoDoc ? item.tipoDoc : "Error",
                creado: item.usuario ? item.usuario : "Error",
                fecha: item.fecha ? moment(item.fecha).format("l") : "Error",
                estado: item.estado ? item.estado : "Error",
                aplicar: <div><button type="button" onClick={(e) => unapplyDocument(e, item.monto, item._id)} className="p-1 rounded BotonesColorEliminar"><FontAwesomeIcon icon={faMinus} /></button></div>
            }))
    };
    return (<div>
        <Header />
        <HeaderStatus
            h1="Desaplicar documento"
            backUrl="/EmpleadoMenuPagos"
            backName="Menú de pagos"
            currentName="Desaplicar documento"
        />
        <div className="section-overlay fade-in-card" style={{ marginBottom: "220px" }}>
            <div className="container">
                <div className="row mt-5">
                    <form onSubmit={findDocument}>
                        <div className="col-md-12 p-3 mt-5 ml-4" >
                            <div className="offset-md-2 col-md-7 ">
                                <h3 className="fw-bold text-center para-color ">Buscar un documento para desaplicarlo</h3>
                            </div>
                            <div className="col-md-12 ml-4">
                                <div className="offset-md-2 col-md-6 float-left mr-0 pr-0">
                                    <input type="number" min="1"  placeholder="Número de documento..." className="form-control mt-4 inputCenter" ref={documentRef} required />
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
                                    <div className="col-sm-12 mt-4">
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
                                                noRecordsFoundLabel="No existen documentos para mostrar..."
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
    </div>);
}