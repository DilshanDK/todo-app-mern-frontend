import React, { useState } from 'react';
import todoService from '../services/todoService';

const TodoForm = ({ onTodoAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    status: 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    const newTodo = await todoService.createTodo(formData);
    
    if (newTodo) {
      setFormData({
        title: '',
        description: '',
        date: '',
        status: 'pending'
      });
      onTodoAdded(newTodo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>Add New Todo</h2>
      
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      
      <textarea
        name="description"
        placeholder="Enter description"
        value={formData.description}
        onChange={handleChange}
      />
      
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
