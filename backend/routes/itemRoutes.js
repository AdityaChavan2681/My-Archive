const express = require("express");
const router = express.Router();
const { getAllItems, getItemBySlug, createItem } = require("../controllers/itemController");

router.get("/", getAllItems);
router.get("/:slug", getItemBySlug);
router.post("/", createItem);

module.exports = router;