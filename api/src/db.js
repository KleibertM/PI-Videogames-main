require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;
const GenderModels = require('./models/Gender');
const VideogameModels = require('./models/Videogame')
const UserModels = require('./models/Users')

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

GenderModels(sequelize);
VideogameModels(sequelize);
UserModels(sequelize);

const { videogame, genres, User } = sequelize.models;

// Aca vendrian las relaciones
videogame.belongsToMany(genres, {through: 'gender_game'} )
genres.belongsToMany(videogame, {through: 'gender_game'} )

User.hasMany(videogame)
videogame.belongsTo(User)

module.exports = {
  sequelize,
  ...sequelize.models,
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
