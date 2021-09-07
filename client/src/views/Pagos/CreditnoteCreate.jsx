import React, { useState, useRef, useEffect } from 'react'
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Axios from "axios";
import swal from "sweetalert";
import { Card, Form, Container } from "react-bootstrap";
import HeaderStatus from "../../components/HeaderStatus";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
export default function Diet(props) {
    const [payment, setPayment] = useState([]);
    // eslint-disable-next-line
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState("");
    const [monto, setMonto] = useState("");
    const [iva, setIva] = useState();
    const [numDoc, setNumDoc] = useState();
    const [date, setDate] = useState();
    const [liquidez, setLiquidez] = useState(false);
    const { _id, name, newPayment, email, lName, membership, document } = (props.location && props.location.state) || {};
    const emailRef = useRef();
    const nameRef = useRef();
    const lnameRef = useRef();
    const membershipRef = useRef();
    const montoRef = useRef();
    const userRef = useRef();
    useEffect(() => {
        if (newPayment) {
            Axios.get("/userData")
                .then((res) => {
                    setUser(res.data.email);
                })
        }
    }, [newPayment])
    function handleChange(e) {
        const isChecked = e.target.checked;
        if (isChecked) {
            setLiquidez(true);
        } else {
            setLiquidez(false);
        }
    }
    async function createDocument(e) {
        e.preventDefault();
        setMonto(montoRef.current.value);
        const pago = {
            monto: montoRef.current.value,
            user: userRef.current.value,
            tipoDoc: document,
            liquidez: liquidez,
            cliente: _id,
            email: email
        }
        if(montoRef.current.value > 1 && montoRef.current.value <= 500000){
            Axios.post("/payments/creates", pago)
            .then(async response => {
                if (response.data.length > 0) {
                    setPayment(response.data);
                    setMsg("Ha ingresado el " + document + " exitosamente!");
                    setDate(moment(Date.parse(response.data[0].fecha)).format("l"));
                    setNumDoc(response.data[0].numDocumento);
                    setIva(parseFloat((response.data[0].iva).toFixed(2)));
                    setMonto(response.data[0].monto)
                } else {
                    return await swal("Ha existido un error con la creación del documento!", {
                        icon: "error"
                    });
                }
            })
        }else{
            return await swal("El monto debe ser mayor a ₡1 y menor a ₡500,000.00!", {
                icon: "error"
            });
        }
        
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1={document === "Crédito" ? "Crear crédito" : "Crear débito"}
            backUrl={document === "Crédito" ? "/CreditNote" : "/DebitNote"}
            backName={document === "Crédito" ? "Buscar cliente" : "Buscar cliente"}
            currentName={document === "Crédito" ? "Crear crédito" : "Crear débito"}
        />
        {payment.length === 0 ?
            <section className="">
                <div className="section-overlay fade-in-card">
                    <div className="container">
                        <div className="row ">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Datos necesarios para la creación de la nota</h2>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="bmi-box">
                                    <div className="row">
                                        <div className="col-sm-6 mt-3">
                                            <div className="form-group">
                                                <label style={{ color: "#2B2B2B" }}>Correo electrónico<span>*</span></label>
                                                <input type="text" className="form-control" placeholder="" id="height" ref={emailRef} value={email} disabled />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mt-3">
                                            <div className="form-group">
                                                <label style={{ color: "#2B2B2B" }}>Nombre<span>*</span></label>
                                                <input type="text" className="form-control" placeholder="" id="height" ref={nameRef} value={name} disabled />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label style={{ color: "#2B2B2B" }}>Apellido<span>*</span></label>
                                                <input type="text" className="form-control" placeholder="" id="height" ref={lnameRef} value={lName} disabled />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label style={{ color: "#2B2B2B" }}>Membresía<span>*</span></label>
                                                <input type="text" className="form-control" placeholder="" id="height" ref={membershipRef} value={membership} disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Container className="d-flex align-items-center justify-content-center mt-5" style={{ minHeight: "50vh" }}>
                            <div className="w-100" style={{ maxWidth: "550px" }}>
                                <Card style={{ background: "rgb(128,128,128, 0.2)" }} className="backgroundTransparent p-3">
                                    <Card.Body>
                                        <h2 style={{ color: "#2B2B2B" }} className="text-center mb-4">{document === "Crédito" ? "Crear crédito" : "Crear débito"}</h2>
                                        <Form onSubmit={createDocument}>
                                            <Form.Group>
                                                <Form.Label style={{ color: "#2B2B2B" }}>{document === "Crédito" ? "Monto del crédito" : "Monto del débito"}</Form.Label>
                                                <Form.Control type="number" min="1" max="9999999"  ref={montoRef} required />
                                            </Form.Group>
                                            <div className=" form-check col-6 mb-3">
                                                <input name="paymentMethod" type="checkbox" onChange={handleChange} className="form-check-input" />
                                                <label className="form-check-label" htmlFor="credit"  >Transacción en efectivo</label>
                                            </div>
                                            <Form.Group>
                                                <Form.Label style={{ color: "#2B2B2B" }}>Su correo electrónico de usuario</Form.Label>
                                                <Form.Control type="text" ref={userRef} disabled value={user} />
                                            </Form.Group>
                                            <div className="row bmi-box mt-3 mb-3">
                                                <div className="col-sm-12 fade-in-card">
                                                    <div className="contact-sub-btn text-center">
                                                        <button type="submit" className="btn btn-effect section-button w-100" style={{ width: "300px", padding: "10px" }}>{document === "Crédito" ? "Generar crédito" : "Generar débito"}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Container>
                    </div>
                </div>
            </section>
            :
            <div className="container fade-in-card" style={{ margin: "4% auto" }}>
                <div className="row">
                    <div className="row mb-3 mt-3">
                        <div className="col-sm-12">
                            <h2 className="para-color mb-3">Detalles del {document === "Crédito" ? "crédito" : "débito"} exitoso</h2>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="page-content container  bg-light">
                    <div className="container px-0">
                        <div className="row mt-4">
                            <div className="col-12 col-lg-10 offset-lg-1 p-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="text-center text-150">
                                            <span className="text-default-d3 para-color">Energym Fitness Center</span>
                                        </div>
                                    </div>
                                </div>
                                <hr className="row brc-default-l1 mx-n1 mb-4 mt-4" />
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div>
                                            <span className="text-sm text-grey-m2 align-middle">Para: </span>
                                            <span className="text-600 text-110 text-blue align-middle">{email}</span>
                                        </div>
                                    </div>
                                    <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                        <hr className="d-sm-none" />
                                        <div className="text-grey-m2">
                                            <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                                Detalles del {document === "Crédito" ? "crédito" : "débito"}
                                            </div>
                                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90"># Documento:</span> {numDoc}</div>
                                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Fecha de pago:</span> {date}</div>
                                            <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span className="text-600 text-90">Estado:</span> <span className="badge badge-warning badge-pill px-25">Abierto</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="row text-600 text-white bgc-default-tp1 py-25">
                                        <div className="d-none d-sm-block col-1">Número documento</div>
                                        <div className="col-9 col-sm-5">Cliente</div>
                                        <div className="d-none d-sm-block col-4 col-sm-2">Fecha</div>
                                        <div className="d-none d-sm-block col-sm-2">IVA</div>
                                        <div className="col-2">Monto</div>
                                    </div>
                                    <div className="text-95 text-secondary-d3">
                                        <div className="row mb-2 mb-sm-0 py-25">
                                            <div className="d-none d-sm-block col-1">{numDoc}</div>
                                            <div className="col-9 col-sm-5">{email}</div>
                                            <div className="d-none d-sm-block col-2">{date}</div>
                                            <div className="d-none d-sm-block col-2 text-95">{iva}</div>
                                            <div className="col-2 text-secondary-d2">{monto}</div>
                                        </div>
                                    </div>
                                    <div className="row border-b-2 brc-default-l2"></div>
                                    <div className="row mt-3">
                                        <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                                            Información acerca del {document === "Crédito" ? "crédito" : "débito"}...
                                        </div>
                                        <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                                            <div className="row my-2">
                                                <div className="col-7 text-right">
                                                    IVA
                                                </div>
                                                <div className="col-5">
                                                    <span className="text-110 text-secondary-d1">{iva}</span>
                                                </div>
                                            </div>
                                            <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                                <div className="col-7 text-right">
                                                    Monto del {document === "Crédito" ? "crédito" : "débito"}
                                                </div>
                                                <div className="col-5">
                                                    <span className="text-150 text-success-d3 opacity-2">{monto}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-5 mt-5 offset-md-4 fade-in-card ">
                    <Link to="/EmpleadoMenuCreditoDebito" style={{ textDecoration: 'none' }}><Button type="button" className="w-50 btn BotonesColor">Continuar</Button></Link>
                </div>
            </div>
        }
        <Footer />
    </div>);
}