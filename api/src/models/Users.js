const {DataTypes} = require('./sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        } 
    })
}