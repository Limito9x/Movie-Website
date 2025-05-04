const router = require("express").Router();
const {getTags,getTag,addTag} = require('../controllers/tag.controller');

router.get("/",getTags);
router.get("/:id", getTag);
router.post("/", addTag);

module.exports = router;