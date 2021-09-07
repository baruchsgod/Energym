import React, { useEffect, useState, useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import CloseCashier from "../../components/CloseCash";
import moment from "moment";
import _ from "lodash";
import { Button } from "react-bootstrap";
export default function CloseCash(props) {
    const [payment, setPayment] = useState([]);
    const [document, setDocument] = useState([]);
    const [state, setState] = useState();
    const [id, setId] = useState();
    const [view, setView] = useState(false);
    const [monto, setMonto] = useState();
    const [fecha] = useState(moment(new Date()).format("l"));
    const montoRef = useRef();
    let arqueo = [];
    let ventaEfectivo = {};
    let ventaTarjeta = {};
    let ventaTotal = {};
    let gastoEfectivo = {};
    let gastoTarjeta = {};
    let gastoTotal = {};
    let efectivo = {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await Axios.get("/userData")
            .then(async (res) => {
                await Axios.get("/Payment/getClosure", {
                    params: { email: res.data.email }
                })
                    .then(async (res) => {
                        if (res.data.length > 0) {
                            if (res.data[0].ventasTotales) {
                                setMonto(res.data[0].efectivoRecibido + res.data[0].faltanteSobrante);
                                setView(true);
                                if (res.data[0].faltanteSobrante === 0) {
                                    setState("Balanceado");
                                } else if (res.data[0].faltanteSobrante > 0) {
                                    setState("Sobrante");
                                } else {
                                    setState("Faltante");
                                }
                                return await swal("Ya el usuario activo ha enviado un cierre de caja el día de hoy!", {
                                    icon: "warning"
                                });
                            }
                        }

                    })
            });

    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await Axios.get("/userData")
            .then(async (res) => {
                await Axios.get("/Payment/Open", {
                    params: { email: res.data.email }
                })
                    .then(async (res) => {
                        if (res.data.length > 0) {
                            setPayment(res.data);
                            setId(res.data[0]._id);
                            await Axios.get("/payment/documents", {
                                params: { email: res.data[0].Empleado }
                            })
                                .then(async (respond) => {
                                    if (respond.data.length > 0) {
                                        await setDocument(respond.data);
                                    } else {
                                        return await swal("No se han generado documentos que afectan el flujo de efectivo el día de hoy!", {
                                            icon: "warning"
                                        });
                                    }
                                })
                        } else {
                            await swal("El balance inicial de efectivo del dia de hoy no ha sido generado por el cajero!", {
                                icon: "error"
                            });
                        }
                    })
            });

    }, []);

    function setCloseRegister(item, index) {

        var efectivoInicial = {
            title: "Efectivo Inicial",
            ventas: 0,
            Total: item.efectivoInicial + item.discrepanciaInicial
        }

        arqueo.push(efectivoInicial);

        var DiscrepanciaInicial = {
            title: "Discrepancia Inicial",
            ventas: 0,
            Total: item.discrepanciaInicial
        }

        arqueo.push(DiscrepanciaInicial);

        if (index === payment.length - 1) {
            if (document.length > 0) {
                document.forEach((items, index) => {
                    switch (items.liquidez) {
                        case true:
                            if (items.tipoDoc === "Pago" || items.tipoDoc === "Debito") {
                                let venta = 0;
                                let ventaCard = 0;
                                let ventaTotals = 0;
                                let ventaFinal = 0;
                                if (!_.isEmpty(ventaEfectivo)) {
                                    venta = ventaEfectivo.ventas;
                                }
                                if (!_.isEmpty(ventaTotal)) {
                                    ventaCard = ventaTotal.Total;
                                }
                                if (items.tipoDoc === "Pago") {
                                    ventaTotals = (items.monto * -1) + venta;
                                    ventaFinal = (items.monto * -1) + ventaCard;
                                } else {
                                    ventaTotals = items.monto + venta;
                                    ventaFinal = items.monto + ventaCard;
                                }


                                if (!_.isEmpty(ventaEfectivo)) {
                                    ventaEfectivo["ventas"] = ventaTotals;
                                    ventaTotal["Total"] = ventaFinal;
                                } else {
                                    ventaEfectivo = { title: "Ventas Efectivo", ventas: ventaTotals, Total: 0 };

                                    ventaTotal = { title: "Total Ventas", ventas: 0, Total: ventaFinal };
                                }


                            } else {
                                let gasto = 0;
                                let gastoCard = 0;
                                if (!_.isEmpty(gastoEfectivo)) {
                                    gasto = gastoEfectivo.ventas;
                                }
                                if (!_.isEmpty(gastoTotal)) {
                                    gastoCard = gastoTotal.Total;
                                }
                                const gastoTotals = items.monto + gasto;
                                const gastoFinal = items.monto + gastoCard;

                                if (!_.isEmpty(gastoEfectivo)) {
                                    gastoEfectivo["ventas"] = gastoTotals;
                                    gastoTotal["Total"] = gastoFinal;
                                } else {
                                    gastoEfectivo = { title: "Gastos Efectivo", ventas: gastoTotals, Total: 0 };

                                    gastoTotal = { title: "Total Gastos", ventas: 0, Total: gastoFinal };
                                }


                            }
                            break;
                        case false:
                            if (items.tipoDoc === "Pago" || items.tipoDoc === "Debito") {

                                let venta = 0;
                                let ventaCard = 0;
                                let ventaTotals = 0;
                                let ventaFinal = 0;
                                if (!_.isEmpty(ventaTarjeta)) {
                                    venta = ventaTarjeta.ventas;
                                }
                                if (!_.isEmpty(ventaTotal)) {
                                    ventaCard = ventaTotal.Total;
                                }

                                if (items.tipoDoc === "Pago") {
                                    ventaTotals = (items.monto * -1) + venta;
                                    ventaFinal = (items.monto * -1) + ventaCard;
                                } else {
                                    ventaTotals = items.monto + venta;
                                    ventaFinal = items.monto + ventaCard;
                                }


                                if (!_.isEmpty(ventaTarjeta)) {
                                    ventaTarjeta["ventas"] = ventaTotals;
                                    ventaTotal["Total"] = ventaFinal;
                                } else {
                                    ventaTarjeta = { title: "Ventas Tarjeta", ventas: ventaTotals, Total: 0 };

                                    ventaTotal = { title: "Total Ventas", ventas: 0, Total: ventaFinal };
                                }


                            } else {

                                let gasto = 0;
                                let gastoCard = 0;
                                if (!_.isEmpty(gastoTarjeta)) {
                                    gasto = gastoTarjeta.ventas;
                                }
                                if (!_.isEmpty(gastoTotal)) {
                                    gastoCard = gastoTotal.Total;
                                }
                                const gastoTotals = items.monto + gasto;

                                const gastoFinal = items.monto + gastoCard;


                                if (!_.isEmpty(gastoTarjeta)) {
                                    gastoTarjeta["ventas"] = gastoTotals;
                                    gastoTotal["Total"] = gastoFinal;
                                } else {
                                    gastoTarjeta = { title: "Gastos Tarjeta", ventas: gastoTotals, Total: 0 };

                                    gastoTotal = { title: "Total Gastos", ventas: 0, Total: gastoFinal };
                                }


                            }
                            break;
                        default:
                            break;
                    }
                    if (index === document.length - 1) {

                        if (_.isEmpty(ventaEfectivo)) {
                            ventaEfectivo = { title: "Ventas Efectivo", ventas: 0, Total: 0 };
                        }
                        arqueo.push(ventaEfectivo);
                        if (_.isEmpty(ventaTarjeta)) {
                            ventaTarjeta = { title: "Ventas Tarjeta", ventas: 0, Total: 0 };
                        }
                        arqueo.push(ventaTarjeta);
                        if (_.isEmpty(ventaTotal)) {
                            ventaTotal = { title: "Ventas Totales", ventas: 0, Total: 0 };
                        }
                        arqueo.push(ventaTotal);
                        if (_.isEmpty(gastoEfectivo)) {
                            gastoEfectivo = { title: "Gastos Efectivo", ventas: 0, Total: 0 };
                        }
                        arqueo.push(gastoEfectivo);
                        if (_.isEmpty(gastoTarjeta)) {
                            gastoTarjeta = { title: "Gastos Tarjeta", ventas: 0, Total: 0 };
                        }
                        arqueo.push(gastoTarjeta);
                        if (_.isEmpty(gastoTotal)) {
                            gastoTotal = { title: "Gastos Totales", ventas: 0, Total: 0 };
                        }
                        arqueo.push(gastoTotal);
                        if (_.isEmpty(efectivo)) {
                            efectivo = { title: "Efectivo Total", ventas: 0, Total: efectivoInicial.Total + ventaEfectivo.ventas + gastoEfectivo.ventas }
                        }
                        arqueo.push(efectivo);
                    }
                })
            } else {
                if (_.isEmpty(ventaEfectivo)) {
                    ventaEfectivo = { title: "Ventas Efectivo", ventas: 0, Total: 0 };
                }
                arqueo.push(ventaEfectivo);
                if (_.isEmpty(ventaTarjeta)) {
                    ventaTarjeta = { title: "Ventas Tarjeta", ventas: 0, Total: 0 };
                }
                arqueo.push(ventaTarjeta);
                if (_.isEmpty(ventaTotal)) {
                    ventaTotal = { title: "Ventas Totales", ventas: 0, Total: 0 };
                }
                arqueo.push(ventaTotal);
                if (_.isEmpty(gastoEfectivo)) {
                    gastoEfectivo = { title: "Gastos Efectivo", ventas: 0, Total: 0 };
                }
                arqueo.push(gastoEfectivo);
                if (_.isEmpty(gastoTarjeta)) {
                    gastoTarjeta = { title: "Gastos Tarjeta", ventas: 0, Total: 0 };
                }
                arqueo.push(gastoTarjeta);
                if (_.isEmpty(gastoTotal)) {
                    gastoTotal = { title: "Gastos Totales", ventas: 0, Total: 0 };
                }
                arqueo.push(gastoTotal);
                if (_.isEmpty(efectivo)) {
                    efectivo = { title: "Efectivo Total", ventas: 0, Total: efectivoInicial.Total }
                }
                arqueo.push(efectivo);
            }
        }

        return (
            <div>
                {arqueo.map((item, index) => (
                    <div>
                        <CloseCashier
                            Key={index}
                            Title={item.title}
                            Ventas={item.ventas}
                            Total={item.Total}
                        />
                    </div>))}
            </div>
        );
    }
    function setEstado(e) {
        const cash = efectivo.Total;
        const cashier = parseFloat(montoRef.current.value);
        if (cashier < cash && cashier < 0) {
            return swal("El balance seleccionado no puede ser menor al límite de efectivo total!", {
                icon: "error"
            });
        } else {
            const discrepancia = cashier - cash;
            const cierre = {
                _id: id,
                ventasEfectivo: ventaEfectivo.ventas,
                ventasTarjeta: ventaTarjeta.ventas,
                ventasTotal: ventaTotal.Total,
                gastosEfectivo: gastoEfectivo.ventas,
                gastosTarjeta: gastoTarjeta.ventas,
                gastosTotal: gastoTotal.Total,
                efectivoFinal: cash,
                discrepancia: discrepancia
            }
            if (cash === cashier && cashier) {
                setState("Balanceado");
                swal({
                    title: "Estás seguro?",
                    text: "Se confirmará que el balance de la caja es correcto!",
                    icon: "warning",
                    buttons: ["Cancelar", "Aceptar"],
                    dangerMode: true,
                })
                    .then(async (value) => {
                        if (value) {
                            Axios.post("/payment/closure", cierre)
                                .then(async (res) => {
                                    if (res.data.length === 2) {
                                        setView(true);
                                        return await swal("El balance de la caja ha sido confirmado exitosamente!", {
                                            icon: "success"
                                        });
                                    } else {
                                        return await swal("Ha existido un error confirmando el balance de la caja", {
                                            icon: "error"
                                        });
                                    }
                                })
                        } else {
                            return await swal("Has elegido no confirmar el balance de la caja!", {
                                icon: "warning"
                            });
                        }
                    })

            } else {
                if (cashier > cash && cashier) {
                    setState("Sobrante")
                    swal({
                        title: "Estás seguro?",
                        text: "Se confirmará que existe un sobrante a nivel de caja!",
                        icon: "warning",
                        buttons: ["Cancelar", "Aceptar"],
                        dangerMode: true,
                    })
                        .then(async (value) => {
                            if (value) {
                                Axios.post("/payment/closure", cierre)
                                    .then(async (res) => {
                                        if (res.data.length === 2) {
                                            setView(true);
                                            return await swal("El balance de la caja ha sido confirmado exitosamente!", {
                                                icon: "success"
                                            });
                                        } else {
                                            return await swal("Ha existido un error confirmando el balance de la caja!", {
                                                icon: "error"
                                            });
                                        }
                                    })
                            } else {
                                return await swal("Has elegido no confirmar el balance de la caja!", {
                                    icon: "warning"
                                });
                            }
                        })
                } else if (cashier < cash && cashier) {
                    setState("Faltante");
                    swal({
                        title: "Estás seguro?",
                        text: "Se confirmará que existe un faltante a nivel de caja!",
                        icon: "warning",
                        buttons: ["Cancelar", "Aceptar"],
                        dangerMode: true,
                    })
                        .then(async (value) => {
                            if (value) {
                                Axios.post("/payment/closure", cierre)
                                    .then(async (res) => {
                                        if (res.data.length === 2) {
                                            setView(true);
                                            return await swal("El balance de la caja ha sido confirmado exitosamente!", {
                                                icon: "success"
                                            });
                                        } else {
                                            return await swal("Ha existido un error confirmando el balance de la caja", {
                                                icon: "error"
                                            });
                                        }
                                    })
                            } else {
                                return await swal("Has elegido no confirmar el balance de la caja!", {
                                    icon: "warning"
                                });
                            }
                        })
                }

            }
        }
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Cerrar caja"
                backUrl="/EmpleadoMenuCaja"
                backName="Menú de caja"
                currentName="Cerrar caja"
            />
            {payment.length > 0 ?
                <div className="container w-100">
                    <div className="row mt-5">
                        <div className="row mb-3 mt-5">
                            <div className="col-sm-12">
                                <h2 className="para-color mb-3">Detalle arqueo de caja del día {fecha}</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row mt-3" style={{ backgroundColor: "rgba(4,70,146)" }}>
                        <div className="col-4" style={{ borderRight: "2px dotted #171010" }}>
                            <p className="pt-2 routineFont" style={{ fontSize: "large", color: "white" }}>Detalle</p>
                        </div>
                        <div className="col-4" style={{}}>
                            <p className="pt-2 routineFont" style={{ fontSize: "large", color: "white" }}>Ventas</p>
                        </div>
                        <div className="col-4" style={{}}>
                            <p className="pt-2 routineFont" style={{ fontSize: "large", color: "white" }}>Total</p>
                        </div>
                    </div>
                    {payment.map(setCloseRegister)}
                    <div className="row mt-5 mb-5">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="cus_name">Monto de efectivo en caja<span></span></label>
                                <input type="number" min={-efectivo.Total} max="10000000" disabled={view} className="form-control" ref={montoRef} value={monto} placeholder="Ingresar el monto de efectivo disponible en la caja" required />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="cus_name">Estado<span></span></label>
                                <input type="text" disabled className="form-control" placeholder="Estado del cierre de caja" id="height" value={state} />
                            </div>
                        </div>
                        <div className="row mt-4 mb-4 bmi-box">
                            <div className="col-sm-12 fade-in-card">
                                <div className="contact-sub-btn text-center">
                                    <button type="submit" disabled={view} className="btn btn-effect section-button" onClick={(e) => { setEstado(e) }} style={{ width: "300px", padding: "10px" }}>Cerrar caja</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div>
                    <main className="container" style={{ marginTop: "6%", marginBottom: "6%" }}>
                        <div className="bg-light p-5 rounded">
                            <h1>Se debe confirmar el balance de efectivo inicial</h1>
                            <p className="lead">Debe proceder a ingresar al módulo de pagos, y confirmar el balance inicial de efectivo para luego realizar un cierre de caja.</p>
                            <Link to="/Payment/Open" ><Button type="button" className="w-25 btn BotonesColor text-center">Abrir caja</Button></Link>
                        </div>
                    </main>
                </div>
            }
            <Footer />
        </div>
    );
}