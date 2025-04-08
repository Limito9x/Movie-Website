const {getMovies,getMovie,addMovie} = require('../controllers/movie.controller');
const router = require("express").Router();
const {bufferUpload} = require('../utils/upload');

router.get("/",getMovies);
router.get("/:id", getMovie);
router.post(
  "/",
  bufferUpload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  addMovie
);

module.exports = router;