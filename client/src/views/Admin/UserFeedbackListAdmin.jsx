import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import swal from 'sweetalert';
import * as moment from 'moment';
import { Pie } from '@ant-design/charts';
export default function ListFeedback() {
    const [userFeedback, setUserFeedback] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPuntos, setTotalPuntos] = useState(0);
    const [estrellaUno, setEstrellaUno] = useState(0);
    const [estrellaDos, setEstrellaDos] = useState(0);
    const [estrellaTres, setEstrellaTres] = useState(0);
    const [estrellaCuatro, setEstrellaCuatro] = useState(0);
    const [estrellaCinco, setEstrellaCinco] = useState(0);
    useEffect(() => {
        var sumaPuntos = 0;
        let uno = 0;
        let dos = 0;
        let tres = 0;
        let cuatro = 0;
        let cinco = 0;
        if (userFeedback.length === 0) {
            fetch('https://energymproject.herokuapp.com/feedback/getRetroalimentacionAdmin')
                .then(response => response.json())
                .then(data => setUserFeedback(data));
        }
        if (userFeedback.length > 0) {
            userFeedback.map((item) => {
                switch (item.Calificacion) {
                    case 1:
                        uno += 1;
                        break;
                    case 2:
                        dos += 1;
                        break;
                    case 3:
                        tres += 1;
                        break;
                    case 4:
                        cuatro += 1;
                        break;
                    case 5:
                        cinco += 1;
                        break;
                    default:
                        break;
                }
                return true;
            })
            setEstrellaUno(uno);
            setEstrellaDos(dos);
            setEstrellaTres(tres);
            setEstrellaCuatro(cuatro);
            setEstrellaCinco(cinco);
        }
        setTotalItems(userFeedback.length);
        userFeedback.map((item) => (sumaPuntos += item.Calificacion))
        setTotalPuntos(sumaPuntos)
    }, [userFeedback]);
    var dataChart = [
        {
            type: '1 estrella',
            value: estrellaUno,
        },
        {
            type: '2 estrellas',
            value: estrellaDos,
        },
        {
            type: '3 estrellas',
            value: estrellaTres,
        },
        {
            type: '4 estrellas',
            value: estrellaCuatro,
        },
        {
            type: '5 estrellas',
            value: estrellaCinco,
        }
    ];
    var config = {
        appendPadding: 10,
        data: dataChart,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
    };
    function verDetalle(descripcion, calificacion, fecha, e) {
        e.preventDefault();
        return swal(`Calificación de ${calificacion}/5 el día ${fecha}`, descripcion);
    }
    function estrellas(calificacion) {
        var estrellas = "";
        for (let index = 0; index < calificacion; index++) {
            estrellas += "★"
        }
        return estrellas;
    }
    const datatable = {
        columns: [
            {
                label: "Fecha de creación",
                field: "Fecha",
                width: 200,
                sort: 'desc'
            },
            {
                label: 'Cliente',
                field: 'Cliente',
                width: 100,
            },
            {
                label: 'Calificación',
                field: 'Calificacion',
                width: 100,
            },
            {
                label: 'Detalle de comentario',
                field: 'Detalle',
                width: 100,
            }
        ],
        rows: userFeedback.map((item) => (
            {
                Fecha: moment(item.Fecha).format("DD/MM/YYYY"),
                Cliente: item.Cliente.Correo,
                Calificacion: estrellas(item.Calificacion),
                Detalle: <Button onClick={(e) => verDetalle(item.Descripcion, item.Calificacion, moment(item.Fecha).format("DD/MM/YYYY"), e)} type="button" className="BotonesColor"><FontAwesomeIcon icon={faEye} /></Button>,
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Datos de retroalimentación"
                backUrl="/AdminMenuGeneral"
                backName="Menú general"
                currentName="Datos de retroalimentación"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="row">
                            <div className="row mb-3 mt-3">
                                <div className="col-sm-12">
                                    <h2 className="para-color mb-3">Porcentajes con los resultados de las valoraciones de los clientes</h2>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Pie {...config} />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="row">
                            <div className="row mb-3 mt-3">
                                <div className="col-sm-12">
                                    <h2 className="para-color mb-3">Datos promedio y total de valoraciones</h2>
                                </div>
                                <hr />
                            </div>
                            {totalPuntos > 0 ? <h5 className="para-color mb-5 ml-4">Promedio de valoración: {totalPuntos / totalItems} de 5 basado en {totalItems} {totalItems === 1 ? "opinión." : "opiniones."}</h5>
                                :
                                <h5 className="para-color mb-5 ml-4">No existen actualmente valoraciones realizadas por los clientes...</h5>
                            }
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="row mb-3 mt-3">
                                    <div className="col-sm-12">
                                        <h2 className="para-color mb-3">Lista de los comentarios de retroalimentación recibida</h2>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="bmi-box">
                                    <MDBDataTableV5
                                        hover entriesOptions={[5, 15, 25]}
                                        entries={5}
                                        pagesAmount={4}
                                        data={datatable}
                                        searchTop
                                        searchBottom={false}
                                        infoLabel={["Mostrando de", "a", "de", "valoraciones"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No has realizado comentarios de retroalimentación aún..."
                                        searchLabel="Buscar"
                                        entriesLabel="Filas por página"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    );
}


