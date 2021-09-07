import React from "react";

export default function Close(props){

    return(
        <div>
        {props.Key % 2 === 0 ? 
            <div className="row " style={{backgroundColor:"#f0f0f0 ", minHeight:"35px"}}>
                <div className="col-4 routineFont" style={{borderRight:"2px dotted #FDF6F0"}}>
                    <p style={{textAlign:"center", fontSize:"medium"}}>{props.Title}</p>
                </div>
                <div className="col-4 routineFontDetails">
                    <p style={{paddingTop: "12px"}}>{props.Ventas}</p>
                </div>
                <div className="col-4 routineFontDetails">
                    <p style={{paddingTop: "12px"}}>{props.Total}</p>
                </div>
            </div>
            :
         
            <div className="row " style={{backgroundColor:"#dedede", minHeight:"35px"}}>
                    <div className="col-4 routineFont" style={{borderRight:"2px dotted #FDF6F0"}}>
                        <p style={{textAlign:"center", fontSize:"medium"}}>{props.Title}</p>
                    </div>
                    <div className="col-4 routineFontDetails">
                        <p style={{paddingTop: "12px"}}>{props.Ventas}</p>
                    </div>
                    <div className="col-4 routineFontDetails">
                        <p style={{paddingTop: "12px"}}>{props.Total}</p>
                    </div>
            </div>
           
            }
        </div>
    );
}