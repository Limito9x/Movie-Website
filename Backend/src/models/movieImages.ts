import { sequelize } from "../config";
import { DataTypes } from "sequelize";

const MovieImage = sequelize.define("MovieImage", {
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storagePath:{
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

export default MovieImage;