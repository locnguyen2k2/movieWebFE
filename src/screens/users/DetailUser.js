import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import API from "../../constants/API";
import { useParams } from "react-router-dom";

function DetailUser() {
    let { username } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        axios.get(API.API_GET_USER + "/" + username, {withCredentials: true})
            .then(res => {
                setUser(res.data.data);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
    }, [username])

    return (
        <div>
            {user ? (
                <div>
                    <p><strong>Id:</strong>
                        {user.item.id}
                    </p>
                    <p><strong>Họ và tên:</strong>
                        {user.item.fname} {user.item.lname}
                    </p>
                    <p>
                        <strong>Tài khoản:</strong>
                        {user.item.username}
                    </p>
                    <p><strong>Email:</strong>
                        {user.item.email}
                    </p>
                    <p><strong>Địa chỉ:</strong>
                        {user.item.address}
                    </p>
                    <p><strong>Quyền truy cập:</strong>
                        {
                            user.item.permission.map((item, index) => {
                                return (
                                    <span key={index}>{item}</span>
                                )
                            })
                        }
                    </p>
                </div>
            ) : <h1>Not Found</h1>}
        </div>
    )
}
export default DetailUser;