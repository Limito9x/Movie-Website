import { sequelize } from "../config";
import { DataTypes } from "sequelize";

const Genre = sequelize.define("Genre", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Genre;
