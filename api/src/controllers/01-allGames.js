const axios = require('axios');
const URL = 'https://api.rawg.io/api/games';
const API_KEY = process.env.API_KEY;

const findAll = async (req, res)=>{
    try {
        const response = await axios.get(`${URL}?key=${API_KEY}`);
        const data = response.results;
        if (data) {
            res.status(200).json(data) 
        } else {
            res.status(400).send('Error in Axios get')
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = findAll;