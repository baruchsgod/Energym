import React, { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import swal from 'sweetalert';
import HeaderStatus from "../../components/HeaderStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
export default function Diet(props) {
    const userRef = useRef();
    const [create, setCreate] = useState("");
    const [table, setTable] = useState([]);
    const [data, setData] = useState([]);
    const { message, newDiet } = (props.location && props.location.state) || {};
    const deleteRef = useRef();
    useEffect(() => {
        if (newDiet) swal("Proceso exitoso", message, "success")
    }, [newDiet, message])
    function deleteDiet(e,item) {
        e.preventDefault();
        swal({
            title: "Estás seguro?",
            text: "Una vez eliminada la dieta se perderá para siempre!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.post("/userDiet/deleteDiet", { id: item._id })
                        .then(async response => {
                            if (response.data.icon === 'El usuario fue actualizado')
                                return await swal("La dieta ha sido eliminada correctamente!", {
                                    icon: "success"
                                });
                            await findCustomer(e);
                        });
                }
            });
    }
    function findCustomer(e) {
        e.preventDefault();
        setCreate("");
        setTable([]);
        const user = userRef.current.value;
        Axios.get("/userDiet", {
            params: { userData: user }
        })
            .then((res) => {
                if (res.data.length > 0) {
                    setData(res.data);
                    Axios.get("/userDiet/getDetails", {
                        params: { userData: user }
                    })
                        .then((response) => {
                            if (response.data.length > 0) {
                                setTable(response.data);
                            } else {
                                setCreate("create");
                                return swal("Usuario no tiene dietas, favor proceda a crear una!", {
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
                label: "Dieta ID",
                field: "Dieta_ID",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Nombre',
                field: 'Nombre',
                width: 270,
            },
            {
                label: 'Tipo Dieta',
                field: 'Tipo_Dieta',
                width: 200,
            },
            {
                label: 'Modificar dieta',
                field: 'Modificar',
                width: 200,
            },
            {
                label: 'Eliminar dieta',
                field: 'Eliminar',
                width: 200,
            }
        ],
        rows: table.map((item, index) => (
            {
                Dieta_ID: index + 1,
                Nombre: (item.nombre + " " + item.apellido),
                Tipo_Dieta: item.tipoDieta,
                Modificar: <Link to={{ pathname: "/Diet/Edit", state: { _id: item._id, id: item.cliente, newRoutine: false, email: item.email, name: item.nombre, lname: item.apellido, message: "" } }} style={{ textDecoration: 'none' }}><button type="button" className="p-2 rounded BotonesColorModificar"><FontAwesomeIcon icon={faEdit} /></button></Link>,
                Eliminar: <div><button onClick={(e) => deleteDiet(e, item)} type="button" className="p-2 rounded BotonesColorEliminar" ref={deleteRef} value={item._id}><FontAwesomeIcon icon={faTrashAlt} /></button></div>
            }))
    };
    return (<div>
        <Header />
        <HeaderStatus
            h1="Modificar dietas"
            backUrl="/EmpleadoMenuEntrenador"
            backName="Menú de entrenador"
            currentName="Modificar dietas"
        />
        <div className="section-overlay fade-in-card" style={{ marginBottom: "220px" }}>
            <div className="container">
                <div className="row mt-5">
                    <form onSubmit={findCustomer}>
                        <div className="col-md-12 p-3 mt-5 ml-4" >
                            <div className="offset-md-2 col-md-7 ">
                                <h3 className="fw-bold text-center para-color ">Buscar las dietas del cliente</h3>
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
                                <div className="row ">
                                    <div className="col-sm-12 mt-4 fade-in-card">
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
                                                infoLabel={["Mostrando de", "a", "de", "dietas"]}
                                                paginationLabel={["Anterior", "Siguiente"]}
                                                noRecordsFoundLabel="No existen dietas para mostrar..."
                                                searchLabel="Buscar"
                                                entriesLabel="Filas por página"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 bmi-box">
                                    <div className="contact-sub-btn w-100 text-center mt-5">
                                        <Link to={{ pathname: "/Diet/Edit", state: { _id: data[0]._id, id: data[0]._id, newRoutine: true, email: data[0].email, name: data[0].fName, lname: data[0].lName, message: "" } }} style={{ textDecoration: 'none', margin: '3% auto' }}><button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Crear dieta</button></Link>
                                    </div>
                                </div>
                            </div>
                        }
                        {create &&
                            <div className="col-sm-12 bmi-box">
                                <div className="contact-sub-btn w-100 text-center mt-5">
                                    <Link to={{ pathname: "/Diet/Edit", state: { _id: data[0]._id, id: data[0]._id, newRoutine: true, email: data[0].email, name: data[0].fName, lname: data[0].lName, message: "" } }} style={{ textDecoration: 'none', margin: '3% auto' }}><button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Crear dieta</button></Link>
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