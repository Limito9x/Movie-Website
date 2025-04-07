const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");

const MovieImage = sequelize.define("MovieImage", {
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alt_text: {
    type: DataTypes.STRING,
  },
  is_thumbnail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = MovieImage;
