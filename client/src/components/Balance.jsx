import React, { useState } from "react";
import swal from 'sweetalert';
import Axios from "axios";
import { useHistory } from "react-router-dom";
export default function Balance(props) {
    const [montoSta, setMontoSta] = useState(0);
    const history = useHistory();
    async function assignBalance(e) {
        e.preventDefault();
        const emailUser = props.email;
        if (montoSta >= 0 && montoSta <= 20000 && montoSta) {
            Axios.post("/balance/asignar", { email: emailUser, saldoInicial: montoSta })
                .then(async response => {
                    if (response.data.length > 0) {
                        await swal("El balance inicial ha sido asignado correctamente!", { icon: "success" });
                        history.push("/EmpleadoMenuCaja");
                    } else {
                        return await swal("El monto para generar el balance inicial debe ser mayor a ₡0.00 y menor a ₡20,000.00!", {
                            icon: "error"
                        });
                    }
                })
        } else {
            return await swal("El monto para generar el balance inicial debe ser mayor a ₡0.00 y menor a ₡20,000.00!", {
                icon: "error"
            });
        }
    }
    return (
        <div>
            <section className="credit-card fade-in-card">
                <div className="container">
                    <div className="card-holder">
                        <div className="card-box bg-news">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="img-box">
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <form>
                                        <div className="card-details">
                                            <h3 className="title">Establecer Balance Inicial de la Caja Chica</h3>
                                            <div className="row">
                                                <div className="form-group col-sm-6">
                                                    <div className="inner-addon right-addon">
                                                        <label htmlFor="card-holder">Usuario:</label>
                                                        <i className="far fa-user"></i>
                                                        <input id="card-holder" type="text" className="form-control" value={props.email} aria-label="Card Holder" aria-describedby="basic-addon1" disabled />
                                                    </div>
                                                </div>
                                                <div className="form-group col-sm-6">
                                                    <label htmlFor="">Nombre</label>
                                                    <div className="input-group expiration-date">
                                                        <input type="text" className="form-control" aria-label="MM" aria-describedby="basic-addon1" disabled value={props.name} />
                                                    </div>
                                                </div>
                                                <div className="form-group col-sm-10">
                                                    <label htmlFor="card-number">Monto</label>
                                                    <input type="number" min="0" max="25000" className="form-control" value={montoSta} onChange={(e) => setMontoSta(e.target.value)} required />
                                                </div>
                                                <div className="form-group col-sm-12">
                                                    <button type="submit" onClick={assignBalance} className="btn btn-primaryB btn-block" style={{ color: 'white' }}>Establecer Balance</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}