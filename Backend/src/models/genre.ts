import { sequelize } from "../config";
import { Optional, Model, DataTypes } from "sequelize";

interface GenreAttributes {
  id: number;
  name: string;
  description?: string;
}

interface GenreCreationAttributes extends Optional<GenreAttributes, "id"> {}

class Genre extends Model<GenreAttributes, GenreCreationAttributes> implements GenreAttributes {
  public id!: number;
  public name!: string;
  public description?: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: "genres",
});

export default Genre;
