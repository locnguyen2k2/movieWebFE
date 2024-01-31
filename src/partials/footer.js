import React from "react";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="bg-dark rounded-2 text-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="mb-3">About Us</h5>
                        <p>LeftFlit is a streaming service that offers a wide variety of TV shows, movies, and
                            documentaries. You can watch as much as you want, whenever you want without a single
                            commercial – all for one low monthly price.</p>
                    </div>
                    <div className="col-md-4">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="#">Movies</Link></li>
                            <li><Link to="#">TV Shows</Link></li>
                            <li><Link to="#">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5 className="mb-3">Stay Connected</h5>
                        <ul className="list-unstyled">
                            <li><Link to="#"><i className="fab fa-facebook fa-lg me-3"></i>Facebook</Link></li>
                            <li><Link to="#"><i className="fab fa-twitter fa-lg me-3"></i>Twitter</Link></li>
                            <li><Link to="#"><i className="fab fa-instagram fa-lg me-3"></i>Instagram</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-secondary py-2">
                <div className="container text-center">
                    <p className="m-0">&copy; 2023 LeftFlit. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;