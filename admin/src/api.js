const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const parseJson = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.errors || "Request failed");
  }

  return data;
};

export const adminAuth = {
  getToken() {
    return localStorage.getItem("myarchive-admin-token") || "";
  },
  setToken(token) {
    localStorage.setItem("myarchive-admin-token", token);
  },
  clearToken() {
    localStorage.removeItem("myarchive-admin-token");
  }
};

export const loginAdmin = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return parseJson(response);
};

export const uploadArchiveImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData
  });

  return parseJson(response);
};

export const createArchiveItem = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": adminAuth.getToken()
    },
    body: JSON.stringify(payload)
  });

  return parseJson(response);
};

export const updateArchiveItem = async (slug, payload) => {
  const response = await fetch(`${API_BASE_URL}/api/items/${encodeURIComponent(slug)}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": adminAuth.getToken()
    },
    body: JSON.stringify(payload)
  });

  return parseJson(response);
};

export const deleteArchiveItem = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/api/items/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "auth-token": adminAuth.getToken()
    }
  });

  return parseJson(response);
};

export const fetchArchiveItems = async () => {
  const response = await fetch(`${API_BASE_URL}/api/items?page=1&limit=50`);
  return parseJson(response);
};

export const fetchArchiveItemBySlug = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/api/items/${encodeURIComponent(slug)}`);
  return parseJson(response);
};
