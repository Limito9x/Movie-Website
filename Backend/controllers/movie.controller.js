const Movie = require('../models/movie');
const MovieImage = require('../models/movieImages');
const { firebaseUpload } = require('../utils/upload');

// Lấy danh sách phim
exports.getMovies = async (req,res) => {
    try{
        const movies = await Movie.findAll();
        res.json(movies)
    }
    catch (error) {
        res.status(500).json({message: "An error occurs while getting movies", error})
    }
}

exports.addMovie = async (req,res) => {
    try {
      // Lấy thông tin cơ bản của phim
      const { title, description, releaseDate } = req.body;
      const videoFile = req.files["video"][0];
      const imageFiles = req.files["images"];
      // Tạo đối tượng phim mới với những thông tin cơ bản trên
      const newMovie = await  Movie.create({ title, description, releaseDate, url: '' });
      // Gọi hàm upload video lên firebase storage
      const videoUrl = (await firebaseUpload(videoFile)).url;
      // Lưu url video
      newMovie.url=videoUrl;
      await newMovie.save();
      // Với các file ảnh sẽ cho chạy vòng lặp imageFiles và tạo đối tượng movieImage với url tương ứng
      const movieImagePromises = imageFiles.map(async (imageFile) => {
        try{
            const imageResult = (await firebaseUpload(imageFile));
                if (imageResult && imageResult.url) {
                    // Tạo bản ghi MovieImage và liên kết với newMovie
                    return await MovieImage.create({
                        movieId: newMovie.id, // Sử dụng id của newMovie
                        image_url: imageResult.url,
                    });
                } else {
                    console.warn(`Failed to upload image: ${imageFile.originalname}`);
                    return null;
                }
        } catch(error) {
            console.error(`Error uploading image ${imageFile.originalname}:`, error);
                return null;
        }
      })
      
      const savedMovieImages = (await Promise.all(movieImagePromises)).filter(
        (image) => image !== null
      );

      res
        .status(201)
        .json({
          message: "Movie added successfully!",
          movie: { ...newMovie.get(), movieImages: savedMovieImages },
        });
    } catch (error) {
        res
          .status(500)
          .json({ message: "An error occurs while adding movies",error });
    }
}