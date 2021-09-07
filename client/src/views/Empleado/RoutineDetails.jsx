import React from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import ReportCard from "../../components/ReportTemplate";
export default function RoutineDetails(props) {
    const { routines, name, lname } = (props.location && props.location.state) || {};
    let Monday = ["Lunes", "Sin Rutina", "Sin Rutina", "Sin Rutina"];
    let Tuesday = ["Martes", "Sin Rutina", "Sin Rutina", "Sin Rutina"];
    let Wednesday = ["Miercoles", "Sin Rutina", "Sin Rutina", "Sin Rutina"];
    let Thursday = ["Jueves", "Sin Rutina", "Sin Rutina", "Sin Rutina"];
    let Friday = ["Viernes", "Sin Rutina", "Sin Rutina", "Sin Rutina"];
    let Saturday = ["Sabado", "Sin Rutina", "Sin Rutina", "Sin Rutina"];
    let Sunday = ["Domingo", "Sin Rutina", "Sin Rutina", "Sin Rutina"];
    let all = [];
    let routineLenght = routines.length;
    function CreateRoutine(item, index) {
        switch (item.dia) {
            case "Lunes":
                if (item.tipo === "Cardio") {
                    Monday[1] = item.detalle;
                } else if (item.tipo === "Fuerza") {
                    Monday[2] = item.detalle;
                } else {
                    Monday[3] = item.detalle;
                }
                break;
            case "Martes":
                if (item.tipo === "Cardio") {
                    Tuesday[1] = item.detalle;
                } else if (item.tipo === "Fuerza") {
                    Tuesday[2] = item.detalle;
                } else {
                    Tuesday[3] = item.detalle;
                }
                break;
            case "Miercoles":
                if (item.tipo === "Cardio") {
                    Wednesday[1] = item.detalle;
                } else if (item.tipo === "Fuerza") {
                    Wednesday[2] = item.detalle;
                } else {
                    Wednesday[3] = item.detalle;
                }
                break;
            case "Jueves":
                if (item.tipo === "Cardio") {
                    Thursday[1] = item.detalle;
                } else if (item.tipo === "Fuerza") {
                    Thursday[2] = item.detalle;
                } else {
                    Thursday[3] = item.detalle;
                }
                break;
            case "Viernes":
                if (item.tipo === "Cardio") {
                    Friday[1] = item.detalle;
                } else if (item.tipo === "Fuerza") {
                    Friday[2] = item.detalle;
                } else {
                    Friday[3] = item.detalle;
                }
                break;
            case "Sabado":
                if (item.tipo === "Cardio") {
                    Saturday[1] = item.detalle;
                } else if (item.tipo === "Fuerza") {
                    Saturday[2] = item.detalle;
                } else {
                    Saturday[3] = item.detalle;
                }
                break;
            case "Domingo":
                if (item.tipo === "Cardio") {
                    Sunday[1] = item.detalle;
                } else if (item.tipo === "Fuerza") {
                    Sunday[2] = item.detalle;
                } else {
                    Sunday[3] = item.detalle;
                }
                break;
            default:
                break;
        }
        if (index === routineLenght - 1) {
            if (Monday[1] !== "Sin Rutina" || Monday[2] !== "Sin Rutina" || Monday[3] !== "Sin Rutina") {
                let monday = { Day: "Lunes", Cardio: Monday[1], Fuerza: Monday[2], Flexibilidad: Monday[3] };
                all.push(monday);
            }
            if (Tuesday[1] !== "Sin Rutina" || Tuesday[2] !== "Sin Rutina" || Tuesday[3] !== "Sin Rutina") {
                let monday = { Day: "Martes", Cardio: Tuesday[1], Fuerza: Tuesday[2], Flexibilidad: Tuesday[3] };
                all.push(monday);
            }
            if (Wednesday[1] !== "Sin Rutina" || Wednesday[2] !== "Sin Rutina" || Wednesday[3] !== "Sin Rutina") {
                let monday = { Day: "Miercoles", Cardio: Wednesday[1], Fuerza: Wednesday[2], Flexibilidad: Wednesday[3] };
                all.push(monday);
            }
            if (Thursday[1] !== "Sin Rutina" || Thursday[2] !== "Sin Rutina" || Thursday[3] !== "Sin Rutina") {
                let monday = { Day: "Jueves", Cardio: Thursday[1], Fuerza: Thursday[2], Flexibilidad: Thursday[3] };
                all.push(monday);
            }
            if (Friday[1] !== "Sin Rutina" || Friday[2] !== "Sin Rutina" || Friday[3] !== "Sin Rutina") {
                all.push({ Day: "Viernes", Cardio: Friday[1], Fuerza: Friday[2], Flexibilidad: Friday[3] });
            }
            if (Saturday[1] !== "Sin Rutina" || Saturday[2] !== "Sin Rutina" || Saturday[3] !== "Sin Rutina") {
                let monday = { Day: "Sabado", Cardio: Saturday[1], Fuerza: Saturday[2], Flexibilidad: Saturday[3] };
                all.push(monday);
            }
            if (Sunday[1] !== "Sin Rutina" || Sunday[2] !== "Sin Rutina" || Sunday[3] !== "Sin Rutina") {
                let monday = { Day: "Domingo", Cardio: Sunday[1], Fuerza: Sunday[2], Flexibilidad: Sunday[3] };
                all.push(monday);
            }
        }
        return (
            <div>
                {all.map((item, index) => (
                    <div>
                        <ReportCard
                            Key={index}
                            Day={item.Day}
                            Cardio={item.Cardio}
                            Fuerza={item.Fuerza}
                            Flexibilidad={item.Flexibilidad}
                        />
                    </div>))}
            </div>
        );
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Visualizar rutina"
                backUrl={localStorage.getItem("tipoCuenta") === "Empleado" ? "/findroutine" : "/ListUserRoutines"}
                backName={localStorage.getItem("tipoCuenta") === "Empleado" ? "Buscar rutinas" : "Lista de rutinas"}
                currentName="Visualizar rutina"
            />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 p-5 mb-3 fade-in-card">
                        <div className="col-md-12 p-4 rounded" style={{ backgroundColor: "rgba(4,70,146)" }}>
                            <h4 className="routineFont mt-3" style={{ color: "#EEEEEE" }}>Rutina de entrenamiento de {name} {lname}</h4>
                        </div>
                        {routines.length > 0 ?
                            <div className="col-md-12">
                                <div className="row rounded" style={{ backgroundColor: " #ff962e " }}>
                                    <div className="col-3" style={{ borderRight: "2px dotted #171010" }}>
                                        <p className="routineFont pt-2">Día</p>
                                    </div>
                                    <div className="col-3" style={{}}>
                                        <p className="routineFont pt-2">Cardio</p>
                                    </div>
                                    <div className="col-3" style={{}}>
                                        <p className="routineFont pt-2">Fuerza</p>
                                    </div>
                                    <div className="col-3" style={{}}>
                                        <p className="routineFont pt-2">Flex</p>
                                    </div>
                                </div>
                                {routines.map(CreateRoutine)}
                            </div>
                            :
                            <div>
                                {/*
                                <main class="container">
                                    <div class="bg-light p-5 rounded fade-in-card">
                                        <h1>No tiene rutinas</h1>
                                        <p class="lead">Proceda a crear una rutina para desplegar información en este módulo.</p>
                                        <a class="btn btn-lg btn-primary" href="/docs/5.0/components/navbar/" role="button">Ir a crear rutinas</a>
                                    </div>
                                </main>
                                */}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}