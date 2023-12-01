import axios from "axios";
import { CLEAR_DETAILGAME, FILTER_LISTGENRES,  GET_ALLVIDEOGAMES, GET_CREATED, GET_DETAILGAME, GET_GAME_BYNAME, GET_GENRES,ORDER_LIST, PAGINATE, RATING_ORDER } from "./actions.types";
const URL = "http://localhost:3001";

export const getAllVideoGames = () => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get(`${URL}/videogames`);
            return dispatch({
                type: GET_ALLVIDEOGAMES,
                payload: data
            });
        };
    } catch (error) {
        throw Error(error.message);
    };
};

export const getDetailVideoGame = (id) => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get(`${URL}/videogames/${id}`);
            return dispatch({
                type: GET_DETAILGAME,
                payload: data
            });
        };
    } catch (error) {
        throw Error(error.message);
    };
};

export const clearDetail = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: CLEAR_DETAILGAME
            });
        } catch (error) {
            throw new Error(error.response.data.error);
        };
    };
};

export const getAllGenres = () => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get(`${URL}/genres`);
            console.log(data + ' data genres');
            return dispatch({
                type: GET_GENRES,
                payload: data
            });
        };
    } catch (error) {
        throw Error(error.message);
    }
};


export const getGameByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}/videogames?name=${name}`);
            if (data.length === 0) {
                throw new Error('Not Found');
            }
            return dispatch({
                type: GET_GAME_BYNAME,
                payload: data
            });
        } catch (error) {
            throw new Error('This game does not exist');
        }
    };
};


export const filterVideoGames = (genres) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: FILTER_LISTGENRES,
                payload: genres
            });
        } catch (error) {
            console.error("Error:", error); 
            throw new Error("Error desconocido");
        };
    };
};


export const getCreated = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: GET_CREATED
            });
        } catch (error) {
            throw new Error(error.response.data.error);
        };
    };
};


export const alphabeticalOrder = (order) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: ORDER_LIST,
                payload: order
            });
        } catch (error) {
            throw new Error(error.response.data.error);
        };
    };
};

export const ratingOrder = (order) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: RATING_ORDER,
                payload: order
            });
        } catch (error) {
            throw new Error(error.response.data.error);
        };
    };
};

export const paginateGames = (order) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: PAGINATE,
                payload: order,
            });
        } catch (error) {
            throw new Error(error.response.data.error);
        };
    };
};
