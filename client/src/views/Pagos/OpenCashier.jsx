import React, { useState, useRef, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import WOW from 'wowjs';
export default function OpenCashier() {
    const [discrepancy, setDiscrepancy] = useState(false);
    const [accept, setAccept] = useState();
    const [reject, setReject] = useState(false);
    const [disc, setDisc] = useState(false);
    const [initial, setInitial] = useState();
    const [email, setEmail] = useState();
    const [_id, set_Id] = useState();
    const history = useHistory();
    useEffect(() => {
        Axios.get("/payment/setBalance")
            .then(async (res) => {
                if (res.data.length > 0) {
                    setInitial(res.data[0].SaldoInicial);
                    set_Id(res.data[0]._id);
                    Axios.get("/userData")
                        .then((res) => {
                            setEmail(res.data.email);
                        })
                } else {
                    setAccept(true);
                    setReject(true);
                    setDiscrepancy(true);
                    return await swal("Favor contacte a su administrador para que genere un balance inicial de efectivo!", {
                        icon: "error"
                    });
                }
            })
        new WOW.WOW({
            live: false
        }).init();
    }, [])
    const montoRef = useRef();
    const categoriaRef = useRef();
    function setOption(props) {
        if (props === 1) {
            Axios.get("/Payment/Open", {
                params: { email: email }
            })
                .then(async (res) => {
                    if (res.data.length > 0) {
                        return await swal("Ya se ha enviado el balance inicial del efectivo el día de hoy!", {
                            icon: "warning"
                        });
                    } else {
                        swal({
                            title: "Estás seguro?",
                            text: "Se confirmará como correcto el balance de caja del día de hoy!",
                            icon: "warning",
                            buttons: ["Cancelar", "Aceptar"],
                            dangerMode: true,
                        })
                            .then(async (value) => {
                                if (value) {
                                    Axios.post("/payment/arching", {
                                        monto: 0,
                                        initial: initial,
                                        email: email,
                                        option: "2"
                                    })
                                        .then(async (res) => {
                                            if (res.data.length === 1) {
                                                return await swal("El reporte del efectivo inicial ha sido generado exitosamente!", {
                                                    icon: "success"
                                                });
                                            } else if (res.data.length === 2) {
                                                return await swal(res.data[1].message, {
                                                    icon: "error"
                                                });
                                            }
                                        })
                                } else {
                                    return await swal("Has elegido no confirmar el balance de efectivo inicial!", {
                                        icon: "warning"
                                    });
                                }
                            })
                    }
                })
        } else if (props === 2) {
            Axios.get("/Payment/Open", {
                params: { email: email }
            })
                .then(async (res) => {
                    if (res.data.length > 0) {
                        return await swal("Ya se ha enviado el balance inicial del efectivo el día de hoy!", {
                            icon: "warning"
                        });
                    } else {
                        setDisc(true);
                        setAccept(true);
                        setReject(true);
                    }
                });
        } else {
            Axios.get("/Payment/Open", {
                params: { email: email }
            })
                .then(async (res) => {
                    if (res.data.length > 0) {
                        return await swal("Ya se ha enviado el balance inicial del efectivo el día de hoy!", {
                            icon: "warning"
                        });
                    } else {
                        swal({
                            title: "Estás seguro?",
                            text: "Esta acción bloqueará la caja registradora el día de hoy, hasta que el administrador valide el efectivo inicial!",
                            icon: "warning",
                            buttons: ["Cancelar", "Aceptar"],
                            dangerMode: true,
                        })
                            .then(async (value) => {
                                if (value) {
                                    Axios.post("/payment/arching", {
                                        monto: 0,
                                        initial: 0,
                                        email: email,
                                        option: "3",
                                        _id: _id
                                    })
                                        .then(async (res) => {
                                            if (res.data.length === 1) {
                                                await swal("El reporte ha sido generado exitosamente, la caja ha sido bloqueada!", {
                                                    icon: "success"
                                                });

                                                history.push("/EmpleadoMenuCaja");
                                            } else if (res.data.length === 2) {
                                                return await swal(res.data[1].message, {
                                                    icon: "error"
                                                });
                                            }
                                        })
                                } else {
                                    return await swal("Has elegido no bloquear las funciones de caja!", {
                                        icon: "warning"
                                    });
                                }
                            })
                    }
                })
        }
    }
    async function setBalance(e) {
        e.preventDefault();
        const monto = montoRef.current.value;
        const categoria = categoriaRef.current.value;
        if (categoria === "Sobrante" && monto < 0) {
            return await swal("Si su selección es sobrante, el monto debe ser mayor a cero", {
                icon: "error"
            });
        } else if (categoria === "Faltante" && monto > 0) {
            return await swal("Si su selección es faltante, el monto debe ser menor a cero", {
                icon: "error"
            });
        } else {
            swal({
                title: "Estás seguro?",
                text: "Se enviará una discrepancia a tu resultado de caja del día de hoy!",
                icon: "warning",
                buttons: ["Cancelar", "Aceptar"],
                dangerMode: true,
            })
                .then(async (value) => {
                    if (value) {
                        Axios.post("/payment/arching", {
                            monto: monto,
                            categoria: categoria,
                            initial: initial,
                            email: email,
                            option: "1"
                        })
                            .then(async (res) => {
                                if (res.data.length === 1) {
                                    setDisc(false);
                                    setAccept(false);
                                    setReject(false);
                                    return await swal("El reporte de discrepancia del efectivo inicial ha sido generado exitosamente!", {
                                        icon: "success"
                                    });
                                } else if (res.data.length === 2) {
                                    setDisc(false);
                                    setAccept(false);
                                    setReject(false);
                                    return await swal(res.data[1].message, {
                                        icon: "error"
                                    });
                                } else {
                                    setDisc(false);
                                    setAccept(false);
                                    setReject(false);
                                    return await swal("El reporte de discrepancia del efectivo inicial ya ha sido generado para el día de hoy!", {
                                        icon: "warning"
                                    });
                                }
                            })
                    } else {
                        setDisc(false);
                        setAccept(false);
                        setReject(false);
                        return await swal("Has elegido no enviar la discrepancia!", {
                            icon: "warning"
                        });
                    }
                })
        }
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Abrir caja"
                backUrl="/EmpleadoMenuCaja"
                backName="Menú de caja"
                currentName="Abrir caja"
            />
            <div className="container fade-in-card" style={{ marginTop: "4%", marginBottom: "5%" }}>
                <div className="row">
                    <div className="row mb-3 mt-3">
                        <div className="col-sm-12">
                            <h2 className="para-color mb-3">Lista de opciones de caja</h2>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="row gutters fade-in-card">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div className="pricing-plan wow fadeIn">
                            <div className="pricing-header">
                                <h4 className="pricing-title">Cantidad de efectivo correcta</h4>
                                <div className="pricing-cost">Aceptar</div>
                                <div className="pricing-save">Abre la caja</div>
                            </div>
                            <div className="pricing-footer">
                                <button onClick={(e) => setOption(1, e)} className="btn btn-primary btn-lg" disabled={accept}>Abrir caja</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div className="pricing-plan wow fadeIn">
                            <div className="pricing-header secondary">
                                <h4 className="pricing-title">Iniciar con faltante o sobrante</h4>
                                <div className="pricing-cost">Discrepancia</div>
                                <div className="pricing-save">Abre caja con discrepancia</div>
                            </div>
                            <div className="pricing-footer">
                                <button onClick={(e) => setOption(2, e)} className="btn btn-warning btn-lg" disabled={discrepancy}>Abrir caja</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <div className="pricing-plan wow fadeIn">
                            <div className="pricing-header red">
                                <h4 className="pricing-title">Bloquea el sistema</h4>
                                <div className="pricing-cost">Rechazar</div>
                                <div className="pricing-save">Bloquea caja</div>
                            </div>
                            <div className="pricing-footer">
                                <button onClick={(e) => setOption(3, e)} className="btn btn-danger secondary btn-lg" disabled={reject}>Bloquear caja</button>
                            </div>
                        </div>
                    </div>
                </div>
                {disc && <div className="container mt-5 fade-in-card" >
                    <div class="row ">
                        <div class="col-sm-12">
                            <h2 class="para-color">Ingresar faltante o sobrante</h2>
                        </div>
                        <div class="col-sm-12">
                            <div class="bmi-box">
                                <form onSubmit={setBalance}>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="cus_name">Monto de la discrepancia<span></span></label>
                                                <input type="number" min={-initial} max={initial} class="form-control" ref={montoRef} placeholder="Ingresar el monto de la discrepancia" id="height" required />
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="cus_name">Categoría<span></span></label>
                                                <select class="form-control custom-select" ref={categoriaRef} required>
                                                    <option>Faltante</option>
                                                    <option>Sobrante</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="contact-sub-btn">
                                                <button type="submit" class="btn btn-effect section-button">Discrepancia</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <Footer />
        </div>
    );
}