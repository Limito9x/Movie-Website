import { sequelize } from "../config";
import { DataTypes, Model } from "sequelize";
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

interface MovieImageInstance
  extends Model<MovieImageAttributes>,
    MovieImageAttributes {}

const MovieImage = sequelize.define<MovieImageInstance>(
  "MovieImage",
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