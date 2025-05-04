const Tag = require('../models/tag');

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "An error occurs while getting tags", error });
  }
}

exports.getTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "An error occurs while getting tag", error });
  }
}

exports.addTag = async (req, res) => {
  try {
    console.log(req.body);
    const newTag = await Tag.create(req.body);
    res.status(201).json({ message: "Tag added successfully!", tag: newTag });
  } catch (error) {
    res.status(500).json({ message: "An error occurs while adding tag", error });
  }
}