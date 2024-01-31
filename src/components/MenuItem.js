import React from "react";
import { Link } from "react-router-dom";

function MenuItem({ index, path, title }) {
    return (
        <li className={"nav-item"} key={index}>
            <Link className={"nav-link"} to={path}>{title}</Link>
        </li>
    )
}

export default MenuItem;