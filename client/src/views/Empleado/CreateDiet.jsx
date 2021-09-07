import React, { useState, useRef, useEffect } from 'react'
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from "html-react-parser"
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import HeaderStatus from "../../components/HeaderStatus";
import swal from 'sweetalert';
export default function Diet(props) {
    const [text, setText] = useState("");
    const [diet, setDiet] = useState("");
    const [detail, setDetail] = useState("");
    const { _id, id, email, name, lname, newRoutine } = (props.location && props.location.state) || {};
    const emailRef = useRef();
    const detailRef = useRef();
    const _idRef = useRef();
    const idRef = useRef();
    const nameRef = useRef();
    const lnameRef = useRef();
    const [error, setError] = useState("");
    const history = useHistory();
    useEffect(() => {
        if (!newRoutine) {
            Axios.get("/userDiet/getDetailsbyId", { params: { userData: _id } })
                .then((res) => {
                    if (res.data.length > 0) {
                        setDetail(res.data[0].detalle);
                    } else {
                        setError("Error en el sistema, no se han encontrado ningun cliente, intente mas tarde!");
                    }
                })
        }
    }, [_id, newRoutine])
    function setCustomerDiet(e) {
        e.preventDefault();
        setError("");
        const dietInfo = {
            _id: _id,
            cliente: id,
            nombre: name,
            apellido: lname,
            email: email,
            tipoDieta: diet,
            detalle: text,
            option: newRoutine
        }
        if (dietInfo.tipoDieta > 0) {
            Axios.post("/diet", dietInfo)
                .then(response => {
                    if (response.data.icon !== 'success') {
                        return swal(response.data.title, response.data.message, response.data.icon);
                    } else {
                        if (newRoutine) {
                            history.push({
                                pathname: '/findDiet',
                                state: { newDiet: true, message: "La dieta ha sido creada correctamente!" }
                            });
                        } else {
                            history.push({
                                pathname: '/findDiet',
                                state: { newDiet: true, message: "La dieta ha sido modificada correctamente!" }
                            });
                        }
                    }
                })
                .then(error => {
                    //console.log(error);
                });
        }
        else {
            return swal("Error!", "Revisa el tipo de dieta ingresado!", "error");
        }
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Crear dieta"
            backUrl="/findDiet"
            backName="Buscar cliente"
            currentName="Crear dieta"
        />
        <div className="section-overlay fade-in-card">
            <div className="container">
                <form onSubmit={setCustomerDiet}>
                    <div className="row ">
                        <div className="row">
                            <div className="row mb-3 mt-5">
                                <div className="col-sm-12 mt-5">
                                    <h2 className="para-color mb-3">Datos requeridos de la dieta</h2>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="bmi-box">
                                <div className="row">
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <div className="col-sm-6 mt-3">
                                        <div className="form-group">
                                            <label style={{ color: "#2B2B2B" }}>Usuario<span>*</span></label>
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
                                            <input type="text" className="form-control" placeholder="" id="height" ref={lnameRef} value={lname} disabled />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label style={{ color: "#2B2B2B" }}>Tipo de Dieta<span>*</span></label>
                                            <select className="form-control custom-select" value={diet} onChange={(e) => setDiet(e.target.value)} required>
                                                <option value="0">Seleccione el tipo de dieta</option>
                                                <option value="1">Keto</option>
                                                <option value="2">Vegetariana</option>
                                                <option value="3">Low Carb</option>
                                                <option value="4">Hipercalórica</option>
                                                <option value="5">Proteíca</option>
                                                <option value="6">Detox</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row ">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Ingrese los datos detalles de la dieta</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    {detail ? <div>
                        <div style={{ minHeight: "100px", marginTop: "2%" }}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={detail}
                                style={{ minHeight: "400px" }}
                                onChange={(event, editor) => {
                                    const data = editor.getData()
                                    setText(data)
                                }}
                            />
                        </div>
                    </div> : <div>
                        <div style={{ minHeight: "100px", marginTop: "4%" }}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={text}
                                style={{ minHeight: "100px" }}

                                onChange={(event, editor) => {
                                    const data = editor.getData()
                                    setText(data)
                                }}
                            />
                        </div>
                    </div>}
                    <div className="row bmi-box mt-5 mb-5">
                        <div className="col-sm-12 fade-in-card">
                            <div className="contact-sub-btn text-center">
                                <button type="submit" className="btn btn-effect section-button" style={{ width: "300px", padding: "10px" }}>Crear dieta</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="hidden" ref={detailRef} value={parse(text)} />
                        <input type="hidden" ref={_idRef} value={_id} />
                        <input type="hidden" ref={idRef} value={id} />
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </div>);
}