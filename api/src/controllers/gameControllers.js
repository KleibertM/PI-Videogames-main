const axios = require('axios');
const URL = 'https://api.rawg.io/api/games';
const URLg = 'https://api.rawg.io/api/genres';
const ULRp = 'https://api.rawg.io/api/platforms?key=4bcb0add5777425590aac9b4f3eff235';
const API_KEY = '4bcb0add5777425590aac9b4f3eff235';
const { videogame, genres } = require('../db')
const { Op } = require('sequelize');
const cleanArrayGenres = require('../utils/cleanGenres');

const removeTags = require('../utils/removeTags')

const cleanGames = (array) => {
    return array.map((game) => {
        return {
            id: game.id,
            name: game.name,
            date: game.released,
            description: game.description,
            rating: game.rating,
            plataforms: game.platforms,
            gender: game.genres,
            stores: game.stores,
            image: game.background_image || game.image,
            created: false
        };

    });
};

const getAllGames = async () => {
    const gameResults = [];
    for (let i = 1; i <= 5; i++) {
        
        const gameApi = (await axios(`${URL}?key=${API_KEY}&page=${i}`)).data.results;
    
        if (!gameApi) {
            throw Error('Error en gameApi')
        }
        const infoApi = cleanGames(gameApi);

        gameResults.push(...infoApi)
    }
    const gameDB = await videogame.findAll({
        include: {
            model: genres,
            attributes: ['name']
        }
    });

    const cleanDB = cleanGames(gameDB)
    return [...cleanDB, ...gameResults]

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

    const response = source === 'api' ? (await axios.get(`${URL}/${id}?key=${API_KEY}`)): await videogame.findByPk(id,{
        include: {
            model: genres,
            attributes: ['name']
        }
    })

    if (!response) {
        throw new Error('game no found')
    }

    const data = source === 'api' ? response.data : response.toJSON();
    const videoGamesData = {
        id: data.id,
        name: data.name,
        platforms: source === 'api' ? data.platforms?.map(platform => platform.platform.name) : data.plataforms,
        genres: source === 'api' ? data.genres?.map(genre => genre.name) : data.Genres?.map(genre => genre.name),
        rating: data.rating,
        image: source === 'api' ? data.background_image : data.image,
        description: removeTags(data.description),
        released: data.released,
        created: source === 'api' ? false : data.created
    };
    return videoGamesData;
}

const createGameDB = async (name, date, description, rating, plataforms, gender, stores, image, UserId) => {
    const newGame = await videogame.create({
        name,
        date,
        description,
        rating,
        plataforms,
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

const getByPlatforms = async ()=>{
    try {
        const {data} = await axios.get(`${ULRp}`)
        const plataforms = data.results;
    if (!plataforms) {
        throw Error('No hay platforms')
    }

    const cleanPlatforms = cleanArrayGenres(plataforms)

    return [...cleanPlatforms];
    } catch (error) {
        throw Error(error.message);
    }
    
}


module.exports = {
    detailGame,
    getGameByName,
    getAllGames,
    createGameDB,
    getGameGenres,
    getByPlatforms
}