const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('platforms', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },
    { timestamps: false })
}