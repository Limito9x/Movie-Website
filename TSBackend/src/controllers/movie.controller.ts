import { Movie, MovieImage, Actor, Genre, Tag } from "../models";
import BaseController, { ExpressHandler } from "./baseController";

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
        selectedActors,
        selectedGenres,
        selectedTags,
        uploadedImages,
      } = req.body;

      // Tạo đối tượng phim mới với những thông tin cơ bản trên
      const newMovie = await Movie.create({
        title,
        description,
        releaseDate,
        url,
        storagePath,
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
      if (selectedActors && selectedActors.length > 0) {
        const actors = await Actor.findAll({ where: { id: selectedActors } });
        await (newMovie as any).addActors(actors);
      }

      if (selectedGenres && selectedGenres.length > 0) {
        const genres = await Genre.findAll({ where: { id: selectedGenres } });
        await (newMovie as any).addGenres(genres);
      }

      if (selectedTags && selectedTags.length > 0) {
        const tags = await Tag.findAll({ where: { id: selectedTags } });
        await (newMovie as any).addTags(tags);
      }

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
      console.log(error)
      res
        .status(500)
        .json({ message: "An error occurs while adding movies", error });
    }
  };
}

export default new MovieController();
