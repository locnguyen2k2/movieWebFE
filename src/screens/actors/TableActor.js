import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../constants/API";
import TableItem from "../../components/Table";
function TableActor() {
    const [actor, setActor] = useState([]);
    useEffect(() => {
        axios.get(API.API_LIST_ACTOR)
            .then((res) => {
                res.data.data ? setActor(res.data.data) : setActor([]);
            }, []);
    })
    return (
        <TableItem
            title={"Diễn viên"}
            cols={["STT", "Họ và tên", "Thiết lập"]}
            keys={["stt", "fullName", ""]}
            data={actor}
            content={"actors"}
           
        />
    )
}

export default TableActor;