import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import "bootstrap/dist/css/bootstrap.min.css";
import RoutineCard from "../../components/RoutineStructure";
import RoutineTemplate from "../../components/Routine";
import template from "../../components/RoutineTemplate";
import Axios from "axios";
import _ from "lodash";
import { Alert } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashAlt, faFeatherAlt);
export default function Routine(props) {
    const [name, setName] = useState("");
    const [lname, setLname] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [routine, setRoutine] = useState([]);
    const { _id, newRoutine, email, message } = (props.location && props.location.state) || {};
    let week = [];
    let lunes = {};
    let martes = {};
    let miercoles = {};
    let jueves = {};
    let viernes = {};
    let sabado = {};
    let domingo = {};

    useEffect(() => {
        setError("");
        setMsg("");
        if (newRoutine) {
            Axios.get("/userRoutine", {
                params: { userData: email }
            })
                .then((res) => {
                    if (res.data.length > 0) {
                        localStorage.setItem("name", res.data[0].fName);
                        localStorage.setItem("lName", res.data[0].lName);
                        localStorage.setItem("email", res.data[0].email);
                        localStorage.setItem("mainId", res.data[0]._id);
                        localStorage.setItem("id", res.data[0]._id);
                        localStorage.setItem("option", "1");
                        setName(res.data[0].fName);
                        setLname(res.data[0].lName);
                    } else {
                        setError("Error en el sistema, no se han encontrado ningun cliente, intente mas tarde!");
                    }
                })
        } else {
            Axios.get("/userRoutine/getDetailsbyId", {
                params: { userData: _id }
            })
                .then((res) => {
                    if (res.data.length > 0) {
                        localStorage.setItem("name", res.data[0].nombre);
                        localStorage.setItem("lName", res.data[0].apellido);
                        localStorage.setItem("email", res.data[0].email);
                        localStorage.setItem("mainId", res.data[0]._id);
                        localStorage.setItem("id", res.data[0].cliente);
                        localStorage.setItem("option", "2");
                        setName(res.data[0].nombre);
                        setLname(res.data[0].apellido);
                        setRoutine(res.data[0].Detalles);
                        console.log(res.data[0].Detalles)
                        console.log("este es el id pasado: " + _id);
                    } else {
                        setError("Error en el sistema, no se han encontrado ningun cliente, intente mas tarde!");
                    }
                })
        }
        setMsg(message);
        // eslint-disable-next-line
    }, [])//_id,email, message, newRoutine
    function setRoutines(item, index) {
        switch (item.dia) {
            case "Lunes":
                if (!_.isEmpty(lunes)) {
                    if (item.tipo === "Cardio") { lunes["Cardio"] = true; lunes["detalleC"] = item.detalle; lunes["idC"] = item._id }
                    else if (item.tipo === "Fuerza") { lunes["Fuerza"] = true; lunes["detalleF"] = item.detalle; lunes["idF"] = item._id }
                    else { lunes["Flexibilidad"] = true; lunes["detalleFl"] = item.detalle; lunes["idFl"] = item._id }
                } else {
                    if (item.tipo === "Cardio") { lunes = { Day: "Lunes", Cardio: true, Fuerza: false, Flexibilidad: false, idC: item._id, idF: null, idFl: null, detalleC: item.detalle, detalleF: null, detalleFl: null } }
                    else if (item.tipo === "Fuerza") { lunes = { Day: "Lunes", Cardio: false, Fuerza: true, Flexibilidad: false, idC: null, idF: item._id, idFl: null, detalleC: null, detalleF: item.detalle, detalleFl: null } }
                    else { lunes = { Day: "Lunes", Cardio: false, Fuerza: false, Flexibilidad: true, idC: null, idF: null, idFl: item._id, detalleC: null, detalleF: null, detalleFl: item.detalle } }
                }
                break;
            case "Martes":
                if (!_.isEmpty(martes)) {
                    if (item.tipo === "Cardio") { martes["Cardio"] = true; martes["detalleC"] = item.detalle; martes["idC"] = item._id }
                    else if (item.tipo === "Fuerza") { martes["Fuerza"] = true; martes["detalleF"] = item.detalle; martes["idF"] = item._id }
                    else { martes["Flexibilidad"] = true; martes["detalleFl"] = item.detalle; martes["idFl"] = item._id }
                } else {
                    if (item.tipo === "Cardio") { martes = { Day: "Martes", Cardio: true, Fuerza: false, Flexibilidad: false, idC: item._id, idF: null, idFl: null, detalleC: item.detalle, detalleF: null, detalleFl: null } }
                    else if (item.tipo === "Fuerza") { martes = { Day: "Martes", Cardio: false, Fuerza: true, Flexibilidad: false, idC: null, idF: item._id, idFl: null, detalleC: null, detalleF: item.detalle, detalleFl: null } }
                    else { martes = { Day: "Martes", Cardio: false, Fuerza: false, Flexibilidad: true, idC: null, idF: null, idFl: item._id, detalleC: null, detalleF: null, detalleFl: item.detalle } }
                }
                break;
            case "Miercoles":
                if (!_.isEmpty(miercoles)) {
                    if (item.tipo === "Cardio") { miercoles["Cardio"] = true; miercoles["detalleC"] = item.detalle; miercoles["idC"] = item._id }
                    else if (item.tipo === "Fuerza") { miercoles["Fuerza"] = true; miercoles["detalleF"] = item.detalle; miercoles["idF"] = item._id }
                    else { miercoles["Flexibilidad"] = true; miercoles["detalleFl"] = item.detalle; miercoles["idFl"] = item._id }
                } else {
                    if (item.tipo === "Cardio") { miercoles = { Day: "Miercoles", Cardio: true, Fuerza: false, Flexibilidad: false, idC: item._id, idF: null, idFl: null, detalleC: item.detalle, detalleF: null, detalleFl: null } }
                    else if (item.tipo === "Fuerza") { miercoles = { Day: "Miercoles", Cardio: false, Fuerza: true, Flexibilidad: false, idC: null, idF: item._id, idFl: null, detalleC: null, detalleF: item.detalle, detalleFl: null } }
                    else { miercoles = { Day: "Miercoles", Cardio: false, Fuerza: false, Flexibilidad: true, idC: null, idF: null, idFl: item._id, detalleC: null, detalleF: null, detalleFl: item.detalle } }
                }
                break;
            case "Jueves":
                if (!_.isEmpty(jueves)) {
                    if (item.tipo === "Cardio") { jueves["Cardio"] = true; jueves["detalleC"] = item.detalle; jueves["idC"] = item._id }
                    else if (item.tipo === "Fuerza") { jueves["Fuerza"] = true; jueves["detalleF"] = item.detalle; jueves["idF"] = item._id }
                    else { jueves["Flexibilidad"] = true; jueves["detalleFl"] = item.detalle; jueves["idFl"] = item._id }
                } else {
                    if (item.tipo === "Cardio") { jueves = { Day: "Jueves", Cardio: true, Fuerza: false, Flexibilidad: false, idC: item._id, idF: null, idFl: null, detalleC: item.detalle, detalleF: null, detalleFl: null } }
                    else if (item.tipo === "Fuerza") { jueves = { Day: "Jueves", Cardio: false, Fuerza: true, Flexibilidad: false, idC: null, idF: item._id, idFl: null, detalleC: null, detalleF: item.detalle, detalleFl: null } }
                    else { jueves = { Day: "Jueves", Cardio: false, Fuerza: false, Flexibilidad: true, idC: null, idF: null, idFl: item._id, detalleC: null, detalleF: null, detalleFl: item.detalle } }
                }
                break;
            case "Viernes":
                if (!_.isEmpty(viernes)) {
                    if (item.tipo === "Cardio") { viernes["Cardio"] = true; viernes["detalleC"] = item.detalle; viernes["idC"] = item._id }
                    else if (item.tipo === "Fuerza") { viernes["Fuerza"] = true; viernes["detalleF"] = item.detalle; viernes["idF"] = item._id }
                    else { viernes["Flexibilidad"] = true; viernes["detalleFl"] = item.detalle; viernes["idFl"] = item._id }
                } else {
                    if (item.tipo === "Cardio") { viernes = { Day: "Viernes", Cardio: true, Fuerza: false, Flexibilidad: false, idC: item._id, idF: null, idFl: null, detalleC: item.detalle, detalleF: null, detalleFl: null } }
                    else if (item.tipo === "Fuerza") { viernes = { Day: "Viernes", Cardio: false, Fuerza: true, Flexibilidad: false, idC: null, idF: item._id, idFl: null, detalleC: null, detalleF: item.detalle, detalleFl: null } }
                    else { viernes = { Day: "Viernes", Cardio: false, Fuerza: false, Flexibilidad: true, idC: null, idF: null, idFl: item._id, detalleC: null, detalleF: null, detalleFl: item.detalle } }
                }
                break;
            case "Sabado":
                if (!_.isEmpty(sabado)) {
                    if (item.tipo === "Cardio") { sabado["Cardio"] = true; sabado["detalleC"] = item.detalle; sabado["idC"] = item._id }
                    else if (item.tipo === "Fuerza") { sabado["Fuerza"] = true; sabado["detalleF"] = item.detalle; sabado["idF"] = item._id }
                    else { sabado["Flexibilidad"] = true; sabado["detalleFl"] = item.detalle; sabado["idFl"] = item._id }
                } else {
                    if (item.tipo === "Cardio") { sabado = { Day: "Sabado", Cardio: true, Fuerza: false, Flexibilidad: false, idC: item._id, idF: null, idFl: null, detalleC: item.detalle, detalleF: null, detalleFl: null } }
                    else if (item.tipo === "Fuerza") { sabado = { Day: "Sabado", Cardio: false, Fuerza: true, Flexibilidad: false, idC: null, idF: item._id, idFl: null, detalleC: null, detalleF: item.detalle, detalleFl: null } }
                    else { sabado = { Day: "Sabado", Cardio: false, Fuerza: false, Flexibilidad: true, idC: null, idF: null, idFl: item._id, detalleC: null, detalleF: null, detalleFl: item.detalle } }
                }
                break;
            case "Domingo":
                if (!_.isEmpty(domingo)) {
                    if (item.tipo === "Cardio") { domingo["Cardio"] = true; domingo["detalleC"] = item.detalle; domingo["idC"] = item._id }
                    else if (item.tipo === "Fuerza") { domingo["Fuerza"] = true; domingo["detalleF"] = item.detalle; domingo["idF"] = item._id }
                    else { domingo["Flexibilidad"] = true; domingo["detalleFl"] = item.detalle; domingo["idFl"] = item._id }
                } else {
                    if (item.tipo === "Cardio") { domingo = { Day: "Domingo", Cardio: true, Fuerza: false, Flexibilidad: false, idC: item._id, idF: null, idFl: null, detalleC: item.detalle, detalleF: null, detalleFl: null } }
                    else if (item.tipo === "Fuerza") { domingo = { Day: "Domingo", Cardio: false, Fuerza: true, Flexibilidad: false, idC: null, idF: item._id, idFl: null, detalleC: null, detalleF: item.detalle, detalleFl: null } }
                    else { domingo = { Day: "Domingo", Cardio: false, Fuerza: false, Flexibilidad: true, idC: null, idF: null, idFl: item._id, detalleC: null, detalleF: null, detalleFl: item.detalle } }
                }
                break;
            default:
                break;
        }
        if (index === routine.length - 1) {
            if (_.isEmpty(lunes)) { lunes = { Day: "Lunes", Cardio: false, Fuerza: false, Flexibilidad: false, idC: null, idF: null, idFl: null, detalleC: null, detalleF: null, detalleFl: null } }
            if (_.isEmpty(martes)) { martes = { Day: "Martes", Cardio: false, Fuerza: false, Flexibilidad: false, idC: null, idF: null, idFl: null, detalleC: null, detalleF: null, detalleFl: null } }
            if (_.isEmpty(miercoles)) { miercoles = { Day: "Miercoles", Cardio: false, Fuerza: false, Flexibilidad: false, idC: null, idF: null, idFl: null, detalleC: null, detalleF: null, detalleFl: null } }
            if (_.isEmpty(jueves)) { jueves = { Day: "Jueves", Cardio: false, Fuerza: false, Flexibilidad: false, idC: null, idF: null, idFl: null, detalleC: null, detalleF: null, detalleFl: null } }
            if (_.isEmpty(viernes)) { viernes = { Day: "Viernes", Cardio: false, Fuerza: false, Flexibilidad: false, idC: null, idF: null, idFl: null, detalleC: null, detalleF: null, detalleFl: null } }
            if (_.isEmpty(sabado)) { sabado = { Day: "Sabado", Cardio: false, Fuerza: false, Flexibilidad: false, idC: null, idF: null, idFl: null, detalleC: null, detalleF: null, detalleFl: null } }
            if (_.isEmpty(domingo)) { domingo = { Day: "Domingo", Cardio: false, Fuerza: false, Flexibilidad: false, idC: null, idF: null, idFl: null, detalleC: null, detalleF: null, detalleFl: null } }
            week.push(lunes); week.push(martes); week.push(miercoles); week.push(jueves); week.push(viernes); week.push(sabado); week.push(domingo);
        }
        return (
            <div>
                {week.map((item, index) => (
                    <div>
                        <RoutineCard
                            Key={index}
                            Dia={item.Day}
                            Cardio={item.Cardio}
                            Fuerza={item.Fuerza}
                            Flexibilidad={item.Flexibilidad}
                            IdC={item.idC}
                            IdF={item.idF}
                            IdFl={item.idFl}
                            DetalleC={item.detalleC}
                            DetalleF={item.detalleF}
                            DetalleFl={item.detalleFl}
                            Id={_id}
                        />
                    </div>))}
            </div>
        );
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Modificar rutina"
                backUrl="/findcustomer"
                backName="Buscar Cliente"
                currentName="Modificar rutina"
            />
            <div className="section-overlay mt-5 p-3">
                <div className="container">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {msg && <Alert variant="success">{msg}</Alert>}
                    <div className="card mb-5" style={{ backgroundColor: "#0155a8f5" }}>
                        <div className="card=header ">
                            {newRoutine && <h3 className="card-title mt-3" style={{ textAlign: "center", color: "#F4F4F4" }}>Crear rutina para {name} {lname}</h3>}
                            {!newRoutine && <h3 className="card-title mt-3" style={{ textAlign: "center", color: "#F4F4F4" }}>Modificar rutina para {name} {lname}</h3>}
                            <hr style={{color:"white"}}/>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <h4 className="card-title" style={{ textAlign: "center", color: "#F4F4F4" }}>Día</h4>
                            </div>
                            <div className="col-3">
                                <h4 className="card-title" style={{ textAlign: "center", color: "#F4F4F4" }}>Cardio</h4>
                            </div>
                            <div className="col-3">
                                <h4 className="card-title" style={{ textAlign: "center", color: "#F4F4F4" }}>Fuerza</h4>
                            </div>
                            <div className="col-3">
                                <h4 className="card-title" style={{ textAlign: "center", color: "#F4F4F4" }}>Flexibilidad</h4>
                            </div>
                        </div>
                        <div className="card-body" >
                            {!newRoutine ? routine.map(setRoutines)
                                :
                                <div>
                                    {template.map((item, index) => (
                                        <div>
                                            <RoutineTemplate
                                                Key={index}
                                                Dia={item.day}
                                            />
                                        </div>))}
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





