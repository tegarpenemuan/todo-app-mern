import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (description) {
      const newTodo = { description };
      try {
        await axios.post("http://localhost:5000/todos/add", newTodo);
        setDescription("");
        fetchTodos();
      } catch (error) {
        console.log("Error adding todo:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      addTodo();
    }
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-5 mx-auto">
          <h2 className="mt-5">Todo App</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter todo description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn btn-primary" onClick={addTodo}>
              Add Todo
            </button>
          </div>
          <ul className="list-group">
            {todos.map((todo) => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={todo._id}
              >
                {todo.description}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
