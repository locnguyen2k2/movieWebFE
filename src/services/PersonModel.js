import API from './../constants/API';
import axios from 'axios';

const updatePerson = async (id, data) => {
    return await axios.post(API.API_UPDATE_PERSON + id, { data }, { withCredentials: true });
}

const addPerson = async (data) => {
    return await axios.post(API.API_ADD_PERSON, { data }, { withCredentials: true });
}

const getListPerson = async () => {
    return await axios.get(API.API_LIST_PERSON, { withCredentials: true });

}

export default {
    updatePerson,
    addPerson,
    getListPerson
}