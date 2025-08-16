const router = require("express").Router();
const {getTags,getTag,addTag, updateTag} = require('../controllers/tag.controller');

router.get("/",getTags);
router.get("/:id", getTag);
router.post("/", addTag);
router.patch("/:id", updateTag);

module.exports = router;