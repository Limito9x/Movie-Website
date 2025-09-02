import { Movie, MovieImage, Actor, Genre, Tag } from "../models";
import BaseController, { ExpressHandler } from "./baseController";
import { syncRelationship } from "../utils/relationship";
import { cloudinaryDelete, cloudinaryDeleteMultiple } from "../utils/file";
import { sequelize } from "../config";

const movieIncludes = [
  {
    model: MovieImage,
    as: "images",
  },
  {
    model: Actor,
    as: "actors",
    through: { attributes: [] }, // Không lấy thông tin diễn viên trong lần này
  },
  {
    model: Genre,
    as: "genres",
    through: { attributes: [] }, // Không lấy thông tin thể loại trong lần này
  },
  {
    model: Tag,
    as: "tags",
    through: { attributes: [] }, // Không lấy thông tin tag trong lần này
  },
];

class MovieController extends BaseController {
  constructor() {
    super(Movie, movieIncludes);
  }
  create: ExpressHandler = async (req, res) => {
    try {
      // Lấy thông tin cơ bản của phim
      const {
        title,
        description,
        releaseDate,
        url,
        storagePath,
        actors,
        genres,
        tags,
        uploadedImages,
      } = req.body;

      // Tạo đối tượng phim mới với những thông tin cơ bản trên
      const newMovie = await Movie.create({
        title,
        description,
        releaseDate,
        url,
        storagePath,
        isPublic: req.body.isPublic ?? false,
        isPremium: req.body.isPremium ?? false,
      });

      if (uploadedImages && uploadedImages.length > 0) {
        // Chuẩn bị dữ liệu cho bulkCreate
        const movieImageRecords = uploadedImages.map(
          (img: { imageUrl: string; imageStoragePath: string }) => ({
            movieId: newMovie.id, // Liên kết với ID của phim vừa tạo
            image_url: img.imageUrl,
            storagePath: img.imageStoragePath,
          })
        );

        // Sử dụng bulkCreate để tạo nhiều bản ghi cùng lúc
        await MovieImage.bulkCreate(movieImageRecords);
      }

      // Thiết lập các mối quan hệ (actors, genres, tags)
      syncRelationship(newMovie, "actors", actors);
      syncRelationship(newMovie, "genres", genres);
      syncRelationship(newMovie, "tags", tags);

      // Lấy lại đối tượng movie hoàn chỉnh để trả về
      const finalMovie = await Movie.findByPk(newMovie.id, {
        include: [
          { model: MovieImage, as: "images" },
          { model: Actor, as: "actors" },
          { model: Genre, as: "genres" },
          { model: Tag, as: "tags" },
        ],
      });

      res.status(201).json({
        message: "Movie added successfully!",
        movie: finalMovie,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "An error occurs while adding movies", error });
    }
  };

  update: ExpressHandler = async (req, res) => {
    try {
      // Lấy thông tin cơ bản của phim
      const {
        video,
        images,
        delImages,
        delVideos,
        actors,
        genres,
        tags,
        uploadedImages,
        ...movieData
      } = req.body;
      console.log(delImages);

      // Update movie basic information
      const [updatedRows] = await Movie.update(movieData, {
        where: { id: req.params.id },
      });

      if (updatedRows > 0) {
        const movie = await Movie.findByPk(req.params.id);

        if (delVideos && delVideos.length>0) {
          cloudinaryDelete(delVideos[0], "video");
        }

        if (delImages && delImages.length > 0) {
          const t = await sequelize.transaction();
          
          cloudinaryDeleteMultiple(delImages);
          await MovieImage.destroy({
            where: {
              storagePath: delImages,
            },
            transaction: t,
          });
          await t.commit();
        }

        if (uploadedImages && uploadedImages.length > 0) {
          const movieImageRecords = uploadedImages.map(
            (img: { imageUrl: string; imageStoragePath: string }) => ({
              movieId: req.params.id, // Liên kết với ID của phim vừa tạo
              image_url: img.imageUrl,
              storagePath: img.imageStoragePath,
            })
          );
          // Sử dụng bulkCreate để tạo nhiều bản ghi cùng lúc
          await MovieImage.bulkCreate(movieImageRecords);
        }

        if (movie) {
          syncRelationship(movie, "actors", actors);
          syncRelationship(movie, "genres", genres);
          syncRelationship(movie, "tags", tags);
        }

        res.status(200).json({ message: "Movie updated successfully!" });
      } else res.status(404).json({ message: "Movie not found!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "An error occurs while updating movies", error });
    }
  };
}

export default new MovieController();
