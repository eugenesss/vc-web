import React, { Component } from 'react';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faFax } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

class Footer extends Component {
    render() {
        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Venture Cars</h3>

                                <ul className="quick-links">
                                    <li><Link href="/about"><a>About Us</a></Link></li>
                                    {/* <li><Link href="/blog"><a>Blog</a></Link></li> */}
                                    <li><Link href="/faq"><a>FAQs</a></Link></li>
                                    <li><Link href="/contact-us"><a>Contact Us</a></Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Sales Hours</h3>
                                <p className="information-links">
                                    <strong>Monday, Friday, Saturday and Sunday:</strong><br/>
                                    09:00AM – 07:00PM
                                </p>
                                <p className="information-links">
                                    <strong>Tuesday – Thursday:</strong><br/>
                                    09:00AM – 08:00PM
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Contact Us</h3>

                                <ul className="footer-contact-info">
                                    <li><FontAwesomeIcon icon={faMapMarkerAlt} /> 33 Ubi Ave , #01-47/48 Vertex Singapore 408868</li>
                                    <li><FontAwesomeIcon icon={faPhone} /> <a href="tel:6565528800">(+65) 6552-8800</a></li>
                                    <li><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:sales@bw.com.sg">sales@bw.com.sg</a></li>
                                    <li><FontAwesomeIcon icon={faFax} /> <a href="#">(+65) 6858 2120</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright-area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-6">
                                <p>Copyright @ 2019 Venture Cars. All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
