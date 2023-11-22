const axios = require("axios");
const URL = 'https://api.rawg.io/api/games';
const API_KEY = process.env.API_KEY;
const {Op} = require('sequelize');
const Videogame = require('../models/Videogame')

const findName = async (req, res) => {
    try {
        const { name } = req.query;
        name.toLowerCase();
        const responde = axios.get(`${URL}/${name}?key=${API_KEY}`);
        const game = responde.results.name;
        if (game.toLowerCase() === name) {
            res.status(200).json(game);
        } 

        if (game.toLowerCase() !== name) {
            const {count , rows} = await Videogame.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `${name}%`,
                    },
                },
                offset: 20,
                limit: 15,
            })
            res.status(200).json(rows);
        }
        return res.status(400).send('Isn´t found Name')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = findName;