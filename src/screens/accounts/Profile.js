import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import API from "../../constants/API";
import { Context } from "../../components/Context";
import { useNavigate } from "react-router-dom";
import AccountModel from "../../services/AccountModel";

function Profile() {
    const { user } = useContext(Context);
    let username = "";
    const navigate = useNavigate();
    const [edit, setEdit] = useState({ fname: false, lname: false })
    const [userInfo, setUserInfo] = useState({ id: "", username: "", lname: "", fname: "", email: "", address: "", permission: [] })
    useEffect(() => {
        if (user.logged == true) {
            username = user.username
            axios.get(API.API_GET_USER + "/" + username, { withCredentials: true })
                .then(res => {
                    let data = res.data.data
                    setUserInfo({ id: data.item.id, username: data.item.username, lname: data.item.lname, fname: data.item.fname, email: data.item.email, address: data.item.address, permission: data.item.permission });
                })
        } else {
            navigate("/login")
        }
    }, [user.logged])
    const handleChange = (e) => {
        let key = e.target.getAttribute('name')
        setUserInfo({ ...userInfo, [key]: e.target.value })
    }
    const handleEdit = (e) => {
        edit[e.target.getAttribute('data')] == false ?
            setEdit({ ...edit, [e.target.getAttribute('data')]: true })
            : setEdit({ ...edit, [e.target.getAttribute('data')]: false });
    }
    const handleUpdate = (e) => {
        e.preventDefault()
        if (
            userInfo.fname != undefined
            && userInfo.lname != undefined
            && userInfo.fname != ""
            && userInfo.lname != ""
        ) {
            AccountModel.updateUser(userInfo)
                .then((res) => {
                    if (res.data.error == 1) {
                        setEdit({ fname: false, lname: false })
                        alert('Cập nhật thành công')
                    } else {
                        alert(res.data.message)
                    }
                })
        } else {
            alert('Không được để trống!')
        }
    }
    return (
        <div id="profile">
            {
                userInfo.id != undefined ? (
                    <div>
                        <p>
                            <strong>Họ: </strong>
                            {
                                edit.fname == true ?
                                    <input
                                        type="text"
                                        name="fname"
                                        value={userInfo.fname}
                                        onChange={handleChange} />
                                    : <span
                                        data='fname'
                                        onClick={handleEdit}
                                    >
                                        {
                                            userInfo.fname
                                        }
                                    </span>
                            }
                        </p>
                        <p>
                            <strong>Tên: </strong>
                            {
                                edit.lname == true ?
                                    <input
                                        type="text"
                                        name="lname"
                                        value={userInfo.lname}
                                        onChange={handleChange} />
                                    :
                                    <span
                                        data='lname'
                                        onClick={handleEdit}
                                    >
                                        {
                                            userInfo.lname
                                        }
                                    </span>
                            }
                        </p>
                        <p>
                            <strong>Tài khoản:</strong>
                            {userInfo.username}
                        </p>
                        <p><strong>Email:</strong>
                            {userInfo.email}
                        </p>
                        <p><strong>Địa chỉ:</strong>
                            <span>{userInfo.address}</span>
                        </p>
                        <p><strong>Quyền truy cập:</strong>
                            {
                                userInfo.permission.map((item, index) => {
                                    return (
                                        <span key={index}>{item}</span>
                                    )
                                })
                            }
                        </p>
                        {
                            edit.fname == true || edit.lname == true ?
                                <input onClick={handleUpdate} type="button" className="btn btn-primary" value={"Update"} />
                                : ""
                        }
                    </div>
                ) : "Chưa đăng nhập"
            }
        </div >
    )
}
export default Profile;