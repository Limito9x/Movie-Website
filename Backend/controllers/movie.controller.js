const Movie = require('../models/movie');

// Lấy danh sách phim
exports.getMovies = async (req,res) => {
    try{
        const movies = await Movie.findAll();
        res.json(movies)
    }
    catch (error) {
        res.status(500).json({message: "An error occurs while getting movies: ", error})
    }
}

// exports.addMovie = async (req.res) ==> {
//     try {
        
//     } catch (error) {
        
//     }
// }