import axios from "axios";
import API from "./../constants/API";

const getListCategory = async () => {
    return await axios.get(API.API_LIST_CATEGORY, { withCredentials: true });
}

const getDetailCategory = async (id) => {
    return await axios.post(API.API_DETAIL_CATEGORY, { id });
}

const updateCategory = async (data) => {
    return await axios.post(API.API_UPDATE_CATEGORY, { data }, { withCredentials: true });

}

const addCategory = async (data) => {
    return await axios.post(API.API_ADD_CATEGORY, { data }, { withCredentials: true });

}

export default {
    getListCategory,
    getDetailCategory,
    updateCategory,
    addCategory,
}