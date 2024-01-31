import React, { useState, useEffect } from "react";
import { Actor } from '../screens'
import MovieModel from "../services/MovieModel";
import CategoryModel from "../services/CategoryModel";
import PersonModel from "../services/PersonModel";
import axios from "axios";
import API from "../constants/API";
import icons from "../constants/icons";
import { useNavigate } from "react-router-dom";
import SelectItems from "../components/Select";
import directors from "../screens/directors";
import ActorModel from "../services/ActorModel";
import DirectorModel from "../services/DirectorModel";

function FAddMovie() {
    const navigate = useNavigate();
    const [actors, setActors] = useState([]);
    const [actorQuantity, setActorQuantity] = useState([1]);
    const [categoryQuantity, setCategoryQuantity] = useState([1]);
    const [directors, setDirectors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [movieInfo, setMovieInfo] = useState({ title: [], image: "", categories: [], director: [], actors: [], describe: [] });
    useEffect(() => {
        axios.get(API.API_LIST_DIRECTOR)
            .then((res) => {
                setDirectors(res.data.data);
            });
        axios.get(API.API_LIST_ACTOR)
            .then((res) => {
                setActors(res.data.data);
            });
        axios.get(API.API_LIST_CATEGORY)
            .then((res) => {
                setCategories(res.data.data);
            });
    }, [])
    const onChange = (e) => {
        let [property, index] = e.target.name.split("-");
        let item = property == "actors" ?
            actors.find((item) => item.id == e.target.value)
            : property == "categories" ?
                categories.find((item) => item.id == e.target.value)
                : directors.find((item) => item.id == e.target.value);
        if (item) {
            if (movieInfo[property].find((item1) => item1.id == item.id) == undefined) {
                if (movieInfo[property][index]) {
                    if (movieInfo[property][index].id != item.id) {
                        let newItem = [...movieInfo[property]];
                        newItem[index] = item;
                        setMovieInfo({ ...movieInfo, [property]: newItem });
                    }
                } else {
                    setMovieInfo({ ...movieInfo, [property]: [...movieInfo[property], item] });
                }
            }
        }
    }
    const onDeleteActor = (e) => {
        let [property, index] = e.target.getAttribute("dataname").split("-");
        let newItem = [...movieInfo[property]];
        newItem.splice(index, 1);
        setMovieInfo({ ...movieInfo, [property]: newItem });
        let newActorQuantity = [...actorQuantity];
        newActorQuantity.splice(index, 1);
        setActorQuantity(newActorQuantity);
    }
    const onDeleteCategory = (e) => {
        let [property, index] = e.target.getAttribute("dataname").split("-");
        let newItem = [...movieInfo[property]];
        newItem.splice(index, 1);
        setMovieInfo({ ...movieInfo, [property]: newItem });
        let newCategoryQuantity = [...categoryQuantity];
        newCategoryQuantity.splice(index, 1);
        setCategoryQuantity(newCategoryQuantity);
    }
    const handleAdd = () => {
        if (
            movieInfo.actors.length > 0
            && movieInfo.categories.length > 0
            && movieInfo.director.length > 0
            && typeof movieInfo.describe == "string"
            && typeof movieInfo.title == "string"
            && movieInfo.describe.trim() != ""
            && movieInfo.title.trim() != ""
        ) {
            let data = {
                movieTitle: movieInfo.title,
                movieDisc: movieInfo.describe,
                movieDirector: movieInfo.director[0].id,
                movieActor: movieInfo.actors.map((item) => item.id),
                movieCategory: movieInfo.categories.map((item) => item.id),
                movieImage: movieInfo.image
            }
            MovieModel.createMovie(data)
                .then((res) => {
                    if (res.data.error == 1) {
                        alert("Thêm phim thành công");
                        navigate("/admin/movies")
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            alert("Vui lòng nhập đầy đủ thông tin");
        }
    }
    return (
        <div>
            <div className="title my-2 primary-text-color text-center fw-bold text-uppercase secondary-bg-color">
                Thêm phim
            </div>
            <div className="title my-2">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập tên phim"
                        name={"title" + 0}
                        value={movieInfo.title}
                        onChange={(e) => {
                            setMovieInfo({ ...movieInfo, title: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="image my-2">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="file"
                        accept="image/jpg , image/png , image/jpeg"
                        placeholder="Chọn ảnh"
                        name={"image" + 0}
                        onChange={(e) => {
                            setMovieInfo({ ...movieInfo, image: e.target.files[0] });
                        }}
                    />
                </div>
            </div>
            <div className="categories my-2">
                <div>
                    <p>
                        Thể loại
                    </p>
                </div>
                <div>
                    <div className="form-group col row row-cols-md-2 row-cols-lg-3 my-1">
                        {
                            [...Array(categoryQuantity.length)].map((item, index) => {
                                return (
                                    <div
                                        className="col"
                                        key={index}
                                    >
                                        <div
                                            className="d-flex"
                                        >
                                            <select
                                                className="rounded-2"
                                                name={"categories-" + index}
                                                onChange={onChange}
                                                value={
                                                    movieInfo.categories[index]
                                                        ? movieInfo.categories[index].id
                                                        : -1
                                                }
                                            >
                                                <option value="-1">Chọn thể loại</option>
                                                {categories.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    )
                                                })}
                                            </select>
                                            {
                                                categoryQuantity.length > 1 && index != 0 ?
                                                    <button
                                                        className="position-relative btn btn-danger rounded-circle d-flex justify-content-center align-items-center"
                                                        type="button"
                                                        onClick={onDeleteCategory}
                                                        style={{
                                                            width: "30px",
                                                            height: "30px",
                                                        }}
                                                    >
                                                        <img
                                                            dataname={"categories-" + index}
                                                            src={icons.Close}
                                                            alt="icon-close"
                                                            width={30}
                                                            height={30}
                                                        />
                                                    </button>
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={
                            () => {
                                setCategoryQuantity([...categoryQuantity, 1]);
                            }
                        }>
                        Add
                    </button>
                </div>
            </div>
            <div className="describe my-2">
                <div className="form-group">
                    <textarea
                        className="form-control"
                        type="text"
                        placeholder="Nhập mô tả"
                        name={"describe" + 0}
                        value={movieInfo.describe}
                        onChange={(e) => {
                            setMovieInfo({ ...movieInfo, describe: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="directors my-2">
                <div>
                    <p>
                        Đạo diễn
                    </p>
                </div>
                <div className="form-group">
                    <select
                        className="rounded-2"
                        name="director-0"
                        value={
                            movieInfo.director[0]
                                ? movieInfo.director[0].id
                                : -1
                        }
                        onChange={onChange}
                    >
                        <option value="-1">Chọn đạo diễn</option>
                        {directors.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>{item.fullName}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="actors my-1">
                <div>
                    <p>
                        Diễn viên
                    </p>
                </div>
                <div>
                    <div className="form-group col row row-cols-md-2 row-cols-lg-3 my-1">
                        {
                            [...Array(actorQuantity.length)].map((item, index) => {
                                return (
                                    <div
                                        className="col"
                                        key={index}
                                    >
                                        <div
                                            className="d-flex"
                                        >
                                            <select
                                                className="rounded-2"
                                                name={"actors-" + index}
                                                onChange={onChange}
                                                value={
                                                    movieInfo.actors[index]
                                                        ? movieInfo.actors[index].id
                                                        : -1
                                                }
                                            >
                                                <option value="-1">Chọn diễn viên</option>
                                                {actors.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>{item.fullName}</option>
                                                    )
                                                })}
                                            </select>
                                            {
                                                actorQuantity.length > 1 && index != 0 ?
                                                    <button
                                                        className="position-relative btn btn-danger rounded-circle d-flex justify-content-center align-items-center"
                                                        type="button"
                                                        onClick={onDeleteActor}
                                                        style={{
                                                            width: "30px",
                                                            height: "30px",
                                                        }}
                                                    >
                                                        <img
                                                            dataname={"actors-" + index}
                                                            src={icons.Close}
                                                            alt="icon-close"
                                                            width={30}
                                                            height={30}
                                                        />
                                                    </button>
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={
                            () => {
                                setActorQuantity([...actorQuantity, 1]);
                            }
                        }>
                        Add
                    </button>
                </div>
            </div>
            <div className="group-button my-2">
                <button onClick={handleAdd} className="btn btn-primary">Thêm</button>
            </div>
        </div >
    )
}

function FAddPerson(props) {
    const navigate = useNavigate();
    const [personInfo, setPersonInfo] = useState({ fname: "", lname: "", gender: -1, birthday: "", place: "", address: "" })
    const handleAdd = () => {
        if (
            personInfo.fname != ""
            && personInfo.lname != ""
            && personInfo.gender != ""
            && personInfo.birthday != ""
            && personInfo.place != ""
            && personInfo.address != ""
        ) {
            const data = {
                fname: personInfo.fname,
                lname: personInfo.lname,
                gender: personInfo.gender,
                birthday: personInfo.birthday,
                place: personInfo.place,
                address: personInfo.address
            }
            props.content == "actors" ?
                ActorModel.addActor(data)
                    .then((res) => {
                        if (res.data.error == 1) {
                            alert("Thêm thành công");
                            navigate(`/admin/${props.content}`)
                        } else {
                            alert(res.data.message);
                        }
                    })
                : props.content == "directors" ?
                    DirectorModel.addDirector(data)
                        .then((res) => {
                            if (res.data.error == 1) {
                                alert("Thêm thành công");
                                navigate(`/admin/${props.content}`)
                            } else {
                                alert(res.data.message);
                            }
                        })
                    : navigate('/admin/')
        } else {
            alert('Vui lòng nhập đầy đủ thông tin!')
        }
    }
    return (
        <div>
            <div className="title my-2 primary-text-color text-center fw-bold text-uppercase secondary-bg-color p-1 rounded-2 w-25">
                Thêm diễn viên
            </div>
            <div className="title my-2">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập họ và tên lót"
                        name={"fname"}
                        value={personInfo.fname}
                        onChange={(e) => {
                            setPersonInfo({ ...personInfo, fname: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="title my-2">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập tên"
                        name={"lname"}
                        value={personInfo.lname}
                        onChange={(e) => {
                            setPersonInfo({ ...personInfo, lname: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="my-2 title">
                <div className="form-group">
                    <div>
                        <p>
                            Thể loại
                        </p>
                    </div>
                    <select
                        className="rounded-2 form-control"
                        name={"gender"}
                        onChange={(e) => {
                            setPersonInfo({ ...personInfo, gender: e.target.value })
                        }}
                        value={personInfo.gender}
                    >
                        <option value={-1}>Chọn phái</option>
                        <option value={0}>Nam</option>
                        <option value={1}>Nữ</option>
                    </select>
                </div>
            </div>
            <div className="title my-2">
                <div className="form-group">
                    <div>
                        <p>
                            Ngày sinh
                        </p>
                    </div>
                    <input
                        className="form-control"
                        type="date"
                        name={"birthday"}
                        value={personInfo.birthday}
                        onChange={(e) => {
                            setPersonInfo({ ...personInfo, birthday: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="title my-2">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập nơi sinh"
                        name={"place"}
                        value={personInfo.place}
                        onChange={(e) => {
                            setPersonInfo({ ...personInfo, place: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="title my-2">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Nhập địa chỉ"
                        name={"address"}
                        value={personInfo.address}
                        onChange={(e) => {
                            setPersonInfo({ ...personInfo, address: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="group-button my-2">
                <button onClick={handleAdd} className="btn btn-primary">Thêm</button>
            </div>
        </div>
    )
}

export default {
    FAddMovie,
    FAddPerson,
}