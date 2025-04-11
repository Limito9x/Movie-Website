const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");
const MovieImage = require("./movieImages");
const { deleteFile } = require("../utils/file");

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
      beforeDestroy: async (movie, options) => {
        // Xóa video trên firebase storage
        await deleteFile(movie.storagePath);
        const imagesToDelete = await MovieImage.findAll({
          where: { movieId: movie.id },
          transaction: options.transaction,
        });
        for (const image of imagesToDelete) {
          // console.log("Xóa ảnh thủ công trong hook Movie:", image.id);
          await deleteFile(image.storagePath); // Gọi destroy trên từng instance để kích hoạt hook của MovieImage
        }
      },
    },
  }
);

module.exports = Movie;
