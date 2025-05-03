const router = require('express').Router();
const {
  getGenres,
  getGenre,
  addGenre,
} = require('../controllers/genre.controller');


router.get('/', getGenres);
router.get('/:id', getGenre);
router.post('/', addGenre);

module.exports = router;