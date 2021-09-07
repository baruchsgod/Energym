import React from 'react'
import "../public/css/style.css";
export default function ReportCard(props) {
    const num = props.Key;
    function createMarkup(data) {
        return { __html: data};
    }
    return (
        <div>
            {num % 2 === 0 ?
                <div className="row rounded" style={{ backgroundColor: "#f0f0f0 ", minHeight: "150px" }}>
                    <div className="col-3 routineFont" style={{ borderRight: "2px dotted #171010" }}>
                        <p style={{ transform: "rotate(-90deg)", textAlign: "center", marginTop: "45px" }}>{props.Day.slice(0, 3)}</p>
                    </div>
                    <div className="col-3 routineFontDetails pt-3">
                        <p dangerouslySetInnerHTML={createMarkup(props.Cardio)}></p>
                    </div>
                    <div className="col-3 routineFontDetails pt-3">
                        <p dangerouslySetInnerHTML={createMarkup(props.Fuerza)}></p>
                    </div>
                    <div className="col-3 routineFontDetails pt-3">
                        <p dangerouslySetInnerHTML={createMarkup(props.Flexibilidad)}></p>
                    </div>
                </div>
                :
                <div className="row rounded" style={{ backgroundColor: " #dedede ", minHeight: "150px" }}>
                    <div className="col-3 routineFont" style={{ borderRight: "2px dotted #171010" }}>
                        <p style={{ transform: "rotate(-90deg)", textAlign: "center", marginTop: "45px" }}>{props.Day.slice(0, 3)}</p>
                    </div>
                    <div className="col-3 routineFontDetails pt-3">
                        <p dangerouslySetInnerHTML={createMarkup(props.Cardio)}></p>
                    </div>
                    <div className="col-3 routineFontDetails pt-3">
                        <p dangerouslySetInnerHTML={createMarkup(props.Fuerza)}></p>
                    </div>
                    <div className="col-3 routineFontDetails pt-3">
                        <p dangerouslySetInnerHTML={createMarkup(props.Flexibilidad)}></p>
                    </div>
                </div>
            }
        </div>
    )
}


