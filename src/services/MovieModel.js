import API from './../constants/API';
import axios from 'axios';
const getListMovies = async () => {
    return await axios.get(API.API_MOVIES_ALL, { withCredentials: true });
};

const getTrenddings = async () => {
    return await axios.get(API.API_MOVIES_TRENDDING, { withCredentials: true });
};

const getDetailMovie = async (id) => {
    return await axios.get(API.API_MOVIE_DETAIL + id, { withCredentials: true });
}

const deleteMovie = async (id) => {
    return await axios.post(API.API_DELETE_MOVIE, { id }, { withCredentials: true });
}

const getNewest = async () => {
    return await axios.get(API.API_MOVIES_NEWEST, { withCredentials: true });
};

const updateMovie = async (id, data) => {
    return await axios.post(API.API_UPDATE_MOVIE + id, { data },
        {
            withCredentials: true
        }
    );
}

const createMovie = async (data) => {
    let formData = new FormData();
    formData.append('data', JSON.stringify(data))
    formData.append('movieImage', data.movieImage)

    return await axios.post(API.API_CREATE_MOVIE, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }
    );
}

export default {
    getNewest,
    getListMovies,
    getTrenddings,
    getDetailMovie,
    deleteMovie,
    updateMovie,
    createMovie
};