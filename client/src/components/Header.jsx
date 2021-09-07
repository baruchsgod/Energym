import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
import Axios from "axios";
import HeaderCliente from "./HeaderCliente";
import HeaderAdmin from "./HeaderAdmin";
import HeaderEmpleado from "./HeaderEmpleado";
library.add(faCoffee, faSignOutAlt);
export default function Header() {
    const logOut = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/logout",
        }).then((res) => {
            if (res.data) {
                localStorage.clear();
                window.location = "/Login";
            }
        })
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top d-none d-sm-none d-md-block d-lg-block d-xl-block"
            id="mainNav">
            <div className="container">
                {localStorage.getItem('tipoCuenta') === 'Cliente' ? <HeaderCliente /> : ''}
                {localStorage.getItem('tipoCuenta') === 'Administrador' ? <HeaderAdmin /> : ''}
                {localStorage.getItem('tipoCuenta') === 'Empleado' ? <HeaderEmpleado /> : ''}
                <div className=" navbar-collapse mt-1">
                    <ul className="navbar-nav ml-auto">
                        <ul className="navbar-nav ml-auto">
                            <p style={{ color: "white", marginTop: "10px", fontSize: "18px", marginRight: "15px" }}>{localStorage.getItem('userName') ? "¡Hola " + localStorage.getItem('userName') + "!" : "Sin sesión activa..."}</p>
                        </ul>
                        <li>
                            <Button type="button" style={{ backgroundColor: "transparent", borderColor: "transparent", fontSize: "17px" }} onClick={logOut}><FontAwesomeIcon icon={faSignOutAlt} /> SALIR</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

