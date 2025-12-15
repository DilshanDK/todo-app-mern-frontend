import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import todoService from './services/todoService';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const data = await todoService.getAllTodos();
    setTodos(data);
    setLoading(false);
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
  };

  const handleTodoDeleted = (todoId) => {
    setTodos(todos.filter(todo => todo._id !== todoId));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 My Todo App</h1>
      </header>
      
      <main className="App-main">
        <TodoForm onTodoAdded={handleTodoAdded} />
        
        {loading ? (
          <p>Loading todos...</p>
        ) : (
          <TodoList
            todos={todos}
            onTodoUpdated={handleTodoUpdated}
            onTodoDeleted={handleTodoDeleted}
          />
        )}
      </main>
    </div>
  );
}

export default App;
