import React, { useState } from 'react';
import todoService from '../services/todoService';

const TodoItem = ({ todo, onTodoUpdated, onTodoDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(todo);

  const handleStatusChange = async (newStatus) => {
    const updated = await todoService.updateTodo(todo._id, { status: newStatus });
    if (updated) {
      onTodoUpdated(updated);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await todoService.deleteTodo(todo._id);
      onTodoDeleted(todo._id);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveEdit = async () => {
    const updated = await todoService.updateTodo(todo._id, editData);
    if (updated) {
      onTodoUpdated(updated);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item status-${todo.status}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="date"
            value={editData.date}
            onChange={handleEditChange}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="view-mode">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p className="date">{new Date(todo.date).toLocaleDateString()}</p>
          
          <select
            value={todo.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="status-select"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <div className="actions">
            <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
