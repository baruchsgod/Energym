import React from 'react';
import "../public/css/style.css";
import "../public/css/animate.min.css";
import "../public/css/aos.css";
import "../public/css/bootstrap-social.css";
import "../public/css/meanmenu.min.css";
import "../public/css/owl.carousel.min.css";
import "../public/css/venobox.css";
import "../public/vendor/bootstrap/css/bootstrap-grid.css";
import "../public/vendor/bootstrap/css/bootstrap-grid.css.map";
import "../public/vendor/bootstrap/css/bootstrap-grid.min.css";
import "../public/vendor/bootstrap/css/bootstrap-grid.min.css.map";
import "../public/vendor/bootstrap/css/bootstrap-reboot.css";
import "../public/vendor/bootstrap/css/bootstrap-reboot.css.map";
import "../public/vendor/bootstrap/css/bootstrap-reboot.min.css";
import "../public/vendor/bootstrap/css/bootstrap-reboot.min.css.map";
import "../public/vendor/bootstrap/css/bootstrap.css";
import "../public/vendor/bootstrap/css/bootstrap.css.map";
import "../public/vendor/bootstrap/css/bootstrap.min.css";
import "../public/vendor/bootstrap/css/bootstrap.min.css.map";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebookF, faTwitter, faLinkedin)
function Footer() {
    return (<div>
        <footer className="footer">
            <div className="footer-bottom-area">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="footer-bottom-part">
                                <div className="copyright"><a href="https://anditthemes.com/">Energym</a> &copy; 2021. All
                                    Rights Reserved</div>
                                <div className="footer-social">
                                    <ul>
                                        <li><a href="/"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                        <li><a href="/"><FontAwesomeIcon icon={faTwitter} /></a></li>
                                        <li><a href="/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div className="top-arrow">
            <a href="/" id="scroll" style={{ display: "none" }}><i className="fas fa-angle-up"></i></a>
        </div>
    </div>);
}
export default Footer;