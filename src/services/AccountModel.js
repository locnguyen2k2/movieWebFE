import axios from 'axios';
import API from './../constants/API';

const checkLogin = async () => {
    return await axios.get(API.API_CHECK_LOGIN, { withCredentials: true });
};

const updateUser = async (data) => {
    return await axios.post(API.API_UPDATE_USER, { data }, { withCredentials: true })
}

export default {
    checkLogin,
    updateUser
};