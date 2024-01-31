import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryModel from "../../services/CategoryModel";

function EditCategory() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [newData, setNewData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        CategoryModel.getDetailCategory(id)
            .then((res) => {
                if (res.data.error == 1) {
                    setData(res.data.data);
                } else {
                    alert('Thể loại không tồn tại');
                    navigate('/categories');
                }
            })
    }, [id]);
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }
    const handleUpdate = (e) => {
        let data = { ...newData, id: id };
        if (data.name != "" && data.id != "" && data.name != undefined && data.id != undefined) {
            CategoryModel.updateCategory(data)
                .then((res) => {
                    if (res.data.error == 1) {
                        alert("Cập nhật thành công");
                        navigate('/admin/categories');
                    } else {
                        alert(res.data.message);
                    }
                })
        }
    }
    return (
        <>
            {
                data.id ?
                    <div className="detail-movie row row-cols-sm-1">
                        <div className="info col">
                            <div className="description text-center movie-name">
                                <span>Thể loại</span>
                                <p>
                                    <input
                                        className="rounded-2 outline-0 border-0 p-2 my-1"
                                        type="text"
                                        name={"name"}
                                        value={
                                            newData.name != undefined ?
                                                newData.name :
                                                data.name
                                        }
                                        onChange={handleChange} />
                                </p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-primary m-3"
                                    onClick={handleUpdate}
                                >Update</button>
                            </div>
                        </div>
                    </div >
                    : "Director not found"
            }
        </>
    )
}

export default EditCategory;