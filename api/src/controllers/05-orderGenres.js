const {Gender} = require('../db')
const axios = require('axios');
const URL = 'https://api.rawg.io/api';
const API_KEY = process.env.API_KEY;

const orderGenres = async (req, res)=>{
    try {
        const response = await axios.get(`${URL}/genres?key=${API_KEY}`);
        const data = response.results.genres;
        if (data && Gender === null) {
            Gender.push(data)
            res.status(200).json(data) 
        } else {
            res.status(400).send('Error in Axios get')
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = orderGenres;