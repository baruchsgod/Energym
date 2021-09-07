import React from 'react';
import { Link } from "react-router-dom";
export default function HeaderUser() {
    return (
        <React.Fragment>
            <div style={{ marginLeft: "10px", marginTop: "9px" }}>
                <Link to="/" style={{ textDecoration: 'none', color: "white", fontSize: "18px" }}>INICIO</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/UserMenu" style={{ textDecoration: 'none', color: "white" }}>MENÚ DEL GYM</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/UserMenuCuenta" style={{ textDecoration: 'none', color: "white" }}>MENÚ DE CUENTA</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/ListEvents" style={{ textDecoration: 'none', color: "white" }}>EVENTOS</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/CrearRetroalimentacion" style={{ textDecoration: 'none', color: "white" }}>RETROALIMENTACIÓN</Link>
            </div>
        </React.Fragment>
    )
}

