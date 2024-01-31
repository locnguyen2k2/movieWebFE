import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import DetailPerson from "../../components/DetailPerson";
import ActorModel from "../../services/ActorModel";

function DetailActor() {
    const [data, setData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        ActorModel.getDetailActor(id).then((res) => {
            setData(res.data.data);
        })
    }, [id]);

    return (
        <DetailPerson {...data} title={"Diễn viên"} content={"actor"} />
    )
}

export default DetailActor;