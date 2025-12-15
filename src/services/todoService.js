import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

const todoService = {
  // Get all todos
  getAllTodos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  },

  // Get single todo
  getTodoById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo:', error);
      return null;
    }
  },

  // Create todo
  createTodo: async (todoData) => {
    try {
      const response = await axios.post(API_URL, todoData);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      return null;
    }
  },

  // Update todo
  updateTodo: async (id, todoData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, todoData);
      return response.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      return null;
    }
  },

  // Delete todo
  deleteTodo: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting todo:', error);
      return null;
    }
  }
};

export default todoService;
