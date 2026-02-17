import axios from "axios";

const resolveApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (typeof envUrl === "string" && envUrl.trim()) {
    const normalized = envUrl.trim().replace(/\/+$/, "");
    return normalized.endsWith("/api") ? normalized : `${normalized}/api`;
  }

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "/api";
  }

  return "https://expensetracker-ngbx.onrender.com/api";
};

const apiClient = axios.create({
  baseURL: resolveApiBaseUrl(),
});

export const getExpenses = async ({ category = "", sort = "date_desc" } = {}) => {
  const params = { sort };

  if (category) {
    params.category = category;
  }

  const response = await apiClient.get("/expenses", { params });
  return response.data;
};

export const createExpense = async (payload) => {
  const response = await apiClient.post("/expenses", payload);
  return response.data;
};
