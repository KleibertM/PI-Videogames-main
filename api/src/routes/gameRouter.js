const {Router} = require('express');
const { getGames,  createGame, getDetailById, getByGenres } = require('../gameHandlers/gameHandlers');

const gameRouter = Router();

gameRouter.get('/', getGames);

gameRouter.get('/genres', getByGenres)

gameRouter.get('/:id', getDetailById);

gameRouter.post('/', createGame )


module.exports = gameRouter;