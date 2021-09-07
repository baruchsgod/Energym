import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import moment from "moment";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default function CloseDetails(props) {
    const { id } = (props.location && props.location.state) || {};
    const [details] = useState([id]);
    function printDocument(e) {
        e.preventDefault();
        const input = document.getElementById('documento');
        html2canvas(input, { scrollY: -window.scrollY })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "mm", "a4");
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                pdf.save("BillingClose-" + moment(id.fecha).format("l") + ".pdf");
            });
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Detalles de caja chica"
                backUrl="/Report/Close"
                backName="Buscar reporte"
                currentName="Detalles de caja chica"
            />
            <div className="container mt-3 text-center  fade-in-card">
                <div className="row mt-5">
                    <div className="col-md-6 offset-md-3 mt-2">
                        <button className="btn btn-primary w-100 BotonesColor" onClick={(e) => printDocument(e)}>Generar PDF</button>
                    </div>
                </div>
                <div id="documento" className="p-5" style={{ width: '210mm', minHeight: '250mm', marginLeft: 'auto', marginRight: 'auto' }}>
                    <h3 className="mt-3 mb-3">Reporte realizado por {id.Empleado}</h3>
                    <h3 className="mt-3 mb-3">Estado: {id.estado}  </h3><span><h3>Fecha: {moment(id.fecha).format("l")}</h3></span>
                    <div className="row mt-5" style={{ backgroundColor: "rgba(4,70,146)" }}>
                        <div className="col-4" style={{ borderRight: "2px dotted #171010" }}>
                            <p className="pt-2 routineFont" style={{ fontSize: "large", color: "white" }}>Detalle</p>
                        </div>
                        <div className="col-4" style={{}}>
                            <p className="pt-2 routineFont" style={{ fontSize: "large", color: "white" }}>Ventas</p>
                        </div>
                        <div className="col-4" style={{}}>
                            <p className="pt-2 routineFont" style={{ fontSize: "large", color: "white" }}>Total</p>
                        </div>
                        <div>
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#f0f0f0 ", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Efectivo inicial</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].efectivoInicial}</p>
                                    </div>
                                </div>}
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#dedede", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Discrepancia inicial</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].discrepanciaInicial}</p>
                                    </div>
                                </div>}
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#f0f0f0 ", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Ventas en efectivo</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].ventasEfectivo}</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                </div>}
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#dedede", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Ventas en tarjeta</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].ventasTarjeta}</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                </div>}
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#f0f0f0 ", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Ventas totales</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].ventasTotales}</p>
                                    </div>
                                </div>}
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#dedede", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Gastos en efectivo</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].gastosEfectivo}</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                </div>}
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#f0f0f0 ", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Gastos en tarjeta</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].gastosTarjeta}</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                </div>}
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#dedede", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Gastos totales</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].gastosTotales}</p>
                                    </div>
                                </div>}
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#f0f0f0 ", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Efectivo recibido</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].efectivoRecibido}</p>
                                    </div>
                                </div>}
                            {details.length > 0 &&
                                <div className="row " style={{ backgroundColor: "#dedede", minHeight: "35px" }}>
                                    <div className="col-4 routineFont" style={{ borderRight: "2px dotted #FDF6F0" }}>
                                        <p style={{ textAlign: "center", fontSize: "medium" }}>Faltante/Sobrante</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>0</p>
                                    </div>
                                    <div className="col-4 routineFontDetails">
                                        <p style={{paddingTop: "12px"}}>{details[0].faltanteSobrante}</p>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}