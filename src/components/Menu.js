import MenuItem from "./MenuItem";
import icons from "../constants/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
function Menu(props) {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleSearch = (e) => {
        
    }
    return (
        <ul className="navbar-nav d-flex flex-row w-100 justify-content-center align-items-center">
            {
                props.isDefault ?
                    props.isDefault.map((item, index) => (
                        <MenuItem key={index} {...item} />
                    )) : ""
            }
            {
                props.isAdmin ?
                    props.isAdmin.map((item, index) => (
                        <MenuItem key={index} {...item} />
                    )) : ""
            }
            {
                props.isLogged ?
                    <li className="nav-item d-flex position-relative user-icon">
                        <ul className="navbar-nav flex-column position-absolute top-100 user-item d-none z-2">
                            {
                                props.isLogged.map((item, index) => (
                                    <MenuItem key={index} {...item} />
                                ))
                            }
                        </ul>
                        <Link className="nav-link" to=""
                            style={{
                                backgroundColor: "#c09440",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                            }}
                        >
                            <img src={icons.user}
                                alt="user"
                                width="25"
                                height="25"
                                className="d-inline-block align-text-top"
                            />
                        </Link>
                    </li> : ""
            }
            {
                props.isSearch ?
                    <li className="nav-item nav-link end-0">
                        <div>
                            <div className="fSearch d-flex position-relative">
                                <input
                                    className="form-control m-0 round-0"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={onChangeSearch}
                                />
                                <div className="search-btn btn position-absolute end-0 h-100" type="submit">
                                    <img src={icons.search}
                                        alt="search"
                                        width="20"
                                        height="20"
                                        onClick={handleSearch}
                                        className="d-inline-block align-text-top"
                                        style={{
                                            color: "white"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </li> : ""
            }
        </ul >
    )
}

export default Menu;