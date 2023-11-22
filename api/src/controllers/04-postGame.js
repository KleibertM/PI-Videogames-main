const {Videogame} = require('../db')


const postGame = async (req, res)=>{
    try { 
        const { name, description,image,plataform,
        date, raiting, genres } = req.body;

        if (!name || !description || !image || !plataform || !date || !raiting || !genres) {
            res.status(400).send('Faltan datos')
        }
        const [game , created] = await Videogame.finfOrCreate({
            where: {name: name},
            defaults: {
                description: description,
                image: image,
                plataform: plataform,
                genres: [genres],
                date: date,
                raiting: raiting,
            }
        })
        if (created) {
            res.status(200).json(game)
        }
        res.status(400).send('Error al crear juego')
    } catch (error) {
        res.status(400).send(error.messaje)
    }
}

module.exports = postGame;