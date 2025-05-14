const Movie = require("../models/movie");
const MovieImage = require("../models/movieImages");
const Actor = require("../models/actor");
const Genre = require("../models/genre");
const Tag = require("../models/tag");
const { Op } = require("sequelize");
const { firebaseUpload } = require("../utils/file");

// Lấy danh sách phim
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
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
      ],
    });

    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurs while getting movies", error });
  }
};

// Lấy 1 phim bằng id
exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: [
        {
          model: MovieImage,
          as: "images",
        },
        {
          model: Actor,
          as: "actors",
          through: { attributes: [] },
        },
        {
          model: Genre,
          as: "genres",
          through: { attributes: [] },
        },
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });
    res.json(movie);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurs while getting movies", error });
  }
};

// Thêm phim
exports.addMovie = async (req, res) => {
  try {
    // Lấy thông tin cơ bản của phim
    const {
      title,
      description,
      releaseDate,
      selectedActors,
      selectedGenres,
      selectedTags,
    } = req.body;

    const videoFile = req.files["video"][0];
    const imageFiles = req.files["images"];
    // Tạo đối tượng phim mới với những thông tin cơ bản trên
    const newMovie = new Movie({
      title,
      description,
      releaseDate,
      url: "",
      storagePath: "",
    });
    // Gọi hàm upload video lên firebase storage
    const videoResult = await firebaseUpload(videoFile);
    // Lưu url video
    newMovie.url = videoResult.url;
    // Lưu đường dẫn storage trên firebase (có thể dùng để tạo signed url và xóa file)
    newMovie.storagePath = videoResult.storagePath;
    await newMovie.save();
    // Với các file ảnh sẽ cho chạy vòng lặp imageFiles và tạo đối tượng movieImage với url tương ứng
    const movieImagePromises = imageFiles.map(async (imageFile) => {
      try {
        const imageResult = await firebaseUpload(imageFile);
        if (imageResult && imageResult.url) {
          // Tạo bản ghi MovieImage và liên kết với newMovie
          return await MovieImage.create({
            movieId: newMovie.id, // Sử dụng id của newMovie
            image_url: imageResult.url,
            storagePath: imageResult.storagePath,
          });
        } else {
          console.warn(`Failed to upload image: ${imageFile.originalname}`);
          return null;
        }
      } catch (error) {
        console.error(
          `Error uploading image ${imageFile.originalname}:`,
          error
        );
        return null;
      }
    });

    const savedMovieImages = (await Promise.all(movieImagePromises)).filter(
      (image) => image !== null
    );

    // Lưu diễn viên vào bảng movie_actor
    if (selectedActors && selectedActors.length > 0) {
      const actors = await Actor.findAll({
        where: {
          id: { [Op.in]: selectedActors },
        },
      });
      await newMovie.addActors(actors);
    }

    // Lưu thể loại vào bảng movie_genre
    if (selectedGenres && selectedGenres.length > 0) {
      const genres = await Genre.findAll({
        where: {
          id: { [Op.in]: selectedGenres },
        },
      });
      await newMovie.addGenres(genres);
    }

    // Lưu tag vào bảng movie_tag
    if (selectedTags && selectedTags.length > 0) {
      const tags = await Tag.findAll({
        where: {
          id: { [Op.in]: selectedTags },
        },
      });
      await newMovie.addTags(tags);
    }

    res.status(201).json({
      message: "Movie added successfully!",
      movie: { ...newMovie.get(), movieImages: savedMovieImages },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurs while adding movies", error });
  }
};

// Xóa phim
exports.deleleMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Can not find movie!" });
    if (await movie.destroy())
      return res.json({ message: "Deleting movie successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurs while deleting movies", error });
  }
};

// Cập nhật phim
exports.updateMovie = async (req, res) => {
  try {
    const { actors, genres, tags, ...movieData } = req.body;

    // Update movie basic information
    const [updatedRows] = await Movie.update(movieData, {
      where: { id: req.params.id },
    });

    if (updatedRows > 0) {
      const movie = await Movie.findByPk(req.params.id);

      // Update actors
      if (actors) {
        const actorRecords = await Actor.findAll({
          where: { id: { [Op.in]: actors } },
        });
        await movie.setActors(actorRecords);
      }

      // Update genres
      if (genres) {
        const genreRecords = await Genre.findAll({
          where: { id: { [Op.in]: genres } },
        });
        await movie.setGenres(genreRecords);
      }

      // Update tags
      if (tags) {
        const tagRecords = await Tag.findAll({
          where: { id: { [Op.in]: tags } },
        });
        await movie.setTags(tagRecords);
      }
    }
    if (updatedRows > 0)
      return res.status(200).json({ message: "Movie updated successfully!" });
    else return res.status(404).json({ message: "Movie not found!" });
  } catch (error) {
    res.status(500).json({ message: "Fail to update movies", error });
  }
};
