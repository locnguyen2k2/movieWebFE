import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../constants/API";
import TableItem from "../../components/Table";
function TableDirector() {
    const [directors, setDirector] = useState([]);
    useEffect(() => {
        axios.get(API.API_LIST_DIRECTOR)
            .then((res) => {
                res.data.data ? setDirector(res.data.data) : setDirector([]);
            }, []);
    })
    return (
        <TableItem
            title={"Đạo diễn"}
            cols={["STT", "Họ và tên", "Thiết lập"]}
            keys={["stt", "fullName", ""]}
            data={directors}
            content={"directors"}
        />
    )
}

export default TableDirector;