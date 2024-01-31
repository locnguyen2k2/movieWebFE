import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "./../../components/Context";
import API from "../../constants/API";
import MovieModel from "../../services/MovieModel";
import icons from "../../constants/icons";

function DetailMovie() {
    const [data, setData] = useState({});
    const { id } = useParams();
    const { user } = useContext(Context);
    useEffect(() => {
        MovieModel.getDetailMovie(id).then((res) => {
            setData(res.data.data);
        })
    }, [id]);
    return (
        <>
            {
                data.movie ?
                    <div className="detail-movie row row-cols-sm-1">
                        <div className="col">
                            <div className="row row-cols-1 row-cols-md-2">
                                <div className="poster col d-flex justify-content-center align-items-center">
                                    {
                                        data.images.length == 0 ?
                                            <img className="w-100" alt="Joker Poster" src={icons.Empty} />
                                            : data.images.map((image) => {
                                                return (
                                                    <img className="w-100" key={image.id} src={API.API_IMAGES + image.path + "/" + image.image + "." + image.type} alt="movie" />
                                                )
                                            })
                                    }
                                </div>
                                <div className="info col">
                                    <div className="row row-cols-1">
                                        <div className="col movie-name">
                                            <span><b>Tên phim:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </b></span>
                                            <p>{data.movie.name}</p>
                                        </div>
                                        <div className="col description d-flex justify-content-center align-items-center flex-column">
                                            <span className="p-1"><b>Tóm tắt</b></span>
                                            <p>{data.movie.description}</p>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            {
                                                user.permission && user.permission.admin ?
                                                    <Link to={"/admin/movies/edit/" + data.movie.id} className="btn btn-primary m-3">Update</Link> : ""
                                            }
                                            <Link to="" className="btn btn-primary m-3">Xem phim</Link>
                                            <Link to="" className="btn btn-primary m-3">Trailer</Link>
                                        </div>
                                        <div>
                                            <span><b>Thể loại</b></span>
                                            <ul className="row row-cols-sm-1 row-cols-md-2">
                                                {
                                                    data.categories.map((category, index) => {
                                                        return (
                                                            <li className="col" key={index}>
                                                                <p>
                                                                    {category.name}
                                                                </p>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="person-item d-flex">
                                <div className="col d-flex justify-content-start align-items-center flex-column">
                                    <span><b>Đạo diễn</b></span>
                                    <p>{data.movie.director[0].fname} {data.movie.director[0].lname}</p>
                                </div>
                                <div className="col d-flex justify-content-center align-items-center flex-column">
                                    <span><b>Diễn viên</b></span>
                                    <ul>
                                        {
                                            data.actors.map((actor) => {
                                                return (
                                                    <li className="" key={actor.id}>
                                                        <p key={actor.id}>
                                                            {actor.fname} {actor.lname}
                                                        </p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div >
                    : "Movie not found"
            }
            < div ></div >
        </>
    )
}


export default DetailMovie;