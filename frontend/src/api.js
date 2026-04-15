const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const parseJson = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
};

const normalizeItem = (item = {}) => ({
  id: item.id || item._id,
  _id: item._id,
  title: item.title || item.name || "",
  name: item.name || item.title || "",
  slug: item.slug,
  image: item.image || item.images?.[0]?.url || "",
  category: item.category || "",
  summary: item.summary || item.description || item.old_price || "",
  content: item.content || item.new_price || item.description || "",
  status: item.status || "published",
  tags: Array.isArray(item.tags) ? item.tags : []
});

export const frontendApi = {
  async fetchItems(query = "") {
    const response = await fetch(`${API_BASE_URL}/api/items${query}`);
    const data = await parseJson(response);
    const items = Array.isArray(data.data)
      ? data.data
      : Array.isArray(data.items)
        ? data.items
        : Array.isArray(data)
          ? data
          : [];

    return {
      ...data,
      data: items.map(normalizeItem)
    };
  },

  async fetchItem(identifier) {
    const response = await fetch(`${API_BASE_URL}/api/items/${identifier}`);
    const data = await parseJson(response);
    const item = data.item ? data.item : data;

    return {
      ...data,
      item: normalizeItem(item)
    };
  },

  getImageUrl(image) {
    if (!image) {
      return "";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_BASE_URL}${image}`;
  }
};
