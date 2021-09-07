import React, { useEffect, useState } from 'react';
import InvoiceTemplate from "../../components/InvoiceTemplate";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
export default function DocumentView(props) {
    const { monto, numDocumento, tipoDoc, iva, cliente, fecha } = (props.location && props.location.state) || {};
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [lname, setLname] = useState("");
    const [detalle, setDetalle] = useState("");
    const [province, setProvince] = useState("");
    const [postal, setPostal] = useState("");
    const [membership, setMembership] = useState("");
    useEffect(() => {
        setError("");
        Axios.get("/userDetails", { params: { idUser: cliente } })
            .then((res) => {
                if (res.data.length > 0) {
                    setName(res.data[0].fName);
                    setLname(res.data[0].lName);
                    setDetalle(res.data[0].Direccion.Detalle);
                    setProvince(res.data[0].Direccion.Provincia);
                    setPostal(res.data[0].Direccion.CodigoPostal);
                    setMembership(res.data[0].Membresia);
                } else {
                    setError("Ha existido un error en la conexión a la base de datos")
                }
            })
    }, [cliente])
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Visualizar documento"
                backUrl={localStorage.getItem("tipoCuenta") === "Cliente" ? "/ListUserDocuments" : "/Payment/Find"}
                backName={localStorage.getItem("tipoCuenta") === "Cliente" ? "Lista de facturas" : "Buscar Documento"}
                currentName="Visualizar documento"
            />
            <div className="container">
                {error ?? error}
            </div>
            <InvoiceTemplate
                tipoDoc={tipoDoc}
                fecha={fecha}
                iva={iva}
                monto={monto}
                numDocumento={numDocumento}
                name={name}
                lName={lname}
                detalle={detalle}
                province={province}
                postal={postal}
                membership={membership}
                email={cliente}
            />
            <Footer />
        </div>
    )
}


