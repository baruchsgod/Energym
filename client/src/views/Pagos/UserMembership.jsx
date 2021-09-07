import React, { useRef, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import swal from 'sweetalert';
import HeaderStatus from "../../components/HeaderStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
export default function Membership(props) {
    const userRef = useRef();
    const [table, setTable] = useState([]);
    const [emailClient, setEmail] = useState([]);
    function assignMembership(e) {
        e.preventDefault();
        swal({
            title: "Asignar Membresia",
            text: "Seleccione una de las siguientes opciones de membresía",
            icon: "warning",
            buttons: {
                mensual: "Mensual",
                trimestral: "Trimestral",
                semestral: "Semestral",
                anual: "Anual",
                cancel: "Cancelar"
            },
            dangerMode: true,
        })
            .then((value) => {
                switch (value) {
                    case "mensual":
                        Axios.post("/membership/assign", { email: emailClient, membership: "Mensual" })
                            .then(async response => {
                                if (response.data.length > 0) {
                                    await swal("La membresía ha sido asignada correctamente!", {
                                        icon: "success"
                                    });
                                    await findCustomer(e);
                                } else {
                                    return await swal("Ha existido un error con la actualizacion!", {
                                        icon: "error"
                                    });
                                }
                            })
                        break;
                    case "trimestral":
                        Axios.post("/membership/assign", { email: emailClient, membership: "Trimestral" })
                            .then(async response => {
                                if (response.data.length > 0) {
                                    await swal("La membresía ha sido asignada correctamente!", {
                                        icon: "success"
                                    });
                                    await findCustomer(e);
                                } else {
                                    return await swal("Ha existido un error con la actualizacion!", {
                                        icon: "error"
                                    });
                                }
                            })
                        break;
                    case "semestral":
                        Axios.post("/membership/assign", { email: emailClient, membership: "Semestral" })
                            .then(async response => {
                                if (response.data.length > 0) {
                                    await swal("La membresía ha sido asignada correctamente!", {
                                        icon: "success"
                                    });
                                    await findCustomer(e);
                                } else {
                                    return await swal("Ha existido un error con la actualizacion!", {
                                        icon: "error"
                                    });
                                }
                            })
                        break;
                    case "anual":
                        Axios.post("/membership/assign", { email: emailClient, membership: "Anual" })
                            .then(async response => {
                                if (response.data.length > 0) {
                                    await swal("La membresía ha sido asignada correctamente!", {
                                        icon: "success"
                                    });
                                    await findCustomer(e);
                                } else {
                                    return await swal("Ha existido un error con la actualizacion!", {
                                        icon: "error"
                                    });
                                }
                            })
                        break;
                    default:
                }
            })

    }
    function findCustomer(e) {
        e.preventDefault();
        setTable([]);
        const user = userRef.current.value;
        setEmail(user);
        Axios.get("/userDetails", {
            params: { idUser: user }
        })
            .then(async (res) => {
                if (res.data.length > 0) {
                    setTable(res.data);
                } else {
                    return swal("No existe ningún usuario registrado con el correo ingresado!", {
                        icon: "error"
                    });
                }
            })
    }
    const datatable = {
        columns: [
            {
                label: "Nombre",
                field: "Nombre",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Correo electrónico',
                field: 'Email',
                width: 200,
            },
            {
                label: 'Membresía',
                field: 'Membresia',
                width: 200,
            },
            {
                label: 'Asignar membresía',
                field: 'Asignar',
                width: 200,
            }],
        rows: table.map((item) => (
            {
                Nombre: item.fName ? (item.fName + " " + item.lName) : "Favor asignar nombre",
                Email: item.email,
                Membresia: item.Membresia ? item.Membresia : "Sin membresía asignada",
                Asignar: <div><button onClick={assignMembership} type="button" className="p-2 rounded BotonesColorCrear"><FontAwesomeIcon icon={faPlus} /></button></div>
            }))
    };
    return (<div>
        <Header />
        <HeaderStatus
            h1="Asignar membresía"
            backUrl={localStorage.getItem("tipoCuenta") === "Administrador" ? "/AdminMenuPagos" : "/EmpleadoMenuRecepcionista"}
            backName={localStorage.getItem("tipoCuenta") === "Administrador" ? "Menú de pagos" : "Menú de recepcionista"}
            currentName="Asignar membresía"
        />
        <div className="section-overlay fade-in-card" style={{ marginBottom: "220px" }}>
            <div className="container">
                <div className="row mt-5">
                    <form onSubmit={findCustomer}>
                        <div className="col-md-12 p-3 mt-5 ml-4" >
                            <div className="offset-md-2 col-md-7 ">
                                <h3 className="fw-bold text-center para-color ">Buscar cliente para asignar membresía</h3>
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
                                <div className="row  ">
                                    <div className="col-sm-12 mt-4 mb-5 fade-in-card">
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