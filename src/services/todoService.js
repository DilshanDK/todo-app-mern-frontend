import axios from 'axios';

console.log('📍 [DEBUG] API URL:', process.env.REACT_APP_API_URL);

const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;

console.log('🔗 [DEBUG] Full API URL:', API_URL);

const todoService = {
  // Get all todos
  getAllTodos: async () => {
    try {
      console.log('🔍 [DEBUG] Fetching todos from:', API_URL);
      const response = await axios.get(API_URL);
      console.log('✅ [DEBUG] Todos fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ [DEBUG] Error fetching todos:', error.message);
      console.error('❌ [DEBUG] Error details:', error);
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
      console.log('📤 [DEBUG] Sending todo to:', API_URL);
      console.log('📤 [DEBUG] Data:', todoData);
      const response = await axios.post(API_URL, todoData);
      console.log('✅ [DEBUG] Todo created:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ [DEBUG] Error creating todo:', error.message);
      console.error('❌ [DEBUG] Error details:', error);
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
