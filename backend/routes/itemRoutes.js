const express = require("express");
const router = express.Router();

const fetchUser = require("../middleware/auth");
const {
  getAllItems,
  getItemBySlug,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

router.get("/", getAllItems);
router.get("/:slug", getItemBySlug);

router.post("/", fetchUser, createItem);
router.put("/:id", fetchUser, updateItem);
router.delete("/:id", fetchUser, deleteItem);

module.exports = router;