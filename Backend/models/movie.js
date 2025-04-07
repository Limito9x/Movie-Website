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
    // allowNull: false,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Movie;