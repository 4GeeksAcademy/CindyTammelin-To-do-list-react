import React, { useState, useEffect  } from "react";
import "./TodoApp.css";

const API_BASE = "https://playground.4geeks.com/todo";
const USERNAME = "cindy"; 

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
  fetchTodos();
  }, []);


  const fetchTodos = () => {
    fetch(`${API_BASE}/users/${USERNAME}`)
      .then(resp => resp.json())
      .then(data => {
        const formattedTodos = data.todos.map(task => ({
          id: task.id,
          text: task.label,
          done: task.is_done
        }));
        setTodos(formattedTodos);
      })
      .catch(error => console.log("Error:", error));
  };



  const addTodo = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const newTodo = {
        label: input.trim(),
        is_done: false
    
  };

      fetch(`${API_BASE}/todos/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: { "Content-Type": "application/json" }
      })
      .then(() => {
        fetchTodos(); 
        setInput("");
      })
      .catch(error => console.log("Error:", error));
    }
  };



  const deleteTodo = (id) => {
   
    fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
    .then(() => fetchTodos())
    .catch(error => console.log("Error:", error));
  };



    const clearAllTodos = () => {
    
    fetch(`${API_BASE}/todos/${USERNAME}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
    .then(() => setTodos([]))
    .catch(error => console.log("Error:", error));
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
        
        {todos.length > 0 && (
          <button 
            onClick={clearAllTodos}
            className="clear-btn"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoApp;