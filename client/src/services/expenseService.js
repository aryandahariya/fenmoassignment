import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
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
