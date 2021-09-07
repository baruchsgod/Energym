import React, { useRef, useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import moment from "moment";
import { MDBDataTableV5 } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export default function AppliedPayment() {
    const userRef = useRef();
    const [email, setEmail] = useState();
    const [table, setTable] = useState([]);
    const [id, setId] = useState();
    const [employee, setEmployee] = useState();
    let documents = [];
    let amounts = [];
    let ids = [];
    useEffect(() => {
        Axios.get("/userData")
            .then((res) => {
                setEmployee(res.data.email);
            })
    }, []);
    function findCustomer(e) {
        e.preventDefault();
        const user = userRef.current.value;
        setEmail(user);
        Axios.get("/userDetails", {
            params: { idUser: user }
        })
            .then(async (res) => {
                if (res.data.length > 0) {
                    setId(res.data[0]._id);
                    Axios.get("/payment/application", {
                        params: { email: user }
                    })
                        .then(async (response) => {
                            if (response.data.length > 0) {
                                setTable(response.data);
                            } else {
                                setTable([]);
                                return await swal("Este cliente no tiene ningun documento creado o abierto en este momento!", {
                                    icon: "warning"
                                });
                            }
                        })
                } else {
                    return await swal("No existe ningun usuario con el correo electrónico ingresado!", {
                        icon: "error"
                    });
                }
            })
    }
    async function applyDocuments(e) {
        let total = 0;
        if (documents.length > 0) {
            amounts.forEach(item => {
                total = total + item;
            })
            if (total === 0) {
                swal({
                    title: "Estás seguro?",
                    text: "Se realizará la aplicación de los documentos seleccionados",
                    icon: "warning",
                    buttons: ["Cancelar", "Aceptar"],
                    dangerMode: true,
                })
                    .then(async (value) => {
                        if (value) {
                            Axios.post("/payment/clearing", {
                                total: total,
                                email: email,
                                option: "Balanced",
                                id: id,
                                employee: employee,
                                ids: ids
                            })
                                .then(async (res) => {
                                    if (res.data.length === 2) {
                                        await swal("Los documentos han sido aplicados correctamente!", {
                                            icon: "success"
                                        });
                                        ids.forEach(item => {
                                            document.getElementById(item).checked = false;
                                        });
                                        findCustomer(e);
                                    } else if (res.data.length === 1) {
                                        return await swal(res.data[1].message, {
                                            icon: "error"
                                        });
                                    }
                                })
                        } else {
                            return await swal("Has elegido no confirmar el balance de efectivo inicial!", {
                                icon: "warning"
                            });
                        }
                    })
            } else if (total > 0) {
                swal({
                    title: "Estás seguro?",
                    text: "El balance no es cero, si decide seguir se creará una nota de débito para compensar",
                    icon: "warning",
                    buttons: ["Cancelar", "Aceptar"],
                    dangerMode: true,
                })
                    .then(async (value) => {
                        if (value) {
                            Axios.post("/payment/clearing", {
                                total: total,
                                email: email,
                                option: "Overpaid",
                                id: id,
                                employee: employee,
                                ids: ids
                            })
                                .then(async (res) => {
                                    if (res.data.length > 1) {
                                        await swal("Los documentos han sido aplicados y se ha generado un débito exitosamente!", {
                                            icon: "success"
                                        });
                                        ids.forEach(item => {
                                            document.getElementById(item).checked = false;
                                        });
                                        findCustomer(e);
                                    } else {
                                        return await swal(res.data[1].message, {
                                            icon: "error"
                                        });
                                    }
                                })
                        } else {
                            return await swal("Has elegido no confirmar el balance de efectivo inicial!", {
                                icon: "warning"
                            });
                        }
                    })
            } else {
                swal({
                    title: "Estás seguro?",
                    text: "El balance no es cero, si decide seguir se creará una nota de crédito para compensar",
                    icon: "warning",
                    buttons: ["Cancelar", "Aceptar"],
                    dangerMode: true,
                })
                    .then(async (value) => {
                        if (value) {
                            Axios.post("/payment/clearing", {
                                total: total,
                                email: email,
                                option: "Underpaid",
                                id: id,
                                employee: employee,
                                ids: ids
                            })
                                .then(async (res) => {
                                    //console.log(res);
                                    if (res.data.length > 1) {
                                        await swal("Los documentos han sido aplicados y se ha generado un crédito exitosamente!", {
                                            icon: "success"
                                        });
                                        ids.forEach(item => {
                                            document.getElementById(item).checked = false;
                                        })
                                        findCustomer(e);
                                    } else {
                                        return await swal(res.data[1].message, {
                                            icon: "error"
                                        });
                                    }
                                })
                        } else {
                            return await swal("Has elegido no confirmar el balance de efectivo inicial!", {
                                icon: "warning"
                            });
                        }
                    })
            }
        } else {
            return await swal("Debe de seleccionar como mínimo un documento para realizar una aplicación", {
                icon: "error"
            });
        }
    }

    function addDocument(e, monto, id) {
        const isChecked = e.target.checked;
        const checkedValue = e.target.value;

        if (isChecked) {
            documents.push(checkedValue);
            amounts.push(monto);
            ids.push(id);
        } else {
            const index = documents.indexOf(checkedValue);
            const indexAmount = amounts.indexOf(monto);
            const indexId = ids.indexOf(id);
            if (index > -1) {
                documents.splice(index, 1);
                amounts.splice(indexAmount, 1);
                ids.splice(indexId, 1);
            }
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
                label: 'Aplicar',
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
                aplicar: <div style={{ textAlign: "center" }}><input id={item._id} name="documentId" type="checkbox" value={item.numDocumento ? item.numDocumento : "Error"} onChange={(e) => addDocument(e, item.monto, item._id)} className="form-check-input" /></div>
            }))
    };

    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Aplicación de pago"
                backUrl="/EmpleadoMenuPagos"
                backName="Menú de pagos"
                currentName="Aplicar pago"
            />
            <div className="section-overlay fade-in-card" style={{ marginBottom: "220px" }}>
                <div className="container">
                    <div className="row mt-5">
                        <form onSubmit={findCustomer}>
                            <div className="col-md-12 p-3 mt-5 ml-4" >
                                <div className="offset-md-2 col-md-7 ">
                                    <h3 className="fw-bold text-center para-color ">Buscar cliente para aplicar un pago</h3>
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
                                                infoLabel={["Mostrando de", "a", "de", "clientes"]}
                                                paginationLabel={["Anterior", "Siguiente"]}
                                                noRecordsFoundLabel="No existen clientes para mostrar..."
                                                searchLabel="Buscar"
                                                entriesLabel="Filas por página"
                                            />
                                        </div>
                                        <div className="col-sm-12 bmi-box">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="button" onClick={applyDocuments} style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Aplicar pago</button>
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
    );
}