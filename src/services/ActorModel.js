import API from './../constants/API';
import axios from 'axios';

const getListActor = async () => {
    return await axios.get(API.API_LIST_ACTOR, { withCredentials: true });
}

const getDetailActor = async (id) => {
    return await axios.get(API.API_DETAIL_ACTOR + id, { withCredentials: true });
}

const addActor = async (data) => {
    return await axios.post(API.API_ADD_ACTOR, { data }, { withCredentials: true });
}

export default {
    getListActor,
    getDetailActor,
    addActor
}