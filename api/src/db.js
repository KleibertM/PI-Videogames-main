require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;
const GenderModels = require('./models/Gender');
const VideogameModels = require('./models/Videogame')

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

GenderModels(sequelize);
VideogameModels(sequelize);
// UserModels(sequelize);

const { Videogame, Genres } = sequelize.models;

// Aca vendrian las relaciones
Videogame.belongsToMany(Genres, {through: 'gender_game'} )
Genres.belongsToMany(Videogame, {through: 'gender_game'} )

// User.hasMany(Videogame)
// Videogame.belongsTo(User)

// Platforms.belongsToMany(Videogame, {through: 'platform_game'})
// Videogame.belongsToMany(Platforms, {through: 'platform_game'})

module.exports = {
  sequelize,
  ...sequelize.models,
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
