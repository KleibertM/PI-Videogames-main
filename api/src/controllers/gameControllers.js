const axios = require('axios');
const URL = 'https://api.rawg.io/api/games';
const URLg = 'https://api.rawg.io/api/genres';
const API_KEY = '4bcb0add5777425590aac9b4f3eff235';
const { videogame, genres } = require('../db')
const { Op } = require('sequelize');
const cleanArrayGenres = require('../utils/cleanGenres');

const cleanGames = (array) => {
    return array.map((game) => {
        return {
            name: game.name,
            date: game.released,
            description: game.description,
            rating: game.rating,
            plataform: game.plataforms,
            gender: game.genres,
            stores: game.stores,
            image: game.short_screenshots,
            created: false
        };

    });
};

const getAllGames = async () => {

    const gameDB = await videogame.findAll();

    const gameApi = (await axios.get(`${URL}?key=${API_KEY}&page_size=100`)).data.results;

    const infoApi = cleanGames(gameApi);

    return [...gameDB, ...infoApi];
}

const getGameByName = async (name) => {

    const response = (await axios.get(`${URL}?key=${API_KEY}&page_size=100`)).data.results;


    const gameFilter = response.filter((game) => game.name.toLowerCase() === name.toLowerCase());

    const gameDB = await videogame.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            },
        },
        limit: 15,
    })

    const datosFilter = cleanGames(gameFilter);
    return [...datosFilter, ...gameDB]
}

const detailGame = async (id, source) => {

    const game = source === 'api' ? (await axios.get(`${URL}/${id}?key=${API_KEY}`)).data : await videogame.findByPk(id)


    return game;
}

const createGameDB = async (name, date, description, rating, plataform, gender, stores, image, UserId) => {
    const newGame = await videogame.create({
        name,
        date,
        description,
        rating,
        plataform,
        gender,
        stores,
        image
    });

    await videogame.setUser(UserId)

    return newGame;
}



const getGameGenres = async () => {
    try {
        const {data} = await axios.get(`${URLg}?key=${API_KEY}`);
        const genres = data.results;
        
        if (!genres) {
            throw new Error('No hay generos')
        }
        const genresData = cleanArrayGenres(genres);

        return [...genresData];

    } catch (error) {
        throw Error(error.message)
    }
}



module.exports = {
    detailGame,
    getGameByName,
    getAllGames,
    createGameDB,
    getGameGenres
}