import React from "react";
import moment from "moment";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default function InvoiceCard(props) {
    
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
                pdf.save("Factura-" + props.fecha + ".pdf");
            });
    }
    return (
        <div>
            <div className="container">
                <div className="col-md-12 fade-in-card">
                    <div className="invoice">
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div className="col-sm-9 float-left">
                                <h2 className="para-color offset-md-2">Energym Fitness Center</h2>
                                </div>
                                <div className="col-sm-3 mb-4 float-left">
                                    <button className="btn btn-primary BotonesColor" onClick={(e) => printDocument(e)}>Generar PDF</button>
                                </div>
                            </div>
                        </div>
                        <hr style={{width: "80%", marginLeft:"110px", marginBottom:"30px"}}/>
                        <div id="documento" className="p-5" style={{ width: '210mm', minHeight: '297mm', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="invoice-header">
                                <div className="invoice-from">
                                    <strong>De</strong>
                                    <address className="">
                                        <strong className="text-inverse">Energym, Inc.</strong><br />
                                        <small>Cartago</small><br />
                                        <small>Loyola, 41425</small><br />
                                        <small>Teléfono: (506) 2549-6025</small><br />
                                        <small>Correo: servicioalcliente@energym.com</small>
                                    </address>
                                </div>
                                <div className="invoice-to">
                                    <strong>A</strong>
                                    <address className="5">
                                        <strong className="text-inverse">{props.name ? props.name : "Actualizar Información"} {props.lName ? props.lName : "Actualizar Apellido"}</strong><br />
                                        {/*<small>{props.detalle ? props.detalle : "Actualizar información del cliente"}</small><br />*/}{/*La direccion puede llegar a ser muy larga y perder el formato*/}
                                        <small>{props.province ? props.province : "Actualizar información del cliente"}, {props.postal ? props.postal : "Actualizar información del cliente"}</small><br />
                                        <small>Membresía: {props.membership ? props.membership : "Actualizar información del cliente"}</small><br />
                                        <small>Correo: {props.email}</small><br />
                                    </address>
                                </div>
                                <div className="invoice-date">
                                    <strong>{props.tipoDoc} </strong><br />
                                    <div className="date text-inverse"><small>{props.fecha}</small></div>
                                    <div className="invoice-detail"><small>{props.numDocumento}</small><br />
                                        <small>Servicio General</small><br />
                                    </div>
                                </div>
                            </div>
                            <br /><br /><br />
                            <div className="invoice-content">
                                <div className="table-responsive">
                                    <table className="table table-invoice">
                                        <thead>
                                            <tr>
                                                <th>DESCRIPCION DEL SERVICIO</th>
                                                <th className="text-center" width="10%">COSTO</th>
                                                <th className="text-center" width="10%">CANTIDAD</th>
                                                <th className="text-right" width="20%">TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="text-inverse">Servicios del mes número {moment(props.fecha).format("M")}</span><br />
                                                    <small>Cobro por servicios de gimnasio brindados en el mes {moment(props.fecha).format("M")} del año {moment(props.fecha).format("Y")}.</small>
                                                </td>
                                                <td className="text-center">{props.tipoDoc === "Pago" ? (-props.monto - props.iva).toFixed(2) : (props.monto - props.iva).toFixed(2)}</td>
                                                <td className="text-center">1</td>
                                                <td className="text-right">{props.tipoDoc === "Pago" ? (-props.monto - props.iva).toFixed(2) : (props.monto - props.iva).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="text-inverse">IVA</span><br />
                                                    <small>Cobro de IVA respectivo al mes {moment(props.fecha).format("M")} del año {moment(props.fecha).format("Y")}.</small>
                                                </td>
                                                <td className="text-center">{(props.iva).toFixed(2)}</td>
                                                <td className="text-center">1</td>
                                                <td className="text-right">{(props.iva).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br /><br /><br /><br /><br />
                                <div className="invoice-price">
                                    <div className="invoice-price-left">
                                        <div className="invoice-price-row">
                                            <div className="sub-price">
                                                <small>SUBTOTAL</small>
                                                <span className="text-inverse">{props.tipoDoc === "Pago" ? (-props.monto - props.iva).toFixed(2) : (props.monto - props.iva).toFixed(2)}</span>
                                            </div>
                                            <div className="sub-price">
                                                <i className="fa fa-plus text-muted"></i>
                                            </div>
                                            <div className="sub-price">
                                                <small>IVA </small>
                                                <span className="text-inverse">{(props.iva).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="invoice-price-right">
                                        <small>TOTAL</small> <span className="f-w-600">{props.tipoDoc === "Pago" ? (-props.monto).toFixed(2) : (props.monto).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="invoice-note">
                                * Todas las facturas vencen en 30 dias<br></br>
                                * Si tiene alguna pregunta favor dirija sus preguntas al siguiente correo electrónico servicioalcliente@energym.com
                            </div>
                            <div className="invoice-footer">
                                <p className="text-center m-b-5 f-w-600">
                                    Gracias por su preferencia
                                </p>
                                <p className="text-center">
                                    <span className="m-r-10"><i className="fa fa-fw fa-lg fa-globe"></i> energym.com</span>
                                    <span className="m-r-10"><i className="fa fa-fw fa-lg fa-phone-volume"></i> T:2549-6025</span>
                                    <span className="m-r-10"><i className="fa fa-fw fa-lg fa-envelope"></i> servicioalcliente@energym.com</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}