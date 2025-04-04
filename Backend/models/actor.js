const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");

const Actor = sequelize.define("Actor", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sex: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
  },
});

module.exports = Actor;