import React from 'react';
import { Link } from "react-router-dom";
export default function HeaderUser() {
    return (
        <React.Fragment>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/InicioAdmin" style={{ textDecoration: 'none', color: "white" }}>INICIO</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/AdminMenuGeneral" style={{ textDecoration: 'none', color: "white" }}>GENERAL</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/AdminMenuPagos" style={{ textDecoration: 'none', color: "white" }}>FINANZAS</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/AdminMenuUsuarios" style={{ textDecoration: 'none', color: "white" }}>USUARIOS</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/AdminMenuReporte" style={{ textDecoration: 'none', color: "white" }}>REPORTE</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/UserSettings" style={{ textDecoration: 'none', color: "white" }}>CUENTA</Link>
            </div>
        </React.Fragment>
    )
}

