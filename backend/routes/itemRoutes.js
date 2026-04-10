const express = require("express");
const router = express.Router();

const {
  getAllItems,
  getItemBySlug,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

router.get("/", getAllItems);
router.get("/:slug", getItemBySlug);
router.post("/", createItem);
router.put("/:slug", updateItem);
router.delete("/:slug", deleteItem);

module.exports = router;