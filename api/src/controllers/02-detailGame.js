const axios = require("axios");
const URL = 'https://api.rawg.io/api/games';
const API_KEY = process.env.API_KEY;

const detailGame = async (req, res) => {
    try {
        const { id } = req.params;
        if (id === Number) {
            const response = await axios.get(`${URL}/${id}?key=${API_KEY}`)
            const data = response.results;
            if (data.id) {
                const game = {
                    id: data.id,
                    name: data.name,
                    released: data.released,
                    bg_image: data.bg_image,
                    rating: data.rating,
                    plataforms: data.plataforms,
                    genres: data.genres,
                    stores: data.stores,
                    short_screenshots: data.short_screenshots
                }
                res.status(200).json(game)
            } else {
                res.status(400).send('This game isn´t found.')
            }
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = detailGame;