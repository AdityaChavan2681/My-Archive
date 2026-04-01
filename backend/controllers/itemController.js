const mockItems = require('../data/mockItems');

const getAllItems = (req, res) => {
  const { category, search, page = 1, limit = 2 } = req.query;

  let results = [...mockItems];

  if (category) {
    results = results.filter(item => item.category === category);
  }

  if (search) {
    const searchTerm = search.toLowerCase();
    results = results.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedResults = results.slice(startIndex, endIndex);

  console.log({
    category,
    search,
    page: pageNum,
    limit: limitNum,
    totalResults: results.length,
    returned: paginatedResults.length
  });

  res.json(paginatedResults);
};

module.exports = { getAllItems };