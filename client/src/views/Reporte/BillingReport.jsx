import React, { useState, useRef, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import Axios from "axios";
import { Alert } from "react-bootstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export default function BillingReport(props) {
    const history = useHistory();
    const [error, setError] = useState();
    //const [report, setReport] = useState([]);
    const [table, setTable] = useState([]);
    const [date, setDate] = useState();
    const [loading] = useState(false);
    const [email, setEmail] = useState(false);
    const [all, setAll] = useState(false);
    const [invoice, setInvoice] = useState(false);
    const [payment, setPayment] = useState(false);
    const [cn, setCn] = useState(false);
    const [dn, setDn] = useState(false);
    const [radio1, setRadio1] = useState(true);
    const [radio2, setRadio2] = useState(false);
    const [radio3, setRadio3] = useState(false);
    const userRef = useRef();
    const date1Ref = useRef();
    const date2Ref = useRef();
    const date3Ref = useRef();
    const date4Ref = useRef();
    const date5Ref = useRef();
    useEffect(() => {
        var currentTime = new Date();
        setDate(moment(currentTime).format("l"));
    }, [])
    function findCustomer(e) {
        e.preventDefault();
        setError("");
        const user = userRef.current.value;
        setEmail(user);
        Axios.get("/userDetails", {
            params: { idUser: user }
        })
            .then((res) => {
                if (res.data.length > 0) {
                    setTable(res.data);
                } else {
                    setError("No existe ningún usuario asociado al correo electrónico ingresado!")
                    setTable([]);
                }
            })
    }
    function handleChange(e) {
        const isChecked = e.target.checked;
        const checkedValue = e.target.value;
        if (isChecked) {
            switch (checkedValue) {
                case "itemsAll":
                    setAll(true)
                    break;
                case "Invoices":
                    setInvoice(true);
                    break;
                case "Payments":
                    setPayment(true);
                    break;
                case "CN":
                    setCn(true);
                    break;
                case "DN":
                    setDn(true);
                    break;
                default:
                    break;
            }
        } else {
            switch (checkedValue) {
                case "itemsAll":
                    setAll(false)
                    break;
                case "Invoices":
                    setInvoice(false);
                    break;
                case "Payments":
                    setPayment(false);
                    break;
                case "CN":
                    setCn(false);
                    break;
                case "DN":
                    setDn(false);
                    break;
                default:
                    break;
            }
        }
    }
    function handleRadio(e) {
        var elements = document.getElementsByName('itemType');
        var checkedButton;
        elements.forEach(e => {
            if (e.checked) {
                //if radio button is checked, set sort style
                checkedButton = e.value;
                switch (checkedButton) {
                    case "Abiertos":
                        setRadio1(true);
                        setRadio2(false);
                        setRadio3(false);
                        break;
                    case "Rango":
                        setRadio1(false);
                        setRadio2(true);
                        setRadio3(false);
                        break;
                    case "Todos":
                        setRadio1(false);
                        setRadio2(false);
                        setRadio3(true);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    async function billing(e) {
        e.preventDefault();
        setError("")
        // console.log(all +"||"+ invoice +"||"+ payment +"||"+ cn +"||"+ dn)
        const date1 = new Date();
        const date2 = date2Ref.current.value;
        const date3 = date3Ref.current.value;
        const date4 = date4Ref.current.value;
        const date5 = date5Ref.current.value;
        if (all || invoice || payment || cn || dn) {
            if (radio1) {
                if (date1) {
                    const report = {
                        username: email,
                        doc1: all,
                        doc2: invoice,
                        doc3: payment,
                        doc4: cn,
                        doc5: dn,
                        estado: "Abierto",
                        date: date1
                    }
                    Axios.post("/report/billing", report)
                        .then(async response => {
                            if (response.data.length > 0) {
                                //setReport(response.data);
                                history.push({
                                    pathname: "/Report/Billing/Details",
                                    state: { details: response.data, username: email }
                                })
                            } else {
                                return await swal("No existen registros asociados con los filtros utilizados para el reporte", {
                                    icon: "error"
                                });
                            }
                        });
                } else {
                    return await swal("Debe ingresar una fecha para generar el reporte.", {
                        icon: "error"
                    });
                }
            } else if (radio2) {
                if (date2 && date3) {
                    if (date2 < date3) {
                        const report = {
                            username: email,
                            doc1: all,
                            doc2: invoice,
                            doc3: payment,
                            doc4: cn,
                            doc5: dn,
                            estado: "Rango",
                            date1: date2,
                            date2: date3
                        };
                        Axios.post("/report/billing", report)
                            .then(async response => {
                                console.log("este es el largo " + response.data.length);
                                if (response.data.length > 0) {
                                    //setReport(response.data);
                                    history.push({
                                        pathname: "/Report/Billing/Details",
                                        state: { details: response.data, username: email }
                                    })
                                } else {
                                    return await swal("No existen registros asociados con los filtros utilizados para el reporte", {
                                        icon: "error"
                                    });
                                }

                            });
                    } else {
                        return await swal("La fecha utiliza como 'Hasta' debe ser mayor que la primer fecha ingresada.", {
                            icon: "error"
                        });
                    }
                } else {
                    return await swal("Debe ingresar ambas fechas de rango para generar el reporte.", {
                        icon: "error"
                    });

                }
            } else {
                if (date4 && date5) {
                    if (date4 < date5) {
                        const report = {
                            username: email,
                            doc1: all,
                            doc2: invoice,
                            doc3: payment,
                            doc4: cn,
                            doc5: dn,
                            estado: "Todo",
                            date1: date4,
                            date2: date5
                        };
                        Axios.post("/report/billing", report)
                            .then(async response => {
                                if (response.data.length > 0) {
                                    //setReport(response.data);
                                    history.push({
                                        pathname: "/Report/Billing/Details",
                                        state: { details: response.data, username: email }
                                    })
                                } else {
                                    return await swal("No existen registros asociados con los filtros utilizados para el reporte", {
                                        icon: "error"
                                    });

                                }
                            });
                    } else {
                        return await swal("La fecha utiliza como 'Hasta' debe ser mayor que la primer fecha ingresada.", {
                            icon: "error"
                        });
                    }
                } else {
                    return await swal("Debe ingresar ambas fechas de rango para generar el reporte.", {
                        icon: "error"
                    });
                }
            }
        } else {
            return await swal("Primero debe seleccionar algun tipo de documento para generar el reporte!", {
                icon: "error"
            });

        }
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Reporte de facturación"
                backUrl="/AdminMenuReporte"
                backName="Menú de reportes"
                currentName="Reporte de facturación"
            />
            <div className="section-overlay fade-in-card" style={{ marginBottom: "280px" }}>
                <div className="container">
                    <div className="row mt-5 mb-5">
                        <form id="billingReport" onSubmit={findCustomer}>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <div className="col-md-12 p-3 mt-5 ml-4" >
                                <div className="offset-md-2 col-md-7 ">
                                    <h3 className="fw-bold text-center para-color ">Buscar cliente para ver detalles de facturación</h3>
                                </div>
                                <div className="col-md-12 ml-4">
                                    <div className="offset-md-2 col-md-6 float-left mr-0 pr-0">
                                        <input type="email" placeholder="Correo electrónico..." className="form-control mt-4 inputCenter" ref={userRef} required />
                                    </div>
                                    <div className="col-sm-1 float-left ml-3 pl-0">
                                        <div className="contact-sub-btn mt-4">
                                            <button type="submit" style={{ padding: "5px", width: "100px", backgroundColor: "#e98808" }} disabled={loading} className="btn btn-effect section-button"><FontAwesomeIcon icon={faSearch} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {table.length > 0 ?
                        <form onSubmit={billing}>
                            <div className="row ">
                                <div className="col-sm-12  fade-in-card">
                                    <div className="bmi-box">
                                        <div className="row">
                                            <div className="row mb-3 mt-3">
                                                <div className="col-sm-12">
                                                    <h2 className="para-color mb-3">Rango de fechas</h2>
                                                </div>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="offset-md-1 col-sm-1">
                                                <input name="itemType" type="radio" className="form-check-input" value="Abiertos" checked={radio1} onChange={e => { handleRadio() }} required />
                                                <label htmlFor="">Items abiertos:</label>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name">Fecha<span></span></label>
                                                    <input type="text" ref={date1Ref} disabled={true} className="form-control" placeholder="" id="height" value={date} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-md-1 col-sm-1">
                                                <input name="itemType" type="radio" className="form-check-input" value="Rango" checked={radio2} onChange={e => { handleRadio() }} required />
                                                <label htmlFor="">Items abiertos:</label>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name">Desde fecha<span></span></label>
                                                    <input type="date" ref={date2Ref} disabled={!radio2} className="form-control" placeholder="" id="height" />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name">Hasta fecha<span></span></label>
                                                    <input type="date" ref={date3Ref} disabled={!radio2} className="form-control" placeholder="" id="height" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-md-1 col-sm-1">
                                                <input name="itemType" type="radio" className="form-check-input" value="Todos" checked={radio3} onChange={e => { handleRadio() }} required />
                                                <label htmlFor="">Todos los items:</label>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name">Desde fecha<span></span></label>
                                                    <input type="date" ref={date4Ref} disabled={!radio3} className="form-control" placeholder="" id="height" />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name">Hasta fecha<span></span></label>
                                                    <input type="date" ref={date5Ref} disabled={!radio3} className="form-control" placeholder="" id="height" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-sm-12  fade-in-card">
                                    <div className="bmi-box">
                                        <div className="row">
                                            <div className="row mb-3 mt-5">
                                                <div className="col-sm-12">
                                                    <h2 className="para-color mb-3">Tipo de documento</h2>
                                                </div>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className="row mt-1">
                                            <div className="col-sm-6 offset-md-1">
                                                <div className=" form-check col-sm-4">
                                                    <input id="credit" name="paymentMethod" type="checkbox" value="itemsAll" onChange={handleChange} className="form-check-input" />
                                                    <label className="form-check-label" htmlFor="credit"  >Todos los ítems</label>
                                                </div>
                                                <div className="form-check col-sm-4 ">
                                                    <input id="debit" name="paymentMethod" type="checkbox" value="Invoices" onChange={handleChange} className="form-check-input" />
                                                    <label className="form-check-label" htmlFor="debit" >Facturas</label>
                                                </div>
                                                <div className="form-check col-sm-4">
                                                    <input id="paypal" name="paymentMethod" type="checkbox" value="Payments" onChange={handleChange} className="form-check-input" />
                                                    <label className="form-check-label" htmlFor="paypal" >Pagos</label>
                                                </div>
                                                <div className="form-check col-sm-4">
                                                    <input id="paypal" name="paymentMethod" type="checkbox" value="CN" onChange={handleChange} className="form-check-input" />
                                                    <label className="form-check-label" htmlFor="paypal" >Notas de crédito</label>
                                                </div>
                                                <div className="form-check col-sm-4">
                                                    <input id="paypal" name="paymentMethod" type="checkbox" value="DN" onChange={handleChange} className="form-check-input" />
                                                    <label className="form-check-label" htmlFor="paypal" >Notas de débito</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5 bmi-box">
                                <div className="col-sm-12 fade-in-card">
                                    <div className="contact-sub-btn text-center">
                                        <button type="submit" className="btn btn-effect section-button" style={{ width: "300px", padding: "10px" }}>Generar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        :
                        <div></div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}