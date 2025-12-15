import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onTodoUpdated, onTodoDeleted }) => {
  if (todos.length === 0) {
    return <p className="no-todos">No todos yet. Add one to get started!</p>;
  }

  return (
    <div className="todo-list">
      <h2>Your Todos ({todos.length})</h2>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onTodoUpdated={onTodoUpdated}
          onTodoDeleted={onTodoDeleted}
        />
      ))}
    </div>
  );
};

export default TodoList;
