import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const url = 'http://backend:5000';

  const fetchTodos = async () => {
    const response = await fetch(`${url}/api/todos`);
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(`${url}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    setTitle('');
    setDescription('');
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await fetch(`${url}/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          placeholder="Todo title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
          placeholder="Todo description"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex flex-col p-2 border-b">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{todo.title}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
            {todo.description && (
              <p className="text-gray-600 mt-1">{todo.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
