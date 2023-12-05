import {  CLEAR_DETAILGAME, FILTER_LISTGENRES, GET_ALLVIDEOGAMES, GET_CREATED, GET_DETAILGAME, GET_GAME_BYNAME, GET_GENRES,  GET_NO_CREATED,  GET_VIDEOGAMES,  ORDER_LIST, PAGINATE, RATING_ORDER } from "../Actions/actions.types";

const initialState = {
    videoGames: [],
    pageVideoGames: [],
    allVideoGames: [],
    detail: [],
    genres: [],
    currentPage: 0
}


const reducer = (state = initialState, action) => {
    const PAGE_GAME = 15;
    switch (action.type) {
        case GET_ALLVIDEOGAMES:
            return {
                ...state,
                videoGames: [...action.payload].splice(0, PAGE_GAME),
                pageVideoGames: action.payload,
                allVideoGames: action.payload,
            };

        case GET_VIDEOGAMES:
            const videoGam = state.allVideoGames.filter((game) => game);
            return{
                ...state,
                videoGames: videoGam
            }

        case GET_DETAILGAME:
            return {
                ...state,
                detail: action.payload
            };

        case CLEAR_DETAILGAME:
            return {
                ...state,
                detail: []
            };

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            };


        case GET_GAME_BYNAME:

            return {
                ...state,
                videoGames: action.payload
            };

        // Filter genre
        case FILTER_LISTGENRES:
            const filterGenres = state.allVideoGames.filter( (genre) => {
                return genre.genres.includes(action.payload)
            })
            return {
                ...state,
                pageVideoGames: [...filterGenres],
                videoGames: filterGenres.slice(0, PAGE_GAME),
            };

        case GET_CREATED:
            const createdGames = state.allVideoGames.filter((game) => game.created === true);

            return {
                ...state,
                videoGames: createdGames.splice(0, PAGE_GAME),
                pageVideoGames: createdGames
            };
        
        case GET_NO_CREATED: 
            const noCreated = state.allVideoGames.filter((game) => game.created === false);

            return {
                ...state,
                videoGames: noCreated.splice(0, PAGE_GAME),
                pageVideoGames: noCreated
            };

        case ORDER_LIST:
            let orderedList = [...state.pageVideoGames];
            if (action.payload === "A") {
                orderedList.sort((a, b) => a.name > b.name ? 1 : -1);
            } else if (action.payload === "D") {
                orderedList.sort((a, b) => a.name < b.name ? 1 : -1);
            }

            return {
                ...state,
                videoGames: orderedList.slice(0, PAGE_GAME),
                pageVideoGames: orderedList
            }
        case RATING_ORDER:
            let sortedRating = [...state.pageVideoGames].sort((a, b) => {
                if (action.payload === 'Upward') {
                    return a.rating - b.rating;
                } else if (action.payload === 'Falling') {
                    return b.rating - a.rating;
                };
            });
            if (Object.keys(sortedRating).length <= 15) {
                return {
                    ...state,
                    videoGames: sortedRating,
                    pageVideoGames: sortedRating
                };
            } else {
                return {
                    ...state,
                    videoGames: sortedRating.slice(0, PAGE_GAME),
                    pageVideoGames: sortedRating
                };
            };

        case PAGINATE:
            const nextPage = state.currentPage + 1;
            const prevPage = state.currentPage - 1;
            const firstIndex = action.payload === "next" ? nextPage * PAGE_GAME : prevPage * PAGE_GAME;

            if (action.payload === 'next' && firstIndex >= state.pageVideoGames.length) {
                return state
            } else if (action.payload === "prev" && prevPage < 0) {
                return state
            };

            return {
                ...state,
                videoGames: [...state.pageVideoGames].splice(firstIndex, PAGE_GAME),
                currentPage: action.payload === "next" ? nextPage : prevPage,
            };

        default:
            return { ...state }
    };
}
export default reducer;