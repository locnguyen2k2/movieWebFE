import React, { useEffect, useState } from "react";
import MovieModel from "../../services/MovieModel";
import TableItem from "../../components/Table";
function TableMovie(props) {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        switch (props.filter) {
            case 'trendding':
                MovieModel.getTrenddings().then((res) => {
                    setMovie(res.data.data);
                })
            case 'all':
                MovieModel.getListMovies().then((res) => {
                    setMovie(res.data.data);
                })
            case 'new':
                MovieModel.getNewest().then((res) => {
                    setMovie(res.data.data);
                })
            default:
                return;
        }
    }, [])
    return (
        <>
            {
                movie ?
                    <TableItem
                        title={"List Movies"}
                        cols={["STT", "Tên phim", "Thể loại", "Đạo diễn", "Mô tả", "Thiết lập"]}
                        keys={["stt", "name", "categories", "director", "description", ""]}
                        data={movie}
                        content={"movies"}
                    />
                    :
                    "Loading..."
            }
        </>
    )
}

export default TableMovie;