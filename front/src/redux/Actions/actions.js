import axios from "axios";
import { CLEAR_DETAILGAME,    FILTER_LISTGENRES, FILTER_LISTPLATFORMS, GET_ALLVIDEOGAMES, GET_CREATED, GET_DETAILGAME, GET_GAME_BYNAME, GET_GENRES, GET_PLATAFOMS, ORDER_LIST, PAGINATE, RATING_ORDER } from "./actions.types";
const URL = "http://localhost:3001/videogames";
const ULRp = 'https://api.rawg.io/api/platforms?key=4bcb0add5777425590aac9b4f3eff235';

export const getAllVideoGames = () => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get(`${URL}`);
            console.log(data);
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
            const { data } = await axios.get(`${URL}/${id}`);
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
            alert(error.response.data.error);
        };
    };
};

export const getAllGenres = () => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get(`${URL}/genres`);
            
            return dispatch({
                type: GET_GENRES,
                payload: data
            });
        };
    } catch (error) {
        throw Error(error.message);
    }
};

export const getAllPlatforms = () => {
    try {
        return async (dispatch) => {
            const {data} = await axios.get(`${ULRp}`)

            return dispatch({
                type: GET_PLATAFOMS,
                payload: data
            })
        }
    } catch (error) {
        throw Error(error.message);
    }
}

export const getGameByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL}?name=${name}`);
            if (data.length === 0) {
                throw new Error('Not Found');
            }
            return dispatch({
                type: GET_GAME_BYNAME,
                payload: data
            });
        } catch (error) {
            throw Error('This game does not exist');
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
            alert(error.response.data.error);
        };
    };
};

export const filterByPlataforms = (platforms) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: FILTER_LISTPLATFORMS,
                payload: platforms
            })
        } catch (error) {
            alert(error.response.data.error);
        }
    }
}

export const getCreated = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: GET_CREATED
            });
        } catch (error) {
            alert(error.response.data.error);
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
            alert(error.response.data.error);
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
            alert(error.response.data.error);
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
            alert(error.response.data.error);
        };
    };
};
