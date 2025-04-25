const Actor = require('../models/actor');
const { firebaseUpload } = require("../utils/file");

exports.getActors = async (req, res) => {
  try {
    const actors = await Actor.findAll();
    res.json(actors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurs while getting actors", error });
  }
};

exports.getActor = async (req, res) => {
  try {
    const actor = await Actor.findByPk(req.params.id);
    res.json(actor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurs while getting actor", error });
  }
};

exports.addActor = async (req, res) => {
  try {
    const { name, dateOfBirth ,sex} = req.body;
    const avatar = req.files["images"][0];
    const newActor = new Actor({name,dateOfBirth,sex,avatarUrl: ''});
    if (avatar) {
      const result = (await firebaseUpload(avatar));
      newActor.avatarUrl = result.url;
      newActor.avatarStoragePath = result.storagePath;
    }
    await newActor.save();
    res.status(201).json({message: "Actor added successfully!",actor: newActor});
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurs while adding actor", error });
  }
};
