import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../../constants/API";
import { Context } from "../../components/Context";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
    const { LoginContext, user } = useContext(Context);
    const handleLogin = (e) => {
        e.preventDefault();
        if (loginInfo.username === "" || loginInfo.password === "") {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        } else {
            setError("");
            try {
                axios.post(API.API_LOGIN, loginInfo, { withCredentials: true })
                    .then((res) => {
                        if (res.data.error == 0) {
                            setError("Sai tên đăng nhập hoặc mật khẩu");
                            return;
                        } else {
                            setError("");
                            LoginContext(res.data.data);
                            window.location.href = "/";
                        }
                    })
            } catch (err) {
                setError(err.response.data.message);
            }
        }
    }
    useEffect(() => {
        if (user.logged != undefined) {
            navigate("/");
        }
    }, [user])
    return (
        <>
            <h3>
                {
                    error !== "" ? <span className="error-message">{error}</span> : ""
                }
            </h3>
            {
                user.logged == undefined ?
                    <form className="form" id={"login-user-form"}>
                        <div className="spacer"></div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input className="form-control"
                                id="username"
                                type="text"
                                name="username"
                                placeholder="username"
                                onChange={(e) => { setLoginInfo({ ...loginInfo, username: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input className="form-control"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => { setLoginInfo({ ...loginInfo, password: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <span><Link className="nav-link" to="/register">Chưa có tài khoản? Đăng ký <u>tại đây</u></Link></span>
                        </div>
                        <div className="form-group">
                            <button onClick={(e) => handleLogin(e)} className="btn btn-primary btn-login" type="submit">Đăng nhập</button>
                        </div>
                    </form> : ""
            }
        </>
    )
}

export default Login;