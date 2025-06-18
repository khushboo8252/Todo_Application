import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noteInput, setNoteInput] = useState({});
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTodos = async () => {
      if (!user?._id || !token) {
        setTodos([]);
        setFilteredTodos([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://todoapp-xdlr.onrender.com/api/todos?userId=${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTodos(data);
        setFilteredTodos(data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user?._id, token]);

  useEffect(() => {
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [searchTerm, todos]);

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://todoapp-xdlr.onrender.com/api/todos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = todos.filter((todo) => todo._id !== id);
      setTodos(updated);
      setFilteredTodos(updated);
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const addNote = async (id) => {
    const note = noteInput[id]?.trim();
    if (!note) return;

    try {
      const todo = todos.find((t) => t._id === id);
      const updatedNotes = [...(todo.notes || []), note];
      const res = await fetch(`https://todoapp-xdlr.onrender.com/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notes: updatedNotes }),
      });

      const updatedTodo = await res.json();
      const updatedList = todos.map((t) => (t._id === id ? updatedTodo : t));
      setTodos(updatedList);
      setFilteredTodos(updatedList);
      setNoteInput({ ...noteInput, [id]: "" });
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-100 dark:bg-black min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-white">
        Your Todo List
      </h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
      ) : filteredTodos.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {todo.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Tags:</span>{" "}
                {todo.tags?.length ? todo.tags.join(", ") : "None"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-medium">Priority:</span> {todo.priority}
              </p>

              {todo.notes?.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Notes:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {todo.notes.map((note, idx) => (
                      <li key={idx}>📝 {note}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2 mt-3">
                <input
                  value={noteInput[todo._id] || ""}
                  onChange={(e) =>
                    setNoteInput({ ...noteInput, [todo._id]: e.target.value })
                  }
                  placeholder="Add note"
                  className="flex-grow px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  onClick={() => addNote(todo._id)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                >
                  +
                </button>
              </div>

              <div className="flex justify-between mt-4 text-sm font-medium">
                <Link
                  to={`/update/${todo._id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:underline"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No todos available.</p>
      )}
    </div>
  );
};

export default TodoList;
