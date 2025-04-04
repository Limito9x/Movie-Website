const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");

const Genre = sequelize.define("Genre", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Genre;
