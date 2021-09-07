import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import HeaderStatus from "../../components/HeaderStatus";
import Balance from "../../components/Balance";
export default function BalanceInitial(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        Axios.get("/userData")
            .then((res) => {
                setName(res.data.fName);
                setEmail(res.data.email)
            })
    }, [])
    return (<div>
        <Header />
        <HeaderStatus
            h1="Asignar balance inicial"
            backUrl="/EmpleadoMenuCaja"
            backName="Menú de caja"
            currentName="Asignar balance inicial"
        />
        <Balance
            name={name}
            email={email}
        />
        <Footer />
    </div>);
}