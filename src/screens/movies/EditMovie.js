import React from "react";
import MovieModel from "./../../services/MovieModel";
import ActorModel from "./../../services/ActorModel";
import DirectorModel from "./../../services/DirectorModel";
import CategoryModel from "./../../services/CategoryModel";
import { useParams, useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import API from "../../constants/API";
import { useEffect, useState } from "react";

function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState();
    const [actors, setActors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [trendding, setTrendding] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [movieInfo, setMovieInfo] = useState({ name: {}, categories: {}, description: {}, actors: {}, directors: {}, trendding: {} });
    useEffect(() => {
        MovieModel.getDetailMovie(id).then((res) => {
            setMovie(res.data.data)
            res.data.data.actors.map((actor, index) => {
                setMovieInfo((prevMovieInfo) => {
                    const updatedMovieInfo = { ...prevMovieInfo };
                    updatedMovieInfo.actors[actor.movieActorID] = actor.actorID;
                    return updatedMovieInfo;
                })
            });
            res.data.data.categories.map((category, index) => {
                setMovieInfo((prevMovieInfo) => {
                    const updatedMovieInfo = { ...prevMovieInfo };
                    updatedMovieInfo.categories[category.movieCategoryID] = category.id;
                    return updatedMovieInfo;
                })
            });
            res.data.data.movie.director.map((director, index) => {
                setMovieInfo((prevMovieInfo) => {
                    const updatedMovieInfo = { ...prevMovieInfo };
                    updatedMovieInfo.directors[director.id] = director.id;
                    return updatedMovieInfo;
                })
            });
            setMovieInfo((prevMovieInfo) => {
                const updatedMovieInfo = { ...prevMovieInfo };
                updatedMovieInfo.trendding.trendding = res.data.data.movie.trendding;
                return updatedMovieInfo;
            })
            setMovieInfo((prevMovieInfo) => {
                const updatedMovieInfo = { ...prevMovieInfo };
                updatedMovieInfo.name.name = res.data.data.movie.name;
                updatedMovieInfo.description.description = res.data.data.movie.description;
                return updatedMovieInfo;
            })
        })
        ActorModel.getListActor().then((res) => {
            setActors(res.data.data);
        })
        CategoryModel.getListCategory().then((res) => {
            setCategories(res.data.data);
        })
        DirectorModel.getListDirector().then((res) => {
            setDirectors(res.data.data);
        })
    }, [])

    const handleChange = (e) => {
        let property, index, newIndex;
        let data = e.target.name.split('-');
        if (data.length == 3) {
            [property, index, newIndex] = e.target.name.split('-');
        } else if (data.length == 2) {
            [property, index] = e.target.name.split('-');
        }
        setMovieInfo((prevMovieInfo) => {
            const updatedMovieInfo = { ...prevMovieInfo };
            let keys = Object.keys(updatedMovieInfo[property]);
            if (keys.length <= 1) {
                newIndex == undefined ?
                    updatedMovieInfo[property][index] = (e.target.value)
                    : updatedMovieInfo[property][index + "-" + newIndex] = parseInt(e.target.value);
            } else {
                let replace = false;
                keys.map((key) => {
                    if (updatedMovieInfo[property][key] == parseInt(e.target.value)) {
                        replace = true;
                        return;
                    }
                })
                if (replace == false) {
                    newIndex == undefined ?
                        updatedMovieInfo[property][index] = parseInt(e.target.value)
                        : updatedMovieInfo[property][index + "-" + newIndex] = parseInt(e.target.value);
                }
            }
            return updatedMovieInfo;
        });
    };
    const handDelete = (e) => {
        let property, index, newIndex;
        let data = e.target.getAttribute("dataname").split('-');
        if (data.length == 3) {
            [property, index, newIndex] = e.target.getAttribute("dataname").split('-');
        } else {
            [property, index] = e.target.getAttribute("dataname").split('-');
        }
        setMovieInfo((prevMovieInfo) => {
            const updatedMovieInfo = { ...prevMovieInfo };
            const keys = Object.keys(updatedMovieInfo[property]);
            // Update the selected property inside the actors array
            if (
                keys.length > 1
            ) {
                newIndex == undefined ?
                    delete updatedMovieInfo[property][index]
                    : delete updatedMovieInfo[property][index + "-" + newIndex];
            }
            return updatedMovieInfo;
        });
    }
    const onAdd = (e) => {
        let [property, index] = e.target.getAttribute("data").split('-');
        let keys = Object.keys(movieInfo[property]);
        let maxKey = 0;
        keys.map((key) => {
            if (key.includes("new")) {
                if (maxKey < parseInt(key.split('-')[1])) {
                    maxKey = parseInt(key.split('-')[1]);
                }
            }
        })
        setMovieInfo((prevMovieInfo) => {
            const updatedMovieInfo = { ...prevMovieInfo };
            updatedMovieInfo[property]['new-' + (parseInt(maxKey) + 1)] = "";
            return updatedMovieInfo;
        });
    }
    const handleUpdate = () => {
        let actorKeys = Object.keys(movieInfo.actors);
        let directorKeys = Object.keys(movieInfo.directors);
        let categories = Object.keys(movieInfo.categories);
        if (
            movieInfo.name.name != undefined
            && movieInfo.name.name != ""
            && movieInfo.description.description != undefined
            && movieInfo.description.description != ""
            && movieInfo.categories[categories[0]] != undefined
            && movieInfo.directors[directorKeys[0]] != undefined
            && movieInfo.actors[actorKeys[0]] != undefined) {
            let data = {
                name: movieInfo.name,
                description: movieInfo.description,
                director: movieInfo.directors,
                actors: movieInfo.actors,
                categories: movieInfo.categories,
                trendding: movieInfo.trendding
            }
            MovieModel.updateMovie(id, data).then((res) => {
                if (res.data.error == 1) {
                    alert(res.data.message)
                    navigate('/admin/movies/' + id)
                } else {
                    alert(res.data.message)
                }
            })
        } else {
            alert("Fill in all fields")
        }
    }
    return (
        <>
            {
                movie ?
                    < div className="update-movie row row-cols-sm-1">
                        <div className="col">
                            <div className="row row-cols-1 row-cols-md-2">
                                <div className="poster col d-flex justify-content-center align-items-center">
                                    {
                                        movie.images.map((image) => {
                                            return (
                                                <img className="w-100" key={image.id} src={API.API_IMAGES + image.path + "/" + image.image + "." + image.type} alt="movie" />
                                            )
                                        })
                                    }
                                </div>
                                <div className="info col">
                                    <div className="row row-cols-1">
                                        <div className="col movie-name">
                                            <span><b>Tên phim:</b></span>
                                            <input
                                                className="name border-0 rounded-3 w-100 primary-text-color p-1 m-1 text-center justify-content-center"
                                                type="text"
                                                name={"name-name"}
                                                defaultValue={movieInfo.name[0] ? movieInfo.name[0] : movie.movie.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col description d-flex justify-content-center align-items-center flex-column">
                                            <span className="p-1"><b>Tóm tắt</b></span>
                                            <textarea className="w-100 rounded-3 primary-text-color p-1 m-1 text-center justify-content-center"
                                                name={"description-description"}
                                                defaultValue={movieInfo.description[0] ? movieInfo.description[0] : movie.movie.description}
                                                onChange={handleChange}
                                                rows={5}
                                                cols={50}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <label htmlFor="trendding">
                                                    Trendding:
                                                </label>
                                                <input type="button"
                                                    className="btn primary-button d-block m-3"
                                                    name="trendding-trendding"
                                                    onClick={handleChange}
                                                    value={
                                                        movieInfo.trendding.trendding == 0 ? 1 : 0
                                                    }
                                                />
                                            </div>
                                            <button onClick={handleUpdate} className="btn btn-primary m-3">Update</button>
                                            <button className="btn btn-primary m-3">Delete</button>
                                        </div>
                                        <div>
                                            <span><b>Thể loại</b>
                                                <button className="btn btn-primary m-2"
                                                    onClick={onAdd}
                                                    data={"categories-" + (categories.length)}
                                                >
                                                    Thêm
                                                </button>
                                            </span>
                                            <div className="row row-cols-sm-1 row-cols-md-2">
                                                {
                                                    Object.keys(movieInfo.categories).map((key, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="d-flex w-100"
                                                            >
                                                                <select
                                                                    className="m-1 w-50 text-center rounded-3"
                                                                    name={"categories-" + key}
                                                                    value={
                                                                        movieInfo.categories[key] == "" ?
                                                                            -1
                                                                            : movieInfo.categories[key]
                                                                    }
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value={-1}> Chọn thể loại </option>
                                                                    {
                                                                        categories.map((category, index1) => {
                                                                            return <option key={index1} value={category.id}> {category.name} </option>
                                                                        })
                                                                    }
                                                                </select>
                                                                <button
                                                                    className="position-relative btn btn-danger rounded-circle d-flex justify-content-center align-items-center"
                                                                    type="button"
                                                                    onClick={handDelete}
                                                                    style={{
                                                                        width: "30px",
                                                                        height: "30px",
                                                                    }}
                                                                >
                                                                    <img
                                                                        dataname={
                                                                            movieInfo.categories[key] == "" ?
                                                                                "categories-new-" + key.split('-')[1] : "categories-" + key
                                                                        }
                                                                        src={icons.Close}
                                                                        alt="icon-close"
                                                                        width={30}
                                                                        height={30}
                                                                    />
                                                                </button>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div className="col">
                            <div className="person-item d-flex">
                                <div className="col d-flex justify-content-start align-items-center flex-column">
                                    <span className="m-1"><b>Đạo diễn</b></span>
                                    {
                                        movie.movie.director.map((movieDirector, index) => {
                                            return (
                                                <select
                                                    className="m-1 w-50 text-center rounded-3"
                                                    name={"directors-" + movieDirector.id}
                                                    key={index}
                                                    value={
                                                        directors.find((director) => director.id == movieInfo.directors[movieDirector.id]) ?
                                                            movieInfo.directors[movieDirector.id]
                                                            :
                                                            movieDirector.id
                                                    }
                                                    onChange={handleChange}
                                                >
                                                    {
                                                        directors.map((director, index1) => {
                                                            return <option key={index1} value={director.id}> {director.fullName} </option>
                                                        })
                                                    }
                                                </select>
                                            )
                                        })
                                    }
                                </div>
                                <div className="col d-flex justify-content-center align-items-center flex-column">
                                    <span className="m-1">
                                        <b>Diễn viên</b>
                                        <button className="btn btn-primary m-2"
                                            onClick={onAdd}
                                            data={"actors-" + (actors.length)}
                                        >
                                            Thêm
                                        </button>
                                    </span>
                                    {
                                        Object.keys(movieInfo.actors).map((key, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="d-flex w-100">
                                                    <select
                                                        className="m-1 w-50 text-center rounded-3"
                                                        name={"actors-" + key}
                                                        key={index}
                                                        value={
                                                            movieInfo.actors[key] == "" ?
                                                                -1
                                                                : actors.find((actor) => actor.id == movieInfo.actors[key]) ?
                                                                    movieInfo.actors[key]
                                                                    :
                                                                    movie.actors.find((movieActor) => movieActor.movieActorID == key).actorID
                                                        }
                                                        onChange={handleChange}
                                                    >
                                                        <option value={-1}> Chọn diễn viên </option>
                                                        {
                                                            actors.map((actor, index1) => {
                                                                return <option key={index1} value={actor.id}> {actor.fullName} </option>
                                                            })
                                                        }
                                                    </select>
                                                    <button
                                                        className="position-relative btn btn-danger rounded-circle d-flex justify-content-center align-items-center"
                                                        type="button"
                                                        onClick={handDelete}
                                                        style={{
                                                            width: "30px",
                                                            height: "30px",
                                                        }}
                                                    >
                                                        <img
                                                            dataname={
                                                                movieInfo.actors[key] == "" ?
                                                                    "actors-new-" + key.split('-')[1] : "actors-" + key
                                                            }
                                                            src={icons.Close}
                                                            alt="icon-close"
                                                            width={30}
                                                            height={30}
                                                        />
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div >
                    : "Movie not found"
            }
        </>
    )
}

export default EditMovie;