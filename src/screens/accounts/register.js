import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../../constants/API";
import { Context } from "../../components/Context";

function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [registerInfo, setRegisterInfo] = useState({ passwordConfirmation: "", username: "", password: "", fname: "", lname: "", gender: "", birthday: "", address: "", phone: "", email: "" });
    const { LoginContext, user } = useContext(Context);
    const handleRegister = (e) => {
        e.preventDefault();
        if (registerInfo.username === ""
            || registerInfo.password === ""
            || registerInfo.fname === ""
            || registerInfo.lname === ""
            || registerInfo.gender === ""
            || registerInfo.phone === ""
            || registerInfo.address === ""
            || registerInfo.email === ""
            || registerInfo.birthday === ""
            || registerInfo.passwordConfirmation === ""
        ) {
            setError("Vui lòng nhập đầy đủ thông tin");
        } else {
            setError("");
            try {
                axios.post(API.API_CREATE_NEW_USER, registerInfo, { withCredentials: true })
                    .then((res) => {
                        if (res.data.error == 0) {
                            alert(res.data.message)
                            setError(res.data.message);
                        } else {
                            setError("");
                            alert(res.data.message)
                            navigate('/login')
                        }
                    })
            } catch (err) {
                alert(err)
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
                            <label htmlFor="fname">Họ: </label>
                            <input className="form-control"
                                id="fname"
                                type="text"
                                name="fname"
                                placeholder="Nguyễn Tấn"
                                onChange={(e) => { setRegisterInfo({ ...registerInfo, fname: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lname">Tên: </label>
                            <input className="form-control"
                                id="lname"
                                type="text"
                                name="lname"
                                placeholder="Lộc"
                                onChange={(e) => { setRegisterInfo({ ...registerInfo, lname: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Giới tính: </label>
                            <select
                                name="gender"
                                value={
                                    registerInfo.gender == "" ?
                                        -1 : registerInfo.gender
                                }
                                onChange={(e) => {
                                    setRegisterInfo({ ...registerInfo, gender: e.target.value })
                                }}
                            >
                                <option value={-1}>Chọn phái</option>
                                <option value={1}>Nam</option>
                                <option value={2}>Nữ</option>
                            </select>
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ: </label>
                            <input className="form-control"
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Trà vinh"
                                onChange={(e) => { setRegisterInfo({ ...registerInfo, address: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Điện thoại: </label>
                            <input className="form-control"
                                id="phone"
                                type="text"
                                name="phone"
                                placeholder="0123456789"
                                onChange={(e) => { setRegisterInfo({ ...registerInfo, phone: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Eamil: </label>
                            <input className="form-control"
                                id="email"
                                type="text"
                                name="email"
                                placeholder="nguyentanloc@gmail.com"
                                onChange={(e) => { setRegisterInfo({ ...registerInfo, email: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthday">Ngày sinh: </label>
                            <input className="form-control"
                                id="birthday"
                                type="date"
                                name="birthday"
                                placeholder="nguyentanloc@gmail.com"
                                onChange={(e) => { setRegisterInfo({ ...registerInfo, birthday: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input className="form-control"
                                id="username"
                                type="text"
                                name="username"
                                placeholder="username"
                                onChange={(e) => { setRegisterInfo({ ...registerInfo, username: e.target.value }) }}
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
                                onChange={(e) => { setRegisterInfo({ ...registerInfo, password: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordConfirmation">Nhập lại mật khẩu</label>
                            <input className="form-control"
                                id="passwordConfirmation"
                                type="password"
                                name="passwordConfirmation"
                                placeholder="passwordConfirmation"
                                onChange={(e) => { setRegisterInfo({ ...registerInfo, passwordConfirmation: e.target.value }) }}
                            />
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <span><Link className="nav-link" to={"/login"}>Đã có tài khoản? Đăng nhập <u>tại đây</u></Link></span>
                        </div>
                        <div className="form-group">
                            <button onClick={(e) => handleRegister(e)} className="btn btn-primary btn-login" type="submit">Đăng ký</button>
                        </div>
                    </form> : ""
            }
        </>
    )
}

export default Register;