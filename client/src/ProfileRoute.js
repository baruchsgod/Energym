import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProfileRoute({ component: Component, ...rest }){
    
    function getAccess(){
        const isAuth = localStorage.getItem("isAuth");
        const tipoCuenta = localStorage.getItem("tipoCuenta");

        if(isAuth && tipoCuenta === "Administrador"){
            return true;
        }else{
            return false;
        }
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                getAccess() ? <Component {...props} /> : <Redirect to="/NotAuthorize" />}
        />


    );
}