// Below is the mock data controller

//const mockItems = require('../data/mockItems');

// const getAllItems = (req, res) => {
//   const { category, search, page = 1, limit = 2 } = req.query;

//   let results = [...mockItems];

//   if (category) {
//     results = results.filter(item => item.category === category);
//   }

//   if (search) {
//     const searchTerm = search.toLowerCase();
//     results = results.filter(item =>
//       item.title.toLowerCase().includes(searchTerm) ||
//       item.description.toLowerCase().includes(searchTerm)
//     );
//   }

//   const pageNum = Number(page);
//   const limitNum = Number(limit);

//   const startIndex = (pageNum - 1) * limitNum;
//   const endIndex = startIndex + limitNum;

//   const paginatedResults = results.slice(startIndex, endIndex);

//   console.log({
//     category,
//     search,
//     page: pageNum,
//     limit: limitNum,
//     totalResults: results.length,
//     returned: paginatedResults.length
//   });

//   res.json(paginatedResults);
// };

// module.exports = { getAllItems };


const ArchiveItem = require("../models/ArchiveItem");

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const normalizeTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  return String(tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const getAllItems = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 2 } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ];
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const totalResults = await ArchiveItem.countDocuments(filter);

    const items = await ArchiveItem.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    res.json({
      items,
      totalResults,
      currentPage: pageNum,
      totalPages: Math.ceil(totalResults / limitNum)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getItemBySlug = async (req, res) => {
  try {
    const item = await ArchiveItem.findOne({ slug: req.params.slug });

    if (!item) {
      return res.status(404).json({ error: "Archive item not found" });
    }

    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const createItem = async (req, res) => {
  try {
    const title = String(req.body.title || req.body.name || "").trim();
    const slug = String(req.body.slug || slugify(title)).trim();
    const category = String(req.body.category || "").trim();
    const summary = String(req.body.summary || req.body.description || req.body.old_price || "").trim();
    const content = String(req.body.content || req.body.new_price || req.body.description || "").trim();
    const status = String(req.body.status || "draft").trim();
    const tags = normalizeTags(req.body.tags);
    const references = Array.isArray(req.body.references) ? req.body.references : [];
    const image = String(req.body.image || "").trim();
    const images = Array.isArray(req.body.images) && req.body.images.length
      ? req.body.images
      : (image ? [{ url: image }] : []);

    if (!title || !slug || !category) {
      return res.status(400).json({
        error: "Title, slug, and category are required"
      });
    }

    const existingItem = await ArchiveItem.findOne({ slug });

    if (existingItem) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    const newItem = new ArchiveItem({
      title,
      slug,
      summary,
      content,
      category,
      tags,
      images,
      references,
      status: status || "draft"
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateItem = async (req, res) => {
  try {
    const { slug } = req.params;

    const updatedItem = await ArchiveItem.findOneAndUpdate(
      { slug },
      {
        ...req.body,
        updatedAt: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { slug } = req.params;

    const deletedItem = await ArchiveItem.findOneAndDelete({ slug });

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({
      message: "Item deleted successfully",
      deletedItem
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllItems,
  getItemBySlug,
  createItem,
  updateItem,
  deleteItem
};
