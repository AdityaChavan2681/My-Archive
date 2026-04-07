// const mockItems = require('../data/mockItems');

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
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllItems };