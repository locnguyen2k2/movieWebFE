import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import API from "../../constants/API";
import SelectItems from "../../components/Select";

function ListActor(props) {
    const [actor, setActor] = useState([]);
    useEffect(() => {
        axios.get(API.API_LIST_ACTOR)
            .then((res) => {
                setActor(res.data.data);
            });
    })
    return (
        <div className="ListActor">
            <div className="form-group">
                <SelectItems
                    title="Select actors"
                    data={actor}
                />
            </div>
        </div>
    )
}

export default ListActor;