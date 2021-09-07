import React, { useState, useEffect } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import swal from 'sweetalert';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import Axios from "axios";
export default function ListEvents() {
    const [dataAccounts, setDataAccounts] = useState([]);
    useEffect(() => {
        if (dataAccounts.length === 0) {
            fetch('/adminAccountsClient')
                .then(response => response.json())
                .then(data => setDataAccounts(data));
        }
    });
    // Funcion que verifica en que estado se encuentra la cuenta para realizar cambio de estado.
    function activarCuenta(idUser, estado, e) {
        e.preventDefault();
        const cuenta = { idUser, estado };
        swal({
            title: "Estás seguro que deseas cambiar el estado de la cuenta?",
            text: "Una vez desactivada la cuenta el usuario no podra ingresar al sistema!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.post("/estadoCuenta", cuenta)
                        .then(response => {
                            if (response.data.icon === 'success')
                                setDataAccounts([]);
                            return swal("El estado de la cuenta fue actualizado correctamente!", {
                                icon: "success"
                            });
                        });
                }
            });
    }
    function desactivarCuenta(idUser, estado, e) {
        e.preventDefault();
        const cuenta = { idUser, estado };
        swal({
            title: "Estás seguro que deseas cambiar el estado de la cuenta?",
            text: "Una vez activada la cuenta el usuario podra ingresar al sistema!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.post("/estadoCuenta", cuenta)
                        .then(response => {
                            if (response.data.icon === 'success')
                                setDataAccounts([]);
                            return swal("El estado de la cuenta fue actualizado correctamente!", {
                                icon: "success"
                            });
                        });
                }
            });
    }
    const datatable = {
        columns: [
            {
                label: 'Estado',
                field: 'Estado',
                width: 100,
            },
            {
                label: "Correo electrónico",
                field: "Email",
                width: 50,
            },
            {
                label: 'Nombre',
                field: 'Nombre',
                width: 50,
            },
            {
                label: 'Cambio de estado',
                field: 'Desactivar',
                width: 100,
            }],
        rows: dataAccounts.map((item) => (
            {
                ID: item._id,
                Estado: item.EstadoCuenta,
                Email: item.email,
                Nombre: item.fName + " " + item.lName,
                Telefono: item.Telefono,
                Postal: item.Direccion.CodigoPostal,
                Desactivar: item.EstadoCuenta === "Inactivo" ?
                    <Button onClick={(e) => activarCuenta(item._id, item.EstadoCuenta, e)} type="button" className="BotonesColorCrear"><FontAwesomeIcon icon={faUnlock} /> Activar</Button> :
                    <Button onClick={(e) => desactivarCuenta(item._id, item.EstadoCuenta, e)} type="button" className="BotonesColorEliminar"><FontAwesomeIcon icon={faLock} /> Desactivar</Button>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de clientes"
                backUrl="/EmpleadoMenuGeneral"
                backName="Menú general"
                currentName="Lista de clientes"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container" style={{ marginRigth: "100px" }}>
                    <div className="row">
                        <div className="row">
                            <div className="row mb-3 mt-3">
                                <div className="col-sm-12">
                                    <h2 className="para-color mb-3">Lista de clientes registrados</h2>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 mt-4">
                                <div className="bmi-box">
                                    <MDBDataTableV5
                                        hover entriesOptions={[5, 20, 25]}
                                        entries={5}
                                        pagesAmount={4}
                                        data={datatable}
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
                </div>
            </section>
            <Footer />
        </div >
    );
}





