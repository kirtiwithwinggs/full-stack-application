import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
  // Get all items
  getItems: () => axios.get(`${API_URL}/items`),
  
  // Get single item
  getItem: (id) => axios.get(`${API_URL}/items/${id}`),
  
  // Create new item
  createItem: (data) => axios.post(`${API_URL}/items`, data),
  
  // Update item
  updateItem: (id, data) => axios.put(`${API_URL}/items/${id}`, data),
  
  // Delete item
  deleteItem: (id) => axios.delete(`${API_URL}/items/${id}`),
};

export default api;
