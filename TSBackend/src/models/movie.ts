import { sequelize } from "../config";
import { DataTypes } from "sequelize";
import MovieImage from "./movieImages"
import { cloudinaryDelete } from "../utils/file";

const Movie = sequelize.define(
  "Movie",
  {
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
  },
  {
    hooks: {
      beforeDestroy: async (movie: any, options) => {
        // Xóa video trên firebase storage
        await cloudinaryDelete(movie.storagePath,"video");
        const imagesToDelete = await MovieImage.findAll({
          where: { movieId: movie.id },
          transaction: options.transaction,
        });
        for (const image of imagesToDelete) {
          // console.log("Xóa ảnh thủ công trong hook Movie:", image.id);
          await cloudinaryDelete(image.getDataValue("storagePath")); // Gọi destroy trên từng instance để kích hoạt hook của MovieImage
        }
      },
    },
  }
);

export default Movie;
