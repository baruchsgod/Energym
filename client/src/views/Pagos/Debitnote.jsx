import React, { useRef, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import HeaderStatus from "../../components/HeaderStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
export default function Membership(props) {
    const userRef = useRef();
    const [msg, setMsg] = useState("");
    const [table, setTable] = useState([]);
    const [view, setView] = useState(false);
    const { docType } = (props.location && props.location.state) || {};
    function findCustomer(e) {
        e.preventDefault();
        setMsg("");
        setTable([]);
        const user = userRef.current.value;
        Axios.get("/userDetails", {
            params: { idUser: user }
        })
            .then(async (res) => {
                if (res.data.length > 0) {
                    Axios.get("/user")
                    .then(async (resp) => {
                        if(resp.data){
                            Axios.get("/payment/reject", {
                                params:{userId:resp.data.email}
                            })
                            .then(async (response) => {
                                if(response.data.length > 0){
                                    if(response.data[0].estado === "Rechazado"){
                                        setView(true);
                                        return await swal("El balance inicial ha sido rechazado, contacte a su administrado para habilitar el sistema!", {
                                            icon: "error"
                                        });
                                    }else{
                                        setTable(res.data);
                                    }
                                }else{
                                    setView(true);
                                        return await swal("Favor abrir la caja para poder realizar transacciones!", {
                                            icon: "error"
                                        });
                                }
                            })
                            
                        }else{
                            return await swal("No se pudo recuperar la informacion del usuario que actualmente esta utilizando el sistema!", {
                                icon: "error"
                            });
                        }
                    })
                    
                } else {
                    return await swal("No existe ningún usuario asociado al correo electrónico ingresado!", {
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
                label: 'Generar débito',
                field: 'Generar',
                width: 200,
            }],
        rows: table.map((item) => (
            {
                Nombre: item.fName ? (item.fName + " " + item.lName) : "Favor asignar nombre",
                Email: item.email,
                Membresia: item.Membresia ? item.Membresia : "Sin membresía asignada",
                Generar: <Link to={{ pathname: "/Create/Document", state: { _id: item._id, name: item.fName, newPayment: true, email: item.email, lName: item.lName, membership: item.Membresia, document: docType } }} style={{ textDecoration: 'none' }}><button type="button" className="p-2 rounded BotonesColorCrear"><FontAwesomeIcon icon={faPlus} /></button></Link>
            }))
    };
    return (<div>
        <Header />
        <HeaderStatus
            h1="Nota de débito"
            backUrl="/EmpleadoMenuCreditoDebito"
            backName="Menú de crédito y débito"
            currentName="Nota de débito"
        />
        <div className="section-overlay fade-in-card" style={{ marginBottom: "220px" }}>
            <div className="container">
                <div className="row mt-5">
                    <form onSubmit={findCustomer}>
                        {msg && <Alert variant="success">{msg}</Alert>}
                        <div className="col-md-12 p-3 mt-5 ml-4" >
                            <div className="offset-md-2 col-md-7 ">
                                <h3 className="fw-bold text-center para-color ">Buscar cliente para crear una nota de débito</h3>
                            </div>
                            <div className="col-md-12 ml-4">
                                <div className="offset-md-2 col-md-6 float-left mr-0 pr-0">
                                    <input type="email" placeholder="Correo electrónico..." className="form-control mt-4 inputCenter" ref={userRef} required />
                                </div>
                                <div className="col-sm-1 float-left ml-3 pl-0">
                                    <div className="contact-sub-btn mt-4">
                                        <button type="submit" disabled={view} style={{ padding: "5px", width: "100px", backgroundColor: "#e98808" }} className="btn btn-effect section-button"><FontAwesomeIcon icon={faSearch} /></button>
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