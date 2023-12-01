const { detailGameControllrs, getGameByNameControllrs, getAllGamesControllrs, createGameDBControllrs, getGameGenresControllrs, findGameByNameControllrs } = require("../controllers/gameControllers");
const { Videogame, Genres } = require('../db')

const getGamesHandlers = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const gameByName = await getGameByNameControllrs(name)
            res.status(200).json(gameByName);
        } else {
            const response = await getAllGamesControllrs()
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDetailByIdHandlers = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "bd" : "api";

    try {
        const response = await detailGameControllrs(id, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createGameHandlers = async (req, res) => {
    try {
        const { name, platforms, genres, image, description, released, rating } = req.body;
        const existingGame = await findGameByNameControllrs(name);
        if (existingGame) {
            throw new Error('Ya existe un juego con el mismo nombre.');
        }
        const newVideoGame = await createGameDBControllrs(name, platforms, genres, image, description, released, rating);
        res.status(200).send(newVideoGame);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getByGenresHandlers = async (req, res) => {
    try {
        const existGenres = await Genres.findAll()
        if (!existGenres.length) {
            const dbData = await getGameGenresControllrs()
            await Genres.bulkCreate(dbData);
        }
        const response = await Genres.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    getGamesHandlers,
    getDetailByIdHandlers,
    createGameHandlers,
    getByGenresHandlers,
}