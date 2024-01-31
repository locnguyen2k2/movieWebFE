import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "./../../components/Context";
import API from "../../constants/API";
import DetailPerson from "../../components/DetailPerson";
import DirectorModel from "../../services/DirectorModel";

function DetailDirector() {
    const [data, setData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        DirectorModel.getDetailDirector(id).then((res) => {
            setData(res.data.data);
        })
    }, [id]);

    return (
        <DetailPerson {...data} title={"Đạo diễn"} content={"director"} />
    )
}

export default DetailDirector;