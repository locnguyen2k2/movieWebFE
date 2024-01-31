import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./Context";
import API from "../constants/API";
import axios from "axios";
import personModel from "../services/PersonModel";

function EditPerson(props) {
    const navigate = useNavigate();
    const [person, setPerson] = useState();
    const handleChange = (e) => {
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        setPerson(props.data)
    }, [props])
    const handleUpdate = () => {
        console.log(person);
        if (person.fname.trim() === "" || person.lname.trim() === "" || person.birthday.trim() === "" || person.place.trim() === "" || person.address.trim() === "") {
            alert("Vui lòng điền đầy đủ thông tin");
        } else {
            personModel.updatePerson(props.data.personID, person).then((res) => {
                if (res.data.error == 1) {
                    alert("Cập nhật thành công");
                    props.content == 'director' ?
                        navigate('/admin/directors/' + props.data.personID) :
                        navigate('/admin/actors/' + props.data.id)
                } else {
                    alert(res.data.message);
                }
            })
        }
    }
    return (
        <>
            {
                props.data.fullname ?
                    <div className="detail-movie row row-cols-sm-1">
                        <div className="col">
                            <div className="row row-cols-1 row-cols-md-2">
                                <div className="poster col d-flex justify-content-center align-items-center">
                                    {
                                        (props.data.gender === 1 ?
                                            <img className="w-100" src="https://as1.ftcdn.net/v2/jpg/02/33/46/24/1000_F_233462402_Fx1yke4ng4GA8TJikJZoiATrkncvW6Ib.jpg" alt="movie" />
                                            :
                                            <img className="w-100" src="https://as1.ftcdn.net/v2/jpg/02/43/51/48/1000_F_243514868_XDIMJHNNJYKLRST05XnnTj0MBpC4hdT5.jpg" alt="movie" />
                                        )
                                    }
                                </div>
                                <div className="info col">
                                    <div className="row row-cols-1">
                                        <div className="row row-cols-2 description text-center movie-name">
                                            <div className="col">
                                                <span>Họ và tên đệm {props.data.title} </span>
                                                <p>
                                                    <input
                                                        className="rounded-2 outline-0 border-0 p-2 my-1"
                                                        type="text"
                                                        name="fname"
                                                        value={
                                                            person.fname ?
                                                                person.fname :
                                                                props.data.fname
                                                        }
                                                        onChange={handleChange} />
                                                </p>
                                            </div>
                                            <div className="col">
                                                <span>Tên {props.data.title} </span>
                                                <p>
                                                    <input
                                                        className="rounded-2 outline-0 border-0 p-2 my-1"
                                                        type="text"
                                                        name="lname"
                                                        value={
                                                            person.lname ?
                                                                person.lname :
                                                                props.data.lname
                                                        }
                                                        onChange={handleChange} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <span className="p-1"><b>Giới tính</b></span>
                                                <p>
                                                    <select
                                                        className="rounded-2 outline-0 border-0 p-2 my-1"
                                                        name="gender"
                                                        value={
                                                            person.gender ?
                                                                person.gender :
                                                                props.data.gender
                                                        }
                                                        onChange={handleChange}
                                                    >
                                                        <option value="0">Nam</option>
                                                        <option value="1">Nữ</option>
                                                    </select>
                                                </p>
                                            </div>
                                            <div className="col">
                                                <span className="p-1"><b>Ngày sinh</b></span>
                                                <p>
                                                    <input
                                                        className="rounded-2 outline-0 border-0 p-2 my-1"
                                                        type="date"
                                                        name="birthday"
                                                        value={
                                                            person.birthday ? person.birthday : props.data.birthday
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                </p>
                                            </div>
                                            <div className="col">
                                                <span className="p-1"><b>Nơi sinh</b></span>
                                                <p>
                                                    <input
                                                        className="rounded-2 outline-0 border-0 p-2 my-1"
                                                        type="text"
                                                        name="place"
                                                        value={
                                                            person.place ? person.place : props.data.place
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                </p>
                                            </div>
                                            <div className="col">
                                                <span className="p-1"><b>Nơi ở hiện tại</b></span>
                                                <p>
                                                    <input
                                                        className="rounded-2 outline-0 border-0 p-2 my-1"
                                                        type="text"
                                                        name="address"
                                                        value={
                                                            person.address ? person.address : props.data.address
                                                        }
                                                        onChange={handleChange} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button
                                                className="btn btn-primary m-3"
                                                onClick={handleUpdate}
                                            >Update</button>
                                        </div>
                                    </div>
                                </div >
                            </div >
                        </div >
                    </div >
                    : "Director not found"
            }
        </>
    )
}

export default EditPerson;