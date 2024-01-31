import React from "react";
import API from '../../constants/API'
import { Link } from "react-router-dom";
import icons from "../../constants/icons";

function MovieCard(props) {

    return (
        <div className="col round-0 position-relative overflow-hidden">
            <div className="card h-100 overflow-hidden">
                <div className="poster">
                    {
                        props.image == null ?
                            <img className=" card-img-top" alt="Joker Poster" src={icons.Empty} />
                            : <img className=" card-img-top" alt="Joker Poster" key={props.image.id} src={API.API_IMAGES + props.image.path + "/" + props.image.image + "." + props.image.type} alt="movie" />
                    }
                </div>
                <div className="card-body z-1 text-white info position-absolute bottom-0 start-0 end-0">
                    <h3 className="card-title secondary-text-color fs-5">
                        {props.name}
                    </h3>
                    {/* <p className="card-text">
                        {props.description}
                    </p> */}
                    <div className="card-footer">
                        <Link to={"/movie/" + props.id}
                            className="btn btn-primary"
                            style={{
                                maxWidth: "105px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "block",
                                margin: "0 auto",
                                fontSize: "12px",
                            }}
                        >
                            Xem
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;