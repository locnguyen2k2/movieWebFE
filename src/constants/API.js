const API_URL = "http://localhost:8080/api/v1/";
// Account APIs
const API_IMAGES = "http://localhost:8080/images/";
const API_LOGIN = API_URL + "login";
const API_LOGOUT = API_URL + "logout";
const API_CREATE_NEW_USER = API_URL + "create-new-user";
// User APIs
const API_LIST_USER = API_URL + "get-list-user";
const API_GET_USER = API_URL + "detail-user";
const API_CHECK_LOGIN = API_URL + "check-login";
const API_UPDATE_USER = API_URL + "update-user";
// Movie APIs
const API_MOVIES_ALL = API_URL + "get-list-movie/all";
const API_MOVIES_NEWEST = API_URL + "get-list-movie/new";
const API_MOVIES_TRENDDING = API_URL + "get-list-movie/trendding";
const API_MOVIE_DETAIL = API_URL + "detail-movie/";
const API_DELETE_MOVIE = API_URL + "delete-movie/";
const API_UPDATE_MOVIE = API_URL + "update-movie/";
const API_CREATE_MOVIE = API_URL + "add-movie";
// Director APIs
const API_LIST_DIRECTOR = API_URL + "get-list-director";
const API_DETAIL_DIRECTOR = API_URL + "detail-director/";
const API_ADD_DIRECTOR = API_URL + "add-director/";
// Acotr APIs
const API_LIST_ACTOR = API_URL + "get-list-actor";
const API_DETAIL_ACTOR = API_URL + "detail-actor/";
const API_ADD_ACTOR = API_URL + "add-actor/";
// Category APIs
const API_LIST_CATEGORY = API_URL + "get-list-category";
const API_DETAIL_CATEGORY = API_URL + "get-detail-category/";
const API_UPDATE_CATEGORY = API_URL + "update-category/";
const API_ADD_CATEGORY = API_URL + "add-category";
// Person
const API_UPDATE_PERSON = API_URL + "update-person/";
const API_ADD_PERSON = API_URL + "add-person";
const API_LIST_PERSON = API_URL + "get-list-person";
// Movie Actor
const API_LIST_MOVIE_ACTOR = API_URL + "get-list-movie-actor";


export default {
    API_IMAGES,
    API_LIST_USER,
    API_CHECK_LOGIN,
    API_MOVIE_DETAIL,
    API_MOVIES_ALL,
    API_MOVIES_TRENDDING,
    API_DELETE_MOVIE,
    API_MOVIES_NEWEST,
    API_LIST_DIRECTOR,
    API_LIST_ACTOR,
    API_LOGIN,
    API_LOGOUT,
    API_CREATE_NEW_USER,
    API_GET_USER,
    API_LIST_CATEGORY,
    API_UPDATE_MOVIE,
    API_DETAIL_ACTOR,
    API_DETAIL_DIRECTOR,
    API_DETAIL_CATEGORY,
    API_UPDATE_PERSON,
    API_CREATE_MOVIE,
    API_ADD_PERSON,
    API_ADD_ACTOR,
    API_UPDATE_USER,
    API_ADD_DIRECTOR,
    API_LIST_PERSON,
    API_LIST_MOVIE_ACTOR,
    API_ADD_CATEGORY,
    API_UPDATE_CATEGORY,
};