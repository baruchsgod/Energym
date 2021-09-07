import React, { useState } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default function ListDiets() {
    const location = useLocation();
    const { detalleDieta, tipoDieta } = (location && location.state) || '';
    const [dietData] = useState(detalleDieta);
    const [tipo] = useState(tipoDieta);
    function createMarkup() {
        return { __html: dietData };
    }
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
                pdf.save("Dieta-" + tipoDieta + ".pdf");
            });
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Detalle de la dieta"
                backUrl="/ListUserDiets"
                backName="Lista de dietas"
                currentName="Detalle de la dieta"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-sm-9 float-left">
                                <h2 className="para-color offset-md-1">Detalle de la dieta de tipo {tipo}</h2>
                            </div>
                            <div className="col-sm-3 mb-4 float-left">
                                <button className="btn btn-primary BotonesColor" onClick={(e) => printDocument(e)}>Generar PDF</button>
                            </div>
                            
                        </div>
                    </div>
                    <hr style={{width: "90%", marginLeft:"50px", marginBottom:"30px"}}/>
                    <div className="row">
                        <div className="p-4 col-md-10 offset-md-1 bg-light border rounded-3 campoInnerDiet">
                            <div id="documento" className="p-5" style={{ width: '210mm', minHeight: '297mm', marginLeft: 'auto', marginRight: 'auto' }} dangerouslySetInnerHTML={createMarkup()} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    );
}