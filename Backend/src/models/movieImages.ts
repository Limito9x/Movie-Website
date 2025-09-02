import { sequelize } from "../config";
import { DataTypes, Model, Optional } from "sequelize";
import { cloudinaryDelete } from "../utils/file";

// 1. Định nghĩa Interface cho các thuộc tính của MovieImage
interface MovieImageAttributes {
  id?: number; // `id` là tùy chọn vì nó được tự động tạo
  image_url: string;
  storagePath: string;
  alt_text?: string;
  is_thumbnail?: boolean;
  movieId?: number;
}

interface MovieImageCreationAttributes extends MovieImageAttributes {}

class MovieImage extends Model<MovieImageAttributes, MovieImageCreationAttributes> implements MovieImageAttributes {
  public id!: number;
  public image_url!: string;
  public storagePath!: string;
  public alt_text?: string;
  public is_thumbnail?: boolean;
  public movieId?: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MovieImage.init(
  {
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storagePath: {
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
  },
  {
    sequelize,
    tableName: "movieImages",
    modelName: "MovieImage",
    hooks: {
      beforeDestroy: async (image: any, options) => {
        if (image.storagePath) {
          await cloudinaryDelete(image.storagePath);
        }
      },
    },
  }
);

export default MovieImage;