import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../constants/API";
import TableItem from "../../components/Table";
function TableCategory() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get(API.API_LIST_CATEGORY)
            .then((res) => {
                res.data.data ? setCategories(res.data.data) : setCategories([]);
            }, []);
    })
    return (
        <TableItem
            title={"Thể loại"}
            cols={["STT", "Thể loại", "Thiết lập"]}
            keys={["stt", "name", ""]}
            data={categories}
            content={"categories"}
        />
    )
}

export default TableCategory;