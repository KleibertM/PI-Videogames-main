const { createUserDB, loginUserDB } = require("../controllers/userControlles");

// const validate = ()=>{
//     const {name, email, password} = req.body;
//     if (!name || !email || !password) {
//         throw new Error('Faltan datos')
//     }
//     return validate;
// }
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    // if (!name || !email || !password) {
    //     res.status(400).send('Faltan datos')
    // }
    try {
        const response = await createUserDB(name, email, password);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.query;
    try {
        const response = await loginUserDB(email, password)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createUser, loginUser
}