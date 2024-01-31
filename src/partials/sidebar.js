import { Link } from "react-router-dom";
import icons from "../constants/icons";

function Sidebar() {
    return (
        <div className="flex-shrink-0 p-3" >
            <Link className="d-flex flex-column justify-content-center align-items-center pb-3 mb-3 text-decoration-none border-bottom">
                <span className="navbar-brand logo secondary-text-color">
                    L O C N G U Y E N
                </span>
            </Link>
            <ul className="list-unstyled ps-0 sidebar-items">
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                        <img src={icons.arrowDown} />
                        Phim
                    </button>
                    <div className="collapse" id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link to="movies/" className="rounded">Danh sách</Link></li>
                            <li><Link to="movies/add" className="rounded">Thêm mới</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                        <img src={icons.arrowDown} />
                        Diễn viên
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link to="actors/" className="rounded">Danh sách</Link></li>
                            <li><Link to="actors/add" className="rounded">Thêm mới</Link></li>
                            <li><Link to="actors/add/person" className="rounded">Thêm</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                        <img src={icons.arrowDown} />
                        Đạo diễn
                    </button>
                    <div className="collapse" id="orders-collapse" >
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link to="directors" className="rounded">Danh sách</Link></li>
                            <li><Link to="directors/add" className="rounded">Thêm mới</Link></li>
                            <li><Link to="directors/add/person" className="rounded">Thêm</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#category-collapse" aria-expanded="false">
                        <img src={icons.arrowDown} />
                        Thể loại
                    </button>
                    <div className="collapse" id="category-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link to="categories/" className="rounded">Danh sách</Link></li>
                            <li><Link to="categories/add" className="rounded">Thêm mới</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="border-top my-3"></li>
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                        <img src={icons.arrowDown} />
                        Account
                    </button>
                    <div className="collapse" id="account-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><Link to="#" className="rounded">New...</Link></li>
                            <li><Link to="#" className="rounded">Profile</Link></li>
                            <li><Link to="#" className="rounded">Settings</Link></li>
                            <li><Link to="#" className="rounded">Sign out</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;