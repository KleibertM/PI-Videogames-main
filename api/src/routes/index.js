const { Router } = require('express');
const findAll = require('../controllers/01-allGames');
const detailGame = require('../controllers/02-detailGame');
const findName = require('../controllers/03-searchByName');
const postGame = require('../controllers/04-postGame');
const orderGenres = require('../controllers/05-orderGenres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router =require('express').Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', findAll);

router.get('/videogames/:id', detailGame);

router.get('/videogames/ ', findName)

router.post('/videogames', postGame) 

router.get('/genres', orderGenres)



module.exports = router;
