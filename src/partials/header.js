import React from "react";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { Context } from './../components/Context'

function Header() {
    const { user } = React.useContext(Context);
    let isDefault = [
        { path: '/', title: 'Trang chủ' },
        { path: '/about', title: 'Về chúng tôi' },
        { path: '/movies', title: 'Phim' },
        { path: '/movies/new', title: 'Mới' },
        { path: '/movies/trendding', title: 'Nổi bật' },
    ]
    let isAdmin = user && user.permission && user.permission.admin ?
        [
            { path: '/admin', title: 'Quản trị viên' },
        ] : [];
    let isLogged = user.logged == true ? [{ path: '/profile', title: 'Profile' }, { path: '/logout', title: 'Logout' }] : [{ path: '/login', title: 'Login' }, { path: '/register', title: 'Register' }]
    return (
        <nav className="navbar navbar-expand-lg position-relative container">
            <button className="button navbar-toggler z-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarToggleExternalContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse list" id="navbarNav">
                <Menu isAdmin={isAdmin} isDefault={isDefault} isLogged={isLogged} isSearch={true} />
            </div>
        </nav>
    )
}
export default Header;