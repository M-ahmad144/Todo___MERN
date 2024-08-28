const express = require("express");
const { getTags } = require("../../controllers/tagController");

const router = express.Router();

router.get("/getAllTags", getTags);

module.exports = router;
