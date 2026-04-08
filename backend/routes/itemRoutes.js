const express = require("express");
const router = express.Router();
const { getAllItems, getItemBySlug, createItem, updateItem } = require("../controllers/itemController");

router.get("/", getAllItems);
router.get("/:slug", getItemBySlug);
router.post("/", createItem);
router.put("/:slug", updateItem);

module.exports = router;