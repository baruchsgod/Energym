import React, { useState, useRef } from 'react'
import Footer from "../components/Footer";
import Header from "../components/Header";
import swal from 'sweetalert';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from "html-react-parser"
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import HeaderStatus from "../components/HeaderStatus";
export default function TextEditor(props) {
    const [text, setText] = useState("");
    const [detail, setDetail] = useState();
    const [button, setButton] = useState(true);
    const { day, routine, _ids, ids, detalle, newRoutines } = (props.location && props.location.state) || {};
    const emailRef = useRef();
    const dayRef = useRef();
    const routineRef = useRef();
    const detailRef = useRef();
    const _idRef = useRef();
    const idRef = useRef();
    const nameRef = useRef();
    const lnameRef = useRef();
    const [error, setError] = useState("");
    const history = useHistory();
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const lName = localStorage.getItem("lName");
    const _id = localStorage.getItem("mainId");
    const id = localStorage.getItem("id");
    function setRoutine(e) {
        e.preventDefault();
        setError("");
        if (newRoutines) {
            const routineInfo = {
                _id: _idRef.current.value,
                id: idRef.current.value,
                name: name,
                lName: lName,
                email: emailRef.current.value,
                day: dayRef.current.value,
                routine: routineRef.current.value,
                details: text,
                option: localStorage.getItem("option")
            }
            Axios.post("/routine", routineInfo)
                .then(response => {
                    //console.log("this is the responde from update "+response);
                    if (response.data.message !== "El usuario fue actualizado") {
                        return setError(response.data.message);

                    } else {
                        history.push({
                            pathname: '/Routine',
                            state: { _id: response.data._id, newRoutine: false, email: emailRef.current.value, message: "Rutina ha sido modificada correctamente" }
                        });
                    }
                })
                .then(error => {
                    console.log(error);

                });
        } else {
            const routineInfo = {
                _id: _ids,
                details: detail
            }
            Axios.post("/userRoutine/modifyOneRoutine", routineInfo)
                .then(async response => {
                    //console.log("this is the responde from update "+response);
                    if (response.data.length === 2) {
                        await swal("La rutina ha sido modificada exitosamente!", {
                            icon: "success"
                        });
                        history.push({
                            pathname: '/Routine',
                            state: { _id: ids, newRoutine: false, email: emailRef.current.value, message: "Rutina ha sido modificada correctamente" }
                        });
                    } else {
                        return await swal("Se ha generado un error mientras se modificaba la rutina, intente de nuevo!", {
                            icon: "error"
                        });
                    }
                })
        }

    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Visualizar rutina"
                backUrl={localStorage.getItem("tipoCuenta") === "Empleado" ? "/findroutine" : "/ListUserRoutines"}
                backName={localStorage.getItem("tipoCuenta") === "Empleado" ? "Buscar rutinas" : "Lista de rutinas"}
                currentName="Visualizar rutina"
            />
            <section className="">
                <div className="section-overlay">
                    <div className="container">
                        <form onSubmit={setRoutine}>
                            <div className="row ">
                                <div className="col-sm-12">
                                    <div className="bmi-box">
                                        <div className="row">
                                            {error && <Alert variant="danger">{error}</Alert>}
                                            <div className="col-sm-6 mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name" style={{ color: "#2B2B2B" }}>Usuario<span>*</span></label>
                                                    <input type="text" className="form-control" placeholder="" id="height" ref={emailRef} value={email} disabled />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name" style={{ color: "#2B2B2B" }}>Nombre<span>*</span></label>
                                                    <input type="text" className="form-control" placeholder="" id="height" ref={nameRef} value={name} disabled />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name" style={{ color: "#2B2B2B" }}>Apellido<span>*</span></label>
                                                    <input type="text" className="form-control" placeholder="" id="height" ref={lnameRef} value={lName} disabled />
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name" style={{ color: "#2B2B2B" }}>Día<span>*</span></label>
                                                    <input type="text" className="form-control" placeholder="" id="height" ref={dayRef} value={day} disabled />
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="cus_name" style={{ color: "#2B2B2B" }}>Tipo de rutina<span>*</span></label>
                                                    <input type="text" className="form-control" placeholder="" id="height" ref={routineRef} value={routine} disabled />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ margin: "3% 10%" }}>
                                {detalle ? <h3 style={{ color: "#2B2B2B", textAlign: "center" }}>Modifique los detalles de la rutina</h3> : <h3 style={{ color: "#2B2B2B", textAlign: "center" }}>Ingrese los detalles de la rutina</h3>}
                            </div>
                            <div style={{ minHeight: "200px", marginTop: "4%" }}>
                                {detalle ?
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={detalle}
                                        mediaEmbed={{ previewsInData: true }}
                                        style={{ minHeight: "400px" }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData()
                                            setDetail(data);
                                            setButton(false);
                                        }}
                                    />
                                    :
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={text}
                                        style={{ minHeight: "400px" }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData()
                                            setText(data);
                                            setButton(false);
                                        }}
                                    />
                                }

                            </div>
                            <div className="col-sm-12 bmi-box">
                                <div className="contact-sub-btn w-100 text-center">
                                    {detalle ? <button type="submit" style={{ padding: "10px", width: "280px" }} disabled={button} className="btn btn-effect section-button">Modificar rutina</button> : <button type="submit" style={{ padding: "10px", width: "280px" }} disabled={button} className="btn btn-effect section-button">Crear rutina</button>}
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
            </section>
            <Footer />
        </div>
    )
}


