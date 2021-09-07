import React from 'react';
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faTrashAlt, faFeatherAlt);


export default function Routine(props) {
    return (
        <div>
            <div className="row rowMargin">
                <div className="col-3">
                    <div className="card" >
                        <div className="card-header" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#374045" }}>
                            <span className="badge badge-warning badge-pill px-25">Incompleto</span> 
                        </div>
                        <div className="card-body" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#B4A5A5" }}>
                            <h6>{props.Dia}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-header" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#374045" }}>
                       <span className="badge badge-warning badge-pill px-25">Incompleto</span>
                        </div>
                        <div className="card-body" style={{ color: "#F4F4F4", backgroundColor: "#B4A5A5" }}>
                            <div className="row">
                                <div className="col-6" style={{ borderRight: "1px solid #151515", textAlign: "center" }}><Link to={{ pathname: "/Routine/Edit", state: { day: props.Dia, routine: "Cardio", newRoutines:true } }} style={{ color: "#F4F4F4" }}><FontAwesomeIcon icon={faFeatherAlt} /></Link></div>
                                <div className="col-6" style={{ textAlign: "center" }}><button disabled={true} type="button" ><FontAwesomeIcon  icon={faTrashAlt} /></button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-header" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#374045" }}>
                        <span className="badge badge-warning badge-pill px-25">Incompleto</span>
                        </div>
                        <div className="card-body" style={{ color: "#F4F4F4", backgroundColor: "#B4A5A5" }}>
                            <div className="row">
                                <div className="col-6" style={{ borderRight: "1px solid #151515", textAlign: "center" }}><Link to={{ pathname: "/Routine/Edit", state: { day: props.Dia, routine: "Fuerza", newRoutines:true } }} style={{ color: "#F4F4F4" }}><FontAwesomeIcon icon={faFeatherAlt} /></Link></div>
                                <div className="col-6" style={{ textAlign: "center" }}><button disabled={true} ><FontAwesomeIcon disabled={true} icon={faTrashAlt} /></button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-header" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#374045" }}>
                        <span className="badge badge-warning badge-pill px-25">Incompleto</span>
                        </div>
                        <div className="card-body" style={{ color: "#F4F4F4", backgroundColor: "#B4A5A5" }}>
                            <div className="row">
                                <div className="col-6" style={{ borderRight: "1px solid #151515", textAlign: "center" }}><Link to={{ pathname: "/Routine/Edit", state: { day: props.Dia, routine: "Flexibilidad", newRoutines:true } }} style={{ color: "#F4F4F4" }}><FontAwesomeIcon icon={faFeatherAlt} /></Link></div>
                                <div className="col-6" style={{ textAlign: "center" }}><button disabled={true} ><FontAwesomeIcon disabled={true} icon={faTrashAlt} /></button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


