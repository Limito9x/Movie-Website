const express = require("express");
const {
  getActors,
  getActor,
  addActor,
} = require("../controllers/actor.controller");
const bufferUpload = require("../utils/file").bufferUpload;

const router = express.Router();

router.get("/", getActors);
router.get("/:id", getActor);
router.post(
  "/",
  bufferUpload.fields([
    { name: "images", maxCount: 1 },
  ]),
  addActor
);

module.exports = router;
