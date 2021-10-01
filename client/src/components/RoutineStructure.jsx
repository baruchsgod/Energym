import React from 'react';
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import Axios from "axios";
library.add(faTrashAlt, faFeatherAlt);


export default function RoutineStructure(props) {
    let completo = false;
    if(props.Cardio && props.Fuerza && props.Flexibilidad){
        completo = true;
    };

    function deleteRoutine(id, day, type){
        const idRemove = {
            id:id
        };
        swal({
            title: "Estás seguro?",
            text: "La rutina de "+type+" del dia "+day+" se perderá para siempre!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
        .then(async (value) => {
            if (value) {
                Axios.post("https://energymproject.herokuapp.com/userRoutine/deleteOneRoutine", idRemove)
                    .then(async (res) => {
                        if (res.data.length === 2) {
                            await swal("La rutina de "+type+" del dia "+day+" se ha borrado exitosamente!", {
                                icon: "success"
                            });
                            window.location.reload();
                        } else {
                            return await swal("Ha existido un error en el borrado de la rutina", {
                                icon: "error"
                            });
                        }
                    })
            } else {
                return await swal("Has elegido no borrar la rutina!", {
                    icon: "warning"
                });
            }
        })
    }

    return (
        <div>
            <div className="row rowMargin">
                <div className="col-3">
                    <div class="card" >
                        <div className="card-header" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#374045" }}>
                            {completo ? <span class="badge badge-success badge-pill px-25">Completo</span> :<span class="badge badge-warning badge-pill px-25">Incompleto</span>}
                        </div>
                        <div class="card-body" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#B4A5A5" }}>
                            <h6>{props.Dia}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div class="card">
                        <div className="card-header" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#374045" }}>
                        {props.Cardio ? <span class="badge badge-success badge-pill px-25">Completo</span> :<span class="badge badge-warning badge-pill px-25">Incompleto</span>}
                        </div>
                        <div className="card-body" style={{ color: "#F4F4F4", backgroundColor: "#B4A5A5" }}>
                            <div className="row">
                                {props.Cardio ?
                                    <div className="col-6" style={{ borderRight: "1px solid #151515", textAlign: "center" }}><Link to={{ pathname: "/Routine/Edit", state: { day: props.Dia, routine: "Cardio", _ids:props.IdC, ids:props.Id, detalle:props.DetalleC, newRoutines:false } }} style={{ color: "#F4F4F4" }}><FontAwesomeIcon icon={faFeatherAlt} /></Link></div> 
                                :
                                <div className="col-6" style={{ borderRight: "1px solid #151515", textAlign: "center" }}><Link to={{ pathname: "/Routine/Edit", state: { day: props.Dia, routine: "Cardio", newRoutines:true } }} style={{ color: "#F4F4F4" }}><FontAwesomeIcon icon={faFeatherAlt} /></Link></div>}
                                {props.Cardio ? <div className="col-6" style={{ textAlign: "center" }}><button type="button" onClick={(e) => deleteRoutine(props.IdC, props.Dia, "Cardio")} style={{color:"#F4F4F4"}}><FontAwesomeIcon disabled={!props.Flexibilidad} icon={faTrashAlt} /></button></div>
                                :<div className="col-6" style={{ textAlign: "center" }}><button disabled={true} ><FontAwesomeIcon disabled={!props.Flexibilidad} icon={faTrashAlt} /></button></div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div class="card">
                        <div className="card-header" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#374045" }}>
                        {props.Fuerza ? <span class="badge badge-success badge-pill px-25">Completo</span> :<span class="badge badge-warning badge-pill px-25">Incompleto</span>}
                        </div>
                        <div className="card-body" style={{ color: "#F4F4F4", backgroundColor: "#B4A5A5" }}>
                            <div className="row">
                            {props.Fuerza ?
                                    <div className="col-6" style={{ borderRight: "1px solid #151515", textAlign: "center" }}><Link to={{ pathname: "/Routine/Edit", state: { day: props.Dia, routine: "Fuerza", _ids:props.IdF, ids:props.Id, detalle:props.DetalleF, newRoutines:false } }} style={{ color: "#F4F4F4" }}><FontAwesomeIcon icon={faFeatherAlt} /></Link></div> 
                                :
                                <div className="col-6" style={{ borderRight: "1px solid #151515", textAlign: "center" }}><Link to={{ pathname: "/Routine/Edit", state: { day: props.Dia, routine: "Fuerza", newRoutines:true } }} style={{ color: "#F4F4F4" }}><FontAwesomeIcon icon={faFeatherAlt} /></Link></div>}
                                {props.Fuerza ? <div className="col-6" style={{ textAlign: "center" }}><button type="button" onClick={(e) => deleteRoutine(props.IdF, props.Dia, "Fuerza")} style={{color:"#F4F4F4"}}><FontAwesomeIcon disabled={!props.Flexibilidad} icon={faTrashAlt} /></button></div>
                                :<div className="col-6" style={{ textAlign: "center" }}><button disabled={true} ><FontAwesomeIcon disabled={!props.Flexibilidad} icon={faTrashAlt} /></button></div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div class="card">
                        <div className="card-header" style={{ textAlign: "center", color: "#F4F4F4", backgroundColor: "#374045" }}>
                        {props.Flexibilidad ? <span class="badge badge-success badge-pill px-25">Completo</span> :<span class="badge badge-warning badge-pill px-25">Incompleto</span>}
                        </div>
                        <div className="card-body" style={{ color: "#F4F4F4", backgroundColor: "#B4A5A5" }}>
                            <div className="row">
                            {props.Flexibilidad ?
                                    <div className="col-6" style={{ borderRight: "1px solid #151515", textAlign: "center" }}><Link to={{ pathname: "/Routine/Edit", state: { day: props.Dia, routine: "Flexibilidad", _ids:props.IdFl, ids:props.Id, detalle:props.DetalleFl, newRoutines:false } }} style={{ color: "#F4F4F4" }}><FontAwesomeIcon icon={faFeatherAlt} /></Link></div> 
                                :
                                <div className="col-6" style={{ borderRight: "1px solid #151515", textAlign: "center" }}><Link to={{ pathname: "/Routine/Edit", state: { day: props.Dia, routine: "Flexibilidad", newRoutines:true } }} style={{ color: "#F4F4F4" }}><FontAwesomeIcon icon={faFeatherAlt} /></Link></div>}
                                {props.Flexibilidad ? <div className="col-6" style={{ textAlign: "center" }}><button type="button" onClick={(e) => deleteRoutine(props.IdFl, props.Dia, "Flexibilidad")} style={{color:"#F4F4F4"}}><FontAwesomeIcon disabled={!props.Flexibilidad} icon={faTrashAlt} /></button></div>
                                :<div className="col-6" style={{ textAlign: "center" }}><button disabled={true} ><FontAwesomeIcon disabled={!props.Flexibilidad} icon={faTrashAlt} /></button></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


