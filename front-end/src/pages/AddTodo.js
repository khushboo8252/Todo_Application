import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleAdd = async () => {
    if (!user || !token) {
      alert("User not authenticated.");
      return;
    }

    if (!title.trim()) {
      setError(true);
      return;
    }

    const todo = {
      title: title.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      priority,
      userId: user._id,
    };

    try {
      const res = await fetch("https://todoapp-xdlr.onrender.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todo),
      });

      if (res.ok) {
        alert("Todo added successfully!");
        navigate("/todos");
      } else {
        const error = await res.json();
        alert(error?.error || "Failed to add todo.");
      }
    } catch (err) {
      console.error("Add todo failed:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Add Todo
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error && !title && (
          <p className="text-red-500 text-sm mb-2">Title is required.</p>
        )}

        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          onClick={handleAdd}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
