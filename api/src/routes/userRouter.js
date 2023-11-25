const {Router} = require('express');
const { createUser, loginUser } = require('../gameHandlers/userHandlers');

const userRouter = Router();

    userRouter.post('/', createUser)  

    userRouter.get('/', loginUser)


module.exports = userRouter;