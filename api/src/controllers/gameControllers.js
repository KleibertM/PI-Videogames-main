const axios = require('axios');
const URL = 'https://api.rawg.io/api/games';
const URLg = 'https://api.rawg.io/api/genres';
const {API_KEY} = process.env
const { Videogame, Genres} = require('../db')
const { Op } = require('sequelize');
const cleanArrayGenres = require('../utils/cleanGenres');

const removeTags = require('../utils/removeTags')

const cleanGamesControllrs = (array) => {
    return array.map((game) => {
        return {
            id: game.id,
            name: game.name,
            released: game.released,
            description: game.description,
            rating: game.rating,
            platforms: game.platforms,
            gender: game.genres,
            stores: game.stores,
            image: game.background_image || game.image,
            created: false
        };

    });
};

const getAllGamesControllrs = async () => {
    try {
        const gameResults = [];
        for (let i = 1; i <= 5; i++) {
            const gameApi = (await axios(`${URL}?key=${API_KEY}&page=${i}`)).data.results;

            if (!gameApi || !gameApi.length) {
                throw new Error(`No se recibieron datos válidos de la API en la página ${i}`);
            }

            const infoApi = cleanGamesControllrs(gameApi);
            gameResults.push(...infoApi);
        }

        const gameDB = await Videogame.findAll({
            include: [
                {
                    model: Genres,
                    attributes: ['name'],
                },
            ],
        });

        const cleanDB = cleanArrayGenres(gameDB);
        return [...cleanDB, ...gameResults];
    } catch (error) {
        throw Error('Error en getAllGames:', error);
        ;
    }
};


const getGameByNameControllrs = async (name) => {
    try {
        const response = (await axios.get(`${URL}?key=${API_KEY}&page_size=100`)).data.results;

        if (response && response.length > 0) {
            const gameFilter = response.filter((game) => game.name.toLowerCase() === name.toLowerCase());
            const datosFilter = cleanGamesControllrs(gameFilter);
            return [...datosFilter];
        } else {
            const gameDB = await Videogame.findAll({
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            }
                        },
                        {
                            description: {
                                [Op.like]: `%${name}%`
                            }
                        }
                    ]
                },
                limit: 15
            });
            
            return gameDB.map((game) => ({ ...game.toJSON(), fromDB: true }));
        }
    } catch (error) {
        throw new Error('Error searching for games');
    }
};


const detailGameControllrs = async (id, source) => {

    const response = source === 'api' ? (await axios.get(`${URL}/${id}?key=${API_KEY}`)) : await Videogame.findByPk(id, {
        include: [
            {
                model: Genres,
                attributes: ['name'],
            },
        ],
    })

    if (!response) {
        throw new Error('game no found')
    }

    const data = source === 'api' ? response.data : response.toJSON();
    const videoGamesData = {
        id: data.id,
        name: data.name,

        platforms: source === 'api' ? data.platforms?.map(platform => platform.platform.name) : data.platforms,


        genres: source === 'api' ? data.genres?.map(genre => genre.name) : data.Genres?.map(genre => genre.name),

        rating: data.rating,
        image: source === 'api' ? data.background_image : data.image,
        description: removeTags(data.description),
        released: data.released,
        created: source === 'api' ? false : data.created
    };
    return videoGamesData;
}
const findGameByNameControllrs = async (name) => {
    try {
        const existingGame = await Videogame.findOne({ where: { name } });
        return existingGame;
    } catch (error) {
        throw new Error('Error al buscar el juego por nombre.');
    }
}
const createGameDBControllrs = async (name, released, description, rating, platforms, genres,image) => {
    
    try {
        if (!genres.length) {
            throw new Error('You must provide at least one genre');
        }
        const genre = await Genres.findAll({ where: { name: genres } });
        const imageUrl = image ? image : 'https://img.freepik.com/fotos-premium/ilustracion-joystick-gamepad-controlador-juegos-cyberpunk_691560-5812.jpg';

        
        const newVideoGame = await Videogame.create({
            name,
            platforms,
            image: imageUrl,
            description,
            released,
            rating,
        });
        await newVideoGame.addGenres(genre);
        return newVideoGame;
    } catch (error) {
        throw error;
    }
}

const getGameGenresControllrs = async () => {
    try {
        const { data } = await axios.get(`${URLg}?key=${API_KEY}`);
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
    detailGameControllrs,
    getGameByNameControllrs,
    getAllGamesControllrs,
    createGameDBControllrs,
    getGameGenresControllrs,
    findGameByNameControllrs
}