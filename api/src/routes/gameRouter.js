const {Router} = require('express');
const { getGamesHandlers,  createGameHandlers, getDetailByIdHandlers, getByGenresHandlers } = require('../gameHandlers/gameHandlers');

const gameRouter = Router();

gameRouter.get('/videogames', getGamesHandlers);

gameRouter.get('/genres', getByGenresHandlers)

gameRouter.get('/videogames/:id', getDetailByIdHandlers);

gameRouter.post('/videogames', createGameHandlers )


module.exports = gameRouter;