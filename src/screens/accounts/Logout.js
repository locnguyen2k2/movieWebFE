import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../constants/API";
import { Context } from "./../../components/Context";
import axios from "axios";

function Logout() {
    const { user, LogoutContext } = useContext(Context)
    if (user) {
        axios.get(API.API_LOGOUT, { withCredentials: true })
            .then(res => {
                if (res.data.error == 1) {
                    LogoutContext();
                    window.location.href = "/";
                } else {
                    window.location.href = "/login";
                }
            })
    } else {
        window.location.href = "/";
    }
}

export default Logout;