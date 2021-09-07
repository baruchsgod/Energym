import React from 'react';
import { Link } from "react-router-dom";
export default function HeaderUser() {
    return (
        <React.Fragment>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/InicioEmpleado" style={{ textDecoration: 'none', color: "white" }}>INICIO</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/EmpleadoMenuGeneral" style={{ textDecoration: 'none', color: "white" }}>GENERAL</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/EmpleadoMenuEntrenador" style={{ textDecoration: 'none', color: "white" }}>ENTRENADOR</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/EmpleadoMenuRecepcionista" style={{ textDecoration: 'none', color: "white" }}>RECEPCIONISTA</Link>
            </div>        
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/UserSettings" style={{ textDecoration: 'none', color: "white" }}>CUENTA</Link>
            </div>         
        </React.Fragment>
    )
}

