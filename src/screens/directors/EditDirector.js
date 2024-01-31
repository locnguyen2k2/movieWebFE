import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import DirectorModel from "../../services/DirectorModel";
import EditPerson from "../../components/EditPerson";

function EditDirector() {
    const [data, setData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        DirectorModel.getDetailDirector(id).then((res) => {
            setData(res.data.data);
        })
    }, [id]);

    return (
        <EditPerson data={data} title={"Đạo diễn"} content={"director"} />
    )
}

export default EditDirector;