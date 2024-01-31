import React, { useState, useEffect, createContext } from "react";
import AccountModel from "./../services/AccountModel";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const LoginContext = (user) => {
        user.logged = true
        if (user.logged == true) {
            setUser(user);
        }
    }

    const LogoutContext = () => {
        setUser({});
    }

    useEffect(() => {
        AccountModel.checkLogin().then((res) => {
            if (res.data.error === 1) {
                res.data.data.logged = true
                setUser(res.data.data);
            }
        })
    }, [])

    return (
        <Context.Provider value={{ user, LoginContext, LogoutContext }}>
            {children}
        </Context.Provider>
    )
}
