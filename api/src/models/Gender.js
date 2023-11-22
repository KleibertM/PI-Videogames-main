const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genres', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.ENUM('Action','Adventure', 'Shooter', 'Puzzle', 'Indie','RPG', 'Strategy', 'Casual', 'Simulation', 'Arcade', 'Platformer', 'Massively Multiplayer', 'Racing', 'Sports', 'Fighting', 'Family', 'Board Games', 'Educational', 'Card'  ),
            allowNull: false,
        }
    },
    { timestamps: false })
}