import React from "react";
import { Link } from "react-router-dom";

export default function NotAuthorize(){
    return(
        <div style={{backgroundColor:"#035397", width:"100%", height:"1000px", margin:"0px"}}>
            <div className="text-center container" style={{margin:"auto auto", paddingTop:"10%"}}>
                <h3 style={{color:"#FFAA4C"}}>Ha ingresado a un sitio no autorizado, es imposible el acceso.</h3>
                <p><Link to="/GoogleLogin">Regresar al inicio</Link></p>
                <img src="https://media.giphy.com/media/l41ofhO7rXV9WFECQ/giphy.gif" alt="Not Authorized"></img>
            </div>
        </div>
    );
}