import React, { useState } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: input.trim(),
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <h1>todos</h1>
      
      <input
        type="text"
        className="todo-input"
        placeholder="What need to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTodo}
        autoFocus
      />
      
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty">No hay tareas, agrega tareas</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li 
                key={todo.id} 
                className="todo-item"
                onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
              >
                <span>{todo.text}</span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="footer">
        <span>{todos.length} item{todos.length !== 1 ? 's' : ''} left</span>
      </div>
    </div>
  );
};

export default TodoApp;