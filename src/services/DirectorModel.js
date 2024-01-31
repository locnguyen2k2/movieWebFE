import API from './../constants/API';
import axios from 'axios';

const getListDirector = async () => {
    return await axios.get(API.API_LIST_DIRECTOR, { withCredentials: true });
}

const getDetailDirector = async (id) => {
    return await axios.get(API.API_DETAIL_DIRECTOR + id, { withCredentials: true });
}

const addDirector = async (data) => {
    return await axios.post(API.API_ADD_DIRECTOR, { data }, { withCredentials: true });
}


export default {
    getListDirector,
    getDetailDirector,
    addDirector
}