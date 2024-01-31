import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryModel from "../../services/CategoryModel";

function AddCategory() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { id } = useParams();
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleUpdate = (e) => {
        if (data.name != "" && data.name != undefined) {
            CategoryModel.addCategory(data)
                .then((res) => {
                    if (res.data.error == 1) {
                        alert("Thêm thành công");
                        navigate('/admin/categories');
                    } else {
                        alert(res.data.message);
                    }
                })
        }
    }
    return (
        <div className="detail-movie row row-cols-sm-1">
            <div className="title my-2 primary-text-color text-center fw-bold text-uppercase secondary-bg-color p-1 rounded-2 w-25">
                Thêm thể loại
            </div>
            <div className="info col">
                <div className="description text-center movie-name">
                    <span>Thể loại</span>
                    <p>
                        <input
                            className="rounded-2 outline-0 border-0 p-2 my-1"
                            type="text"
                            name={"name"}
                            value={
                                data.name ?
                                    data.name :
                                    ""
                            }
                            onChange={handleChange} />
                    </p>
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-primary m-3"
                        onClick={handleUpdate}
                    >Add</button>
                </div>
            </div >
        </div >
    )
}

export default AddCategory;