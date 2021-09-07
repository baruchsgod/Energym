import { Link } from "react-router-dom";
export default function HeaderStatus(props) {
    return (
        <header className="page-banner-area blog-page-banner">
            <div className="section-overlay d-flex">
                <div className="container">
                    <div className="header-caption text-left">
                        <h1>{props.h1}</h1>
                        <div style={{ width: "415px" }}>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={props.backUrl} >{props.backName}</Link></li>
                                    <li className="breadcrumb-item active " aria-current="page">{props.currentName}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
