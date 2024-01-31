import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./Context";

function DetailPerson(props) {
    const { user } = useContext(Context);
    return (
        <>
            {
                props.fullname ?
                    <div className="detail-movie row row-cols-sm-1">
                        {console.log(props)}
                        <div className="col">
                            <div className="row row-cols-1 row-cols-md-2">
                                <div className="poster col d-flex justify-content-center align-items-center">
                                    {
                                        (props.gender === 1 ?
                                            <img className="w-100" src="https://as1.ftcdn.net/v2/jpg/02/33/46/24/1000_F_233462402_Fx1yke4ng4GA8TJikJZoiATrkncvW6Ib.jpg" alt="movie" />
                                            :
                                            <img className="w-100" src="https://as1.ftcdn.net/v2/jpg/02/43/51/48/1000_F_243514868_XDIMJHNNJYKLRST05XnnTj0MBpC4hdT5.jpg" alt="movie" />
                                        )
                                    }
                                </div>
                                <div className="info col">
                                    <div className="row row-cols-1">
                                        <div className="col description text-center movie-name">
                                            <span>Tên {props.title} </span>
                                            <p>{props.fullname}</p>
                                        </div>
                                        <div className="row row-cols-2">
                                            <div className="col">
                                                <span className="p-1"><b>Giới tính</b></span>
                                                <p>{
                                                    props.gender === 1 ? "Nữ" : "Nam"
                                                }</p>
                                            </div>
                                            <div className="col">
                                                <span className="p-1"><b>Ngày sinh</b></span>
                                                <p>
                                                    {
                                                        props.birthday ? props.birthday.split("T")[0] : ""
                                                    }
                                                </p>
                                            </div>
                                            <div className="col">
                                                <span className="p-1"><b>Nơi sinh</b></span>
                                                <p>{props.place}</p>
                                            </div>
                                            <div className="col">
                                                <span className="p-1"><b>Nơi ở hiện tại</b></span>
                                                <p>{props.address}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            {
                                                user.permission && user.permission.admin ?
                                                    props.content === "actor" ?
                                                        <Link
                                                            to={"/admin/actors/edit/" + props.id}
                                                            className="btn btn-primary m-3">
                                                            Update
                                                        </Link>
                                                        :
                                                        <Link
                                                            to={"/admin/directors/edit/" + props.personID}
                                                            className="btn btn-primary m-3">
                                                            Update
                                                        </Link>
                                                    : ""
                                            }
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

export default DetailPerson;