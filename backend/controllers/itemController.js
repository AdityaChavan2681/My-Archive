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
const VALID_CATEGORIES = new Set(["ships", "buildings", "others"]);
const VALID_STATUSES = new Set(["draft", "published"]);

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

const validateItemPayload = ({ title, slug, category, summary, status }) => {
  const errors = [];

  if (!title) {
    errors.push("title is required");
  }

  if (title && title.length < 3) {
    errors.push("title must be at least 3 characters long");
  }

  if (!slug) {
    errors.push("slug is required");
  }

  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.push("slug may only contain lowercase letters, numbers, and hyphens");
  }

  if (!category) {
    errors.push("category is required");
  } else if (!VALID_CATEGORIES.has(category)) {
    errors.push("category must be one of ships, buildings, or others");
  }

  if (summary && summary.length > 300) {
    errors.push("summary must be 300 characters or fewer");
  }

  if (status && !VALID_STATUSES.has(status)) {
    errors.push("status must be either draft or published");
  }

  return errors;
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
    const category = String(req.body.category || "").trim().toLowerCase();
    const summary = String(req.body.summary || req.body.description || req.body.old_price || "").trim();
    const content = String(req.body.content || req.body.new_price || req.body.description || "").trim();
    const status = String(req.body.status || "draft").trim().toLowerCase();
    const tags = normalizeTags(req.body.tags);
    const references = Array.isArray(req.body.references) ? req.body.references : [];
    const image = String(req.body.image || "").trim();
    const images = Array.isArray(req.body.images) && req.body.images.length
      ? req.body.images
      : (image ? [{ url: image }] : []);

    const validationErrors = validateItemPayload({ title, slug, category, summary, status });

    if (validationErrors.length) {
      return res.status(400).json({
        error: validationErrors.join(", ")
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
    const existingItem = await ArchiveItem.findOne({ slug });

    if (!existingItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    const nextTitle = String(req.body.title ?? existingItem.title ?? "").trim();
    const nextSlug = String(req.body.slug ?? existingItem.slug ?? "").trim() || slugify(nextTitle);
    const nextCategory = String(req.body.category ?? existingItem.category ?? "").trim().toLowerCase();
    const nextSummary = String(req.body.summary ?? existingItem.summary ?? "").trim();
    const nextStatus = String(req.body.status ?? existingItem.status ?? "draft").trim().toLowerCase();
    const validationErrors = validateItemPayload({
      title: nextTitle,
      slug: nextSlug,
      category: nextCategory,
      summary: nextSummary,
      status: nextStatus
    });

    if (validationErrors.length) {
      return res.status(400).json({ error: validationErrors.join(", ") });
    }

    if (nextSlug !== existingItem.slug) {
      const duplicate = await ArchiveItem.findOne({ slug: nextSlug });

      if (duplicate) {
        return res.status(409).json({ error: "Slug already exists" });
      }
    }

    const updatedItem = await ArchiveItem.findOneAndUpdate(
      { slug },
      {
        ...req.body,
        title: nextTitle,
        slug: nextSlug,
        category: nextCategory,
        summary: nextSummary,
        status: nextStatus,
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
