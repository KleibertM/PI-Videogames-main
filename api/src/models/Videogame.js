const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plataform: {
      type: DataTypes.ENUM('PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One', 'Xbox Series S/X', 'Nintendo Switch', 'iOS', 'Android', 'Nintendo 3DS', 'Nintendo DS', 'Nintendo DSi', 'macOS', 'Linux', 'Xbox 360', 'Xbox', 'PlayStation 3', 'PlayStation 2', 'PlayStation', 'PS Vita', 'PSP'),
      allowNull: false
    },
    genres: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    raiting: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  },
  { timestamps: false });
};
