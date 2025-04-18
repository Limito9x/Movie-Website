const {getMovies,getMovie,addMovie,deleleMovie,updateMovie} = require('../controllers/movie.controller');
const router = require("express").Router();
const {bufferUpload} = require('../utils/file');

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
router.delete("/:id",deleleMovie);
router.patch("/:id",updateMovie);

module.exports = router;