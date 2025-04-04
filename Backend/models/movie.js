const { sequelize } = require('../config');
const { DataTypes } = require('sequelize');

const Movie = sequelize.define("Movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isForGuest: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Movie;