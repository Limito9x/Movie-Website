const {sequelize} = require('../config');
const {DataTypes} = require('sequelize');

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})

module.exports = Tag;