import { sequelize } from "../config";
import { DataTypes, Optional, Model } from "sequelize";
import { MovieImage } from "./";
import { cloudinaryDelete,cloudinaryDeleteMultiple } from "../utils/file";

// Định nghĩa kiểu dữ liệu cho tất cả thuộc tính
interface MovieAttributes {
  id: number;
  title: string;
  description?: string;
  releaseDate: Date;
  url?: string;
  storagePath?: string;
  isPublic: boolean;
  isPremium: boolean;
  isFake?: boolean;
}

// Một số thuộc tính có thể không cần thiết khi tạo mới
export interface MovieCreationAttributes
  extends Optional<
    MovieAttributes,
    "id" | "description" | "url" | "storagePath"
  > {}

// Định nghĩa lớp Movie
class Movie
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;
  public releaseDate!: Date;
  public url?: string;
  public storagePath?: string;
  public isPublic!: boolean;
  public isPremium!: boolean;
  public isFake?: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    storagePath: {
      type: DataTypes.STRING,
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
    isFake: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "movies",
    timestamps: true,
    hooks: {
      async beforeDestroy(movie: Movie) {
        if (movie.storagePath) {
          await cloudinaryDelete(movie.storagePath);
        }
        const images = await MovieImage.findAll({ where: { movieId: movie.id } });
        const imagePaths = images
          .map(image => image.storagePath)
          .filter(path => !!path);
        if (imagePaths.length > 0) {
          await cloudinaryDeleteMultiple(imagePaths);
        }
      },
    },
  }
);

export default Movie;
