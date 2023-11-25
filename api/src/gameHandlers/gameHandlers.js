const { detailGame, getGameByName, getAllGames, createGameDB, getGameGenres } = require("../controllers/gameControllers");
const {videogame, genres} = require('../db')

const getGames = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const gameByName = await getGameByName(name)
            res.status(200).json(gameByName);
        } else {
            const response = await getAllGames()
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDetailById = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "bd" : "api";

    try {
        const response = await detailGame(id, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createGame = async (req, res) => {
    const { name, date, description, rating, plataform, gender, stores, image,UserId } = req.body;

    try {
        const response = await createGameDB(name, date, description, rating, plataform, gender, stores, image, UserId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getByGenres = async (req, res) => {
    try {
        const existGenres = await genres.findAll()
        if (!existGenres.length) {
            const dbData = await getGameGenres()
            await genres.bulkCreate(dbData);
        }
        const response = await genres.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getGames,
    getDetailById,
    createGame,
    getByGenres
}