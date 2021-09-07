import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import swal from "sweetalert";
export default function AutomaticJob() {
    const [user, setUser] = useState();
    const [button, setButton] = useState(false);
    useEffect(() => {
        Axios.get("/userData")
            .then((res) => {
                setUser(res.data.email);
            })
        Axios.get("/payment/getJob")
            .then(async (res) => {
                if (res.data.length > 0) {
                    setButton(true);
                    await swal("Ya se ha generado un job automático el día de hoy por el usuario " + res.data[0].usuario + "!", {
                        icon: "error"
                    });
                }
            })
    }, [])
    function createJob(e) {
        e.preventDefault();
        swal({
            title: "Estás seguro?",
            text: "Se confirmará que el balance de la caja es correcto!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then(async (value) => {
                if (value) {
                    Axios.post("/payment/postJob")
                        .then(async (res) => {
                            if (res.data.length > 0) {
                                setButton(true);
                                return await swal("El job de creación de facturas se ha generado con éxito!", {
                                    icon: "success"
                                });

                            } else {
                                return await swal("Se ha generado un error en el job de creación de facturas, contacte a su administrador!", {
                                    icon: "error"
                                });

                            }
                        });
                } else {
                    await swal("Has elegido no correr el job automático de la generación de facturas!", {
                        icon: "warning"
                    });
                }
            })

    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Job de facturación"
            backUrl="/EmpleadoMenuCaja"
            backName="Menú de caja"
            currentName="Job de facturación"
        />
        <div className="section-overlay fade-in-card" style={{ marginBottom: "240px" }}>
            <div className="container">
                <div className="row mt-5">
                    <form onSubmit={createJob}>
                        <div className="col-md-12 p-3 mt-5 ml-4" >
                            <div className="offset-md-2 col-md-7 ">
                                <h3 className="fw-bold text-center para-color ">Usuario que registrará el job de creación de facturas</h3>
                            </div>
                            <div className="col-md-12 ml-4">
                                <div className="offset-md-2 col-md-6 float-left mr-0 pr-0">
                                    <input type="email" placeholder="Correo electrónico..." className="form-control mt-4 inputCenter" disabled={true} value={user} required />
                                </div>
                                <div className="col-sm-1 float-left ml-3 pl-0">
                                    <div className="contact-sub-btn mt-4">
                                        <button type="submit" style={{ padding: "5px", width: "100px", backgroundColor: "#e98808" }} disabled={button} className="btn btn-effect section-button">Generar job</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}