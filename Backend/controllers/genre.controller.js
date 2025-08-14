const {Genre} = require('../models');

exports.getGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "An error occurs while getting genres", error });
  }
}

exports.getGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: "An error occurs while getting genre", error });
  }
}

exports.addGenre = async (req, res) => {
  try {
    console.log(req.body);
    const newGenre = await Genre.create(req.body);
    res.status(201).json({ message: "Genre added successfully!", genre: newGenre });
  } catch (error) {
    res.status(500).json({ message: "An error occurs while adding genre", error });
  }
}