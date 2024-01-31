import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ActorModel from "../../services/ActorModel";
import EditPerson from "../../components/EditPerson";

function EditActor() {
    const [data, setData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        ActorModel.getDetailActor(id).then((res) => {
            setData(res.data.data);
        })
    }, [id]);

    return (
        <EditPerson data={data} title={"Diễn viên"} />
    )
}

export default EditActor;