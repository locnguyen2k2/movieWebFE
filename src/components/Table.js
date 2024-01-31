import React from "react";
import Titles from "./Title";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieModel from "../services/MovieModel";

function TableItem(props) {
    const styles = ({
        tableItem: {
            width: '100%',
        },
        table: {
            width: '100%',
        },
        th: {
            padding: '0 10px',
            border: '1px solid #ddd',
            width: `${100 / props.cols.length}%`,
        },

        td: {
            padding: '0 10px',
            width: `${100 / props.cols.length}%`,
            border: '1px solid #ddd',
        },

        textStyle: {
            margin: '0 0 0 10px',
            overflow: 'hidden',
            WebkitLineClamp: 3,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
        },
    })
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const total = props.data.length;
    const handleNext = (e) => {
        let numb = page < total / 5 ? page + 1 : 1;
        setPage(numb);
        e.target.parentNode.parentNode.childNodes.forEach((child) => {
            child.classList.remove("active");
            if (child.childNodes[0].value == numb) {
                child.classList.add("active");
            }
        })
    }
    const handlePrev = (e) => {
        let numb = page > 1 ? page - 1 : Math.ceil(total / 5);
        setPage(numb);
        e.target.parentNode.parentNode.childNodes.forEach((child) => {
            child.classList.remove("active");
            if (child.childNodes[0].value == numb) {
                child.classList.add("active");
            }
        })

    }
    const handleDeleteMovie = (id) => {
        MovieModel.deleteMovie(id).then((res) => {
            alert(res.data.message);
            window.location.reload();
        })
    }
    return (
        <div className="tableItem">
            <div className="d-flex justify-content-between align-items-center">
                <div className="title my-2 primary-text-color text-center fw-bold text-uppercase secondary-bg-color p-1 rounded-2 w-25">
                    {props.title}
                </div>
                {
                    props.content == "directors" || props.content == "actors" ?
                        <div>
                            <Link
                                to={"/admin/" + props.content + "/add/person"}
                            >
                                <button className="btn btn-primary py-1 m-2">Tạo</button>
                            </Link>
                        </div> : ""
                }
                <div>
                    <Link
                        to={"/admin/" + props.content + "/add"}
                    >
                        <button className="btn btn-primary py-1 m-2">Tạo mới</button>
                    </Link>
                </div>
            </div>
            <table className="table-item" style={styles.table}>
                <thead>
                    <tr>
                        {props.cols.map((col, index) => {
                            return <th className="text-center secondary-bg-color primary-text-color" key={index} style={styles.th}>{col}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.slice((page - 1) * 5, page * 5).map((row, index1) => {
                            return (
                                <tr key={index1}>
                                    {props.keys.map((col, index2) => {
                                        return (
                                            <td key={index2} style={styles.td}>
                                                {
                                                    col == "stt" ?
                                                        <p className={"text-center"}>{index1 + 1}</p>
                                                        :
                                                        col == "" ?
                                                            <p className={"d-flex"}>
                                                                <Link className="btn btn-primary m-2" to={`${row.id}`}>Detail</Link>
                                                                <Link className="btn btn-primary m-2" to={`edit/${row.id}`}>Edit</Link>
                                                                {
                                                                    props.content == "movies" ?
                                                                        <button
                                                                            className="btn btn-danger m-2"
                                                                            onClick={
                                                                                (e) => {
                                                                                    handleDeleteMovie(row.id);
                                                                                }
                                                                            }
                                                                        >Delete
                                                                        </button>
                                                                        :
                                                                        <></>
                                                                }
                                                            </p>
                                                            :
                                                            col == "categories" ?
                                                                <div style={styles.textStyle}>
                                                                    {
                                                                        props.data[index1].categories.map((category, index) => {
                                                                            return (
                                                                                <p className="m-0" key={index}>
                                                                                    {category.name + " , "}
                                                                                </p>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                                : <p className={"text-start"} style={styles.textStyle}>
                                                                    {row[col]}
                                                                </p>
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    }
                    {
                        props.data.slice((page - 1) * 5, page * 5).length < 5 ?
                            [...Array(5 - props.data.slice((page - 1) * 5, page * 5).length)].map((row, index) => {
                                return (
                                    <tr key={index}>
                                    </tr>
                                )
                            })
                            : ""
                    }
                </tbody>
            </table>
            <div className="pagination d-flex justify-content-center align-items-center my-3 p-1">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link"
                                onClick={handlePrev}
                            >
                                Previous
                            </button>
                        </li>
                        {
                            [...Array(Math.ceil(total / 5)).keys()].map((index) => {
                                return (
                                    <li className={"page-item" + (index == 0 ? " active" : "")} key={index}>
                                        <input className="page-link"
                                            type="button"
                                            value={index + 1}
                                            onClick={
                                                (e) => {
                                                    setPage(index + 1);
                                                    (e.target.parentNode.parentNode).childNodes.forEach((child) => {
                                                        child.classList.remove("active");
                                                    })
                                                    e.target.parentNode.classList.add("active");
                                                }
                                            }
                                        />
                                    </li>
                                )
                            })
                        }
                        <li className="page-item">
                            <button className="page-link"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div >
    )
};

export default TableItem;