import React, {useEffect} from "react";
import Axios from "axios";

export default function GetGoogleLogin(){
    useEffect(() => {
        Axios.get("/user")
        .then((res) => {
            localStorage.setItem("isAuth", true);
            localStorage.setItem("tipoCuenta", res.data.TipoCuenta);/////guardo el tipo de la cuenta para que pueda acceder a ciertos lugares
            localStorage.setItem("userName", res.data.fName + " " + res.data.lName);
            if (res.data.TipoCuenta === 'Cliente') { window.location = "/" }
            else if (res.data.TipoCuenta === 'Empleado') { window.location = "/InicioEmpleado" }
            else if (res.data.TipoCuenta === 'Administrador') { window.location = "/InicioAdmin" }
            else {window.location = "/"}
        })
    }, []);
    return(
        <div>

        </div>
    );
}