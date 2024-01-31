import React from "react";

function About() {
    return (
        <div className="about">
            <section id="about" className="py-5 text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 h-50">
                            <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5Udy89ttZtJ5cMC9y3o22zzyevg.jpg"
                                alt="About Image" className="img-fluid rounded h-75" />
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center flex-column">
                            <h2 className="mb-4">Loc Nguyen</h2>
                            <p className="lead mb-4"> is a streaming service that offers a wide variety of TV shows,
                                movies, and documentaries. You can watch as much as you want, whenever you want without
                                a single commercial – all for one low monthly price.</p>
                            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada
                                aliquam quam, vel porttitor lorem dictum a. Phasellus vitae orci euismod, consequat leo
                                vitae, consequat sem. Vivamus quis imperdiet tortor. Integer a lectus ac enim convallis
                                vehicula.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About;