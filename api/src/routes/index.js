const { Router } = require('express');
const userRouter = require('./userRouter');
const gameRouter = require('./gameRouter');

const router = Router();

router.use('/videogames', gameRouter);
router.use('/user' , userRouter);


module.exports = router;
